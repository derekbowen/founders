import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { CheckCircle2, ExternalLink, Loader2, ShieldCheck, AlertCircle, Copy } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { SiteHeader, SiteFooter } from "@/components/site-layout";
import { getCurrentWorkspace, type CurrentWorkspace } from "@/server/workspace.functions";
import {
  createCheckoutSession,
  createPortalSession,
} from "@/server/billing.functions";
import {
  issueDomainVerification,
  checkDomainVerification,
  type DomainVerificationStatus,
} from "@/server/domain-verification.functions";
import {
  PLAN_FEATURES,
  type Plan,
  formatPlanPrice,
  planOrder,
  minimumPlanFor,
  type Feature,
} from "@/lib/plans";
import { buildMeta } from "@/lib/seo";

const SearchSchema = z.object({
  status: z.enum(["success", "cancel"]).optional(),
  upgrade: z.string().optional(),
  session_id: z.string().optional(),
});

const SELF_SERVE_PLANS: Plan[] = ["starter", "growth", "scale"];

export const Route = createFileRoute("/account/billing")({
  validateSearch: (search) => SearchSchema.parse(search),
  beforeLoad: async () => {
    const { data } = await supabase.auth.getUser();
    if (!data.user) {
      throw redirect({
        to: "/auth",
        search: { mode: "signin", redirect: "/account/billing" } as never,
      });
    }
  },
  loader: async () => {
    return await getCurrentWorkspace();
  },
  head: () =>
    buildMeta({
      title: "Billing — founders.click",
      description: "Manage your founders.click subscription.",
      path: "/account/billing",
      noindex: true,
    }),
  component: BillingPage,
});

function BillingPage() {
  const { workspace, needsOnboarding } = Route.useLoaderData();
  const search = Route.useSearch();

  if (needsOnboarding || !workspace) {
    return (
      <Shell>
        <h1 className="text-2xl font-bold">Finish onboarding first</h1>
        <p className="mt-2 text-muted-foreground">
          You don't have a workspace yet. Complete onboarding to start a subscription.
        </p>
        <Link
          to="/onboarding"
          search={{} as never}
          className="mt-6 inline-flex h-10 items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground"
        >
          Continue onboarding
        </Link>
      </Shell>
    );
  }

  return (
    <Shell>
      {search.status === "success" && (
        <div className="mb-6 flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-900">
          <CheckCircle2 className="h-4 w-4" />
          <span>You're all set — subscription active. Welcome aboard.</span>
        </div>
      )}
      {search.status === "cancel" && (
        <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
          Checkout canceled. No charges were made. You can try again any time.
        </div>
      )}
      {search.upgrade && (
        <UpgradeBanner feature={search.upgrade as Feature} currentPlan={workspace.plan} />
      )}

      <h1 className="text-3xl font-bold tracking-tight">Billing</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {workspace.name} ·{" "}
        <span className="font-mono text-xs">{workspace.marketplace_domain ?? "no domain"}</span>
      </p>

      <CurrentPlanCard workspace={workspace} />

      <DomainSetupPanel workspace={workspace} />

      <h2 className="mt-12 text-lg font-semibold">Plans</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Switch plans any time. Stripe will prorate the difference.
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {SELF_SERVE_PLANS.map((p) => (
          <PlanCard
            key={p}
            plan={p}
            currentPlan={workspace.plan}
            workspaceId={workspace.id}
            isOwner={workspace.role === "owner"}
          />
        ))}
      </div>
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-10 sm:py-14">{children}</main>
      <SiteFooter />
    </div>
  );
}

function UpgradeBanner({ feature, currentPlan }: { feature: Feature; currentPlan: Plan }) {
  const minPlan = minimumPlanFor(feature);
  if (planOrder(currentPlan) >= planOrder(minPlan)) return null;
  return (
    <div className="mb-6 rounded-xl border border-primary/30 bg-primary/5 p-4">
      <p className="text-sm">
        <strong>{feature}</strong> is available on the{" "}
        <strong>{PLAN_FEATURES[minPlan].name}</strong> plan and above. Upgrade below to unlock
        it.
      </p>
    </div>
  );
}

function CurrentPlanCard({ workspace }: { workspace: CurrentWorkspace }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function openPortal() {
    setError("");
    setBusy(true);
    try {
      const { url } = await createPortalSession({});
      window.location.href = url;
    } catch (e: any) {
      setError(e?.message ?? "Could not open billing portal.");
      setBusy(false);
    }
  }

  const trial = workspace.subscription_status === "trialing";
  const periodEnd = workspace.current_period_end
    ? new Date(workspace.current_period_end).toLocaleDateString()
    : null;
  const trialEnd = workspace.trial_ends_at
    ? new Date(workspace.trial_ends_at).toLocaleDateString()
    : null;

  return (
    <div className="mt-8 rounded-2xl border border-border bg-card p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Current plan
          </p>
          <p className="mt-1 text-2xl font-bold">{PLAN_FEATURES[workspace.plan].name}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {formatPlanPrice(workspace.plan)} / month · status:{" "}
            <span className="font-medium">{workspace.subscription_status}</span>
            {trial && trialEnd && <> · trial ends {trialEnd}</>}
            {!trial && periodEnd && <> · renews {periodEnd}</>}
          </p>
        </div>
        {workspace.role === "owner" && (
          <button
            onClick={openPortal}
            disabled={busy}
            className="inline-flex h-9 items-center gap-2 rounded-full border border-border px-4 text-sm font-medium hover:bg-muted disabled:opacity-50"
          >
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <ExternalLink className="h-4 w-4" />}
            Manage payment & invoices
          </button>
        )}
      </div>
      {error && <p className="mt-3 text-sm text-rose-700">{error}</p>}
    </div>
  );
}

function PlanCard({
  plan,
  currentPlan,
  workspaceId,
  isOwner,
}: {
  plan: Plan;
  currentPlan: Plan;
  workspaceId: string;
  isOwner: boolean;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const d = PLAN_FEATURES[plan];
  const isCurrent = plan === currentPlan;
  const isUpgrade = planOrder(plan) > planOrder(currentPlan);

  async function pick() {
    setError("");
    setBusy(true);
    try {
      const { url } = await createCheckoutSession({
        data: { plan, workspaceId },
      });
      window.location.href = url;
    } catch (e: any) {
      setError(e?.message ?? "Checkout failed.");
      setBusy(false);
    }
  }

  return (
    <div
      className={`flex flex-col rounded-2xl border p-5 ${
        isCurrent ? "border-primary ring-2 ring-primary/20" : "border-border"
      }`}
    >
      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {d.name}
      </div>
      <div className="mt-2 text-3xl font-bold">{formatPlanPrice(plan)}</div>
      <p className="mt-2 text-xs text-muted-foreground">{d.blurb}</p>
      <ul className="mt-4 space-y-1 text-xs text-muted-foreground">
        <li>· {d.quotas.pageGenerationsPerMonth.toLocaleString()} AI pages / mo</li>
        <li>· {d.quotas.keywordSlots.toLocaleString()} tracked keywords</li>
        <li>· {d.quotas.seats.toLocaleString()} team seats</li>
      </ul>
      <div className="mt-auto pt-5">
        {isCurrent ? (
          <button
            disabled
            className="inline-flex h-9 w-full items-center justify-center rounded-full border border-border px-4 text-sm font-medium text-muted-foreground"
          >
            Current plan
          </button>
        ) : (
          <button
            onClick={pick}
            disabled={busy || !isOwner}
            title={!isOwner ? "Only the workspace owner can change billing." : undefined}
            className="inline-flex h-9 w-full items-center justify-center rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:opacity-90 disabled:opacity-60"
          >
            {busy ? "Opening…" : isUpgrade ? "Upgrade" : "Switch"}
          </button>
        )}
        {error && <p className="mt-2 text-xs text-rose-700">{error}</p>}
      </div>
    </div>
  );
}

// ─── Domain setup + reverse-proxy snippet ───────────────────────────────────

function DomainSetupPanel({ workspace }: { workspace: CurrentWorkspace }) {
  // Internal workspaces (founders.click team) skip domain setup entirely.
  if (workspace.is_internal) return null;
  const domain = workspace.marketplace_domain;
  if (!domain) {
    return (
      <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-900">
        Set a marketplace domain on this workspace to view setup instructions.
      </div>
    );
  }

  const isOwner = workspace.role === "owner";
  const verified = !!workspace.domain_verified_at;

  return (
    <div className="mt-8 rounded-2xl border border-border bg-card p-6">
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-semibold">Connect your marketplace</h2>
        {verified ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-900">
            <ShieldCheck className="h-3 w-3" />
            Verified
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-900">
            <AlertCircle className="h-3 w-3" />
            Unverified
          </span>
        )}
      </div>
      <p className="mt-1 text-sm text-muted-foreground">
        Your domain: <span className="font-mono">{domain}</span>
      </p>

      {!verified && (
        <DomainVerificationFlow workspaceId={workspace.id} domain={domain} disabled={!isOwner} />
      )}

      <h3 className="mt-8 text-sm font-semibold">Reverse-proxy snippet</h3>
      <p className="mt-1 text-xs text-muted-foreground">
        Once verified, install one of these on your edge to forward{" "}
        <code className="rounded bg-muted px-1 font-mono text-[11px]">/p/*</code> requests
        to founders.click. Your generated SEO pages then render native to{" "}
        <span className="font-mono">{domain}</span>.
      </p>
      <ProxySnippetTabs domain={domain} />
    </div>
  );
}

function DomainVerificationFlow({
  workspaceId,
  domain,
  disabled,
}: {
  workspaceId: string;
  domain: string;
  disabled: boolean;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState<DomainVerificationStatus | null>(null);
  const [checkResult, setCheckResult] = useState<string | null>(null);

  async function issue() {
    setError("");
    setBusy(true);
    try {
      const s = await issueDomainVerification({ data: { workspaceId } });
      setStatus(s);
      setCheckResult(null);
    } catch (e: any) {
      setError(e?.message ?? "Could not issue token.");
    } finally {
      setBusy(false);
    }
  }

  async function check() {
    setError("");
    setCheckResult(null);
    setBusy(true);
    try {
      const r = await checkDomainVerification({ data: { workspaceId } });
      if (r.verified) {
        // Hard reload so the parent loader picks up domain_verified_at.
        window.location.reload();
        return;
      }
      setCheckResult(
        `Not verified yet. Looked up TXT records at _founders-verify.${domain} and found: ${
          r.observed_records.length ? r.observed_records.join(", ") : "(none)"
        }. DNS can take a few minutes to propagate.`,
      );
    } catch (e: any) {
      setError(e?.message ?? "Could not check verification.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mt-5 rounded-xl border border-border bg-background p-4">
      <p className="text-sm font-medium">Verify domain ownership</p>
      <p className="mt-1 text-xs text-muted-foreground">
        Add a single TXT record to your DNS. We never serve content for an unverified
        domain.
      </p>

      {status ? (
        <div className="mt-4 space-y-3">
          <CopyRow
            label="TXT record name"
            value={status.txt_record_name ?? `_founders-verify.${domain}`}
          />
          <CopyRow label="TXT record value" value={status.token ?? ""} />
          <button
            onClick={check}
            disabled={busy || disabled}
            className="inline-flex h-9 items-center justify-center rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-sm hover:opacity-90 disabled:opacity-60"
          >
            {busy ? <Loader2 className="mr-1 h-4 w-4 animate-spin" /> : null}
            Verify now
          </button>
        </div>
      ) : (
        <button
          onClick={issue}
          disabled={busy || disabled}
          title={disabled ? "Only the workspace owner can manage domain verification." : undefined}
          className="mt-3 inline-flex h-9 items-center justify-center rounded-full border border-border px-4 text-sm font-medium hover:bg-muted disabled:opacity-50"
        >
          {busy ? <Loader2 className="mr-1 h-4 w-4 animate-spin" /> : null}
          Get verification token
        </button>
      )}
      {checkResult && (
        <p className="mt-3 text-xs text-amber-800">{checkResult}</p>
      )}
      {error && <p className="mt-3 text-xs text-rose-700">{error}</p>}
    </div>
  );
}

function CopyRow({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  }
  return (
    <div>
      <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <div className="mt-1 flex items-center gap-2">
        <code className="block flex-1 truncate rounded-md border border-border bg-muted/30 px-2 py-1 font-mono text-xs">
          {value}
        </code>
        <button
          type="button"
          onClick={copy}
          className="inline-flex h-7 items-center gap-1 rounded-md border border-border px-2 text-xs hover:bg-muted"
        >
          <Copy className="h-3 w-3" />
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </div>
  );
}

function ProxySnippetTabs({ domain }: { domain: string }) {
  const [tab, setTab] = useState<"cloudflare" | "nginx" | "vercel">("cloudflare");

  const cloudflare = `// Cloudflare Worker — bind to ${domain}/p/*
export default {
  async fetch(req) {
    const url = new URL(req.url);
    if (!url.pathname.startsWith("/p/")) {
      return fetch(req); // pass through everything else
    }
    const upstream = new URL(url.pathname + url.search, "https://founders.click");
    const proxied = new Request(upstream, req);
    proxied.headers.set("X-Forwarded-Host", "${domain}");
    return fetch(proxied);
  },
};`;

  const nginx = `# nginx — drop into your server { } block for ${domain}
location ^~ /p/ {
    proxy_pass         https://founders.click;
    proxy_set_header   Host              founders.click;
    proxy_set_header   X-Forwarded-Host  ${domain};
    proxy_set_header   X-Forwarded-Proto $scheme;
    proxy_ssl_server_name on;
}`;

  const vercel = `// vercel.json — for ${domain}
{
  "rewrites": [
    {
      "source": "/p/:path*",
      "destination": "https://founders.click/p/:path*",
      "has": [{ "type": "header", "key": "x-forwarded-host", "value": "${domain}" }]
    }
  ]
}`;

  const snippet = tab === "cloudflare" ? cloudflare : tab === "nginx" ? nginx : vercel;

  return (
    <div className="mt-3 overflow-hidden rounded-xl border border-border">
      <div className="flex gap-1 border-b border-border bg-muted/30 p-1">
        {(["cloudflare", "nginx", "vercel"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
              tab === t ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t === "cloudflare" ? "Cloudflare Worker" : t === "nginx" ? "NGINX" : "Vercel"}
          </button>
        ))}
        <button
          type="button"
          onClick={() => navigator.clipboard.writeText(snippet)}
          className="ml-auto inline-flex items-center gap-1 rounded-md px-3 py-1 text-xs text-muted-foreground hover:text-foreground"
        >
          <Copy className="h-3 w-3" /> Copy
        </button>
      </div>
      <pre className="overflow-x-auto bg-background p-4 text-xs leading-relaxed">
        <code>{snippet}</code>
      </pre>
    </div>
  );
}

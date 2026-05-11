import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { CheckCircle2, ExternalLink, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { SiteHeader, SiteFooter } from "@/components/site-layout";
import { getCurrentWorkspace, type CurrentWorkspace } from "@/server/workspace.functions";
import { createCheckoutSession, createPortalSession } from "@/server/billing.functions";
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
        <strong>{PLAN_FEATURES[minPlan].name}</strong> plan and above. Upgrade below to unlock it.
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
            {busy ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <ExternalLink className="h-4 w-4" />
            )}
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

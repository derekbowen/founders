import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { SiteHeader, SiteFooter } from "@/components/site-layout";
import { createCheckoutSession } from "@/server/billing.functions";
import { PLAN_FEATURES, type Plan, formatPlanPrice } from "@/lib/plans";
import { buildMeta } from "@/lib/seo";

const SearchSchema = z.object({
  plan: z.enum(["starter", "growth", "scale"]).optional().default("growth"),
});

export const Route = createFileRoute("/onboarding")({
  validateSearch: (search) => SearchSchema.parse(search),
  beforeLoad: async ({ search }) => {
    const { data } = await supabase.auth.getUser();
    if (!data.user) {
      throw redirect({
        to: "/auth",
        search: {
          mode: "signup",
          redirect: `/onboarding?plan=${search.plan}`,
        } as never,
      });
    }
  },
  head: () =>
    buildMeta({
      title: "Set up your workspace — founders.click",
      description: "Connect your Sharetribe marketplace and pick a plan.",
      path: "/onboarding",
      noindex: true,
    }),
  component: OnboardingPage,
});

const SELF_SERVE_PLANS: Plan[] = ["starter", "growth", "scale"];

function OnboardingPage() {
  const search = Route.useSearch();
  const [plan, setPlan] = useState<Plan>(search.plan);
  const [name, setName] = useState("");
  const [domain, setDomain] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string>("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!name.trim()) {
      setError("Marketplace name is required.");
      return;
    }
    if (!/^[a-z0-9.-]+\.[a-z]{2,}$/i.test(domain.trim())) {
      setError("Enter a valid hostname like example.com (no https://).");
      return;
    }
    setBusy(true);
    try {
      const { url } = await createCheckoutSession({
        data: {
          plan,
          marketplaceName: name.trim(),
          marketplaceDomain: domain.trim().toLowerCase(),
        },
      });
      window.location.href = url;
    } catch (e: any) {
      setError(e?.message ?? "Checkout failed. Try again.");
      setBusy(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-12 sm:py-16">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Step 1 of 1
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Connect your marketplace
        </h1>
        <p className="mt-3 text-muted-foreground">
          Tell us about your Sharetribe marketplace. After Checkout, you'll get a one-line
          reverse-proxy snippet that points{" "}
          <code className="rounded bg-muted px-1 font-mono text-xs">yourdomain.com/p/*</code> at
          founders.click — your generated SEO pages render native to your domain.
        </p>

        <form onSubmit={onSubmit} className="mt-10 space-y-6">
          <div>
            <label className="block text-sm font-medium">Marketplace name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Pool Rental Near Me"
              className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
              required
              maxLength={120}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Marketplace domain</label>
            <input
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="example.com"
              className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
              required
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              maxLength={253}
            />
            <p className="mt-1 text-xs text-muted-foreground">
              The apex domain of your Sharetribe marketplace. We'll use this to route your /p/*
              traffic. You'll verify ownership after checkout.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium">Plan</label>
            <div className="mt-2 grid gap-3 sm:grid-cols-3">
              {SELF_SERVE_PLANS.map((p) => {
                const d = PLAN_FEATURES[p];
                const selected = plan === p;
                return (
                  <button
                    type="button"
                    key={p}
                    onClick={() => setPlan(p)}
                    className={`rounded-xl border p-4 text-left transition-all ${
                      selected
                        ? "border-primary bg-primary/5 ring-2 ring-primary/30"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {d.name}
                    </div>
                    <div className="mt-1 text-2xl font-bold">
                      {formatPlanPrice(p)}
                      <span className="ml-1 text-xs font-normal text-muted-foreground">/mo</span>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">{d.blurb}</p>
                  </button>
                );
              })}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              14-day free trial · no credit card required to start · cancel any time.
            </p>
          </div>

          {error && <div className="rounded-lg bg-rose-50 p-3 text-sm text-rose-900">{error}</div>}

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={busy}
              className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:opacity-90 disabled:opacity-60"
            >
              {busy ? "Opening checkout…" : "Continue to checkout"}
            </button>
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
              Cancel
            </Link>
          </div>
        </form>
      </main>
      <SiteFooter />
    </div>
  );
}

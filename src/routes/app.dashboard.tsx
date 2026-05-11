import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-layout";
import { listCustomerPages, type CustomerPageRow } from "@/server/customer-content.functions";
import { getCurrentWorkspace, type CurrentWorkspace } from "@/server/workspace.functions";
import { PLAN_FEATURES } from "@/lib/plans";
import { Sparkles, FileText, ExternalLink, CreditCard } from "lucide-react";

export const Route = createFileRoute("/app/dashboard")({
  head: () => ({
    meta: [
      { title: "Workspace — founders.click" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AppDashboard,
});

function AppDashboard() {
  const [workspace, setWorkspace] = React.useState<CurrentWorkspace | null>(null);
  const [pages, setPages] = React.useState<CustomerPageRow[] | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    void (async () => {
      try {
        const [ws, list] = await Promise.all([getCurrentWorkspace(), listCustomerPages({})]);
        setWorkspace(ws.workspace);
        setPages(list.rows);
      } catch (e: any) {
        setError(e?.message ?? "Failed to load workspace.");
      }
    })();
  }, []);

  const quota = workspace ? PLAN_FEATURES[workspace.plan].quotas.pageGenerationsPerMonth : null;

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Workspace
            </p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight">
              {workspace?.name ?? "Loading…"}
            </h1>
            {workspace?.marketplace_domain && (
              <p className="mt-1 text-sm text-muted-foreground">
                {workspace.marketplace_domain}
              </p>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {workspace && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium">
                <Sparkles className="h-3 w-3" />
                {PLAN_FEATURES[workspace.plan].name} plan
              </span>
            )}
            <Link
              to="/account/billing"
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium hover:bg-muted"
            >
              <CreditCard className="h-3 w-3" />
              Billing
            </Link>
          </div>
        </div>

        {error && (
          <div className="mt-6 rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
            {error}
          </div>
        )}

        <section className="mt-10 rounded-2xl border border-border bg-gradient-to-br from-primary/5 to-card p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-2xl">
              <h2 className="text-xl font-bold">Generate your first SEO page</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Tell us a title and what the page should be about — we write it on-brand and publish
                it instantly at{" "}
                <code className="rounded bg-muted px-1 font-mono text-xs">
                  {workspace?.marketplace_domain ?? "yourdomain.com"}/p/&#123;slug&#125;
                </code>{" "}
                once your reverse-proxy is pointed.
              </p>
              {quota !== null && Number.isFinite(quota) && (
                <p className="mt-2 text-xs text-muted-foreground">
                  Plan quota: {quota.toLocaleString()} pages/month.
                </p>
              )}
            </div>
            <Link
              to="/app/pages/new"
              className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-sm hover:opacity-90"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Generate page
            </Link>
          </div>
        </section>

        <section className="mt-10">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Your pages</h2>
            <div className="flex items-center gap-3 text-xs font-medium">
              {pages && pages.length > 0 && (
                <Link to="/app/pages" className="text-muted-foreground hover:text-foreground">
                  View all →
                </Link>
              )}
              <Link to="/app/pages/new" className="text-primary hover:underline">
                New page →
              </Link>
            </div>
          </div>

          {pages === null ? (
            <p className="mt-3 text-sm text-muted-foreground">Loading…</p>
          ) : pages.length === 0 ? (
            <div className="mt-3 rounded-lg border border-dashed border-border bg-card p-8 text-center">
              <FileText className="mx-auto h-8 w-8 text-muted-foreground" />
              <p className="mt-3 text-sm font-medium">No pages yet</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Click "Generate page" above to publish your first /p/ page.
              </p>
            </div>
          ) : (
            <ul className="mt-3 divide-y divide-border rounded-lg border border-border bg-card">
              {pages.map((p) => (
                <li
                  key={p.id}
                  className="flex items-center justify-between gap-3 px-4 py-3 text-sm"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{p.title}</p>
                    <p className="truncate font-mono text-xs text-muted-foreground">
                      {p.url_path}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full border border-border bg-background px-2 py-0.5 text-xs">
                    {p.status}
                  </span>
                  <a
                    href={p.url_path}
                    target="_blank"
                    rel="noreferrer"
                    className="shrink-0 text-xs text-primary hover:underline"
                  >
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}

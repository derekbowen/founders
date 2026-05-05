import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { getProviderStatus, submitProviderPlanRequest } from "@/server/directory.functions";
import { SiteHeader, SiteFooter } from "@/components/site-layout";
import { buildMeta } from "@/lib/seo";

export const Route = createFileRoute("/providers/$slug/manage")({
  validateSearch: (s: Record<string, unknown>) => ({ email: typeof s.email === "string" ? s.email : undefined }),
  loaderDeps: ({ search }) => ({ email: search.email }),
  loader: async ({ params, deps }) => {
    const data = await getProviderStatus({ data: { slug: params.slug, email: deps.email } });
    if (!data.provider) throw notFound();
    return data;
  },
  head: ({ loaderData, params }) => {
    if (!loaderData?.provider) return {};
    return buildMeta({
      title: `Manage ${loaderData.provider.name} | Pool Rental Near Me`,
      description: `Submit plan upgrades and track approval status for ${loaderData.provider.name}.`,
      path: `/providers/${params.slug}/manage`,
      noindex: true,
    });
  },
  component: ManagePage,
  notFoundComponent: () => (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-3xl font-bold">Listing not found</h1>
        <Link to="/directory" className="mt-6 inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">Browse directory</Link>
      </main>
      <SiteFooter />
    </div>
  ),
  errorComponent: ({ error, reset }) => {
    const router = useRouter();
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="mx-auto max-w-3xl px-4 py-20 text-center">
          <h1 className="text-2xl font-bold">Something went wrong</h1>
          <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
          <button onClick={() => { router.invalidate(); reset(); }} className="mt-6 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">Retry</button>
        </main>
        <SiteFooter />
      </div>
    );
  },
});

function Badge({ status }: { status: string }) {
  const map: Record<string, string> = {
    pending: "bg-amber-100 text-amber-800",
    approved: "bg-emerald-100 text-emerald-800",
    rejected: "bg-rose-100 text-rose-800",
    claimed: "bg-emerald-100 text-emerald-800",
    unclaimed: "bg-muted text-foreground",
  };
  return <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${map[status] ?? "bg-muted text-foreground"}`}>{status}</span>;
}

function fmt(d?: string | null) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString();
}

function ManagePage() {
  const { provider, claims, plan_requests } = Route.useLoaderData();
  const params = Route.useParams();
  const router = useRouter();
  const [emailFilter, setEmailFilter] = useState("");
  const [plan, setPlan] = useState<"paid" | "featured">("paid");
  const [form, setForm] = useState({
    requester_name: "",
    requester_email: "",
    requester_phone: "",
    payment_method: "",
    payment_reference: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const paidActive = provider.listing_paid_until && new Date(provider.listing_paid_until).getTime() > Date.now();
  const featuredActive = provider.featured_until && new Date(provider.featured_until).getTime() > Date.now();
  const amount = plan === "featured" ? 25 : 5;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await submitProviderPlanRequest({
        data: {
          provider_slug: params.slug,
          requester_name: form.requester_name,
          requester_email: form.requester_email,
          requester_phone: form.requester_phone,
          requested_plan: plan,
          payment_method: form.payment_method,
          payment_reference: form.payment_reference,
          amount_usd: amount,
          notes: form.notes,
          source_path: typeof window !== "undefined" ? window.location.pathname : "",
        },
      });
      setSubmitted(true);
      router.invalidate();
    } catch (err: any) {
      setError(err?.message ?? "Submission failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-4xl px-4 py-10">
        <div className="mb-6">
          <Link to="/providers/$slug" params={{ slug: params.slug }} className="text-sm text-primary underline">← Back to listing</Link>
          <h1 className="mt-3 text-3xl font-bold tracking-tight">Manage {provider.name}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{provider.city}, {provider.state_code}</p>
        </div>

        {/* Status overview */}
        <section className="rounded-2xl border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Listing status</h2>
          <dl className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
            <div>
              <dt className="text-xs uppercase text-muted-foreground">Published</dt>
              <dd className="mt-1"><Badge status={provider.is_published ? "approved" : "pending"} /></dd>
            </div>
            <div>
              <dt className="text-xs uppercase text-muted-foreground">Plan</dt>
              <dd className="mt-1 font-semibold capitalize">{provider.plan}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase text-muted-foreground">Claim</dt>
              <dd className="mt-1"><Badge status={provider.claim_status} /></dd>
            </div>
            <div>
              <dt className="text-xs uppercase text-muted-foreground">Paid until</dt>
              <dd className="mt-1 text-sm">{paidActive ? fmt(provider.listing_paid_until) : "—"}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase text-muted-foreground">Featured until</dt>
              <dd className="mt-1 text-sm">{featuredActive ? fmt(provider.featured_until) : "—"}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase text-muted-foreground">Submission</dt>
              <dd className="mt-1"><Badge status={provider.submission_status} /></dd>
            </div>
          </dl>
          {provider.claim_status !== "claimed" && (
            <div className="mt-4 rounded-lg bg-amber-50 p-3 text-sm text-amber-900">
              This listing isn't claimed yet.{" "}
              <Link to="/providers/$slug/claim" params={{ slug: params.slug }} className="font-semibold underline">Claim it first</Link> to manage it.
            </div>
          )}
        </section>

        {/* Filter by email */}
        <section className="mt-6 rounded-2xl border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Find your submissions</h2>
          <p className="mt-1 text-sm text-muted-foreground">Enter the email you used to filter only your requests.</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              router.navigate({ to: "/providers/$slug/manage", params, search: { email: emailFilter || undefined } });
            }}
            className="mt-3 flex gap-2"
          >
            <input
              type="email"
              value={emailFilter}
              onChange={(e) => setEmailFilter(e.target.value)}
              placeholder="you@business.com"
              className="flex-1 rounded-lg border px-3 py-2 text-sm"
            />
            <button className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Filter</button>
          </form>
        </section>

        {/* Plan/payment requests history */}
        <section className="mt-6 rounded-2xl border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Plan & payment requests</h2>
          {plan_requests.length === 0 ? (
            <p className="mt-2 text-sm text-muted-foreground">No requests yet.</p>
          ) : (
            <ul className="mt-4 divide-y">
              {plan_requests.map((r: any) => (
                <li key={r.id} className="py-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold capitalize">{r.requested_plan}</span>
                    <span className="text-sm text-muted-foreground">${r.amount_usd ?? "—"}</span>
                    <Badge status={r.status} />
                    <span className="ml-auto text-xs text-muted-foreground">{fmt(r.created_at)}</span>
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {r.payment_method ? `${r.payment_method} · ` : ""}{r.payment_reference || "no reference"}
                  </div>
                  {r.admin_notes && <p className="mt-1 text-sm">Admin: {r.admin_notes}</p>}
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Claims history */}
        <section className="mt-6 rounded-2xl border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Claim requests</h2>
          {claims.length === 0 ? (
            <p className="mt-2 text-sm text-muted-foreground">No claim requests yet.</p>
          ) : (
            <ul className="mt-4 divide-y">
              {claims.map((c: any) => (
                <li key={c.id} className="flex flex-wrap items-center gap-2 py-3">
                  <span className="font-semibold">{c.claimer_name}</span>
                  <span className="text-sm text-muted-foreground">{c.claimer_email}</span>
                  <Badge status={c.status} />
                  <span className="ml-auto text-xs text-muted-foreground">{fmt(c.created_at)}</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Submit a new plan request */}
        <section className="mt-6 rounded-2xl border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Submit a plan / payment update</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            We'll manually review your payment and apply the plan to your listing. Paid is $5/yr, Featured is $25/yr.
          </p>

          {submitted ? (
            <div className="mt-4 rounded-lg bg-emerald-50 p-4 text-sm text-emerald-900">
              Submitted. We'll email you once it's reviewed.
              <button className="ml-3 underline" onClick={() => setSubmitted(false)}>Submit another</button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="sm:col-span-2 flex gap-3">
                {(["paid", "featured"] as const).map((p) => (
                  <label key={p} className={`flex-1 cursor-pointer rounded-lg border-2 p-3 text-sm ${plan === p ? "border-primary bg-primary/5" : "border-border"}`}>
                    <input type="radio" name="plan" value={p} checked={plan === p} onChange={() => setPlan(p)} className="sr-only" />
                    <div className="font-semibold capitalize">{p}</div>
                    <div className="text-xs text-muted-foreground">${p === "featured" ? "25" : "5"}/yr</div>
                  </label>
                ))}
              </div>
              <input required placeholder="Your name" value={form.requester_name} onChange={(e) => setForm({ ...form, requester_name: e.target.value })} className="rounded-lg border px-3 py-2 text-sm" />
              <input required type="email" placeholder="Email" value={form.requester_email} onChange={(e) => setForm({ ...form, requester_email: e.target.value })} className="rounded-lg border px-3 py-2 text-sm" />
              <input placeholder="Phone (optional)" value={form.requester_phone} onChange={(e) => setForm({ ...form, requester_phone: e.target.value })} className="rounded-lg border px-3 py-2 text-sm" />
              <input placeholder="Payment method (Venmo, PayPal, Zelle, check…)" value={form.payment_method} onChange={(e) => setForm({ ...form, payment_method: e.target.value })} className="rounded-lg border px-3 py-2 text-sm" />
              <input className="sm:col-span-2 rounded-lg border px-3 py-2 text-sm" placeholder="Payment reference (transaction ID, last 4, screenshot URL…)" value={form.payment_reference} onChange={(e) => setForm({ ...form, payment_reference: e.target.value })} />
              <textarea className="sm:col-span-2 rounded-lg border px-3 py-2 text-sm" rows={3} placeholder="Notes (optional)" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
              {error && <div className="sm:col-span-2 rounded-lg bg-rose-50 p-3 text-sm text-rose-900">{error}</div>}
              <button disabled={submitting} className="sm:col-span-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-50">
                {submitting ? "Submitting…" : `Submit ${plan} request ($${amount})`}
              </button>
            </form>
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

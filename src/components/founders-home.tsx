import * as React from "react";
import { Link } from "@tanstack/react-router";

/**
 * founders.click marketing landing page.
 * Self-contained — does not depend on the legacy SiteHeader/SiteFooter
 * (which is still pool-rental-branded for the existing /p/* routes).
 *
 * Content sourced from the founders.click pitch PDF:
 *   - Hero: "Most Sharetribe founders can't afford an SEO agency..."
 *   - Problem cards (3) + Features (4) + Plans (4) + CTA
 */
export function FoundersHome() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <Problem />
      <Features />
      <Pricing />
      <ClosingCta />
      <Footer />
    </div>
  );
}

// ─── Header ─────────────────────────────────────────────────────────────────
function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <Logo />
          <span className="text-base font-bold tracking-tight">founders.click</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            Features
          </a>
          <a href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            Pricing
          </a>
          <a href="/help-center" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            Knowledge Base
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <Link
            to="/auth"
            search={{ redirect: "/admin/dashboard", mode: "signin" } as never}
            className="hidden h-9 items-center justify-center rounded-full border border-border px-4 text-sm font-medium hover:bg-muted sm:inline-flex"
          >
            Log in
          </Link>
          <Link
            to="/auth"
            search={{ redirect: "/admin/dashboard", mode: "signup" } as never}
            className="inline-flex h-9 items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:opacity-90"
          >
            Start free trial
          </Link>
        </div>
      </div>
    </header>
  );
}

function Logo() {
  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <polyline points="8 6 4 12 8 18" />
        <polyline points="16 6 20 12 16 18" />
      </svg>
    </div>
  );
}

// ─── Hero ───────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="mx-auto max-w-5xl px-6 py-20 text-center sm:py-28 lg:py-32">
        <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-4 py-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          The AI growth engine for Sharetribe marketplace founders
        </p>
        <h1 className="mx-auto max-w-3xl text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Most Sharetribe founders can't afford an SEO agency.{" "}
          <span className="text-primary">founders.click replaces one.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Custom-coded SEO, AI content generation, and ops tools — purpose-built for marketplace
          operators. Without the agency price tag.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/auth"
            search={{ redirect: "/admin/dashboard", mode: "signup" } as never}
            className="inline-flex h-12 w-full items-center justify-center rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground shadow-sm transition-all hover:opacity-90 sm:w-auto"
          >
            Start free trial — no developers required
          </Link>
          <a
            href="#features"
            className="inline-flex h-12 w-full items-center justify-center rounded-full border border-border px-8 text-base font-medium hover:bg-muted sm:w-auto"
          >
            See what's inside
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Problem ────────────────────────────────────────────────────────────────
function Problem() {
  const cards = [
    {
      n: "01",
      title: "Agency budgets are brutal",
      body: "Hiring devs or agencies costs $5,000–$20,000/month just for content and SEO.",
    },
    {
      n: "02",
      title: "Sharetribe ships nothing for growth",
      body: "No native Sharetribe tools for bulk page generation, rank tracking, or lead ops.",
    },
    {
      n: "03",
      title: "Competitors are pulling away",
      body: "Swimply and Peerspace publish thousands of pages — you can't keep up manually.",
    },
  ];
  return (
    <section className="border-b border-border bg-muted/20">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Sharetribe founders are losing the SEO &amp; content race
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">founders.click changes that.</p>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {cards.map((c) => (
            <div key={c.n} className="rounded-2xl border border-border bg-background p-7 shadow-sm">
              <div className="text-sm font-mono text-primary">{c.n}</div>
              <h3 className="mt-3 text-lg font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Features ───────────────────────────────────────────────────────────────
function Features() {
  const features = [
    {
      title: "Dashboard",
      body:
        "Morning command center with live KPIs and AI-ranked action items. 6 tabs (Today / Revenue / SEO / Factory / Humans / Tools). Auto-refreshes every 30 seconds.",
    },
    {
      title: "Content",
      body:
        "AI content factory generating hundreds of pages per day automatically. ~$0.012 per page. T1/T2/T3 priority tiers, dry-run mode, live rejection logs.",
    },
    {
      title: "SEO",
      body:
        "Rank tracking, competitor radar, link audits, and keyword opportunities. Daily SERP checks. AI page auditor scores any URL 0–100 against competitors.",
    },
    {
      title: "Users & Ops",
      body:
        "Lead inbox, directory moderation, email tools, and team admin. Email-verify up to 100 leads at a time. Daily social-lead hunter across IG/FB/TikTok.",
    },
  ];
  return (
    <section id="features" className="border-b border-border">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to grow
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A comprehensive suite of tools purpose-built for Sharetribe marketplace operators.
          </p>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {features.map((f) => (
            <div key={f.title} className="rounded-2xl border border-border p-8 transition-colors hover:bg-muted/40">
              <h3 className="text-xl font-semibold">{f.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Pricing ────────────────────────────────────────────────────────────────
function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "$109",
      period: "/mo",
      desc: "Solo founders launching their first marketplace.",
      cta: "Start free trial",
    },
    {
      name: "Growth",
      price: "$390",
      period: "/mo",
      desc: "Scaling marketplaces with active SEO &amp; content goals.",
      cta: "Start free trial",
      highlight: true,
    },
    {
      name: "Scale",
      price: "$899",
      period: "/mo",
      desc: "Established platforms competing on volume and velocity.",
      cta: "Start free trial",
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      desc: "Multi-team operators with custom integrations.",
      cta: "Talk to us",
    },
  ];
  return (
    <section id="pricing" className="border-b border-border bg-muted/20">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Pick a plan, replace your agency
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Every plan includes the full toolset. Upgrade for more page generation volume,
            keyword tracking slots, and team seats.
          </p>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`rounded-2xl border p-7 shadow-sm ${
                p.highlight
                  ? "border-primary bg-background ring-2 ring-primary/30"
                  : "border-border bg-background"
              }`}
            >
              <div className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                {p.name}
              </div>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-4xl font-bold tracking-tight">{p.price}</span>
                <span className="text-muted-foreground">{p.period}</span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: p.desc }} />
              <Link
                to="/auth"
                search={{ redirect: "/admin/dashboard", mode: "signup" } as never}
                className={`mt-6 inline-flex h-10 w-full items-center justify-center rounded-full px-5 text-sm font-semibold transition-all ${
                  p.highlight
                    ? "bg-primary text-primary-foreground hover:opacity-90"
                    : "border border-border hover:bg-muted"
                }`}
              >
                {p.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Closing CTA ────────────────────────────────────────────────────────────
function ClosingCta() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-3xl px-6 py-20 text-center lg:py-24">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Built for Sharetribe founders who want to win
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Generate pages at $0.012 each, automate SEO audits, and run lead outreach — all without
          retaining a single contractor.
        </p>
        <Link
          to="/auth"
          search={{ redirect: "/admin/dashboard", mode: "signup" } as never}
          className="mt-10 inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground shadow-sm transition-all hover:opacity-90"
        >
          Start your free trial
        </Link>
      </div>
    </section>
  );
}

// ─── Footer ─────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-border">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-10 text-sm text-muted-foreground sm:flex-row">
        <div className="flex items-center gap-2">
          <Logo />
          <span>founders.click</span>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <a href="#features" className="hover:text-foreground">Features</a>
          <a href="#pricing" className="hover:text-foreground">Pricing</a>
          <a href="/help-center" className="hover:text-foreground">Knowledge Base</a>
          <a href="/privacy-policy" className="hover:text-foreground">Privacy</a>
        </div>
        <div>© 2026 founders.click</div>
      </div>
    </footer>
  );
}

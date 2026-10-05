import React from "react";
import { Link } from "react-router-dom";
import { ArrowRightIcon, BadgeCheckIcon, CheckIcon, ClipboardCheckIcon, RefrigeratorIcon, ShieldCheckIcon, BoxIcon } from "lucide-react";
import { ListingCard } from "../components/listing/ListingCard";
import { HeroSearch } from "../components/search/HeroSearch";
import { Badge } from "../components/ui/Badge";
import { ButtonLink } from "../components/ui/ButtonLink";
import { segments } from "../data/catalog";
import { images } from "../data/images";
import { listings } from "../data/listings";
import { compliancePoints, complianceChecklist, hostBenefits, howItWorks, stats } from "../data/marketing";
import { cn, containerClass, focusRing } from "../utils/styles";
const complianceIcons: Record<string, BoxIcon> = {
  permits: ClipboardCheckIcon,
  insurance: ShieldCheckIcon,
  storage: RefrigeratorIcon
};
const eyebrow = 'text-xs font-semibold uppercase tracking-[0.2em]';
const h2 = 'font-heading text-3xl font-bold uppercase tracking-tight sm:text-4xl';
export function LandingPage() {
  const featured = listings.filter((l) => l.featured).slice(0, 8);
  return <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-steel-900">
        <img src={images.hero} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-steel-900/70" />
        <div className={cn(containerClass, 'py-20 sm:py-24 lg:py-32')}>
          <div className="max-w-3xl">
            <Badge tone="white" icon={<BadgeCheckIcon className="h-3.5 w-3.5 text-accent" aria-hidden="true" />}>
              Every kitchen health-permitted
            </Badge>
            <h1 className="mt-6 font-heading text-5xl font-bold uppercase leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Cook in a licensed kitchen{' '}
              <span className="relative inline-block">
                by the hour
                <span className="absolute -bottom-1 left-0 h-1.5 w-full bg-primary" aria-hidden="true" />
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-steel-200">
              Book permitted commercial kitchens, prep space and storage — no lease, a 2-hour minimum and compliance handled up front.
            </p>
          </div>
          <div className="mt-10 max-w-4xl">
            <HeroSearch />
          </div>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-steel-200">
            {['Pay only when the host accepts', 'Free cancellation up to 48h before', 'Monthly storage add-ons'].map((t) => <li key={t} className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4 text-white" aria-hidden="true" />
                {t}
              </li>)}
          </ul>
        </div>
      </section>

      {/* Stats */}
      <section aria-label="Marketplace stats" className="border-b border-steel-200 bg-white">
        <dl className={cn(containerClass, 'grid grid-cols-2 gap-6 py-8 md:grid-cols-4')}>
          {stats.map((s) => <div key={s.label}>
              <dt className="text-sm text-steel-500">{s.label}</dt>
              <dd className="font-heading text-3xl font-bold text-steel-900">{s.value}</dd>
            </div>)}
        </dl>
      </section>

      {/* Who it's for */}
      <section className={cn(containerClass, 'py-20')} aria-labelledby="who-heading">
        <p className={cn(eyebrow, 'text-primary')}>Who cooks here</p>
        <h2 id="who-heading" className={cn(h2, 'mt-2')}>Built for food businesses on the move</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {segments.map((s) => <Link key={s.key} to={`/search?use=${s.key}`} className={cn('group overflow-hidden rounded-2xl border border-steel-200 bg-white transition hover:-translate-y-0.5 hover:shadow-lift', focusRing)}>
              <div className="aspect-[4/3] overflow-hidden bg-steel-100">
                <img src={s.image} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-5">
                <h3 className="font-heading text-xl font-semibold uppercase tracking-wide text-steel-900">{s.label}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-steel-600">{s.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  Find kitchens
                  <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </div>
            </Link>)}
        </div>
      </section>

      {/* Featured */}
      <section className="bg-steel-50 py-20" aria-labelledby="featured-heading">
        <div className={containerClass}>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className={cn(eyebrow, 'text-primary')}>Featured kitchens</p>
              <h2 id="featured-heading" className={cn(h2, 'mt-2')}>Ready when you are</h2>
            </div>
            <ButtonLink to="/search" variant="outline">
              Browse all kitchens
              <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
          </div>
          <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((l) => <ListingCard key={l.id} listing={l} />)}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className={cn(containerClass, 'py-20')} aria-labelledby="how-heading">
        <p className={cn(eyebrow, 'text-primary')}>How it works</p>
        <h2 id="how-heading" className={cn(h2, 'mt-2')}>From request to sign-off</h2>
        <ol className="mt-10 grid gap-8 md:grid-cols-3">
          {howItWorks.map((step, i) => <li key={step.title} className="border-t-2 border-steel-900 pt-5">
              <span className="font-heading text-5xl font-bold text-primary">0{i + 1}</span>
              <h3 className="mt-3 text-lg font-semibold text-steel-900">{step.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-steel-600">{step.body}</p>
            </li>)}
        </ol>
      </section>

      {/* Compliance band */}
      <section className="bg-steel-900 py-20 text-white" aria-labelledby="compliance-heading">
        <div className={containerClass}>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
            <div>
              <p className={cn(eyebrow, 'text-steel-400')}>Compliance built in</p>
              <h2 id="compliance-heading" className={cn(h2, 'mt-2')}>Inspection-ready, every session</h2>
              <ul className="mt-8 space-y-3">
                {complianceChecklist.map((item) => <li key={item} className="flex items-center gap-3 text-sm text-steel-200">
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-accent">
                      <CheckIcon className="h-3.5 w-3.5 text-white" aria-hidden="true" />
                    </span>
                    {item}
                  </li>)}
              </ul>
            </div>
            <div className="grid gap-5 sm:grid-cols-3">
              {compliancePoints.map((p) => {
              const Icon = complianceIcons[p.key] ?? ShieldCheckIcon;
              return <div key={p.key} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 font-heading text-lg font-semibold uppercase tracking-wide">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-steel-300">{p.body}</p>
                  </div>;
            })}
            </div>
          </div>
        </div>
      </section>

      {/* Host CTA */}
      <section className={cn(containerClass, 'py-20')} aria-labelledby="host-heading">
        <div className="grid items-center gap-10 overflow-hidden rounded-3xl bg-steel-100 lg:grid-cols-2">
          <img src={images.host} alt="Kitchen host standing in her commercial kitchen" className="h-72 w-full object-cover lg:h-full" />
          <div className="p-8 sm:p-12">
            <p className={cn(eyebrow, 'text-accent')}>For kitchen owners</p>
            <h2 id="host-heading" className={cn(h2, 'mt-2')}>Turn idle hours into revenue</h2>
            <p className="mt-4 text-steel-600">Restaurants, commissaries and bakeries earn an average of $2,400 a month renting out off-peak hours and storage.</p>
            <ul className="mt-6 space-y-3">
              {hostBenefits.map((b) => <li key={b} className="flex items-start gap-3 text-sm text-steel-800">
                  <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  {b}
                </li>)}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink to="/listings/new" variant="accent" size="lg">List your kitchen</ButtonLink>
              <ButtonLink to="/about" variant="outline" size="lg">How hosting works</ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>;
}
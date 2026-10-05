import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, CheckIcon } from 'lucide-react';
import { HeroSearch } from '../components/landing/HeroSearch';
import { ListingCard } from '../components/ListingCard';
import { Button } from '../components/ui/Button';
import { useMarketplace } from '../contexts/MarketplaceContext';
import { boatTypes } from '../data/boatTypes';
import { destinations } from '../data/destinations';
import { media } from '../data/media';
import { brand } from '../data/brand';
import { tripModes, safetyItems, howItWorks, ownerStats } from '../data/siteContent';

function SectionHeading({ eyebrow, title, text, action }: {eyebrow: string;title: string;text?: string;action?: React.ReactNode;}) {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-coral-dark">{eyebrow}</p>
        <h2 className="mt-2 font-heading text-3xl text-navy sm:text-4xl">{title}</h2>
        {text && <p className="mt-3 text-muted">{text}</p>}
      </div>
      {action}
    </div>);

}

export function Landing() {
  const { listings } = useMarketplace();
  const featured = [...listings].sort((a, b) => b.rating - a.rating).slice(0, 4);

  return (
    <div className="w-full bg-white">
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-navy-deep">
        <img src={media.hero} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-navy-deep/55" aria-hidden="true" />
        <div className="mx-auto max-w-content px-4 pb-20 pt-20 sm:px-6 sm:pt-28 lg:px-8 lg:pb-28 lg:pt-36">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sand">Boat rentals & charters</p>
          <h1 className="mt-4 max-w-3xl font-heading text-4xl leading-[1.08] text-white sm:text-6xl lg:text-7xl">
            Your day on the water starts here
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/85">
            Book yachts, sailboats, pontoons and fishing boats by the half or full day — skippered by you, or by a licensed local captain.
          </p>
          <div className="mt-10 max-w-4xl">
            <HeroSearch />
          </div>
          <p className="mt-5 text-sm text-white/75">
            {listings.length}+ verified boats · Up to $1M insurance on every trip · Weather guarantee
          </p>
        </div>
      </section>

      {/* Boat types */}
      <section className="mx-auto max-w-content px-4 py-20 sm:px-6 lg:px-8" aria-label="Boat types">
        <SectionHeading eyebrow="Find your vessel" title="Every kind of day on the water" />
        <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {boatTypes.map(({ id, label, description, icon: Icon }) => {
            const count = listings.filter((l) => l.type === id).length;
            return (
              <li key={id}>
                <Link
                  to={`/s?type=${id}`}
                  className="group flex h-full flex-col rounded-2xl border border-line bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-navy/30 hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral">
                  
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sand-light text-navy transition-colors group-hover:bg-navy group-hover:text-white">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="mt-4 font-semibold text-ink">{label}</span>
                  <span className="mt-1 text-xs leading-relaxed text-muted">{description}</span>
                  <span className="mt-3 text-xs font-medium text-sea">{count} available</span>
                </Link>
              </li>);

          })}
        </ul>
      </section>

      {/* Destinations */}
      <section className="bg-sand-light py-20">
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Top destinations"
            title="Harbors our guests love"
            action={
            <Link to="/s" className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy hover:text-coral-dark">
                View all boats <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
              </Link>
            } />
          
          <ul className="no-scrollbar -mx-4 mt-10 flex snap-x gap-4 overflow-x-auto px-4 pb-2 lg:mx-0 lg:grid lg:grid-cols-5 lg:overflow-visible lg:px-0">
            {destinations.map((d) =>
            <li key={d.id} className="w-64 shrink-0 snap-start lg:w-auto">
                <Link to={`/s?location=${d.id}`} className="group relative block aspect-[3/4] overflow-hidden rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral">
                  <img src={d.image} alt={`${d.name}, ${d.region}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-x-0 bottom-0 bg-navy-deep/75 p-4 backdrop-blur-sm">
                    <p className="font-heading text-xl text-white">{d.name}</p>
                    <p className="mt-0.5 text-xs text-white/80">{d.blurb}</p>
                    <p className="mt-2 text-xs font-semibold text-sand">{listings.filter((l) => l.destinationId === d.id).length} boats</p>
                  </div>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </section>

      {/* Captained vs bareboat */}
      <section className="mx-auto max-w-content px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Two ways to go" title="Captained or bareboat — your call" text="Every listing tells you whether a captain is included, optional, or not offered. The price breakdown always shows the captain fee separately." />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {tripModes.map((m, i) =>
          <div key={m.id} className={i === 0 ? 'rounded-3xl bg-navy p-8 text-white sm:p-10' : 'rounded-3xl border border-line bg-white p-8 sm:p-10'}>
              <p className={i === 0 ? 'text-xs font-semibold uppercase tracking-[0.16em] text-sand' : 'text-xs font-semibold uppercase tracking-[0.16em] text-coral-dark'}>{m.eyebrow}</p>
              <h3 className={i === 0 ? 'mt-2 font-heading text-3xl' : 'mt-2 font-heading text-3xl text-navy'}>{m.title}</h3>
              <p className={i === 0 ? 'mt-3 text-white/80' : 'mt-3 text-muted'}>{m.description}</p>
              <ul className="mt-6 space-y-2.5">
                {m.points.map((p) =>
              <li key={p} className="flex items-center gap-2.5 text-sm">
                    <CheckIcon className={i === 0 ? 'h-4 w-4 text-coral' : 'h-4 w-4 text-coral-dark'} aria-hidden="true" />
                    {p}
                  </li>
              )}
              </ul>
              <Link
              to={`/s?captain=${m.id === 'captained' ? 'captained' : 'bareboat'}`}
              className={i === 0 ? 'mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-sand hover:text-white' : 'mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-navy hover:text-coral-dark'}>
              
                Browse {m.title.toLowerCase()} boats <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          )}
        </div>
        <ol className="mt-14 grid gap-6 border-t border-line pt-10 sm:grid-cols-3">
          {howItWorks.map(({ icon: Icon, title, text }, i) =>
          <li key={title} className="flex gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sand-light text-navy">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="font-semibold text-ink">
                  <span className="text-coral-dark">0{i + 1}</span> {title}
                </p>
                <p className="mt-1 text-sm text-muted">{text}</p>
              </div>
            </li>
          )}
        </ol>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-content px-4 pb-20 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Guest favorites" title="Top-rated this season" action={<Button to="/s" variant="outline" size="sm">See all boats</Button>} />
        <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((l) =>
          <ListingCard key={l.id} listing={l} />
          )}
        </div>
      </section>

      {/* Safety band */}
      <section className="bg-navy py-20 text-white" aria-labelledby="safety-heading">
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sand">Safety & insurance</p>
            <h2 id="safety-heading" className="mt-2 font-heading text-3xl sm:text-4xl">
              Peace of mind, from dock to dock
            </h2>
          </div>
          <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {safetyItems.map(({ icon: Icon, title, text }) =>
            <li key={title} className="border-t border-white/15 pt-6">
                <Icon className="h-6 w-6 text-coral" aria-hidden="true" />
                <h3 className="mt-4 font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/75">{text}</p>
              </li>
            )}
          </ul>
        </div>
      </section>

      {/* Owner CTA */}
      <section className="mx-auto max-w-content px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid overflow-hidden rounded-3xl bg-sand lg:grid-cols-2">
          <img src={media.ownerDock} alt="Boat owner preparing lines on the dock" className="h-72 w-full object-cover lg:h-full" loading="lazy" />
          <div className="p-8 sm:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-coral-dark">For boat owners & captains</p>
            <h2 className="mt-2 font-heading text-3xl text-navy sm:text-4xl">Your boat could be earning while it’s docked</h2>
            <p className="mt-4 text-ink/80">
              List on {brand.name} in about 15 minutes. You set the packages, prices and rules — we handle payments, insurance and vetting renters.
            </p>
            <dl className="mt-8 grid grid-cols-3 gap-4">
              {ownerStats.map((s) =>
              <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-heading text-2xl text-navy sm:text-3xl">{s.value}</dd>
                  <dd className="mt-1 text-xs text-ink/70">{s.label}</dd>
                </div>
              )}
            </dl>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/listings/new" variant="primary" size="lg">
                List your boat
              </Button>
              <Button to="/about" variant="light" size="lg">
                Learn more
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>);

}
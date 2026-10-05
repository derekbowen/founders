import React from 'react';
import { listings } from '../data/listings';
import { pressQuotes } from '../data/content';
import { ListingCard } from '../components/ListingCard';
import { LandingHero } from '../components/landing/LandingHero';
import { OccasionGrid } from '../components/landing/OccasionGrid';
import { TrendingDesigners } from '../components/landing/TrendingDesigners';
import { HowItWorks } from '../components/landing/HowItWorks';
import { LenderCta } from '../components/landing/LenderCta';
import { SectionHeader } from '../components/landing/SectionHeader';

export function Landing() {
  const newArrivals = listings.filter((l) => l.isNew).slice(0, 8);
  return (
    <>
      <LandingHero />
      <section aria-label="As seen in" className="border-b border-line">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-center gap-x-12 gap-y-3 px-4 py-6 md:justify-between md:px-8">
          <span className="text-[10px] uppercase tracking-eyebrow text-muted">As seen in</span>
          {pressQuotes.map((p) =>
          <span key={p} className="font-display text-xl tracking-wide text-ink/70 md:text-2xl">
              {p}
            </span>
          )}
        </div>
      </section>
      <OccasionGrid />
      <TrendingDesigners />
      <section className="mx-auto max-w-[1400px] px-4 py-16 md:px-8 md:py-24">
        <SectionHeader
          kicker="Just listed"
          title={
          <>
              New <em className="text-accent-dark">arrivals</em>
            </>
          }
          linkLabel="Shop new in"
          linkTo="/s?sort=newest" />
        
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
          {newArrivals.map((l) =>
          <ListingCard key={l.id} listing={l} />
          )}
        </div>
      </section>
      <HowItWorks />
      <LenderCta />
    </>);

}
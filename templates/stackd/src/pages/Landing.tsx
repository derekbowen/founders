import React from 'react';
import { DownloadIcon, SearchIcon, WalletIcon } from 'lucide-react';
import { Hero } from '../components/landing/Hero';
import { CategoryGrid } from '../components/landing/CategoryGrid';
import { CreatorSpotlights } from '../components/landing/CreatorSpotlights';
import { EarningsCta } from '../components/landing/EarningsCta';
import { SectionHeader } from '../components/common/SectionHeader';
import { ListingCard } from '../components/listing/ListingCard';
import { useStore } from '../contexts/StoreContext';

const steps = [
{ icon: SearchIcon, title: 'Find it', body: 'Search thousands of files from independent creators.' },
{ icon: WalletIcon, title: 'Pay once', body: 'Fixed price or pay what you want. No subscriptions.' },
{ icon: DownloadIcon, title: 'Download now', body: 'Files unlock instantly and live in your library forever.' }];


export function Landing() {
  const { listings } = useStore();
  const bestsellers = [...listings].sort((a, b) => b.sales - a.sales).slice(0, 8);
  const newThisWeek = [...listings].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 4);

  return (
    <>
      <Hero />

      <section className="border-b border-ink bg-brand">
        <div className="container-page grid gap-6 py-8 sm:grid-cols-3">
          {steps.map(({ icon: Icon, title, body }, i) =>
          <div key={title} className="flex items-start gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-ink bg-white font-display font-bold">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="font-display text-lg font-bold">
                  {i + 1}. {title}
                </p>
                <p className="text-sm text-ink/80">{body}</p>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="container-page py-16 md:py-20" aria-labelledby="cat-heading">
        <SectionHeader eyebrow="Browse" title="Shop by category" actionTo="/s" actionLabel="All products" />
        <CategoryGrid />
      </section>

      <section className="border-y border-ink bg-paper py-16 md:py-20">
        <div className="container-page">
          <SectionHeader eyebrow="Bestsellers" title="What everyone’s downloading" subtitle="The most-bought files on the marketplace this month." actionTo="/s?sort=bestselling" />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {bestsellers.map((l) =>
            <ListingCard key={l.id} listing={l} />
            )}
          </div>
        </div>
      </section>

      <section className="container-page py-16 md:py-20">
        <SectionHeader eyebrow="Fresh drops" title="New this week" actionTo="/s?sort=newest" />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {newThisWeek.map((l) =>
          <ListingCard key={l.id} listing={l} />
          )}
        </div>
      </section>

      <section className="border-t border-ink bg-paper py-16 md:py-20">
        <div className="container-page">
          <SectionHeader eyebrow="Creator spotlight" title="Meet the makers" subtitle="Independent creators earning a living from the files they love making." />
          <CreatorSpotlights />
        </div>
      </section>

      <section className="container-page py-16 md:py-24">
        <EarningsCta />
      </section>
    </>);

}
import React from 'react';
import { Button } from '../components/ui/Button';
import { brand } from '../data/brand';
import { media } from '../data/media';
import { aboutValues, ownerStats } from '../data/siteContent';
import { useMarketplace } from '../contexts/MarketplaceContext';

export function About() {
  const { listings } = useMarketplace();
  return (
    <div className="w-full bg-white">
      <section className="mx-auto max-w-content px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-coral-dark">About {brand.name}</p>
        <h1 className="mt-3 max-w-3xl font-heading text-4xl leading-tight text-navy sm:text-6xl">More people on the water, more boats off the trailer.</h1>
        <p className="mt-6 max-w-2xl text-lg text-muted">
          The average private boat is used fewer than 15 days a year. {brand.name} lets owners share theirs with people who’d love a day on the water — safely, simply and with a captain when you want one.
        </p>
      </section>
      <img src={media.newport} alt="Sailboats moored in Newport harbor" className="h-[360px] w-full object-cover sm:h-[480px]" />
      <section className="mx-auto max-w-content px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          {aboutValues.map((v) =>
          <div key={v.title} className="border-t-2 border-navy pt-6">
              <h2 className="font-heading text-2xl text-navy">{v.title}</h2>
              <p className="mt-3 text-muted">{v.text}</p>
            </div>
          )}
        </div>
        <dl className="mt-20 grid gap-6 rounded-3xl bg-sand-light p-8 sm:grid-cols-4 sm:p-12">
          <div>
            <dt className="text-sm text-muted">Boats listed</dt>
            <dd className="font-heading text-4xl text-navy">{listings.length * 120}+</dd>
          </div>
          {ownerStats.map((s) =>
          <div key={s.label}>
              <dt className="text-sm text-muted">{s.label}</dt>
              <dd className="font-heading text-4xl text-navy">{s.value}</dd>
            </div>
          )}
        </dl>
        <div className="mt-16 flex flex-col items-start justify-between gap-6 rounded-3xl bg-navy p-8 text-white sm:flex-row sm:items-center sm:p-12">
          <div>
            <h2 className="font-heading text-3xl">Questions? We’re here.</h2>
            <p className="mt-2 text-white/75">
              {brand.supportEmail} · {brand.phone}
            </p>
          </div>
          <div className="flex gap-3">
            <Button to="/s" variant="light">
              Browse boats
            </Button>
            <Button to="/listings/new" variant="accent">
              List your boat
            </Button>
          </div>
        </div>
      </section>
    </div>);

}
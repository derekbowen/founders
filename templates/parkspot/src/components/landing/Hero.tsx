import React from 'react';
import { ShieldCheckIcon, ZapIcon } from 'lucide-react';
import { SpotSearchForm } from '../search/SpotSearchForm';
import { heroImage, heroStats } from '../../data/landing';
import { brand } from '../../data/brand';

export function Hero() {
  const [first, ...rest] = brand.tagline.split(' ');
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-10 pt-12 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:px-8 lg:pb-16 lg:pt-16">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
            <ZapIcon size={12} aria-hidden /> Hourly & daily parking · {brand.marketCity}
          </p>
          <h1 className="mt-5 text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
            {first}{' '}
            <span className="relative whitespace-nowrap">
              <span className="relative z-10">{rest[0]}</span>
              <span className="absolute inset-x-0 bottom-1 z-0 h-3 bg-accent sm:h-4" aria-hidden />
            </span>{' '}
            {rest.slice(1).join(' ')}
          </h1>
          <p className="mt-5 max-w-lg text-lg text-white/75">{brand.description}</p>
          <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
            {heroStats.map((s) =>
            <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-2xl font-bold text-accent">{s.value}</dd>
                <dd className="text-xs text-white/60">{s.label}</dd>
              </div>
            )}
          </dl>
        </div>

        <div className="relative hidden lg:block">
          <img src={heroImage} alt="A private driveway on a San Francisco street at sunset" className="aspect-[4/3] w-full rounded-3xl object-cover" />
          <div className="absolute -bottom-5 left-6 flex items-center gap-3 rounded-2xl bg-surface p-3 pr-5 text-ink shadow-pop">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent font-bold">$6</span>
            <div>
              <p className="text-sm font-semibold">Driveway · 4 min to Chase Center</p>
              <p className="text-xs text-muted">vs. $40 event garage</p>
            </div>
          </div>
          <div className="absolute right-5 top-5 flex items-center gap-2 rounded-full bg-ink/80 px-3 py-1.5 text-xs font-medium backdrop-blur">
            <ShieldCheckIcon size={14} className="text-accent" aria-hidden /> Verified hosts
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <SpotSearchForm />
      </div>
    </section>);

}
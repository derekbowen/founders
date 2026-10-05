import React from 'react';
import { brand } from '../../data/brand';
import { images } from '../../data/images';
import { heroStats } from '../../data/landing';
import { HeroSearch } from './HeroSearch';

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-ink">
      <img src={images.hero} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" />
      <div className="absolute inset-0 -z-10 bg-ink/60" aria-hidden="true" />
      <div className="container-page pb-16 pt-16 sm:pt-24 lg:pb-24 lg:pt-28">
        <p className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wider text-ink">
          Tennis · Pickleball · Padel · Hoops
        </p>
        <h1 className="heading-xl mt-5 max-w-3xl text-white">
          Book a court <span className="text-accent">in seconds</span>
        </h1>
        <p className="mt-4 max-w-xl text-lg text-white/85">{brand.description}</p>
        <div className="mt-8 max-w-5xl">
          <HeroSearch />
        </div>
        <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
          {heroStats.map((stat) =>
          <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd className="font-display text-3xl font-bold text-white">{stat.value}</dd>
              <dd className="text-sm text-white/75">{stat.label}</dd>
            </div>
          )}
        </dl>
      </div>
    </section>);

}
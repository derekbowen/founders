import React from 'react';
import { CheckCircle2Icon, StarIcon } from 'lucide-react';
import { AvatarGroup } from '../Avatar';
import { brand } from '../../data/brand';
import { photos } from '../../data/images';
import { HeroSearch } from './HeroSearch';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="container-page grid items-center gap-12 pb-16 pt-10 lg:grid-cols-12 lg:pb-24 lg:pt-16">
        <div className="lg:col-span-6">
          <p className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-800">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-600" aria-hidden="true" />
            1,200+ desks and rooms bookable today
          </p>
          <h1 className="mt-5 text-4xl font-semibold leading-[1.05] text-ink sm:text-5xl lg:text-6xl">
            {brand.tagline}
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-muted">
            Hot desks, private offices and meeting rooms in the best coworking spaces. Book by the hour or the day — no membership required.
          </p>
          <div className="mt-8 max-w-xl">
            <HeroSearch />
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-ink-muted">
            <span className="flex items-center gap-2">
              <AvatarGroup
                size="xs"
                max={4}
                avatars={[
                { name: 'Priya Nair', alt: 'Priya Nair' },
                { name: 'Jonas Weber', alt: 'Jonas Weber' },
                { name: 'Sofia Rossi', alt: 'Sofia Rossi' },
                { name: 'Tom Okafor', alt: 'Tom Okafor' }]
                } />
              
              <span>
                <StarIcon size={13} className="mr-1 inline fill-ink text-ink" aria-hidden="true" />
                <strong className="text-ink">4.9</strong> from 18k bookings
              </span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2Icon size={15} className="text-brand-700" aria-hidden="true" /> Free cancellation up to 24h
            </span>
          </div>
        </div>

        <div className="relative lg:col-span-6">
          <div className="aspect-[4/3] overflow-hidden rounded-3xl bg-mist lg:aspect-[5/5.2]">
            <img src={photos.hero} alt="Sunlit coworking space with oak desks and plants" className="h-full w-full object-cover" />
          </div>
          <div className="absolute -bottom-5 left-4 flex items-center gap-3 rounded-2xl border border-line bg-white p-3 pr-5 shadow-pop sm:left-6">
            <img src={photos.hotdesk1} alt="" className="h-12 w-12 rounded-xl object-cover" />
            <div>
              <p className="text-sm font-semibold">The Greenhouse · Hot desk</p>
              <p className="text-xs text-ink-muted">
                <span className="font-semibold text-brand-700">12 seats left</span> today · €6/hour
              </p>
            </div>
          </div>
          <div className="absolute right-4 top-4 hidden rounded-xl bg-white/95 px-3 py-2 text-xs font-semibold shadow-card sm:block">
            <span className="text-brand-700">●</span> Booked 2 min ago in Shoreditch
          </div>
        </div>
      </div>
    </section>);

}
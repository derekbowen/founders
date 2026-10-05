import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, CalendarCheckIcon, MapIcon, TentIcon } from 'lucide-react';
import { HeroSearch } from '../components/landing/HeroSearch';
import { SiteTypeGrid } from '../components/landing/SiteTypeGrid';
import { ParksRow } from '../components/landing/ParksRow';
import { HostCta } from '../components/landing/HostCta';
import { ListingCard } from '../components/ListingCard';
import { brand } from '../data/brand';
import { images } from '../data/images';
import { listings } from '../data/listings';

const steps = [
{ icon: MapIcon, title: 'Find your spot', text: 'Search thousands of private sites on farms, ranches and wild land — filtered by fires, water, hookups and more.' },
{ icon: CalendarCheckIcon, title: 'Book by the night', text: 'Instant book or send a request. Pay securely, and get directions and gate codes once you’re confirmed.' },
{ icon: TentIcon, title: 'Wake up wild', text: 'Arrive, settle in and chat with your host in the app. Leave no trace and a kind review.' }];


export function Landing() {
  const seasonal = listings.filter((l) => l.seasonal).slice(0, 8);

  return (
    <>
      <section className="relative isolate overflow-hidden" aria-labelledby="hero-heading">
        <img src={images.hero} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-primary-900/55" />
        <div className="container-page pb-14 pt-20 md:pb-20 md:pt-32">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-100">Private campsites · RV spots · Cabins · Glamping</p>
          <h1 id="hero-heading" className="mt-4 max-w-3xl text-5xl font-extrabold leading-[1.05] text-white md:text-7xl">
            {brand.tagline}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-sand-100">
            Camp on farms, ranches, vineyards and forest land hosted by the people who know it best. No reservations lottery, no crowded loops.
          </p>
          <div className="mt-10">
            <HeroSearch />
          </div>
          <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-3 text-white">
            {[
            ['4,200+', 'private sites'],
            ['48', 'states'],
            ['4.9★', 'average rating']].
            map(([value, label]) =>
            <div key={label} className="flex items-baseline gap-2">
                <dt className="sr-only">{label}</dt>
                <dd className="font-serif text-2xl font-bold">{value}</dd>
                <span className="text-sm text-sand-100">{label}</span>
              </div>
            )}
          </dl>
        </div>
      </section>

      <SiteTypeGrid />
      <ParksRow />

      <section className="container-page py-16 md:py-20" aria-labelledby="seasonal-heading">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Seasonal picks · October</p>
            <h2 id="seasonal-heading" className="mt-2 text-3xl font-bold text-ink-900 md:text-4xl">
              Foliage, harvest & crisp starry nights
            </h2>
          </div>
          <Link to="/s" className="inline-flex items-center gap-1 text-sm font-semibold text-primary-700 hover:text-primary-800">
            See all <ArrowRightIcon size={15} aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {seasonal.map((l) =>
          <div key={l.id} className="relative">
              <span className="absolute -top-2.5 right-14 z-10 rounded-full bg-accent-600 px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm">
                {l.seasonal}
              </span>
              <ListingCard listing={l} />
            </div>
          )}
        </div>
      </section>

      <section className="border-y border-sand-200 bg-white py-16 md:py-20" aria-labelledby="how-heading">
        <div className="container-page">
          <p className="eyebrow">How {brand.name} works</p>
          <h2 id="how-heading" className="mt-2 text-3xl font-bold text-ink-900 md:text-4xl">
            Three steps to the trailhead
          </h2>
          <ol className="mt-10 grid gap-8 md:grid-cols-3">
            {steps.map((s, i) =>
            <li key={s.title} className="relative">
                <div className="flex items-center gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-accent-50 text-accent-600">
                    <s.icon size={22} aria-hidden="true" />
                  </span>
                  <span className="font-serif text-sm font-bold text-ink-400">0{i + 1}</span>
                </div>
                <h3 className="mt-4 text-xl font-bold text-ink-900">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{s.text}</p>
              </li>
            )}
          </ol>
        </div>
      </section>

      <HostCta />
    </>);

}
import React from 'react';
import { motion } from 'framer-motion';
import { HeroSearch } from '../components/landing/HeroSearch';
import { SectionHeader } from '../components/landing/SectionHeader';
import { CategoryGrid } from '../components/landing/CategoryGrid';
import { DestinationGrid } from '../components/landing/DestinationGrid';
import { HostCta } from '../components/landing/HostCta';
import { ExperienceCard } from '../components/ExperienceCard';
import { experiences } from '../data/experiences';
import { images } from '../data/images';
import { valueProps } from '../data/marketing';
import { brand } from '../data/brand';

const topRated = [...experiences].sort((a, b) => b.rating - a.rating).slice(0, 8);

export function Landing() {
  return (
    <div className="bg-sand-50">
      <section className="relative isolate overflow-hidden">
        <img src={images.hero} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-slate-900/45" aria-hidden />
        <div className="mx-auto max-w-page px-4 pb-20 pt-20 sm:px-6 sm:pt-28 lg:px-8 lg:pb-28 lg:pt-36">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="max-w-2xl">
            
            <p className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur">
              Small groups · Local hosts
            </p>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl">
              {brand.tagline}
            </h1>
            <p className="mt-5 max-w-xl text-lg text-white/90">
              Food walks, kayak trips, cooking classes and photo walks — led by the people who call these cities home.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            className="mt-10 max-w-4xl">
            
            <HeroSearch />
          </motion.div>
        </div>
      </section>

      <section className="border-b border-sand-200 bg-white">
        <ul className="mx-auto grid max-w-page gap-6 px-4 py-8 sm:grid-cols-3 sm:px-6 lg:px-8">
          {valueProps.map(({ icon: Icon, title, text }) =>
          <li key={title} className="flex gap-3">
              <Icon className="mt-0.5 h-5 w-5 shrink-0 text-accent-600" aria-hidden />
              <div>
                <p className="text-sm font-semibold text-slate-900">{title}</p>
                <p className="text-sm text-slate-600">{text}</p>
              </div>
            </li>
          )}
        </ul>
      </section>

      <div className="mx-auto max-w-page space-y-20 px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <section>
          <SectionHeader eyebrow="Find your thing" title="Browse by category" />
          <CategoryGrid />
        </section>

        <section>
          <SectionHeader eyebrow="Where to next" title="Trending destinations" linkTo="/s" linkLabel="All destinations" />
          <DestinationGrid />
        </section>

        <section>
          <SectionHeader eyebrow="Loved by travelers" title="Top-rated experiences" linkTo="/s?sort=rating" linkLabel="See all experiences" />
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {topRated.map((e) =>
            <ExperienceCard key={e.id} experience={e} />
            )}
          </div>
        </section>

        <HostCta />
      </div>
    </div>);

}
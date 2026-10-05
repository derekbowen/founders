import React from 'react';
import { motion } from 'framer-motion';
import { HeartIcon, StarIcon } from 'lucide-react';
import { HeroSearch } from './HeroSearch';
import { brand } from '../../data/brand';
import { heroImage, landingStats } from '../../data/landing';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-primary-50">
      <div className="container-page grid items-center gap-10 pb-10 pt-10 lg:grid-cols-2 lg:pb-16 lg:pt-16">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-sm font-bold text-accent-800 shadow-sm">
            <HeartIcon className="h-4 w-4 fill-current" aria-hidden="true" />
            Trusted by pet parents across {brand.marketplace.defaultCity}
          </span>
          <h1 className="mt-5 text-4xl font-black leading-[1.05] tracking-tight text-ink-900 sm:text-5xl lg:text-6xl">
            Loving care while you’re away
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-700">
            Book vetted local sitters for overnight boarding, house sitting, drop-in visits and dog walks — with photo updates every step of the way.
          </p>
          <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
            {landingStats.map((s) =>
            <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-2xl font-black text-ink-900">{s.value}</dd>
                <dd className="text-sm font-semibold text-ink-600">{s.label}</dd>
              </div>
            )}
          </dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative">
          
          <img
            src={heroImage}
            alt="A golden retriever and tabby cat relaxing together on a sofa"
            className="aspect-[4/3] w-full rounded-[2.5rem] object-cover shadow-lift" />
          
          <div className="absolute -bottom-5 left-4 flex max-w-[260px] items-center gap-3 rounded-2xl bg-white p-3 shadow-lift sm:left-6">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-100 text-accent-700">
              <StarIcon className="h-5 w-5 fill-current" aria-hidden="true" />
            </div>
            <p className="text-sm leading-snug text-ink-700">
              <span className="font-extrabold text-ink-900">“Moose came home so happy.”</span> — Rachel, Alberta Arts
            </p>
          </div>
        </motion.div>
      </div>

      <div className="container-page relative pb-12 lg:pb-16">
        <HeroSearch />
      </div>
    </section>);

}
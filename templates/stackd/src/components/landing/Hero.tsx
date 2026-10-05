import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2Icon, FileTextIcon, ZapIcon } from 'lucide-react';
import { SearchBar } from '../common/SearchBar';
import { popularSearches } from '../../data/categories';

const HERO_IMAGE = "/c4c1faf1-6177-4298-b081-32a8774642ee.jpg";

export function Hero() {
  return (
    <section className="border-b border-ink">
      <div className="container-page grid items-center gap-12 py-14 md:py-20 lg:grid-cols-[1.15fr_1fr] lg:py-24">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-ink bg-brand-soft px-3 py-1 text-xs font-semibold">
            <ZapIcon className="h-3.5 w-3.5 fill-brand" aria-hidden="true" />
            Instant digital downloads from 4,800+ creators
          </span>
          <h1 className="mt-6 text-5xl font-bold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
            Buy it once,{' '}
            <span className="relative inline-block">
              <span className="relative z-10">download</span>
              <span aria-hidden="true" className="absolute inset-x-0 bottom-1 -z-0 h-4 bg-brand sm:h-5" />
            </span>{' '}
            it now.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted">
            Planners, e-books, photo packs, music loops and templates made by independent creators. Pay once, keep the files forever.
          </p>
          <div className="mt-8 max-w-xl">
            <SearchBar size="lg" />
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-sm text-muted">Popular:</span>
            {popularSearches.map((term) =>
            <Link key={term} to={`/s?q=${encodeURIComponent(term)}`} className="chip">
                {term}
              </Link>
            )}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="overflow-hidden rounded-3xl border-2 border-ink bg-white shadow-pop">
            <img src={HERO_IMAGE} alt="Collage of digital products: planner, cassette, photo print and spreadsheet" className="aspect-square w-full object-cover" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="absolute -left-4 top-8 flex -rotate-3 items-center gap-3 rounded-xl border border-ink bg-white px-3 py-2.5 shadow-pop sm:-left-8">
            
            <span className="grid h-9 w-9 place-items-center rounded-lg border border-ink bg-brand">
              <FileTextIcon className="h-4 w-4" aria-hidden="true" />
            </span>
            <div className="text-xs">
              <p className="font-semibold">daily-planner.pdf</p>
              <p className="text-muted">18.4 MB · PDF</p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.3 }}
            className="absolute -right-3 bottom-10 flex rotate-2 items-center gap-2 rounded-xl border border-ink bg-ink px-4 py-3 text-sm font-semibold text-white shadow-pop-accent sm:-right-6">
            
            <CheckCircle2Icon className="h-4 w-4 text-brand" aria-hidden="true" />
            Downloaded in 2 seconds
          </motion.div>
        </div>
      </div>
    </section>);

}
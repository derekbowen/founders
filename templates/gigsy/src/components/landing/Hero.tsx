import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2Icon, FileTextIcon, ShieldCheckIcon } from 'lucide-react';
import { SearchBar } from '../SearchBar';
import { Avatar } from '../Avatar';
import { brand } from '../../data/brand';
import { heroStats, popularSearches } from '../../data/marketing';
import { avatars } from '../../data/images';

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-14 sm:px-6 md:py-20 lg:grid-cols-[1.1fr_1fr] lg:px-8 lg:py-24">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-accent-50 px-3 py-1 text-xs font-semibold text-accent-800 ring-1 ring-inset ring-accent-200">
            <ShieldCheckIcon className="h-3.5 w-3.5" aria-hidden="true" />
            Payments protected until you approve the work
          </span>
          <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            {brand.tagline.split(' ').slice(0, -2).join(' ')}{' '}
            <span className="text-primary-600">{brand.tagline.split(' ').slice(-2).join(' ')}</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
            Describe your project once and receive tailored offers from vetted designers, developers, writers and marketers. Negotiate, hire and pay — all in one place.
          </p>
          <SearchBar variant="hero" className="mt-8 max-w-xl" />
          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
            <span className="text-slate-500">Popular:</span>
            {popularSearches.map((term) =>
            <Link
              key={term}
              to={`/s?q=${encodeURIComponent(term)}`}
              className="rounded-full border border-slate-200 bg-white px-3 py-1 font-medium text-slate-700 transition-colors hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700">
              
                {term}
              </Link>
            )}
          </div>
          <dl className="mt-10 grid max-w-md grid-cols-3 gap-6">
            {heroStats.map((s) =>
            <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-2xl font-extrabold tracking-tight text-slate-900">{s.value}</dd>
                <dd className="mt-0.5 text-xs text-slate-500">{s.label}</dd>
              </div>
            )}
          </dl>
        </div>

        <div className="relative" aria-hidden="true">
          <div className="relative mx-auto aspect-[5/5] max-w-lg rounded-[2rem] bg-primary-600 p-6 sm:p-8">
            <div className="absolute right-6 top-6 h-24 w-24 rounded-full bg-primary-500" />
            <div className="absolute bottom-10 left-8 h-16 w-16 rounded-2xl bg-accent-400/90" />

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="relative w-[78%] rounded-2xl bg-white p-4 shadow-pop">
              
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                <FileTextIcon className="h-3.5 w-3.5" /> Project brief
              </div>
              <p className="mt-2 text-sm font-semibold text-slate-900">Brand identity for a new product studio</p>
              <div className="mt-3 flex gap-2 text-xs">
                <span className="rounded-md bg-slate-100 px-2 py-1 font-medium text-slate-600">$1,000 – $2,000</span>
                <span className="rounded-md bg-slate-100 px-2 py-1 font-medium text-slate-600">Due Oct 24</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="relative ml-auto mt-4 w-[84%] rounded-2xl bg-white p-4 shadow-pop">
              
              <div className="flex items-center gap-3">
                <Avatar name="Maya Okafor" alt="" src={avatars.maya} size="sm" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-slate-900">Maya sent an offer</p>
                  <p className="text-xs text-slate-500">Delivery by Oct 18 · 2 revisions</p>
                </div>
                <span className="text-lg font-extrabold text-slate-900">$1,800</span>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-xs font-semibold">
                <span className="rounded-lg bg-primary-600 py-2 text-center text-white">Accept</span>
                <span className="rounded-lg bg-slate-100 py-2 text-center text-slate-700">Counter</span>
                <span className="rounded-lg bg-slate-100 py-2 text-center text-slate-700">Decline</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="relative mt-4 inline-flex items-center gap-2 rounded-full bg-accent-100 px-4 py-2 text-sm font-semibold text-accent-900 shadow-pop">
              
              <CheckCircle2Icon className="h-4 w-4 text-accent-700" />
              Hired · payment held securely
            </motion.div>
          </div>
        </div>
      </div>
    </section>);

}
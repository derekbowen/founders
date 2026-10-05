import React, { useState } from 'react';
import { ArrowDownRightIcon, SearchIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { brand } from '../../data/brand';

const popularSearches = ['Coffee', 'Candles', 'Granola', 'Greeting cards', 'Dog treats'];

export function Hero() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(query.trim() ? `/search?q=${encodeURIComponent(query.trim())}` : '/search');
  };

  return (
    <section className="relative overflow-hidden bg-primary-900 text-white">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 md:py-20 lg:grid-cols-[1.1fr_1fr] lg:px-8">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-accent-300 ring-1 ring-inset ring-white/15">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-400" aria-hidden="true" />
            For independent retailers & cafés
          </p>
          <h1 className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.5rem]">
            Wholesale from <span className="text-accent-400">independent brands</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-primary-100 sm:text-lg">{brand.heroSubtitle}</p>

          <form onSubmit={onSubmit} role="search" className="mt-8 flex max-w-xl flex-col gap-2 rounded-xl bg-white p-2 shadow-lift sm:flex-row">
            <label htmlFor="hero-search" className="sr-only">
              Search wholesale products
            </label>
            <div className="relative flex-1">
              <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" aria-hidden="true" />
              <input
                id="hero-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Try “cold brew” or “linen”"
                className="h-12 w-full rounded-lg pl-10 pr-3 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30" />
              
            </div>
            <button
              type="submit"
              className="h-12 rounded-lg bg-accent-400 px-6 text-sm font-semibold text-primary-950 transition-colors hover:bg-accent-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500">
              
              Search wholesale
            </button>
          </form>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
            <span className="text-primary-200">Popular:</span>
            {popularSearches.map((s) =>
            <Link
              key={s}
              to={`/search?q=${encodeURIComponent(s)}`}
              className="rounded-full border border-white/20 px-3 py-1 text-primary-50 transition-colors hover:border-accent-400 hover:text-accent-300">
              
                {s}
              </Link>
            )}
          </div>

          <dl className="mt-10 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-6">
            {[
            { label: 'Retailers ordering', value: brand.stats.retailers },
            { label: 'Independent brands', value: brand.stats.brands },
            { label: 'Average margin', value: brand.stats.averageMargin }].
            map((s) =>
            <div key={s.label}>
                <dt className="text-xs text-primary-200">{s.label}</dt>
                <dd className="mt-1 text-2xl font-semibold tabular-nums">{s.value}</dd>
              </div>
            )}
          </dl>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-2xl ring-1 ring-white/10">
            <img
              src="/18c112f4-4b94-4023-bcb0-a11c3fb8de08.jpg"
              alt="An independent shop owner unpacking wholesale cases onto stocked shelves"
              className="aspect-[4/3] w-full object-cover" />
            
          </div>
          <div className="absolute -bottom-5 left-4 w-64 rounded-xl bg-white p-4 text-slate-900 shadow-lift sm:left-[-1.5rem]">
            <p className="text-xs font-medium text-slate-500">Maple Pecan Granola · 10 cases</p>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-xl font-semibold tabular-nums text-primary-900">$4.80</span>
              <span className="inline-flex items-center gap-1 rounded bg-accent-100 px-1.5 py-0.5 text-xs font-semibold text-accent-900">
                <ArrowDownRightIcon className="h-3 w-3" aria-hidden="true" />
                11% tier discount
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-500">per unit · MSRP $10.99 · 56% margin</p>
          </div>
        </div>
      </div>
    </section>);

}
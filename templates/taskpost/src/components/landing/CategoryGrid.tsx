import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRightIcon } from 'lucide-react';
import { CategoryIcon } from '../ui/CategoryIcon';
import { categories } from '../../data/categories';
import { useApp } from '../../hooks/useApp';
import { formatBudget, pluralize } from '../../utils/format';

export function CategoryGrid() {
  const { jobs } = useApp();
  return (
    <section className="border-y border-ink-200 bg-white" aria-labelledby="cat-heading">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <p className="text-sm font-bold uppercase tracking-wider text-primary-700">Popular job categories</p>
        <h2 id="cat-heading" className="mt-2 text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
          What do you need done?
        </h2>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((c) => {
            const count = jobs.filter((j) => j.categoryId === c.id && j.status === 'open').length;
            return (
              <li key={c.id}>
                <Link
                  to={`/search?category=${c.id}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink-200 bg-white transition-all hover:-translate-y-0.5 hover:border-ink-300 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500">
                  
                  <div className="relative aspect-[4/3] overflow-hidden bg-ink-100">
                    <img src={c.image} alt="" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
                    <span className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-lg bg-white text-primary-600 shadow-sm">
                      <CategoryIcon id={c.id} className="h-5 w-5" />
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-extrabold text-ink-900">{c.name}</h3>
                      <ArrowUpRightIcon className="h-4 w-4 text-ink-400 transition-colors group-hover:text-primary-600" aria-hidden="true" />
                    </div>
                    <p className="mt-1 text-xs text-ink-600">{c.examples.slice(0, 3).join(' · ')}</p>
                    <div className="mt-auto flex items-center justify-between pt-4 text-xs">
                      <span className="font-bold text-ink-800">{pluralize(count, 'open job')}</span>
                      <span className="text-ink-500">{formatBudget(c.typicalBudget[0], c.typicalBudget[1])}</span>
                    </div>
                  </div>
                </Link>
              </li>);

          })}
        </ul>
      </div>
    </section>);

}
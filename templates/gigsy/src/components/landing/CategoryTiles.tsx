import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { categories } from '../../data/categories';
import { CategoryIcon } from '../CategoryIcon';
import { countListingsInCategory } from '../../utils/lookup';

export function CategoryTiles() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="categories-heading">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 id="categories-heading" className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Explore by category</h2>
          <p className="mt-2 text-slate-600">Find the right specialist for every part of your project.</p>
        </div>
        <Link to="/s" className="hidden items-center gap-1 text-sm font-semibold text-primary-700 hover:text-primary-800 sm:inline-flex">
          All services <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
      <ul className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {categories.map((c, i) =>
        <li key={c.id} className={i === 4 ? 'col-span-2 md:col-span-1' : ''}>
            <Link
            to={`/s?category=${c.id}`}
            className="group relative flex h-56 flex-col justify-end overflow-hidden rounded-2xl bg-slate-900 p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2">
            
              <img src={c.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-70 transition duration-500 group-hover:scale-105 group-hover:opacity-60" loading="lazy" />
              <div className="absolute inset-0 bg-slate-950/40" aria-hidden="true" />
              <div className="relative">
                <span className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white text-primary-600">
                  <CategoryIcon id={c.id} className="h-4 w-4" />
                </span>
                <h3 className="font-bold text-white">{c.name}</h3>
                <p className="mt-0.5 text-xs text-slate-200">{c.description}</p>
                <p className="mt-2 text-xs font-semibold text-accent-300">{countListingsInCategory(c.id)} services</p>
              </div>
            </Link>
          </li>
        )}
      </ul>
    </section>);

}
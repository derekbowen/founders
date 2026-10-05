import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../../data/categories';

export function CategoryGrid() {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {categories.map(({ id, label, description, icon: Icon }) =>
      <li key={id}>
          <Link
          to={`/s?cat=${id}`}
          className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500">
          
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-600 transition-colors group-hover:bg-primary-600 group-hover:text-white">
              <Icon className="h-5 w-5" aria-hidden />
            </span>
            <span className="mt-4 font-display text-base font-semibold text-slate-900">{label}</span>
            <span className="mt-1 text-sm leading-snug text-slate-600">{description}</span>
          </Link>
        </li>
      )}
    </ul>);

}
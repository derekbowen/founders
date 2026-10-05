import React from 'react';
import { Link } from 'react-router-dom';
import { SectionHeading } from '../ui/SectionHeading';
import { categories } from '../../data/categories';
import { getCategoryCount } from '../../utils/catalog';

export function CategoryGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Shop by category" title="What does your shelf need?" linkLabel="Browse all" linkTo="/search" />
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {categories.map((c) =>
        <li key={c.id}>
            <Link
            to={`/search?category=${c.id}`}
            className="group block overflow-hidden rounded-xl border border-slate-200 bg-white transition-all hover:border-primary-300 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500">
            
              <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                <img src={c.image} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
              </div>
              <div className="p-3">
                <p className="text-sm font-semibold text-slate-900 group-hover:text-primary-700">{c.name}</p>
                <p className="mt-0.5 text-xs text-slate-500">{getCategoryCount(c.id)} wholesale products</p>
              </div>
            </Link>
          </li>
        )}
      </ul>
    </section>);

}
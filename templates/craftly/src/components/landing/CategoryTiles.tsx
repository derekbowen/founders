import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../../data/categories';
import { SectionHeader } from '../ui/SectionHeader';

export function CategoryTiles() {
  return (
    <section className="container-page py-16">
      <SectionHeader eyebrow="Browse the studio" title="Shop by craft" link={{ to: '/s', label: 'All categories' }} />
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {categories.map((c) =>
        <li key={c.id}>
            <Link to={`/s?category=${c.id}`} className="group block rounded-2xl">
              <div className="aspect-square overflow-hidden rounded-2xl bg-subtle">
                <img src={c.image} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <h3 className="mt-3 text-lg font-medium text-ink group-hover:text-primary-ink">{c.name}</h3>
              <p className="text-xs text-muted">{c.blurb}</p>
            </Link>
          </li>
        )}
      </ul>
    </section>);

}
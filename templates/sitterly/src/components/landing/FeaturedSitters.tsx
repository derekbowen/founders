import React from 'react';
import { Link } from 'react-router-dom';
import { sitters } from '../../data/sitters';
import { SitterCard } from '../SitterCard';
import { buttonLinkClass } from '../ui/BrandButton';

export function FeaturedSitters() {
  const featured = [...sitters].filter((s) => s.availableTonight).sort((a, b) => b.rating - a.rating).slice(0, 4);
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="featured-heading">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-primary-700">Last-minute help</p>
          <h2 id="featured-heading" className="mt-2 font-heading text-3xl font-bold text-ink-900 sm:text-4xl">
            Top-rated sitters free tonight
          </h2>
        </div>
        <Link to="/s?tonight=1" className={buttonLinkClass('outline', 'md')}>
          See everyone available
        </Link>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((s) =>
        <SitterCard key={s.id} sitter={s} />
        )}
      </div>
    </section>);

}
import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../../data/categories';
import { useStore } from '../../contexts/StoreContext';
import { CategoryIcon } from '../common/CategoryIcon';

export function CategoryGrid() {
  const { listings } = useStore();
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-6">
      {categories.map((c) => {
        const count = listings.filter((l) => l.category === c.id).length;
        return (
          <Link
            key={c.id}
            to={`/s?category=${c.id}`}
            className="card card-hover flex flex-col gap-6 p-4 sm:p-5"
            style={{ backgroundColor: c.tint }}>
            
            <span className="grid h-11 w-11 place-items-center rounded-xl border border-ink bg-white">
              <CategoryIcon id={c.id} />
            </span>
            <div>
              <p className="font-display text-lg font-bold leading-tight">{c.name}</p>
              <p className="mt-0.5 text-xs text-ink/70">{c.blurb}</p>
              <p className="mt-2 text-xs font-semibold">{count} products →</p>
            </div>
          </Link>);

      })}
    </div>);

}
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { listings } from '../../data/listings';
import { sports } from '../../data/sports';
import { pluralize } from '../../utils/format';

export function SportsGrid() {
  return (
    <section className="container-page py-16" aria-labelledby="sports-heading">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Pick your game</p>
          <h2 id="sports-heading" className="heading-lg mt-2">Browse by sport</h2>
        </div>
        <Link to="/search" className="hidden items-center gap-1 text-sm font-semibold text-brand hover:underline sm:inline-flex">
          All courts <ArrowRightIcon size={16} aria-hidden="true" />
        </Link>
      </div>
      <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-6">
        {sports.map((sport) => {
          const count = listings.filter((l) => l.sport === sport.id).length;
          return (
            <li key={sport.id}>
              <Link
                to={`/search?sport=${sport.id}`}
                className="group relative block aspect-[3/4] overflow-hidden rounded-2xl bg-slate-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/40">
                
                <img src={sport.image} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-x-0 bottom-0 bg-ink/75 p-3 transition-colors group-hover:bg-brand">
                  <p className="font-display text-2xl font-bold uppercase leading-none text-white">{sport.label}</p>
                  <p className="mt-1 text-xs text-white/80">{pluralize(count, 'court')} · {sport.blurb}</p>
                </div>
              </Link>
            </li>);

        })}
      </ul>
    </section>);

}
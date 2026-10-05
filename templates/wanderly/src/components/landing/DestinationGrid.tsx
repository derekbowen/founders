import React from 'react';
import { Link } from 'react-router-dom';
import { destinations } from '../../data/destinations';
import { countExperiencesIn } from '../../utils/lookup';
import { pluralize } from '../../utils/format';

export function DestinationGrid() {
  return (
    <ul className="-mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-2 scrollbar-none sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 lg:grid-cols-6">
      {destinations.map((d) =>
      <li key={d.id} className="w-[62%] shrink-0 snap-start sm:w-auto">
          <Link
          to={`/s?dest=${d.id}`}
          className="group relative block aspect-[3/4] overflow-hidden rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2">
          
            <img src={d.image} alt={`${d.city}, ${d.country}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-x-0 bottom-0 bg-slate-900/55 p-4 backdrop-blur-[2px]">
              <p className="font-display text-lg font-semibold text-white">{d.city}</p>
              <p className="text-xs text-white/90">{d.tagline}</p>
              <p className="mt-1 text-xs font-semibold text-primary-200">{pluralize(countExperiencesIn(d.id), 'experience')}</p>
            </div>
          </Link>
        </li>
      )}
    </ul>);

}
import React from 'react';
import { Link } from 'react-router-dom';
import { cities } from '../../data/cities';
import { listings } from '../../data/listings';

export function PopularCities() {
  return (
    <section aria-labelledby="cities-heading" className="bg-mist py-16 lg:py-20">
      <div className="container-page">
        <p className="eyebrow">Popular cities</p>
        <h2 id="cities-heading" className="mt-2 text-3xl font-semibold sm:text-4xl">
          Your desk is waiting in…
        </h2>
        <ul className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {cities.map((c, i) => {
            const count = listings.filter((l) => l.city === c.name).length;
            return (
              <li key={c.name} className={i === 0 ? 'col-span-2 md:col-span-1' : ''}>
                <Link
                  to={`/s?city=${encodeURIComponent(c.name)}`}
                  className="focus-ring group relative block aspect-[3/4] overflow-hidden rounded-2xl bg-ink">
                  
                  <img
                    src={c.image}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105" />
                  
                  <span className="absolute inset-x-3 bottom-3 rounded-xl bg-white/95 px-3.5 py-2.5 backdrop-blur">
                    <span className="block text-sm font-semibold text-ink">{c.name}</span>
                    <span className="block text-xs text-ink-muted">
                      {count} {count === 1 ? 'space' : 'spaces'} · {c.country}
                    </span>
                  </span>
                </Link>
              </li>);

          })}
        </ul>
      </div>
    </section>);

}
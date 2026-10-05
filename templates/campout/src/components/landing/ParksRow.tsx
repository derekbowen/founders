import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { parks } from '../../data/parks';

export function ParksRow() {
  return (
    <section className="bg-sand-100 py-16 md:py-20" aria-labelledby="parks-heading">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Skip the campground lottery</p>
            <h2 id="parks-heading" className="mt-2 text-3xl font-bold text-ink-900 md:text-4xl">
              Private land near the parks you love
            </h2>
          </div>
          <Link to="/s" className="inline-flex items-center gap-1 text-sm font-semibold text-primary-700 hover:text-primary-800">
            Browse all sites <ArrowRightIcon size={15} aria-hidden="true" />
          </Link>
        </div>
        <ul className="no-scrollbar -mx-4 mt-8 flex snap-x gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 lg:grid-cols-6">
          {parks.map((p) =>
          <li key={p.id} className="w-44 shrink-0 snap-start sm:w-auto">
              <Link to={`/s?location=${encodeURIComponent(p.query)}`} className="group relative block aspect-[3/4] overflow-hidden rounded-2xl bg-sand-300">
                <img src={p.image} alt="" loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-x-0 bottom-0 bg-ink-900/60 p-4 backdrop-blur-[2px]">
                  <p className="font-serif text-lg font-bold leading-tight text-white">{p.name}</p>
                  <p className="text-xs text-sand-100">
                    {p.region} · {p.siteCount} {p.siteCount === 1 ? 'site' : 'sites'} nearby
                  </p>
                </div>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </section>);

}
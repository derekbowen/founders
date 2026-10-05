import React from 'react';
import { Link } from 'react-router-dom';
import { designers } from '../../data/taxonomy';
import { SectionHeader } from './SectionHeader';

export function TrendingDesigners() {
  return (
    <section className="border-y border-line bg-cream/60">
      <div className="mx-auto max-w-[1400px] px-4 py-16 md:px-8 md:py-24">
        <SectionHeader kicker="Trending designers" title="The labels everyone’s renting" />
        <ul className="no-scrollbar -mx-4 flex snap-x gap-4 overflow-x-auto px-4 md:mx-0 md:grid md:grid-cols-3 md:px-0 lg:grid-cols-6">
          {designers.map((d, i) =>
          <li key={d.name} className="w-44 shrink-0 snap-start md:w-auto">
              <Link
              to={`/s?designer=${encodeURIComponent(d.name)}`}
              className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-dark focus-visible:ring-offset-2">
              
                <div className="relative aspect-square overflow-hidden rounded-full bg-paper">
                  <img
                  src={d.image}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover object-top grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0" />
                
                </div>
                <div className="mt-4 text-center">
                  <p className="text-[10px] text-muted">No. {String(i + 1).padStart(2, '0')}</p>
                  <h3 className="font-display text-xl text-ink transition group-hover:text-accent-dark">
                    {d.name}
                  </h3>
                  <p className="text-xs text-muted">{d.pieces} pieces</p>
                </div>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </section>);

}
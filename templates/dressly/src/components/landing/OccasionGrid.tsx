import React from 'react';
import { Link } from 'react-router-dom';
import { occasions } from '../../data/taxonomy';
import { SectionHeader } from './SectionHeader';

export function OccasionGrid() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-16 md:px-8 md:py-24">
      <SectionHeader
        kicker="Shop by occasion"
        title={
        <>
            Something for every <em className="text-accent-dark">RSVP</em>
          </>
        }
        linkLabel="All dresses"
        linkTo="/s" />
      
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-6">
        {occasions.map((o) =>
        <Link
          key={o.slug}
          to={`/s?occasion=${o.slug}`}
          className="group relative block aspect-[3/4] overflow-hidden bg-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-dark focus-visible:ring-offset-2">
          
            <img
            src={o.image}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          
            <div className="absolute inset-x-0 bottom-0 bg-ink/55 px-4 py-3 transition-colors group-hover:bg-ink/75">
              <h3 className="font-display text-xl text-paper">{o.label}</h3>
              <p className="text-[11px] text-paper/80">{o.blurb}</p>
            </div>
          </Link>
        )}
      </div>
    </section>);

}
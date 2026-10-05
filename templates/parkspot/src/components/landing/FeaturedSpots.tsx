import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { ListingCard } from '../listing/ListingCard';
import { listings } from '../../data/listings';
import { buttonClass } from '../../utils/styles';

export function FeaturedSpots() {
  const featured = listings.filter((l) => l.featuredVenue);
  const venues = featured.map((l) => l.featuredVenue as string);
  const [venue, setVenue] = useState<string>('All venues');
  const shown = venue === 'All venues' ? featured : featured.filter((l) => l.featuredVenue === venue);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20" aria-labelledby="featured-heading">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-muted">Featured</p>
          <h2 id="featured-heading" className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Spots near the city’s big venues
          </h2>
        </div>
        <Link to="/s" className={buttonClass('secondary', 'md', 'self-start sm:self-auto')}>
          View all on map <ArrowRightIcon size={16} aria-hidden />
        </Link>
      </div>

      <div className="no-scrollbar -mx-4 mt-8 flex gap-2 overflow-x-auto px-4" role="group" aria-label="Filter by venue">
        {['All venues', ...venues].map((v) =>
        <button
          key={v}
          type="button"
          onClick={() => setVenue(v)}
          aria-pressed={venue === v}
          className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
          venue === v ? 'border-navy bg-navy text-white' : 'border-line bg-surface hover:border-ink/40'}`
          }>
          
            {v}
          </button>
        )}
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {shown.map((l) =>
        <ListingCard key={l.id} listing={l} />
        )}
      </div>
    </section>);

}
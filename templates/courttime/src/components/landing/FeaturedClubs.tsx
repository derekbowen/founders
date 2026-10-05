import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { listings } from '../../data/listings';
import { ListingCard } from '../search/ListingCard';

export function FeaturedClubs() {
  const featured = listings.filter((l) => l.featured);
  return (
    <section className="container-page pb-16" aria-labelledby="featured-heading">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Hand-picked</p>
          <h2 id="featured-heading" className="heading-lg mt-2">Featured clubs</h2>
        </div>
        <Link to="/search" className="inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline">
          See all <ArrowRightIcon size={16} aria-hidden="true" />
        </Link>
      </div>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((listing) =>
        <ListingCard key={listing.id} listing={listing} />
        )}
      </div>
    </section>);

}
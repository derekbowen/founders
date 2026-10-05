import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { listings } from '../../data/listings';
import { ListingCard } from '../listing/ListingCard';

export function FeaturedSpaces() {
  const featured = [...listings].sort((a, b) => b.rating - a.rating).slice(0, 4);
  return (
    <section aria-labelledby="featured-heading" className="bg-white py-16 lg:py-20">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">Guest favourites</p>
            <h2 id="featured-heading" className="mt-2 text-3xl font-semibold sm:text-4xl">
              Top-rated spaces this month
            </h2>
          </div>
          <Link to="/s?sort=rating" className="link inline-flex items-center gap-1 text-sm">
            See all top-rated <ArrowRightIcon size={15} aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((l) =>
          <ListingCard key={l.id} listing={l} />
          )}
        </div>
      </div>
    </section>);

}
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { ListingCard } from '../listing/ListingCard';
import { listings } from '../../data/listings';

export function TopSitters() {
  const top = [...listings].sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount).slice(0, 8);
  return (
    <section className="bg-white py-16 lg:py-24" aria-labelledby="top-heading">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">Top-rated sitters</p>
            <h2 id="top-heading" className="mt-2 text-3xl font-black tracking-tight text-ink-900 sm:text-4xl">
              Loved by pets (and their people)
            </h2>
          </div>
          <Link to="/search" className="btn btn-md btn-secondary self-start sm:self-auto">
            See all sitters
            <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {top.map((l) =>
          <ListingCard key={l.id} listing={l} />
          )}
        </div>
      </div>
    </section>);

}
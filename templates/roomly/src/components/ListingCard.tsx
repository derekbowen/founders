import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarIcon, ClockIcon, UsersIcon } from 'lucide-react';
import { roomTypeLabels } from '../data/discover';
import { formatDate, formatMoney } from '../utils/format';
import type { Listing } from '../types/listing';

interface ListingCardProps {
  listing: Listing;
  isActive?: boolean;
  onHover?: (id: string | null) => void;
}

export function ListingCard({ listing, isActive = false, onHover }: ListingCardProps) {
  return (
    <Link
      to={`/l/${listing.id}`}
      onMouseEnter={() => onHover?.(listing.id)}
      onMouseLeave={() => onHover?.(null)}
      onFocus={() => onHover?.(listing.id)}
      onBlur={() => onHover?.(null)}
      className={`group block rounded-2xl focus:outline-none focus-visible:ring-4 focus-visible:ring-primary-200 ${
      isActive ? 'ring-2 ring-primary-400 ring-offset-4 ring-offset-surface' : ''}`
      }>
      
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-navy-100">
        <img
          src={listing.images[0]}
          alt={listing.title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          <span className="rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-navy-900 shadow-sm">
            {roomTypeLabels[listing.roomType]}
          </span>
          {listing.billsIncluded &&
          <span className="rounded-full bg-primary-400 px-2.5 py-1 text-xs font-semibold text-navy-900 shadow-sm">
              Bills incl.
            </span>
          }
        </div>
      </div>
      <div className="px-1 pt-3">
        <p className="text-xs font-medium uppercase tracking-wide text-navy-500">
          {listing.neighborhood}, {listing.city}
        </p>
        <h3 className="mt-1 line-clamp-1 font-semibold text-navy-900 group-hover:text-primary-700">
          {listing.title}
        </h3>
        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-navy-500">
          <span className="inline-flex items-center gap-1">
            <CalendarIcon size={13} aria-hidden /> From {formatDate(listing.availableFrom, 'd MMM')}
          </span>
          <span className="inline-flex items-center gap-1">
            <ClockIcon size={13} aria-hidden /> Min {listing.minStay} mo
          </span>
          <span className="inline-flex items-center gap-1">
            <UsersIcon size={13} aria-hidden />
            {listing.flatmates.length === 0 ? 'No flatmates' : `${listing.flatmates.length} flatmate${listing.flatmates.length > 1 ? 's' : ''}`}
          </span>
        </div>
        <p className="mt-2 text-navy-900">
          <span className="text-lg font-bold">{formatMoney(listing.rent)}</span>
          <span className="text-sm text-navy-500"> / month</span>
        </p>
      </div>
    </Link>);

}
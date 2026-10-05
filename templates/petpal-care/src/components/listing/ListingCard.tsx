import React from 'react';
import { Link } from 'react-router-dom';
import { BadgeCheckIcon, MapPinIcon } from 'lucide-react';
import { StarRating } from '../common/StarRating';
import { ServiceIcon } from '../common/ServiceIcon';
import { getServiceMeta, getStartingPrice } from '../../utils/listing';
import { formatMoney } from '../../utils/format';
import type { Listing } from '../../types/listing';

interface ListingCardProps {
  listing: Listing;
  serviceId?: string;
  isActive?: boolean;
  onHover?: (id: string | null) => void;
  layout?: 'grid' | 'row';
}

export function ListingCard({ listing, serviceId, isActive, onHover, layout = 'grid' }: ListingCardProps) {
  const price = getStartingPrice(listing, serviceId);
  const isRow = layout === 'row';

  return (
    <Link
      to={`/l/${listing.id}`}
      onMouseEnter={() => onHover?.(listing.id)}
      onMouseLeave={() => onHover?.(null)}
      onFocus={() => onHover?.(listing.id)}
      onBlur={() => onHover?.(null)}
      className={`group flex overflow-hidden rounded-3xl border bg-white transition duration-200 hover:-translate-y-0.5 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${
      isActive ? 'border-primary-400 shadow-lift' : 'border-ink-200/70 shadow-soft'} ${
      isRow ? 'flex-col sm:flex-row' : 'flex-col'}`}>
      
      <div className={`relative overflow-hidden bg-ink-100 ${isRow ? 'aspect-[4/3] sm:aspect-auto sm:w-56 sm:shrink-0' : 'aspect-[4/3]'}`}>
        <img
          src={listing.photos[0]}
          alt={`${listing.sitter.firstName}’s pet care space in ${listing.neighborhood}`}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy" />
        
        {listing.sitter.verified &&
        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-bold text-accent-800 shadow-sm">
            <BadgeCheckIcon className="h-3.5 w-3.5" aria-hidden="true" />
            Vetted
          </span>
        }
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-extrabold text-ink-900">{listing.sitter.name}</p>
          <StarRating rating={listing.rating} count={listing.reviewCount} />
        </div>
        <h3 className="mt-1 line-clamp-2 text-base font-bold leading-snug text-ink-800">{listing.title}</h3>
        <p className="mt-1 flex items-center gap-1 text-sm text-ink-600">
          <MapPinIcon className="h-3.5 w-3.5" aria-hidden="true" />
          {listing.neighborhood}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {listing.services.map((s) =>
          <span
            key={s.serviceId}
            title={getServiceMeta(s.serviceId)?.name}
            className="inline-flex items-center gap-1 rounded-full bg-accent-50 px-2 py-1 text-xs font-semibold text-accent-800">
            
              <ServiceIcon serviceId={s.serviceId} className="h-3.5 w-3.5" />
              {getServiceMeta(s.serviceId)?.name}
            </span>
          )}
        </div>
        <p className="mt-auto pt-4 text-sm text-ink-600">
          From <span className="text-lg font-black text-ink-900">{formatMoney(price.price)}</span> / {price.unitLabel}
        </p>
      </div>
    </Link>);

}
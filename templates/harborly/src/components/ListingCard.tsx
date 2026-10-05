import React from 'react';
import { Link } from 'react-router-dom';
import { HeartIcon, UsersIcon, RulerIcon, MapPinIcon } from 'lucide-react';
import { Rating } from './ui/Rating';
import { useMarketplace } from '../contexts/MarketplaceContext';
import { destinations } from '../data/destinations';
import { boatTypes } from '../data/boatTypes';
import { formatMoney } from '../utils/pricing';
import { cn } from '../utils/ui';
import type { Listing } from '../types/marketplace';

const captainLabel = { required: 'Captain included', optional: 'Captain optional', none: 'Bareboat' } as const;

interface ListingCardProps {
  listing: Listing;
  onHover?: (id: string | null) => void;
  highlighted?: boolean;
}

export function ListingCard({ listing, onHover, highlighted }: ListingCardProps) {
  const { favorites, toggleFavorite } = useMarketplace();
  const isFav = favorites.includes(listing.id);
  const destination = destinations.find((d) => d.id === listing.destinationId);
  const type = boatTypes.find((t) => t.id === listing.type);

  return (
    <article
      className="group relative"
      onMouseEnter={() => onHover?.(listing.id)}
      onMouseLeave={() => onHover?.(null)}>
      
      <div className={cn('relative aspect-[4/3] overflow-hidden rounded-2xl bg-sand-light ring-2 ring-transparent transition', highlighted && 'ring-navy')}>
        <img src={listing.images[0]} alt={listing.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-navy shadow-sm">
          {captainLabel[listing.captainMode]}
        </span>
        <button
          type="button"
          onClick={() => toggleFavorite(listing.id)}
          aria-pressed={isFav}
          aria-label={isFav ? `Remove ${listing.title} from saved` : `Save ${listing.title}`}
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-navy shadow-sm transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral">
          
          <HeartIcon className={cn('h-4 w-4', isFav && 'fill-coral-dark text-coral-dark')} />
        </button>
      </div>
      <div className="mt-3">
        <div className="flex items-start justify-between gap-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-sea">{type?.label}</p>
          <Rating value={listing.rating} count={listing.reviewCount} className="text-xs" />
        </div>
        <h3 className="mt-1 line-clamp-1 font-semibold text-ink">
          <Link to={`/l/${listing.id}`} className="after:absolute after:inset-0 focus-visible:outline-none focus-visible:underline">
            {listing.title}
          </Link>
        </h3>
        <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
          <span className="inline-flex items-center gap-1">
            <MapPinIcon className="h-3.5 w-3.5" aria-hidden="true" />
            {destination?.name}
          </span>
          <span className="inline-flex items-center gap-1">
            <RulerIcon className="h-3.5 w-3.5" aria-hidden="true" />
            {listing.specs.length} ft
          </span>
          <span className="inline-flex items-center gap-1">
            <UsersIcon className="h-3.5 w-3.5" aria-hidden="true" />
            {listing.specs.capacity}
          </span>
        </p>
        <p className="mt-2 text-sm text-ink">
          <span className="font-semibold">{formatMoney(listing.pricing.fullDay)}</span>
          <span className="text-muted"> / day · {formatMoney(listing.pricing.halfDay)} half-day</span>
        </p>
      </div>
    </article>);

}
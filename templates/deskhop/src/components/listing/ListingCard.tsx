import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HeartIcon, UsersIcon, ZapIcon } from 'lucide-react';
import type { Listing } from '../../types/listing';
import { formatMoney } from '../../utils/format';
import { getSpaceType } from '../../utils/lookup';
import { Rating } from './Rating';

interface ListingCardProps {
  listing: Listing;
  highlighted?: boolean;
  onHover?: (id: string | null) => void;
}

export function ListingCard({ listing, highlighted = false, onHover }: ListingCardProps) {
  const [saved, setSaved] = useState(false);
  const type = getSpaceType(listing.spaceType);
  const capacityLabel =
  type.bookBy === 'seat' ?
  `${listing.seats} ${type.unit.many}` :
  `Up to ${listing.capacity} people`;

  return (
    <article
      onMouseEnter={() => onHover?.(listing.id)}
      onMouseLeave={() => onHover?.(null)}
      className={`group relative rounded-2xl transition-shadow ${highlighted ? 'ring-2 ring-brand-600 ring-offset-4' : ''}`}>
      
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-mist">
        <img
          src={listing.images[0]}
          alt={listing.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
        
        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-ink shadow-card">
          <type.icon size={13} aria-hidden="true" className="text-brand-700" />
          {type.label}
        </span>
        <button
          type="button"
          onClick={() => setSaved((s) => !s)}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${listing.title} from saved` : `Save ${listing.title}`}
          className="focus-ring absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/95 shadow-card transition-transform hover:scale-105">
          
          <HeartIcon
            size={16}
            className={saved ? 'fill-brand-700 text-brand-700' : 'text-ink'}
            aria-hidden="true" />
          
        </button>
      </div>
      <div className="mt-3 space-y-1">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-sans text-[15px] font-semibold leading-snug text-ink">
            <Link to={`/l/${listing.id}`} className="focus-ring rounded after:absolute after:inset-0 after:rounded-2xl">
              {listing.title}
            </Link>
          </h3>
          <Rating value={listing.rating} className="shrink-0" />
        </div>
        <p className="text-sm text-ink-muted">
          {listing.neighborhood}, {listing.city}
        </p>
        <p className="flex items-center gap-3 text-sm text-ink-muted">
          <span className="inline-flex items-center gap-1">
            <UsersIcon size={14} aria-hidden="true" /> {capacityLabel}
          </span>
          {listing.instantBook &&
          <span className="inline-flex items-center gap-1 text-brand-700">
              <ZapIcon size={14} aria-hidden="true" /> Instant book
            </span>
          }
        </p>
        <p className="pt-1 text-sm text-ink">
          <span className="font-semibold">{formatMoney(listing.pricePerHour)}</span>
          <span className="text-ink-muted"> /hour</span>
          <span className="mx-1.5 text-ink-subtle">·</span>
          <span className="font-semibold">{formatMoney(listing.pricePerDay)}</span>
          <span className="text-ink-muted"> /day</span>
        </p>
      </div>
    </article>);

}
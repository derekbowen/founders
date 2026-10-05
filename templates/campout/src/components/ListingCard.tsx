import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HeartIcon, ZapIcon } from 'lucide-react';
import { Rating } from './Rating';
import type { Listing } from '../types/listing';
import { formatMoney } from '../utils/currency';
import { getSiteType } from '../utils/lookup';
import { brand } from '../data/brand';

interface ListingCardProps {
  listing: Listing;
  search?: string;
  highlighted?: boolean;
  onHover?: (id: string | null) => void;
}

export function ListingCard({ listing, search = '', highlighted = false, onHover }: ListingCardProps) {
  const [saved, setSaved] = useState(false);
  const type = getSiteType(listing.siteType);
  const TypeIcon = type.icon;

  return (
    <article
      className="group relative"
      onMouseEnter={() => onHover?.(listing.id)}
      onMouseLeave={() => onHover?.(null)}>
      
      <Link to={`/l/${listing.id}${search}`} className="block rounded-2xl focus-visible:outline-offset-4">
        <div
          className={`relative aspect-[4/3] overflow-hidden rounded-2xl bg-sand-200 ring-2 transition ${
          highlighted ? 'ring-primary-600' : 'ring-transparent'}`
          }>
          
          <img
            src={listing.images[0]}
            alt={listing.title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
          
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-ink-900 shadow-sm">
            <TypeIcon size={13} className="text-primary-700" aria-hidden="true" />
            {type.label}
          </span>
          {listing.instantBook &&
          <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-primary-800/90 px-2.5 py-1 text-xs font-semibold text-white">
              <ZapIcon size={12} aria-hidden="true" /> Instant book
            </span>
          }
        </div>
        <div className="mt-3 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate font-sans text-[15px] font-semibold text-ink-900">{listing.title}</h3>
            <p className="truncate text-sm text-ink-500">
              {listing.location.town}, {listing.location.region} · {listing.location.driveToPark}
            </p>
          </div>
          <Rating value={listing.rating} />
        </div>
        <p className="mt-1.5 text-sm text-ink-700">
          <span className="font-semibold text-ink-900">{formatMoney(listing.price)}</span> / {brand.unitLabel}
        </p>
      </Link>
      <button
        type="button"
        onClick={() => setSaved((s) => !s)}
        aria-pressed={saved}
        aria-label={saved ? `Remove ${listing.title} from saved` : `Save ${listing.title}`}
        className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/95 text-ink-700 shadow-sm transition hover:scale-105 hover:text-accent-600">
        
        <HeartIcon size={17} className={saved ? 'fill-accent-500 text-accent-500' : ''} />
      </button>
    </article>);

}
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HeartIcon, StarIcon } from 'lucide-react';
import type { Listing } from '../types/marketplace';
import { formatMoney, sizeLabel } from '../utils/format';
import { cx } from '../utils/styles';

interface ListingCardProps {
  listing: Listing;
  className?: string;
}

export function ListingCard({ listing, className }: ListingCardProps) {
  const [saved, setSaved] = useState(false);
  return (
    <article className={cx('group relative', className)}>
      <Link
        to={`/l/${listing.id}`}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-dark focus-visible:ring-offset-2">
        
        <div className="relative aspect-[3/4] overflow-hidden bg-cream">
          <img
            src={listing.image}
            alt={`${listing.designer} ${listing.title}`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
          
          <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
            {listing.isNew &&
            <span className="bg-paper px-2 py-1 text-[10px] font-semibold uppercase tracking-eyebrow text-ink">
                New
              </span>
            }
          </div>
          <span className="absolute bottom-3 left-3 bg-paper/95 px-2 py-1 text-[11px] font-medium text-ink">
            {sizeLabel(listing.size)}
          </span>
        </div>
        <div className="pt-3">
          <div className="flex items-center justify-between gap-2">
            <p className="truncate text-[11px] font-semibold uppercase tracking-eyebrow text-ink">
              {listing.designer}
            </p>
            <span className="flex shrink-0 items-center gap-1 text-xs text-muted">
              <StarIcon size={12} className="fill-ink text-ink" aria-hidden="true" />
              {listing.rating.toFixed(1)}
            </span>
          </div>
          <h3 className="mt-1 truncate text-sm text-muted">{listing.title}</h3>
          <p className="mt-2 text-sm">
            <span className="font-semibold text-ink">{formatMoney(listing.price4)}</span>
            <span className="text-muted"> / 4 days</span>
            <span className="ml-2 text-xs text-muted line-through">
              <span className="sr-only">Retail price </span>
              {formatMoney(listing.retailPrice)}
            </span>
          </p>
        </div>
      </Link>
      <button
        type="button"
        onClick={() => setSaved((s) => !s)}
        aria-pressed={saved}
        aria-label={saved ? 'Remove from favorites' : 'Save to favorites'}
        className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-paper/90 text-ink transition hover:bg-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-dark">
        
        <HeartIcon
          size={16}
          className={saved ? 'fill-accent-dark text-accent-dark' : ''}
          aria-hidden="true" />
        
      </button>
    </article>);

}
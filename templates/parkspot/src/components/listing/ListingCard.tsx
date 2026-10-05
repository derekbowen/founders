import React from 'react';
import { Link } from 'react-router-dom';
import { CameraIcon, ClockIcon, UmbrellaIcon, ZapIcon } from 'lucide-react';
import { Rating } from '../common/Rating';
import { SpotTypeChip } from '../common/StatusBadge';
import { formatMoney } from '../../utils/format';
import type { Listing } from '../../types/listing';

interface ListingCardProps {
  listing: Listing;
  search?: string;
  highlighted?: boolean;
  onHover?: (id: string | null) => void;
  layout?: 'vertical' | 'horizontal';
}

export function ListingCard({ listing, search = '', highlighted, onHover, layout = 'vertical' }: ListingCardProps) {
  const href = `/l/${listing.id}${search ? `?${search}` : ''}`;
  const horizontal = layout === 'horizontal';

  return (
    <Link
      to={href}
      onMouseEnter={() => onHover?.(listing.id)}
      onMouseLeave={() => onHover?.(null)}
      onFocus={() => onHover?.(listing.id)}
      onBlur={() => onHover?.(null)}
      className={`group block rounded-2xl border bg-surface p-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
      highlighted ? 'border-ink shadow-card' : 'border-line hover:border-ink/30 hover:shadow-card'} ${
      horizontal ? 'flex gap-3' : ''}`}>
      
      <div className={`relative overflow-hidden rounded-xl bg-canvas ${horizontal ? 'h-24 w-28 shrink-0' : 'aspect-[4/3]'}`}>
        <img
          src={listing.photos[0]}
          alt={listing.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
        
        {!horizontal &&
        <div className="absolute left-2 top-2 flex gap-1.5">
            <SpotTypeChip label={listing.spotType} />
            {listing.instantBook &&
          <span className="inline-flex items-center gap-1 rounded-md bg-accent px-2 py-0.5 text-xs font-semibold text-ink">
                <ZapIcon size={12} aria-hidden /> Instant
              </span>
          }
          </div>
        }
      </div>

      <div className={horizontal ? 'min-w-0 flex-1 py-1 pr-1' : 'px-1.5 pb-1.5 pt-3'}>
        <div className="flex items-start justify-between gap-2">
          <p className="truncate text-xs font-medium uppercase tracking-wide text-muted">{listing.neighborhood}</p>
          <Rating value={listing.rating} count={horizontal ? undefined : listing.reviewCount} />
        </div>
        <h3 className="mt-1 line-clamp-2 font-semibold leading-snug">{listing.title}</h3>
        {!horizontal &&
        <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted" aria-label="Features">
            {listing.covered && <Feature icon={<UmbrellaIcon size={12} />} label="Covered" />}
            {listing.evCharging && <Feature icon={<ZapIcon size={12} />} label="EV" />}
            {listing.access247 && <Feature icon={<ClockIcon size={12} />} label="24/7" />}
            {listing.securityCamera && <Feature icon={<CameraIcon size={12} />} label="Camera" />}
          </ul>
        }
        <p className="mt-2 text-sm">
          <span className="text-base font-bold">{formatMoney(listing.hourlyPrice)}</span>
          <span className="text-muted"> /hr</span>
          <span className="text-muted"> · {formatMoney(listing.dailyPrice)} /day</span>
        </p>
      </div>
    </Link>);

}

function Feature({ icon, label }: {icon: React.ReactNode;label: string;}) {
  return (
    <li className="inline-flex items-center gap-1">
      <span aria-hidden>{icon}</span>
      {label}
    </li>);

}
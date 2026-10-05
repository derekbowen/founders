import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BadgeCheckIcon, HeartIcon } from 'lucide-react';
import type { Listing } from '../../types/marketplace';
import { formatMoney } from '../../utils/format';
import { equipmentLabel } from '../../utils/listings';
import { cn, focusRing } from '../../utils/styles';
import { Badge } from '../ui/Badge';
import { StarRating } from '../ui/StarRating';

interface ListingCardProps {
  listing: Listing;
  active?: boolean;
  onHover?: (id: string | null) => void;
  /** Optional query string (e.g. "?date=…&hours=…") carried into the listing page */
  linkSearch?: string;
}

export function ListingCard({ listing, active = false, onHover, linkSearch = '' }: ListingCardProps) {
  const [saved, setSaved] = useState(false);

  return (
    <article
      className="group relative"
      onMouseEnter={() => onHover?.(listing.id)}
      onMouseLeave={() => onHover?.(null)}>
      
      <Link to={`/kitchens/${listing.id}${linkSearch}`} className={cn('block rounded-xl', focusRing)}>
        <div className={cn('relative aspect-[4/3] overflow-hidden rounded-xl bg-steel-100 ring-2 ring-transparent transition', active && 'ring-steel-900')}>
          <img
            src={listing.images[0]}
            alt={`${listing.title} kitchen`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
          
          <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
            {listing.certifications.includes('health-permit') &&
            <Badge tone="white" icon={<BadgeCheckIcon className="h-3.5 w-3.5 text-accent" aria-hidden="true" />}>Permitted</Badge>
            }
            {listing.access247 && <Badge tone="dark">24/7</Badge>}
          </div>
        </div>
        <div className="mt-3 space-y-0.5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="line-clamp-1 text-[15px] font-semibold text-steel-900">{listing.title}</h3>
            <StarRating rating={listing.rating} className="shrink-0" />
          </div>
          <p className="text-sm text-steel-500">
            {listing.neighborhood}, {listing.city}
          </p>
          <p className="line-clamp-1 text-sm text-steel-500">{listing.keyEquipment.slice(0, 3).map(equipmentLabel).join(' · ')}</p>
          <p className="pt-1.5 text-sm">
            <span className="font-semibold text-steel-900">{formatMoney(listing.pricePerHour)}</span>
            <span className="text-steel-500"> / hour · {listing.minHours}h min</span>
          </p>
        </div>
      </Link>
      <button
        type="button"
        onClick={() => setSaved((s) => !s)}
        aria-pressed={saved}
        aria-label={saved ? `Remove ${listing.title} from saved` : `Save ${listing.title}`}
        className={cn('absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-steel-700 shadow-sm transition hover:scale-105 hover:bg-white', focusRing)}>
        
        <HeartIcon className={cn('h-4 w-4', saved && 'fill-primary text-primary')} aria-hidden="true" />
      </button>
    </article>);

}
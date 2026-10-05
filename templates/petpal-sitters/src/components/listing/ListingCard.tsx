import React from 'react';
import { Link } from 'react-router-dom';
import { BadgeCheckIcon, HeartIcon, MapPinIcon, StarIcon } from 'lucide-react';
import { useBookings } from '../../contexts/BookingsContext';
import type { Listing, ServiceId } from '../../types/marketplace';
import { cn } from '../../utils/cn';
import { formatMoney } from '../../utils/format';
import { getStartingPrice } from '../../utils/pricing';

interface ListingCardProps {
  listing: Listing;
  serviceId?: ServiceId | null;
  active?: boolean;
  onHover?: (id: string | null) => void;
}

export function ListingCard({ listing, serviceId, active, onHover }: ListingCardProps) {
  const { favorites, toggleFavorite } = useBookings();
  const isFavorite = favorites.includes(listing.id);
  const price = getStartingPrice(listing, serviceId);
  const href = serviceId ? `/l/${listing.id}?service=${serviceId}` : `/l/${listing.id}`;

  return (
    <article
      id={`listing-${listing.id}`}
      onMouseEnter={() => onHover?.(listing.id)}
      onMouseLeave={() => onHover?.(null)}
      className={cn(
        'group relative overflow-hidden rounded-3xl bg-white shadow-card ring-1 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift',
        active ? 'ring-2 ring-primary-400' : 'ring-stone-100'
      )}>
      
      <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
        <img
          src={listing.photos[0]}
          alt={`${listing.title} — photo`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy" />
        
        <button
          type="button"
          onClick={() => toggleFavorite(listing.id)}
          aria-pressed={isFavorite}
          aria-label={isFavorite ? `Remove ${listing.sitter.firstName} from favorites` : `Save ${listing.sitter.firstName} to favorites`}
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-200">
          
          <HeartIcon className={cn('h-4 w-4', isFavorite ? 'fill-red-500 text-red-500' : 'text-stone-700')} />
        </button>
        {listing.home.homeFullTime &&
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-xs font-extrabold text-accent-800 shadow-sm">
            Home full-time
          </span>
        }
        <img
          src={listing.sitter.avatar}
          alt=""
          className="absolute -bottom-6 left-4 h-12 w-12 rounded-full border-[3px] border-white object-cover shadow-md" />
        
      </div>
      <div className="px-4 pb-4 pt-8">
        <div className="flex items-center justify-between gap-2">
          <p className="flex items-center gap-1 text-sm font-extrabold text-stone-900">
            {listing.sitter.name}
            {listing.sitter.verified && <BadgeCheckIcon className="h-4 w-4 text-accent-600" aria-label="Verified sitter" />}
          </p>
          <p className="flex items-center gap-1 text-sm font-bold text-stone-800">
            <StarIcon className="h-3.5 w-3.5 fill-primary-400 text-primary-400" aria-hidden="true" />
            {listing.rating.toFixed(2)}
            <span className="font-medium text-stone-500">({listing.reviewCount})</span>
          </p>
        </div>
        <h3 className="mt-1 line-clamp-1 text-[15px] font-semibold text-stone-700">
          <Link to={href} className="after:absolute after:inset-0 focus-visible:outline-none">
            {listing.title}
          </Link>
        </h3>
        <div className="mt-3 flex items-end justify-between">
          <p className="flex items-center gap-1 text-sm text-stone-500">
            <MapPinIcon className="h-3.5 w-3.5" aria-hidden="true" />
            {listing.neighborhood}
          </p>
          <p className="text-sm text-stone-500">
            from <span className="text-lg font-black text-stone-900">{formatMoney(price.price)}</span> / {price.unitLabel}
          </p>
        </div>
      </div>
    </article>);

}
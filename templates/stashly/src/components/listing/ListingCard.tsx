import React from 'react';
import { Link } from 'react-router-dom';
import { HeartIcon, StarIcon, ThermometerIcon, ClockIcon, CarIcon } from 'lucide-react';
import type { Listing } from '../../types/marketplace';
import { sqft } from '../../data/listings';
import { spaceTypeLabel } from '../../data/spaceTypes';
import { formatMoney } from '../../utils/pricing';
import { useMarketplace } from '../../contexts/MarketplaceContext';
import { cx } from '../../utils/styles';

interface ListingCardProps {
  listing: Listing;
  active?: boolean;
  onHover?: (id: string | null) => void;
  compact?: boolean;
}

export function ListingCard({ listing, active, onHover, compact }: ListingCardProps) {
  const { favorites, toggleFavorite } = useMarketplace();
  const fav = favorites.includes(listing.id);

  return (
    <article
      onMouseEnter={() => onHover?.(listing.id)}
      onMouseLeave={() => onHover?.(null)}
      className={cx(
        'group relative overflow-hidden rounded-2xl border bg-white transition-shadow',
        active ? 'border-brand-500 shadow-lift' : 'border-stone-200 hover:shadow-lift'
      )}>
      
      <div className={cx('relative overflow-hidden bg-stone-100', compact ? 'aspect-[16/10]' : 'aspect-[4/3]')}>
        <img
          src={listing.images[0]}
          alt={listing.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
        
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-stone-800 shadow-sm">
          {spaceTypeLabel(listing.type)} · {sqft(listing)} sq ft
        </span>
        <button
          type="button"
          onClick={() => toggleFavorite(listing.id)}
          aria-pressed={fav}
          aria-label={fav ? 'Remove from saved' : 'Save space'}
          className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/95 text-stone-700 shadow-sm transition-colors hover:text-sand-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-300">
          
          <HeartIcon className={cx('h-4 w-4', fav && 'fill-sand-500 text-sand-500')} />
        </button>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="line-clamp-2 text-[15px] font-semibold leading-snug text-stone-900">
            <Link to={`/l/${listing.id}`} className="after:absolute after:inset-0 focus:outline-none focus-visible:underline">
              {listing.title}
            </Link>
          </h3>
          <span className="flex shrink-0 items-center gap-1 text-sm text-stone-700">
            <StarIcon className="h-3.5 w-3.5 fill-sand-500 text-sand-500" aria-hidden="true" />
            {listing.rating.toFixed(2)}
            <span className="sr-only">out of 5, {listing.reviewCount} reviews</span>
          </span>
        </div>
        <p className="mt-1 text-sm text-stone-600">{listing.neighborhood}, {listing.city}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {listing.climateControlled && <Feature icon={<ThermometerIcon className="h-3 w-3" />} label="Climate" />}
          {listing.access247 && <Feature icon={<ClockIcon className="h-3 w-3" />} label="24/7" />}
          {listing.vehicleStorage && <Feature icon={<CarIcon className="h-3 w-3" />} label="Vehicles" />}
        </div>
        <p className="mt-3 text-sm text-stone-600">
          <span className="text-base font-bold text-stone-900">{formatMoney(listing.monthlyPrice)}</span> / month
        </p>
      </div>
    </article>);

}

function Feature({ icon, label }: {icon: React.ReactNode;label: string;}) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-800">
      {icon}
      {label}
    </span>);

}
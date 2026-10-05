import React from 'react';
import { Link } from 'react-router-dom';
import { MapPinIcon } from 'lucide-react';
import { useListings } from '../../contexts/ListingsContext';
import type { Listing } from '../../types/marketplace';
import { formatPrice } from '../../utils/format';
import { StarRating } from '../ui/StarRating';
import { FavoriteButton } from './FavoriteButton';

export function ProductCard({ listing, showMaker = true }: {listing: Listing;showMaker?: boolean;}) {
  const { getMaker } = useListings();
  const maker = getMaker(listing.makerId);
  const soldOut = listing.stock === 0 && !listing.madeToOrder;
  const lowStock = listing.stock > 0 && listing.stock <= 5;

  let badge: {label: string;tone: string;} | null = null;
  if (soldOut) badge = { label: 'Sold out', tone: 'bg-ink text-canvas' };else
  if (listing.madeToOrder) badge = { label: 'Made to order', tone: 'bg-accent-soft text-accent-ink' };else
  if (lowStock) badge = { label: `Only ${listing.stock} left`, tone: 'bg-primary-soft text-primary-ink' };

  return (
    <article className="group relative">
      <Link to={`/l/${listing.id}`} className="block rounded-2xl">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-subtle">
          <img
            src={listing.image}
            alt={listing.title}
            loading="lazy"
            className={`h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] ${soldOut ? 'opacity-70' : ''}`} />
          
          {badge &&
          <span className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-semibold ${badge.tone}`}>{badge.label}</span>
          }
        </div>
        <div className="mt-3 space-y-1">
          <h3 className="line-clamp-1 font-sans text-sm font-medium text-ink group-hover:text-primary-ink">{listing.title}</h3>
          {showMaker && maker && <p className="text-xs text-muted">{maker.shopName}</p>}
          <div className="flex items-center justify-between gap-2 pt-0.5">
            <p className="text-sm font-semibold text-ink">{formatPrice(listing.price)}</p>
            <StarRating rating={listing.rating} count={listing.reviewCount} />
          </div>
          {listing.localPickup &&
          <p className="flex items-center gap-1 text-[11px] text-accent-ink">
              <MapPinIcon className="h-3 w-3" aria-hidden /> Pickup in {listing.shipsFrom}
            </p>
          }
        </div>
      </Link>
      <div className="absolute right-3 top-3">
        <FavoriteButton listingId={listing.id} title={listing.title} />
      </div>
    </article>);

}
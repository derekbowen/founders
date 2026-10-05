import React from 'react';
import { Link } from 'react-router-dom';
import type { Listing } from '../../types/marketplace';
import { useStore } from '../../contexts/StoreContext';
import { FileTypeBadge } from '../common/FileTypeBadge';
import { PriceTag } from '../common/PriceTag';
import { RatingStars } from '../common/RatingStars';

export function ListingCard({ listing }: {listing: Listing;}) {
  const { getCreator } = useStore();
  const creator = getCreator(listing.creatorId);

  return (
    <Link
      to={`/l/${listing.slug}`}
      className="group card card-hover flex flex-col overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2">
      
      <div className="relative aspect-[4/3] overflow-hidden border-b border-ink bg-paper">
        <img
          src={listing.cover}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]" />
        
        <div className="absolute left-3 top-3 flex gap-1.5">
          <FileTypeBadge type={listing.fileType} />
          {listing.payWhatYouWant &&
          <span className="rounded-md border border-ink bg-ink px-2 py-0.5 font-display text-[11px] font-bold text-white">
              Pay what you want
            </span>
          }
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="line-clamp-2 font-display text-base font-semibold leading-snug">{listing.title}</h3>
        {creator &&
        <div className="flex items-center gap-2 text-sm text-muted">
            <img src={creator.avatar} alt="" className="h-5 w-5 rounded-full border border-ink/20 object-cover" />
            <span className="truncate">{creator.name}</span>
          </div>
        }
        <div className="mt-auto flex items-center justify-between pt-2">
          {listing.reviewCount > 0 ?
          <RatingStars rating={listing.rating} count={listing.reviewCount} /> :

          <span className="text-xs font-semibold uppercase tracking-wider text-brand-ink">New</span>
          }
          <PriceTag listing={listing} />
        </div>
      </div>
    </Link>);

}
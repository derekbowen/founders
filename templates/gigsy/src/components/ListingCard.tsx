import React from 'react';
import { Link } from 'react-router-dom';
import { ClockIcon } from 'lucide-react';
import { Avatar } from './Avatar';
import { StarRating } from './ui/StarRating';
import { Listing } from '../types/marketplace';
import { deliveryLabel, formatMoney } from '../utils/format';
import { getCategory, getUser } from '../utils/lookup';

export function ListingCard({ listing }: {listing: Listing;}) {
  const freelancer = getUser(listing.freelancerId);
  const category = getCategory(listing.category);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-card focus-within:ring-2 focus-within:ring-primary-500">
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <img src={listing.cover} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" loading="lazy" />
        {category &&
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-slate-700 shadow-sm">{category.name}</span>
        }
      </div>
      <div className="flex flex-1 flex-col p-4">
        {freelancer &&
        <div className="flex items-center gap-2">
            <Avatar name={freelancer.name} alt="" src={freelancer.avatar} size="xs" />
            <span className="truncate text-sm font-medium text-slate-700">{freelancer.name}</span>
          </div>
        }
        <h3 className="mt-2.5 line-clamp-2 text-[15px] font-semibold leading-snug text-slate-900">
          <Link to={`/l/${listing.id}`} className="after:absolute after:inset-0 focus:outline-none">
            {listing.title}
          </Link>
        </h3>
        <div className="mt-2 flex items-center gap-3 text-sm">
          <StarRating rating={listing.rating} count={listing.reviewCount} />
          <span className="inline-flex items-center gap-1 text-slate-500">
            <ClockIcon className="h-3.5 w-3.5" aria-hidden="true" />
            {deliveryLabel(listing.deliveryDays)}
          </span>
        </div>
        <div className="flex-1" />
        <div className="mt-4 flex items-baseline justify-between border-t border-slate-100 pt-3">
          <span className="text-xs font-medium uppercase tracking-wide text-slate-500">Starting at</span>
          <span className="text-lg font-bold text-slate-900">{formatMoney(listing.startingPrice)}</span>
        </div>
      </div>
    </article>);

}
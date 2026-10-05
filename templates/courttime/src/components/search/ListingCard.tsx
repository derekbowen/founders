import React from 'react';
import { Link } from 'react-router-dom';
import { LightbulbIcon } from 'lucide-react';
import { sports } from '../../data/sports';
import { Listing } from '../../types/marketplace';
import { getNextAvailableHours } from '../../utils/availability';
import { formatDateShort, formatHour, formatMoney, fromDateKey, todayKey } from '../../utils/format';
import { Rating } from '../common/Rating';

interface ListingCardProps {
  listing: Listing;
  dateKey?: string;
  isActive?: boolean;
  onHover?: (id: string | null) => void;
}

export function ListingCard({ listing, dateKey, isActive = false, onHover }: ListingCardProps) {
  const key = dateKey ?? todayKey();
  const isToday = key === todayKey();
  const nextHours = getNextAvailableHours(listing, key, 3);
  const sport = sports.find((s) => s.id === listing.sport);
  const href = `/listing/${listing.id}`;

  return (
    <article
      onMouseEnter={() => onHover?.(listing.id)}
      onMouseLeave={() => onHover?.(null)}
      className={`group flex flex-col overflow-hidden rounded-2xl border bg-white transition-shadow hover:shadow-lg ${
      isActive ? 'border-brand ring-2 ring-brand/30' : 'border-slate-200'}`
      }>
      
      <Link to={href} className="relative block aspect-[4/3] overflow-hidden bg-slate-100" tabIndex={-1} aria-hidden="true">
        <img src={listing.images[0]} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          <span className="rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-ink shadow-sm">{sport?.label}</span>
          {listing.openPlay && <span className="rounded-full bg-accent px-2.5 py-1 text-xs font-bold text-ink shadow-sm">Open play</span>}
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-3">
          <p className="truncate text-xs font-semibold uppercase tracking-wide text-slate-500">
            {listing.clubName} · {listing.location.neighborhood}
          </p>
          <Rating rating={listing.rating} reviewCount={listing.reviewCount || undefined} className="shrink-0" />
        </div>
        <h3 className="mt-1 line-clamp-2 font-semibold leading-snug text-ink">
          <Link to={href} className="hover:text-brand focus-visible:underline focus-visible:outline-none">
            {listing.title}
          </Link>
        </h3>
        <p className="mt-1 flex items-center gap-1.5 text-sm capitalize text-slate-600">
          {listing.setting} · {listing.surface}
          {listing.lights &&
          <>
              {' · '}
              <LightbulbIcon size={13} className="text-brand" aria-hidden="true" />
              <span className="normal-case">Lights</span>
            </>
          }
        </p>
        <p className="mt-2">
          <span className="text-lg font-bold">{formatMoney(listing.pricePerHour)}</span>
          <span className="text-sm text-slate-500"> /hour</span>
          {listing.openPlay && <span className="ml-2 text-sm text-slate-600">· {formatMoney(listing.openPlay.pricePerSeat)}/seat</span>}
        </p>
        <div className="mt-auto pt-3">
          <div className="border-t border-slate-100 pt-3">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              {isToday ? 'Available today' : `Available ${formatDateShort(fromDateKey(key))}`}
            </p>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {nextHours.length ?
              nextHours.map((h) =>
              <Link
                key={h}
                to={`${href}?date=${key}&start=${h}`}
                className="rounded-lg bg-brand-soft px-2.5 py-1 text-xs font-semibold text-brand-dark transition-colors hover:bg-brand hover:text-white">
                
                    {formatHour(h)}
                  </Link>
              ) :

              <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500">Fully booked — try another day</span>
              }
            </div>
          </div>
        </div>
      </div>
    </article>);

}
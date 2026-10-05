import React from 'react';
import { Link } from 'react-router-dom';
import { UsersIcon } from 'lucide-react';
import { sports } from '../../data/sports';
import { Listing, OpenPlaySessionInstance } from '../../types/marketplace';
import { formatHour, formatMoney, pluralize } from '../../utils/format';

interface OpenPlayCardProps {
  listing: Listing;
  session: OpenPlaySessionInstance;
  dateKey: string;
}

export function OpenPlayCard({ listing, session, dateKey }: OpenPlayCardProps) {
  const sport = sports.find((s) => s.id === listing.sport);
  const taken = session.seatsTotal - session.seatsLeft;
  const isFull = session.seatsLeft === 0;
  const fillPct = Math.round(taken / session.seatsTotal * 100);

  return (
    <article className="flex w-72 shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-shadow hover:shadow-lg">
      <div className="relative h-32 bg-slate-100">
        <img src={listing.images[0]} alt="" className="h-full w-full object-cover" loading="lazy" />
        <span className="absolute bottom-3 left-3 rounded-lg bg-ink px-2.5 py-1 font-display text-lg font-bold uppercase leading-none text-accent">
          {formatHour(session.startHour)} · {session.durationHours}h
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand">{sport?.label} · {session.level}</p>
        <h3 className="mt-1 font-semibold leading-snug">{listing.clubName}</h3>
        <p className="text-sm text-slate-600">{listing.location.neighborhood}</p>
        <div className="mt-3">
          <div className="flex items-center justify-between text-xs">
            <span className="inline-flex items-center gap-1 text-slate-600">
              <UsersIcon size={13} aria-hidden="true" /> {taken}/{session.seatsTotal} players
            </span>
            <span className={`font-semibold ${isFull ? 'text-red-600' : session.seatsLeft <= 2 ? 'text-amber-700' : 'text-brand'}`}>
              {isFull ? 'Full' : `${pluralize(session.seatsLeft, 'seat')} left`}
            </span>
          </div>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-100" role="progressbar" aria-valuenow={fillPct} aria-valuemin={0} aria-valuemax={100} aria-label="Seats filled">
            <div className={`h-full rounded-full ${isFull ? 'bg-red-500' : 'bg-brand'}`} style={{ width: `${fillPct}%` }} />
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <p>
            <span className="font-bold">{formatMoney(session.pricePerSeat)}</span>
            <span className="text-sm text-slate-500"> /seat</span>
          </p>
          {isFull ?
          <span className="btn btn-sm cursor-not-allowed bg-slate-100 text-slate-500">Full</span> :

          <Link to={`/listing/${listing.id}?date=${dateKey}&session=${session.id}`} className="btn btn-accent btn-sm">
              Join
            </Link>
          }
        </div>
      </div>
    </article>);

}
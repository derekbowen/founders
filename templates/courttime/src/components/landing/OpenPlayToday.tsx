import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { addDays } from 'date-fns';
import { listings } from '../../data/listings';
import { getUpcomingOpenPlay } from '../../utils/availability';
import { toDateKey, todayKey } from '../../utils/format';
import { OpenPlayCard } from './OpenPlayCard';

export function OpenPlayToday() {
  const { items, dateKey, isToday } = useMemo(() => {
    const today = todayKey();
    const todays = getUpcomingOpenPlay(listings, today);
    if (todays.length) return { items: todays, dateKey: today, isToday: true };
    const tomorrow = toDateKey(addDays(new Date(), 1));
    return { items: getUpcomingOpenPlay(listings, tomorrow), dateKey: tomorrow, isToday: false };
  }, []);

  return (
    <section className="border-y border-slate-200 bg-white py-16" aria-labelledby="openplay-heading">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Drop in · Pay per seat</p>
            <h2 id="openplay-heading" className="heading-lg mt-2">
              Open play {isToday ? 'today' : 'tomorrow'}
            </h2>
            <p className="mt-2 max-w-lg text-slate-600">
              No partner? No problem. Grab a seat in a skill-matched session and rotate in with other players.
            </p>
          </div>
          <Link to="/search?openPlay=1" className="inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline">
            All open-play courts <ArrowRightIcon size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
      <div className="container-page mt-8">
        <div className="-mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-3 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          {items.slice(0, 10).map(({ listing, session }) =>
          <OpenPlayCard key={`${listing.id}-${session.id}`} listing={listing} session={session} dateKey={dateKey} />
          )}
        </div>
      </div>
    </section>);

}
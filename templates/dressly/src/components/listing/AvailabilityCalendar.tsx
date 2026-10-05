import React, { useState } from 'react';
import {
  addDays,
  addMonths,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  isWithinInterval,
  startOfMonth,
  startOfWeek } from
'date-fns';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import type { Listing, RentalDays } from '../../types/marketplace';
import { fromToday } from '../../utils/format';
import { isDayBooked, isWindowAvailable, rentalWindow } from '../../utils/pricing';
import { cx } from '../../utils/styles';

interface AvailabilityCalendarProps {
  listing: Listing;
  days: RentalDays;
  eventDate: Date | null;
  onSelect: (d: Date) => void;
  months?: 1 | 2;
}

const weekdays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

function Month({
  month,
  listing,
  days,
  eventDate,
  onSelect
}: Omit<AvailabilityCalendarProps, 'months'> & {month: Date;}) {
  const start = startOfWeek(startOfMonth(month), { weekStartsOn: 1 });
  const end = endOfWeek(endOfMonth(month), { weekStartsOn: 1 });
  const cells: Date[] = [];
  for (let d = start; d <= end; d = addDays(d, 1)) cells.push(d);
  const window = eventDate ? rentalWindow(eventDate, days) : null;
  const today = fromToday(0);

  return (
    <div>
      <p className="mb-3 text-center font-display text-lg text-ink">{format(month, 'MMMM yyyy')}</p>
      <div className="grid grid-cols-7 text-center text-[10px] font-semibold uppercase tracking-wider text-muted">
        {weekdays.map((w) =>
        <span key={w} className="pb-2">
            {w}
          </span>
        )}
      </div>
      <div className="grid grid-cols-7 gap-y-1" role="grid">
        {cells.map((d) => {
          if (!isSameMonth(d, month)) return <span key={d.toISOString()} aria-hidden="true" />;
          const booked = isDayBooked(listing, d);
          const past = d < addDays(today, 2);
          const available = !past && !booked && isWindowAvailable(listing, d, days);
          const selected = eventDate && isSameDay(d, eventDate);
          const inWindow = window && isWithinInterval(d, { start: window.start, end: window.end });
          return (
            <button
              key={d.toISOString()}
              type="button"
              disabled={!available}
              onClick={() => onSelect(d)}
              aria-pressed={!!selected}
              aria-label={`${format(d, 'EEEE, MMMM d')}${booked ? ', booked' : available ? '' : ', unavailable'}`}
              className={cx(
                'relative mx-auto flex h-9 w-full items-center justify-center text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-dark',
                inWindow && !selected && 'bg-accent-soft text-ink',
                selected && 'bg-ink font-semibold text-paper',
                !inWindow && available && 'text-ink hover:bg-cream',
                !available && !inWindow && 'cursor-not-allowed text-muted/50',
                booked && 'line-through'
              )}>
              
              {format(d, 'd')}
            </button>);

        })}
      </div>
    </div>);

}

export function AvailabilityCalendar({
  listing,
  days,
  eventDate,
  onSelect,
  months = 1
}: AvailabilityCalendarProps) {
  const [offset, setOffset] = useState(0);
  const base = startOfMonth(fromToday(0));
  const shown = Array.from({ length: months }, (_, i) => addMonths(base, offset + i));

  return (
    <div>
      <div className="relative">
        <div className="absolute inset-x-0 top-0 flex justify-between">
          <button
            type="button"
            onClick={() => setOffset((o) => Math.max(0, o - 1))}
            disabled={offset === 0}
            aria-label="Previous month"
            className="flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-cream disabled:opacity-30">
            
            <ChevronLeftIcon size={16} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => setOffset((o) => Math.min(5, o + 1))}
            aria-label="Next month"
            className="flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-cream">
            
            <ChevronRightIcon size={16} aria-hidden="true" />
          </button>
        </div>
        <div className={cx('grid gap-8', months === 2 && 'md:grid-cols-2')}>
          {shown.map((m) =>
          <Month
            key={m.toISOString()}
            month={m}
            listing={listing}
            days={days}
            eventDate={eventDate}
            onSelect={onSelect} />

          )}
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-4 text-[11px] text-muted">
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 bg-ink" aria-hidden="true" /> Event date
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 bg-accent-soft" aria-hidden="true" /> Rental window
        </span>
        <span className="flex items-center gap-1.5">
          <span className="text-muted/60 line-through">12</span> Booked
        </span>
      </div>
    </div>);

}
import React, { useState } from 'react';
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isAfter,
  isBefore,
  isSameDay,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek } from
'date-fns';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

interface AvailabilityCalendarProps {
  isBlocked: (date: Date) => boolean;
  rangeStart?: Date | null;
  rangeEnd?: Date | null;
  onDayClick?: (date: Date) => void;
  monthsShown?: 1 | 2;
  /** When true, blocked days remain clickable (used by sitters editing availability). */
  blockedClickable?: boolean;
  isPast?: (date: Date) => boolean;
}

const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export function AvailabilityCalendar({
  isBlocked,
  rangeStart,
  rangeEnd,
  onDayClick,
  monthsShown = 1,
  blockedClickable = false,
  isPast
}: AvailabilityCalendarProps) {
  const [cursor, setCursor] = useState(startOfMonth(rangeStart ?? new Date()));
  const months = Array.from({ length: monthsShown }, (_, i) => addMonths(cursor, i));
  const minMonth = startOfMonth(new Date());

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setCursor((c) => addMonths(c, -1))}
          disabled={!isAfter(cursor, minMonth)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-200 text-ink-700 transition hover:border-ink-400 disabled:opacity-30"
          aria-label="Previous month">
          
          <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
        </button>
        <div className={`grid flex-1 text-center ${monthsShown === 2 ? 'sm:grid-cols-2' : ''}`}>
          {months.map((m, i) =>
          <p key={m.toISOString()} className={`text-sm font-extrabold text-ink-900 ${i > 0 ? 'hidden sm:block' : ''}`} aria-live="polite">
              {format(m, 'MMMM yyyy')}
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={() => setCursor((c) => addMonths(c, 1))}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-200 text-ink-700 transition hover:border-ink-400"
          aria-label="Next month">
          
          <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <div className={`grid gap-6 ${monthsShown === 2 ? 'sm:grid-cols-2' : ''}`}>
        {months.map((month, mi) => {
          const days = eachDayOfInterval({ start: startOfWeek(startOfMonth(month)), end: endOfWeek(endOfMonth(month)) });
          return (
            <div key={month.toISOString()} className={mi > 0 ? 'hidden sm:block' : ''}>
              <div className="grid grid-cols-7 text-center text-xs font-bold text-ink-500">
                {weekdays.map((d) =>
                <span key={d} className="py-1">
                    {d}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-7 gap-y-1">
                {days.map((day) => {
                  if (!isSameMonth(day, month)) return <span key={day.toISOString()} />;
                  const past = isPast ? isPast(day) : false;
                  const blocked = isBlocked(day);
                  const isStart = rangeStart && isSameDay(day, rangeStart);
                  const isEnd = rangeEnd && isSameDay(day, rangeEnd);
                  const inRange = rangeStart && rangeEnd && isAfter(day, rangeStart) && isBefore(day, rangeEnd);
                  const disabled = past || blocked && !blockedClickable || !onDayClick;
                  const selected = isStart || isEnd;
                  return (
                    <div key={day.toISOString()} className={`flex justify-center ${inRange ? 'bg-primary-100' : ''} ${isStart && rangeEnd ? 'rounded-l-full bg-primary-100' : ''} ${isEnd ? 'rounded-r-full bg-primary-100' : ''}`}>
                      <button
                        type="button"
                        disabled={disabled}
                        onClick={() => onDayClick?.(day)}
                        aria-pressed={!!selected}
                        aria-label={`${format(day, 'EEEE, MMMM d')}${blocked ? ', unavailable' : ', available'}`}
                        className={`relative flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${
                        selected ?
                        'bg-primary-500 text-ink-900' :
                        past ?
                        'text-ink-300' :
                        blocked ?
                        `text-ink-400 line-through ${blockedClickable ? 'bg-ink-100 hover:bg-ink-200' : ''}` :
                        onDayClick ?
                        'text-ink-900 hover:bg-ink-100' :
                        'text-ink-900'} ${
                        isToday(day) && !selected ? 'ring-1 ring-ink-300' : ''} disabled:cursor-default`}>
                        
                        {format(day, 'd')}
                      </button>
                    </div>);

                })}
              </div>
            </div>);

        })}
      </div>
    </div>);

}
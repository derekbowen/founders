import React, { useState } from 'react';
import { addMonths, eachDayOfInterval, endOfMonth, format, getDay, isSameMonth, startOfMonth } from 'date-fns';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { cn } from '../../utils/cn';
import { dayFromOffset, toInputDate } from '../../utils/format';

interface AvailabilityCalendarProps {
  blocked: Set<string>;
  start?: string;
  end?: string;
  onPick?: (value: string) => void;
  /** "manage" lets sitters toggle blocked days on and off */
  mode?: 'booking' | 'manage';
}

const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export function AvailabilityCalendar({ blocked, start, end, onPick, mode = 'booking' }: AvailabilityCalendarProps) {
  const manage = mode === 'manage';
  const [offset, setOffset] = useState(0);
  const today = dayFromOffset(0);
  const todayStr = toInputDate(today);
  const months = [addMonths(startOfMonth(today), offset), addMonths(startOfMonth(today), offset + 1)];

  const navBtn =
  'flex h-9 w-9 items-center justify-center rounded-full border border-stone-200 text-stone-700 hover:border-stone-400 disabled:cursor-not-allowed disabled:opacity-40';

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <button type="button" className={navBtn} onClick={() => setOffset((o) => o - 1)} disabled={offset === 0} aria-label="Previous month">
          <ChevronLeftIcon className="h-4 w-4" />
        </button>
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-stone-600">
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-white ring-1 ring-stone-300" /> Available
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-stone-200" /> {manage ? 'Blocked' : 'Booked'}
          </span>
          {!manage &&
          <span className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-primary-500" /> Your dates
            </span>
          }
        </div>
        <button type="button" className={navBtn} onClick={() => setOffset((o) => o + 1)} disabled={offset >= 4} aria-label="Next month">
          <ChevronRightIcon className="h-4 w-4" />
        </button>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        {months.map((month, mi) => {
          const days = eachDayOfInterval({ start: month, end: endOfMonth(month) });
          const lead = getDay(month);
          return (
            <div key={month.toISOString()} className={cn(mi === 1 && 'hidden md:block')}>
              <p className="mb-3 text-center text-[15px] font-extrabold text-stone-900">{format(month, 'MMMM yyyy')}</p>
              <div className="grid grid-cols-7 gap-y-1 text-center">
                {weekdays.map((d) =>
                <span key={d} className="pb-2 text-xs font-bold text-stone-400">
                    {d}
                  </span>
                )}
                {Array.from({ length: lead }).map((_, i) =>
                <span key={`blank-${i}`} />
                )}
                {days.map((day) => {
                  const value = toInputDate(day);
                  const past = value < todayStr;
                  const isBlocked = blocked.has(value);
                  const isStart = value === start;
                  const isEnd = value === end;
                  const inRange = !!start && !!end && value > start && value < end;
                  const disabled = past || isBlocked && !manage || !isSameMonth(day, month);
                  return (
                    <div key={value} className={cn('flex justify-center', inRange && 'bg-primary-100', isStart && end && 'rounded-l-full bg-primary-100', isEnd && 'rounded-r-full bg-primary-100')}>
                      <button
                        type="button"
                        disabled={disabled}
                        onClick={() => onPick?.(value)}
                        aria-label={`${format(day, 'EEEE, MMMM d')}${isBlocked ? ', unavailable' : ''}`}
                        aria-pressed={isStart || isEnd}
                        className={cn(
                          'flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-colors',
                          past && 'text-stone-300',
                          isBlocked && !past && 'bg-stone-100 text-stone-400 line-through',
                          isBlocked && manage && !past && 'bg-stone-200 text-stone-500 hover:bg-stone-300',
                          !disabled && !isStart && !isEnd && 'text-stone-800 hover:bg-primary-50 hover:ring-1 hover:ring-primary-300',
                          value === todayStr && !isStart && 'ring-1 ring-stone-400',
                          (isStart || isEnd) && 'bg-primary-500 text-stone-900'
                        )}>
                        
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
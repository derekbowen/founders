import React from 'react';
import { getDay } from 'date-fns';
import type { DayHours } from '../../types/listing';

const dayNames: Record<string, string> = {
  Mon: 'Monday',
  Tue: 'Tuesday',
  Wed: 'Wednesday',
  Thu: 'Thursday',
  Fri: 'Friday',
  Sat: 'Saturday',
  Sun: 'Sunday'
};

export function OpeningHours({ hours }: {hours: DayHours[];}) {
  const todayIndex = (getDay(new Date()) + 6) % 7;
  return (
    <dl className="divide-y divide-line overflow-hidden rounded-xl border border-line">
      {hours.map((h, i) => {
        const isToday = i === todayIndex;
        const always = h.open === '00:00' && h.close === '24:00';
        return (
          <div key={h.day} className={`flex items-center justify-between px-4 py-2.5 text-sm ${isToday ? 'bg-brand-50' : 'bg-white'}`}>
            <dt className={isToday ? 'font-semibold text-brand-800' : 'text-ink'}>
              {dayNames[h.day]}
              {isToday && <span className="ml-2 text-xs font-medium">Today</span>}
            </dt>
            <dd className={h.open ? 'tabular-nums text-ink' : 'text-ink-subtle'}>
              {!h.open ? 'Closed' : always ? 'Open 24 hours' : `${h.open} – ${h.close}`}
            </dd>
          </div>);

      })}
    </dl>);

}
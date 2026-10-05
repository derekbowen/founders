import React from 'react';
import { format, isBefore, startOfToday } from 'date-fns';
import { AvailabilityCalendar } from '../listing/AvailabilityCalendar';
import type { StepProps } from '../../types/wizard';

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function AvailabilityStep({ draft, update }: StepProps) {
  const key = (d: Date) => format(d, 'yyyy-MM-dd');
  const isBlocked = (d: Date) => !draft.weekdays[d.getDay()] || draft.blockedDates.includes(key(d));

  const toggleDate = (d: Date) => {
    const k = key(d);
    update({ blockedDates: draft.blockedDates.includes(k) ? draft.blockedDates.filter((x) => x !== k) : [...draft.blockedDates, k] });
  };

  return (
    <div className="space-y-7">
      <fieldset>
        <legend className="field-label">Weekly schedule</legend>
        <p className="mb-3 text-sm text-ink-600">Choose the days you usually accept bookings.</p>
        <div className="flex flex-wrap gap-2">
          {dayNames.map((d, i) =>
          <button
            key={d}
            type="button"
            aria-pressed={draft.weekdays[i]}
            onClick={() => update({ weekdays: draft.weekdays.map((v, j) => j === i ? !v : v) })}
            className={`h-12 w-14 rounded-2xl border text-sm font-extrabold transition ${draft.weekdays[i] ? 'border-primary-500 bg-primary-500 text-ink-900' : 'border-ink-200 bg-white text-ink-500 hover:border-ink-400'}`}>
            
              {d}
            </button>
          )}
        </div>
      </fieldset>

      <div>
        <p className="field-label">Block specific dates</p>
        <p className="mb-3 text-sm text-ink-600">Tap a date to block or unblock it. Blocked dates can’t be booked.</p>
        <div className="rounded-3xl border border-ink-200 p-4">
          <AvailabilityCalendar
            monthsShown={2}
            isBlocked={isBlocked}
            blockedClickable
            isPast={(d) => isBefore(d, startOfToday())}
            onDayClick={toggleDate} />
          
        </div>
        <p className="mt-2 text-xs font-semibold text-ink-600">
          {draft.blockedDates.length ? `${draft.blockedDates.length} date${draft.blockedDates.length === 1 ? '' : 's'} blocked` : 'No individual dates blocked'}
        </p>
      </div>
    </div>);

}
import React from 'react';
import { format, isBefore } from 'date-fns';
import type { WizardStepProps } from '../../types/wizard';
import { monthGrid, nextMonths } from '../../utils/calendar';
import { TODAY, toISODate } from '../../utils/dates';

const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export function CalendarStep({ draft, update }: WizardStepProps) {
  const toggle = (iso: string) =>
  update({ blockedDates: draft.blockedDates.includes(iso) ? draft.blockedDates.filter((d) => d !== iso) : [...draft.blockedDates, iso] });

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center gap-5 text-sm text-ink-600">
        <span className="flex items-center gap-2">
          <span className="h-4 w-4 rounded border border-sand-300 bg-white" /> Available
        </span>
        <span className="flex items-center gap-2">
          <span className="h-4 w-4 rounded bg-ink-700" /> Blocked
        </span>
        <span className="ml-auto font-medium text-ink-900">{draft.blockedDates.length} nights blocked</span>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        {nextMonths(TODAY, 2).map((month) =>
        <div key={month.toISOString()} className="card p-5">
            <h3 className="text-center font-serif text-lg font-bold text-ink-900">{format(month, 'MMMM yyyy')}</h3>
            <div className="mt-4 grid grid-cols-7 gap-1 text-center text-xs font-semibold text-ink-500">
              {weekdays.map((d, i) =>
            <span key={i} aria-hidden="true">
                  {d}
                </span>
            )}
            </div>
            <div className="mt-2 grid grid-cols-7 gap-1">
              {monthGrid(month).map((day, i) => {
              if (!day) return <span key={i} />;
              const iso = toISODate(day);
              const past = isBefore(day, TODAY);
              const blocked = draft.blockedDates.includes(iso);
              return (
                <button
                  key={iso}
                  type="button"
                  disabled={past}
                  aria-pressed={blocked}
                  aria-label={`${format(day, 'EEEE, MMMM d')}${blocked ? ', blocked' : ''}`}
                  onClick={() => toggle(iso)}
                  className={`aspect-square rounded-lg text-sm font-medium transition ${
                  past ?
                  'cursor-not-allowed text-ink-300 line-through' :
                  blocked ?
                  'bg-ink-700 text-white hover:bg-ink-900' :
                  'text-ink-900 hover:bg-primary-50 hover:text-primary-800'}`
                  }>
                  
                    {day.getDate()}
                  </button>);

            })}
            </div>
          </div>
        )}
      </div>
    </div>);

}
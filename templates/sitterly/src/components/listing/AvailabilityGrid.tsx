import React from 'react';
import { CheckIcon } from 'lucide-react';
import { days, slots } from '../../data/filterOptions';
import { DayKey, Slot, WeeklyAvailability } from '../../types/sitter';

interface AvailabilityGridProps {
  availability: WeeklyAvailability;
  onToggle?: (day: DayKey, slot: Slot) => void;
}

export function AvailabilityGrid({ availability, onToggle }: AvailabilityGridProps) {
  const editable = !!onToggle;
  return (
    <div className="overflow-x-auto rounded-3xl border border-ink-200 bg-white">
      <table className="w-full min-w-[560px] border-collapse text-sm">
        <caption className="sr-only">Weekly availability{editable ? ' — select the times you can sit' : ''}</caption>
        <thead>
          <tr>
            <th scope="col" className="w-32 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-ink-500">
              <span className="sr-only">Time of day</span>
            </th>
            {days.map((d) =>
            <th key={d} scope="col" className="px-2 py-3 text-center text-xs font-bold uppercase tracking-wider text-ink-700">
                {d}
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {slots.map((slot) =>
          <tr key={slot.value} className="border-t border-ink-100">
              <th scope="row" className="px-4 py-3 text-left">
                <span className="block font-semibold text-ink-900">{slot.value}</span>
                <span className="block text-xs font-normal text-ink-500">{slot.hours}</span>
              </th>
              {days.map((d) => {
              const on = availability[d].includes(slot.value);
              const label = `${d} ${slot.value}: ${on ? 'available' : 'unavailable'}`;
              return (
                <td key={d} className="px-1.5 py-2 text-center">
                    {editable ?
                  <button
                    type="button"
                    aria-pressed={on}
                    aria-label={label}
                    onClick={() => onToggle?.(d, slot.value)}
                    className={`mx-auto flex h-10 w-full max-w-[56px] items-center justify-center rounded-xl transition ${
                    on ? 'bg-primary-600 text-white hover:bg-primary-700' : 'bg-ink-50 text-ink-400 ring-1 ring-inset ring-ink-200 hover:bg-primary-50 hover:ring-primary-300'}`
                    }>
                    
                        {on && <CheckIcon className="h-4 w-4" aria-hidden />}
                      </button> :

                  <span
                    aria-label={label}
                    role="img"
                    className={`mx-auto flex h-9 w-full max-w-[52px] items-center justify-center rounded-xl ${on ? 'bg-primary-100 text-primary-700' : 'bg-ink-50'}`}>
                    
                        {on && <CheckIcon className="h-4 w-4" aria-hidden />}
                      </span>
                  }
                  </td>);

            })}
            </tr>
          )}
        </tbody>
      </table>
    </div>);

}
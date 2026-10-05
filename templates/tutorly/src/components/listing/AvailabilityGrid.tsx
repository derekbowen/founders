import React, { useMemo, useState } from 'react';
import { format } from 'date-fns';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { getHourBounds, getSlotState, getUpcomingDays, toDateKey } from '../../utils/availability';
import { formatHour } from '../../utils/format';
import type { Tutor } from '../../types/marketplace';

interface AvailabilityGridProps {
  tutor: Tutor;
  selectedDateKey: string;
  selectedHour: number | null;
  selectedHours: number;
  onSelect?: (dateKey: string, hour: number) => void;
}

const WEEKS = 3;

export function AvailabilityGrid({ tutor, selectedDateKey, selectedHour, selectedHours, onSelect }: AvailabilityGridProps) {
  const [week, setWeek] = useState(0);
  const days = useMemo(() => getUpcomingDays(7, week * 7), [week]);
  const [minHour, maxHour] = getHourBounds(tutor);
  const hours = Array.from({ length: maxHour - minHour + 1 }, (_, i) => minHour + i);

  const isSelected = (key: string, hour: number) =>
  selectedHour !== null && key === selectedDateKey && hour >= selectedHour && hour < selectedHour + selectedHours;

  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-ink-800">
          {format(days[0], 'MMM d')} – {format(days[6], 'MMM d, yyyy')}
        </p>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => setWeek((w) => Math.max(0, w - 1))}
            disabled={week === 0}
            aria-label="Previous week"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-ink-200 text-ink-700 hover:bg-ink-50 disabled:cursor-not-allowed disabled:opacity-40">
            
            <ChevronLeftIcon size={16} />
          </button>
          <button
            type="button"
            onClick={() => setWeek((w) => Math.min(WEEKS - 1, w + 1))}
            disabled={week === WEEKS - 1}
            aria-label="Next week"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-ink-200 text-ink-700 hover:bg-ink-50 disabled:cursor-not-allowed disabled:opacity-40">
            
            <ChevronRightIcon size={16} />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-ink-200">
        <table className="w-full min-w-[560px] border-collapse text-sm">
          <caption className="sr-only">Weekly availability. Select an open slot to book.</caption>
          <thead>
            <tr className="bg-ink-50">
              <th scope="col" className="w-16 p-2 text-left text-xs font-medium text-ink-500">
                <span className="sr-only">Time</span>
              </th>
              {days.map((d) =>
              <th key={d.toISOString()} scope="col" className="p-2 text-center font-medium text-ink-700">
                  <span className="block text-xs text-ink-500">{format(d, 'EEE')}</span>
                  <span className="text-base font-semibold text-ink-900">{format(d, 'd')}</span>
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {hours.map((h) =>
            <tr key={h} className="border-t border-ink-100">
                <th scope="row" className="whitespace-nowrap p-2 text-left text-xs font-medium text-ink-500">
                  {formatHour(h)}
                </th>
                {days.map((d) => {
                const key = toDateKey(d);
                const state = getSlotState(tutor, d, h);
                const selected = isSelected(key, h);
                const label = `${format(d, 'EEEE MMM d')} at ${formatHour(h)}`;
                return (
                  <td key={key} className="p-1">
                      {state === 'open' ?
                    <button
                      type="button"
                      onClick={() => onSelect?.(key, h)}
                      aria-pressed={selected}
                      aria-label={`Book ${label}`}
                      className={`h-9 w-full rounded-lg text-xs font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 ${
                      selected ?
                      'bg-accent-400 text-ink-900 ring-2 ring-accent-500' :
                      'bg-primary-100 text-primary-800 hover:bg-primary-600 hover:text-white'}`
                      }>
                      
                          {selected ? 'Selected' : 'Open'}
                        </button> :
                    state === 'booked' ?
                    <div className="slot-booked h-9 w-full rounded-lg" title={`${label} · booked`} aria-label={`${label} booked`} /> :

                    <div className="h-9 w-full rounded-lg bg-white" aria-hidden="true" />
                    }
                    </td>);

              })}
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-3 flex flex-wrap gap-4 text-xs text-ink-600">
        <span className="inline-flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-primary-100" /> Open</span>
        <span className="inline-flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-accent-400" /> Your selection</span>
        <span className="inline-flex items-center gap-1.5"><span className="slot-booked h-3 w-3 rounded" /> Booked</span>
        <span>Times shown in {tutor.timezone}</span>
      </div>
    </div>);

}
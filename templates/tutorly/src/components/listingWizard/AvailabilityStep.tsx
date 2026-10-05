import React from 'react';
import { weekDays, editableHours } from '../../data/schedule';
import { availabilityPresets } from '../../data/listingWizard';
import { formatHour } from '../../utils/format';
import type { ListingDraft } from '../../hooks/useListingWizard';
import type { DayKey } from '../../types/marketplace';

interface StepProps {
  draft: ListingDraft;
  update: (patch: Partial<ListingDraft>) => void;
  showErrors: boolean;
}

export function AvailabilityStep({ draft, update, showErrors }: StepProps) {
  const total = Object.values(draft.availability).flat().length;

  const toggle = (day: DayKey, hour: number) => {
    const current = draft.availability[day];
    const next = current.includes(hour) ? current.filter((h) => h !== hour) : [...current, hour].sort((a, b) => a - b);
    update({ availability: { ...draft.availability, [day]: next } });
  };

  const applyPreset = (preset: (typeof availabilityPresets)[number]) => {
    const next = { ...draft.availability };
    preset.days.forEach((d) => {
      next[d] = Array.from(new Set([...next[d], ...preset.hours])).sort((a, b) => a - b);
    });
    update({ availability: next });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-ink-600">Quick add:</span>
        {availabilityPresets.map((p) =>
        <button
          key={p.label}
          type="button"
          onClick={() => applyPreset(p)}
          className="rounded-full border border-primary-200 bg-primary-50 px-3 py-1 text-sm font-medium text-primary-800 hover:bg-primary-100">
          
            + {p.label}
          </button>
        )}
        {total > 0 &&
        <button
          type="button"
          onClick={() => update({ availability: { mon: [], tue: [], wed: [], thu: [], fri: [], sat: [], sun: [] } })}
          className="ml-auto text-sm font-medium text-ink-600 hover:text-red-700">
          
            Clear all
          </button>
        }
      </div>

      <div className="overflow-x-auto rounded-2xl border border-ink-200">
        <table className="w-full min-w-[560px] border-collapse text-sm">
          <caption className="sr-only">Toggle the hours you are available each week</caption>
          <thead>
            <tr className="bg-ink-50">
              <th scope="col" className="w-16 p-2"><span className="sr-only">Time</span></th>
              {weekDays.map((d) =>
              <th key={d.key} scope="col" className="p-2 text-center text-xs font-semibold text-ink-700">{d.short}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {editableHours.map((h) =>
            <tr key={h} className="border-t border-ink-100">
                <th scope="row" className="whitespace-nowrap p-2 text-left text-xs font-medium text-ink-500">{formatHour(h)}</th>
                {weekDays.map((d) => {
                const on = draft.availability[d.key].includes(h);
                return (
                  <td key={d.key} className="p-1">
                      <button
                      type="button"
                      aria-pressed={on}
                      aria-label={`${d.long} ${formatHour(h)}`}
                      onClick={() => toggle(d.key, h)}
                      className={`h-8 w-full rounded-md transition ${on ? 'bg-primary-600 hover:bg-primary-700' : 'bg-ink-50 hover:bg-primary-100'}`} />
                    
                    </td>);

              })}
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <p className={`text-sm ${showErrors && total < 3 ? 'text-red-600' : 'text-ink-600'}`}>
        {total} hours per week selected{total < 3 && ' · select at least 3'}
      </p>
    </div>);

}
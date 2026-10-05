import React from 'react';
import { Toggle } from '../Toggle';
import { Checkbox } from '../Checkbox';
import { FieldError } from './FieldError';
import type { StepProps } from '../../types/listingDraft';

export function AvailabilityStep({ draft, update, errors }: StepProps) {
  const setDay = (index: number, patch: Partial<StepProps['draft']['schedule'][number]>) =>
  update({ schedule: draft.schedule.map((s, i) => i === index ? { ...s, ...patch } : s) });

  const timeCls =
  'h-10 rounded-lg border border-line bg-surface px-2 text-sm focus:border-navy focus:outline-none focus:ring-2 focus:ring-accent/60 disabled:bg-canvas disabled:text-muted';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 rounded-xl border border-line p-4">
        <div>
          <p className="font-medium">Always available</p>
          <p className="text-sm text-muted">Bookable every day, around the clock.</p>
        </div>
        <Toggle checked={draft.alwaysAvailable} onChange={(v) => update({ alwaysAvailable: v })} aria-label="Always available" />
      </div>

      {!draft.alwaysAvailable &&
      <div className="overflow-hidden rounded-xl border border-line">
          <div className="hidden grid-cols-[1fr_auto_auto] gap-4 bg-canvas px-4 py-2 text-xs font-semibold uppercase tracking-wide text-muted sm:grid">
            <span>Day</span>
            <span className="w-28">From</span>
            <span className="w-28">Until</span>
          </div>
          <ul className="divide-y divide-line">
            {draft.schedule.map((s, i) =>
          <li key={s.day} className="grid grid-cols-2 items-center gap-3 px-4 py-3 sm:grid-cols-[1fr_auto_auto] sm:gap-4">
                <div className="col-span-2 sm:col-span-1">
                  <Checkbox label={s.day} checked={s.enabled} onChange={(e) => setDay(i, { enabled: e.target.checked })} />
                </div>
                <label className="sr-only" htmlFor={`start-${s.day}`}>
                  {s.day} start
                </label>
                <input id={`start-${s.day}`} type="time" value={s.start} disabled={!s.enabled} onChange={(e) => setDay(i, { start: e.target.value })} className={`${timeCls} w-full sm:w-28`} />
                <label className="sr-only" htmlFor={`end-${s.day}`}>
                  {s.day} end
                </label>
                <input id={`end-${s.day}`} type="time" value={s.end} disabled={!s.enabled} onChange={(e) => setDay(i, { end: e.target.value })} className={`${timeCls} w-full sm:w-28`} />
              </li>
          )}
          </ul>
        </div>
      }
      <FieldError message={errors.schedule} />
      <p className="text-sm text-muted">You can block specific dates any time from your listing calendar after publishing.</p>
    </div>);

}
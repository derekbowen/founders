import React from 'react';
import { CopyIcon } from 'lucide-react';
import { Toggle } from '../Toggle';
import { DayHours, StepProps } from '../../types/listingDraft';
import { formatHour } from '../../utils/format';

const hourOptions = Array.from({ length: 20 }, (_, i) => i + 5);

export function HoursStep({ draft, update }: StepProps) {
  const setDay = (index: number, patch: Partial<DayHours>) =>
  update({ weeklyHours: draft.weeklyHours.map((d, i) => i === index ? { ...d, ...patch } : d) });
  const copyFirst = () => {
    const first = draft.weeklyHours[0];
    update({ weeklyHours: draft.weeklyHours.map((d) => ({ ...d, open: first.open, from: first.from, to: first.to })) });
  };

  return (
    <div>
      <div className="mb-3 flex justify-end">
        <button type="button" onClick={copyFirst} className="btn btn-ghost btn-sm text-brand">
          <CopyIcon size={14} aria-hidden="true" /> Copy Monday to all days
        </button>
      </div>
      <ul className="divide-y divide-slate-100 rounded-2xl border border-slate-200">
        {draft.weeklyHours.map((d, i) => {
          const invalid = d.open && d.from >= d.to;
          return (
            <li key={d.day} className="flex flex-wrap items-center gap-3 px-4 py-3">
              <span className="w-28 text-sm font-semibold">{d.day}</span>
              <Toggle size="small" aria-label={`${d.day} open`} checked={d.open} onChange={(v) => setDay(i, { open: v })} />
              {d.open ?
              <div className="flex flex-1 items-center gap-2">
                  <select className={`field w-auto py-2 ${invalid ? 'border-red-400' : ''}`} value={d.from} onChange={(e) => setDay(i, { from: Number(e.target.value) })} aria-label={`${d.day} opens`}>
                    {hourOptions.map((h) => <option key={h} value={h}>{formatHour(h)}</option>)}
                  </select>
                  <span className="text-slate-400" aria-hidden="true">–</span>
                  <select className={`field w-auto py-2 ${invalid ? 'border-red-400' : ''}`} value={d.to} onChange={(e) => setDay(i, { to: Number(e.target.value) })} aria-label={`${d.day} closes`}>
                    {hourOptions.map((h) => <option key={h} value={h}>{formatHour(h)}</option>)}
                  </select>
                  {invalid && <span className="text-xs text-red-600">Check times</span>}
                </div> :

              <span className="text-sm text-slate-500">Closed</span>
              }
            </li>);

        })}
      </ul>
    </div>);

}
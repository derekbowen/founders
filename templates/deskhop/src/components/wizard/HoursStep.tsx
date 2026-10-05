import React from 'react';
import { Toggle } from '../Toggle';
import { HOURS_ALWAYS, HOURS_STANDARD, HOURS_WEEKDAYS } from '../../data/openingHours';
import type { StepProps } from '../../types/draft';
import { timeSlots } from '../../utils/time';

const options = timeSlots('00:00', '24:00', 30);

export function HoursStep({ draft, update, errors }: StepProps) {
  function setDay(index: number, patch: {open?: string | null;close?: string | null;}) {
    update({ openingHours: draft.openingHours.map((d, i) => i === index ? { ...d, ...patch } : d) });
  }

  const presets = [
  { label: 'Business hours', value: HOURS_STANDARD },
  { label: 'Weekdays only', value: HOURS_WEEKDAYS },
  { label: '24/7', value: HOURS_ALWAYS }];


  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        <span className="self-center text-sm text-ink-muted">Quick presets:</span>
        {presets.map((p) =>
        <button key={p.label} type="button" onClick={() => update({ openingHours: p.value })} className="chip">
            {p.label}
          </button>
        )}
      </div>
      <ul className="divide-y divide-line rounded-xl border border-line">
        {draft.openingHours.map((d, i) => {
          const open = !!d.open;
          return (
            <li key={d.day} className="flex flex-wrap items-center gap-3 p-3 sm:flex-nowrap sm:px-4">
              <span className="w-12 text-sm font-semibold">{d.day}</span>
              <Toggle
                size="small"
                checked={open}
                onChange={(checked) => setDay(i, checked ? { open: '09:00', close: '18:00' } : { open: null, close: null })}
                aria-label={`${d.day} open`} />
              
              {open ?
              <div className="ml-auto flex items-center gap-2">
                  <label className="sr-only" htmlFor={`open-${d.day}`}>{d.day} opening time</label>
                  <select id={`open-${d.day}`} value={d.open ?? ''} onChange={(e) => setDay(i, { open: e.target.value })} className="field !w-28 !py-2">
                    {options.slice(0, -1).map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                  <span className="text-ink-subtle">–</span>
                  <label className="sr-only" htmlFor={`close-${d.day}`}>{d.day} closing time</label>
                  <select id={`close-${d.day}`} value={d.close ?? ''} onChange={(e) => setDay(i, { close: e.target.value })} className="field !w-28 !py-2">
                    {options.slice(1).map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div> :

              <span className="ml-auto text-sm text-ink-subtle">Closed</span>
              }
            </li>);

        })}
      </ul>
      {errors.openingHours && <p role="alert" className="text-sm text-red-700">{errors.openingHours}</p>}
    </div>);

}
import React from 'react';
import type { DaySchedule } from '../../types/marketplace';
import type { WizardStepProps } from '../../types/wizard';
import { formatHour } from '../../utils/format';
import { cn } from '../../utils/styles';
import { Button } from '../ui/Button';
import { Toggle } from '../ui/Toggle';

const hours = Array.from({ length: 25 }, (_, i) => i);
const selectClass = 'h-9 rounded-lg border border-steel-300 bg-white px-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:bg-steel-50 disabled:text-steel-400';

export function AvailabilityStep({ draft, update, errors }: WizardStepProps) {
  const setDay = (day: string, patch: Partial<DaySchedule>) =>
  update({ schedule: draft.schedule.map((s) => s.day === day ? { ...s, ...patch } : s) });

  const copyFirst = () => {
    const first = draft.schedule[0];
    update({ schedule: draft.schedule.map((s) => ({ ...s, open: first.open, start: first.start, end: first.end })) });
  };

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-steel-200 p-4">
        <Toggle checked={draft.access247} onChange={(v) => update({ access247: v })} label="24/7 keycard access" description="Renters can book any hour of any day" />
      </div>
      {!draft.access247 &&
      <div className="rounded-2xl border border-steel-200">
          <div className="flex items-center justify-between border-b border-steel-200 px-4 py-3">
            <h3 className="text-sm font-semibold text-steel-900">Weekly schedule</h3>
            <Button variant="ghost" size="sm" onClick={copyFirst}>Copy Monday to all</Button>
          </div>
          <ul className="divide-y divide-steel-100">
            {draft.schedule.map((s) =>
          <li key={s.day} className="flex flex-wrap items-center gap-3 px-4 py-3">
                <div className="flex w-36 items-center gap-3">
                  <Toggle checked={s.open} onChange={(v) => setDay(s.day, { open: v })} label={`${s.day} open`} hideLabel />
                  <span className={cn('text-sm font-medium', s.open ? 'text-steel-900' : 'text-steel-400')}>{s.day}</span>
                </div>
                {s.open ?
            <div className="flex items-center gap-2 text-sm text-steel-500">
                    <label className="sr-only" htmlFor={`start-${s.day}`}>{s.day} opens</label>
                    <select id={`start-${s.day}`} value={s.start} onChange={(e) => setDay(s.day, { start: Number(e.target.value) })} className={selectClass}>
                      {hours.slice(0, 24).map((h) =>
                <option key={h} value={h}>{formatHour(h)}</option>
                )}
                    </select>
                    to
                    <label className="sr-only" htmlFor={`end-${s.day}`}>{s.day} closes</label>
                    <select id={`end-${s.day}`} value={s.end} onChange={(e) => setDay(s.day, { end: Number(e.target.value) })} className={selectClass}>
                      {hours.filter((h) => h > s.start + 1).map((h) =>
                <option key={h} value={h}>{h === 24 ? 'Midnight' : formatHour(h)}</option>
                )}
                    </select>
                  </div> :

            <span className="text-sm text-steel-400">Closed</span>
            }
              </li>
          )}
          </ul>
        </div>
      }
      {errors.schedule && <p className="text-sm font-medium text-primary" role="alert">{errors.schedule}</p>}
    </div>);

}
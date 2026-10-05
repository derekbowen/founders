import React, { useState } from 'react';
import { ClockIcon, PlusIcon, XIcon } from 'lucide-react';
import { Chip } from '../ui/Chip';
import { Button } from '../ui/Button';
import { TextField, fieldClasses } from '../ui/TextField';
import { weekdayOptions } from '../../data/options';
import { toggleValue } from '../../hooks/useSearchFilters';
import { todayISO } from '../../utils/availability';
import type { WizardStepProps } from '../../types/listingDraft';
import { formatTime, pluralize } from '../../utils/format';

export function ScheduleStep({ draft, update }: WizardStepProps) {
  const [newTime, setNewTime] = useState('15:00');
  const perWeek = draft.weekdays.length * draft.departureTimes.length;

  const addTime = () => {
    if (!newTime || draft.departureTimes.includes(newTime)) return;
    update({ departureTimes: [...draft.departureTimes, newTime].sort() });
  };

  return (
    <div className="space-y-7">
      <fieldset>
        <legend className="mb-2 text-sm font-medium text-slate-700">Days you host</legend>
        <div className="flex flex-wrap gap-2">
          {weekdayOptions.map((d) =>
          <Chip key={d} selected={draft.weekdays.includes(d)} onClick={() => update({ weekdays: toggleValue(draft.weekdays, d) })} className="min-w-[56px] justify-center">
              {d}
            </Chip>
          )}
        </div>
      </fieldset>

      <div>
        <p className="mb-2 text-sm font-medium text-slate-700">Departure times</p>
        {draft.departureTimes.length === 0 && <p className="mb-3 text-sm text-slate-600">Add at least one departure time.</p>}
        <ul className="flex flex-wrap gap-2">
          {draft.departureTimes.map((t) =>
          <li key={t} className="inline-flex items-center gap-2 rounded-full bg-sand-100 py-1.5 pl-3.5 pr-1.5 text-sm font-semibold text-slate-800">
              <ClockIcon className="h-4 w-4 text-primary-600" aria-hidden />
              {formatTime(t)}
              <button type="button" onClick={() => update({ departureTimes: draft.departureTimes.filter((x) => x !== t) })} className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-white" aria-label={`Remove ${formatTime(t)}`}>
                <XIcon className="h-3.5 w-3.5" />
              </button>
            </li>
          )}
        </ul>
        <div className="mt-3 flex items-center gap-2">
          <label htmlFor="new-time" className="sr-only">New departure time</label>
          <input id="new-time" type="time" value={newTime} onChange={(e) => setNewTime(e.target.value)} className={`${fieldClasses} w-40 border-slate-300`} />
          <Button variant="outline" onClick={addTime} leftIcon={<PlusIcon className="h-4 w-4" />}>Add time</Button>
        </div>
      </div>

      <TextField label="First available date" type="date" min={todayISO()} value={draft.startDate} onChange={(e) => update({ startDate: e.target.value })} className="max-w-xs" hint="Leave empty to start taking bookings right away" />

      <div className="rounded-2xl bg-accent-50 p-4 text-sm text-accent-900">
        <strong>{pluralize(perWeek, 'departure')}</strong> per week · <strong>{perWeek * draft.maxGuests}</strong> seats available weekly
      </div>
    </div>);

}
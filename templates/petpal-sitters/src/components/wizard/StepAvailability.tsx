import React, { useMemo } from 'react';
import { AvailabilityCalendar } from '../listing/AvailabilityCalendar';
import { SelectField } from '../ui/SelectField';
import type { ListingWizard } from '../../hooks/useListingWizard';
import { cn } from '../../utils/cn';

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function StepAvailability({ wizard }: {wizard: ListingWizard;}) {
  const { state, update, errors } = wizard;
  const blocked = useMemo(() => new Set(state.blocked), [state.blocked]);

  return (
    <div className="space-y-7">
      <fieldset>
        <legend className="mb-2 text-sm font-bold text-stone-800">Days you usually accept bookings</legend>
        <div className="flex flex-wrap gap-2">
          {days.map((d, i) => {
            const selected = state.weekdays.includes(i);
            return (
              <button
                key={d}
                type="button"
                aria-pressed={selected}
                onClick={() => update({ weekdays: selected ? state.weekdays.filter((x) => x !== i) : [...state.weekdays, i].sort() })}
                className={cn(
                  'h-12 w-14 rounded-2xl border-2 text-sm font-extrabold transition-colors',
                  selected ? 'border-primary-500 bg-primary-500 text-stone-900' : 'border-stone-200 bg-white text-stone-600 hover:border-stone-300'
                )}>
                
                {d}
              </button>);

          })}
        </div>
        {errors.weekdays && <p className="mt-2 text-sm font-semibold text-red-600">{errors.weekdays}</p>}
      </fieldset>

      <SelectField
        id="w-notice"
        label="How much notice do you need?"
        containerClassName="max-w-sm"
        value={state.notice}
        onChange={(e) => update({ notice: e.target.value })}
        options={[
        { value: '0', label: 'Same day' },
        { value: '1', label: 'At least 1 day' },
        { value: '2', label: 'At least 2 days' },
        { value: '7', label: 'At least 1 week' }]
        } />
      

      <div className="rounded-3xl bg-white p-5 ring-1 ring-stone-200 sm:p-6">
        <p className="font-extrabold text-stone-900">Block off specific dates</p>
        <p className="mb-5 mt-0.5 text-sm text-stone-500">Tap a date to block or unblock it. {state.blocked.length > 0 && `${state.blocked.length} blocked.`}</p>
        <AvailabilityCalendar
          mode="manage"
          blocked={blocked}
          onPick={(value) => update({ blocked: blocked.has(value) ? state.blocked.filter((d) => d !== value) : [...state.blocked, value] })} />
        
      </div>
    </div>);

}
import React from 'react';
import { ChoiceCard } from '../ui/ChoiceCard';
import { Field } from '../ui/Field';
import { timeOfDayOptions, timingOptions } from '../../data/categories';
import type { TimeOfDay, Timing } from '../../types/marketplace';
import type { StepProps } from '../../types/postJob';
import { cn, inputClass, inputErrorClass } from '../../utils/styles';
import { todayISODate } from '../../utils/time';

export function StepTiming({ form, update, errors }: StepProps) {
  return (
    <div className="space-y-8">
      <fieldset>
        <legend className="mb-3 text-sm font-bold text-ink-900">When do you need it done?</legend>
        <div role="radiogroup" className="grid gap-3">
          {timingOptions.map((t) =>
          <ChoiceCard
            key={t.id}
            selected={form.timing === t.id}
            onSelect={() => update({ timing: t.id as Timing })}
            title={t.label}
            description={t.description} />

          )}
        </div>
      </fieldset>
      {form.timing !== 'asap' &&
      <Field label={form.timing === 'flexible' ? 'Around this date' : 'Date'} htmlFor="pj-date" error={errors.preferredDate}>
          <input
          id="pj-date"
          type="date"
          min={todayISODate()}
          value={form.preferredDate}
          onChange={(e) => update({ preferredDate: e.target.value })}
          aria-invalid={Boolean(errors.preferredDate)}
          className={cn(inputClass, 'sm:w-64', errors.preferredDate && inputErrorClass)} />
        
        </Field>
      }
      <fieldset>
        <legend className="mb-3 text-sm font-bold text-ink-900">Preferred time of day</legend>
        <div role="radiogroup" className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {timeOfDayOptions.map((t) =>
          <ChoiceCard
            key={t.id}
            selected={form.timeOfDay === t.id}
            onSelect={() => update({ timeOfDay: t.id as TimeOfDay })}
            title={t.label}
            description={t.description} />

          )}
        </div>
      </fieldset>
    </div>);

}
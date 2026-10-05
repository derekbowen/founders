import React from 'react';
import { Input } from '../Input';
import { Checkbox } from '../Checkbox';
import { StepProps, toggleIn } from '../../hooks/useListingDraft';
import { ageGroupOptions } from '../../data/filterOptions';
import { careTypes } from '../../data/careTypes';

export function ExperienceStep({ draft, update, errors }: StepProps) {
  return (
    <div className="space-y-8">
      <Input id="experienceYears" type="number" min={0} max={50} label="Years of childcare experience" className="max-w-[200px]" value={draft.experienceYears} error={errors.experienceYears} onChange={(e) => update({ experienceYears: e.target.value })} />

      <fieldset>
        <legend className="text-sm font-bold text-ink-900">Age groups you’re comfortable with</legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {ageGroupOptions.map((a) => {
            const on = draft.ageGroups.includes(a.value);
            return (
              <div key={a.value} className={`rounded-2xl p-3.5 ring-1 transition ${on ? 'bg-primary-50 ring-primary-300' : 'bg-white ring-ink-200'}`}>
                <Checkbox
                  checked={on}
                  onChange={() => update({ ageGroups: toggleIn(draft.ageGroups, a.value) })}
                  label={<span className="text-sm font-medium text-ink-900">{a.value} <span className="font-normal text-ink-600">· {a.hint}</span></span>} />
                
              </div>);

          })}
        </div>
        {errors.ageGroups && <p role="alert" className="mt-2 text-xs font-medium text-red-600">{errors.ageGroups}</p>}
      </fieldset>

      <fieldset>
        <legend className="text-sm font-bold text-ink-900">Types of care you offer</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {careTypes.map((c) => {
            const on = draft.careTypes.includes(c.id);
            return (
              <button
                key={c.id}
                type="button"
                aria-pressed={on}
                onClick={() => update({ careTypes: toggleIn(draft.careTypes, c.id) })}
                className={`rounded-full px-4 py-2 text-sm font-medium ring-1 ring-inset transition ${on ? 'bg-primary-600 text-white ring-primary-600' : 'bg-white text-ink-700 ring-ink-200 hover:ring-ink-400'}`}>
                
                {c.title}
              </button>);

          })}
        </div>
        {errors.careTypes && <p role="alert" className="mt-2 text-xs font-medium text-red-600">{errors.careTypes}</p>}
      </fieldset>
    </div>);

}
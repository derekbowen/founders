import React from 'react';
import { Field } from '../ui/Field';
import { boatTypes } from '../../data/boatTypes';
import { cn, inputClass } from '../../utils/ui';
import type { StepProps } from '../../types/listingDraft';

export function StepDetails({ draft, update, errors }: StepProps) {
  return (
    <div className="space-y-6">
      <Field label="Listing title" htmlFor="w-title" error={errors.title} hint="Include the make or a nickname, e.g. “Beneteau 38 ‘Windward’”.">
        <input id="w-title" value={draft.title} onChange={(e) => update({ title: e.target.value })} className={cn(inputClass, errors.title && 'border-danger')} maxLength={70} />
      </Field>

      <fieldset>
        <legend className="mb-2 text-sm font-medium text-ink">Boat type</legend>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {boatTypes.map(({ id, label, icon: Icon }) =>
          <label key={id} className={cn('flex cursor-pointer items-center gap-3 rounded-xl border p-3.5 transition-colors', draft.type === id ? 'border-navy ring-1 ring-navy' : 'border-line hover:border-navy/40')}>
              <input type="radio" name="w-type" value={id} checked={draft.type === id} onChange={() => update({ type: id })} className="sr-only" />
              <Icon className="h-5 w-5 text-navy" aria-hidden="true" />
              <span className="text-sm font-medium text-ink">{label}</span>
            </label>
          )}
        </div>
        {errors.type && <p className="mt-1.5 text-xs font-medium text-danger">{errors.type}</p>}
      </fieldset>

      <Field label="One-line summary" htmlFor="w-summary" optional hint="Shown under the title in search results.">
        <input id="w-summary" value={draft.summary} onChange={(e) => update({ summary: e.target.value })} className={inputClass} maxLength={90} />
      </Field>

      <Field label="Description" htmlFor="w-desc" error={errors.description} hint={`${draft.description.length} characters · What makes a day on your boat special?`}>
        <textarea id="w-desc" rows={6} value={draft.description} onChange={(e) => update({ description: e.target.value })} className={cn(inputClass, 'resize-y', errors.description && 'border-danger')} />
      </Field>
    </div>);

}
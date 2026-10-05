import React from 'react';
import { cities, segments } from '../../data/catalog';
import type { City } from '../../types/marketplace';
import type { WizardStepProps } from '../../types/wizard';
import { toggleValue } from '../../utils/search';
import { cn, focusRing, inputClass } from '../../utils/styles';
import { Field } from '../ui/Field';

export function KitchenDetailsStep({ draft, update, errors }: WizardStepProps) {
  return (
    <div className="space-y-5">
      <Field label="Kitchen name" htmlFor="wz-title" error={errors.title} hint="e.g. “Southside Commissary” or “Sugar Lane Pastry Studio”">
        <input id="wz-title" value={draft.title} onChange={(e) => update({ title: e.target.value })} className={cn(inputClass, errors.title && 'border-primary')} aria-invalid={!!errors.title} />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="City" htmlFor="wz-city" error={errors.city}>
          <select id="wz-city" value={draft.city} onChange={(e) => update({ city: e.target.value as City | '' })} className={cn(inputClass, errors.city && 'border-primary')} aria-invalid={!!errors.city}>
            <option value="">Select a city</option>
            {cities.map((c) =>
            <option key={c} value={c}>{c}</option>
            )}
          </select>
        </Field>
        <Field label="Neighborhood" htmlFor="wz-neighborhood" optional>
          <input id="wz-neighborhood" value={draft.neighborhood} onChange={(e) => update({ neighborhood: e.target.value })} className={inputClass} placeholder="Pilsen" />
        </Field>
      </div>
      <Field label="Street address" htmlFor="wz-address" error={errors.address} hint="Only shared with renters after a booking is approved">
        <input id="wz-address" value={draft.address} onChange={(e) => update({ address: e.target.value })} className={cn(inputClass, errors.address && 'border-primary')} autoComplete="street-address" aria-invalid={!!errors.address} />
      </Field>
      <Field label="Description" htmlFor="wz-description" optional>
        <textarea id="wz-description" rows={4} value={draft.description} onChange={(e) => update({ description: e.target.value })} className={inputClass} placeholder="Layout, loading access, parking, what makes your kitchen great…" />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Square feet" htmlFor="wz-sqft">
          <input id="wz-sqft" type="number" min={100} value={draft.squareFeet} onChange={(e) => update({ squareFeet: Number(e.target.value) })} className={inputClass} />
        </Field>
        <Field label="Work stations" htmlFor="wz-stations" hint="How many teams can cook at once">
          <input id="wz-stations" type="number" min={1} max={20} value={draft.stations} onChange={(e) => update({ stations: Number(e.target.value) })} className={inputClass} />
        </Field>
      </div>
      <fieldset>
        <legend className="mb-2 text-sm font-medium text-steel-800">Best for</legend>
        <div className="flex flex-wrap gap-2">
          {segments.map((s) => {
            const active = draft.useCases.includes(s.key);
            return (
              <button
                key={s.key}
                type="button"
                aria-pressed={active}
                onClick={() => update({ useCases: toggleValue(draft.useCases, s.key) })}
                className={cn('rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors', focusRing, active ? 'border-steel-900 bg-steel-900 text-white' : 'border-steel-300 text-steel-700 hover:border-steel-500')}>
                
                {s.label}
              </button>);

          })}
        </div>
      </fieldset>
    </div>);

}
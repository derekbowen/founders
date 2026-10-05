import React from 'react';
import { Field } from '../ui/Field';
import { Toggle } from '../ui/Toggle';
import { amenityOptions } from '../../data/listingOptions';
import { cn, inputClass } from '../../utils/ui';
import type { ListingDraft, StepProps } from '../../types/listingDraft';

export function StepSpecs({ draft, update, errors }: StepProps) {
  const text = (key: keyof ListingDraft, label: string, opts: {type?: string;placeholder?: string;suffix?: string;optional?: boolean;} = {}) =>
  <Field label={label} htmlFor={`w-${key}`} error={errors[key]} optional={opts.optional}>
      <div className="relative">
        <input
        id={`w-${key}`}
        type={opts.type ?? 'text'}
        inputMode={opts.type === 'number' ? 'numeric' : undefined}
        placeholder={opts.placeholder}
        value={draft[key] as string}
        onChange={(e) => update({ [key]: e.target.value } as Partial<ListingDraft>)}
        className={cn(inputClass, opts.suffix && 'pr-12', errors[key] && 'border-danger')} />
      
        {opts.suffix && <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-sm text-muted">{opts.suffix}</span>}
      </div>
    </Field>;


  const toggleAmenity = (a: string) => update({ included: draft.included.includes(a) ? draft.included.filter((x) => x !== a) : [...draft.included, a] });

  return (
    <div className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        {text('make', 'Make', { placeholder: 'e.g. Beneteau' })}
        {text('model', 'Model', { placeholder: 'e.g. Oceanis 38.1', optional: true })}
        {text('year', 'Year built', { type: 'number', placeholder: '2018' })}
        {text('length', 'Length', { type: 'number', suffix: 'ft' })}
        {text('capacity', 'Max guests', { type: 'number', suffix: 'ppl' })}
        {text('cabins', 'Cabins', { type: 'number', optional: true })}
      </div>
      {text('engine', 'Engine', { placeholder: 'e.g. Twin Yamaha F300 · 600 hp total' })}

      <div className="space-y-5 rounded-2xl bg-sand-light p-5">
        <Toggle id="w-fishing" label="Fishing gear on board" description="Rods, tackle or a bait well" checked={draft.fishingGear} onChange={(v) => update({ fishingGear: v })} />
        <Toggle id="w-overnight" label="Overnight stays allowed" description="Guests can sleep aboard at the dock or at anchor" checked={draft.overnight} onChange={(v) => update({ overnight: v })} />
      </div>

      <fieldset>
        <legend className="mb-3 text-sm font-medium text-ink">What’s included</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {amenityOptions.map((a) =>
          <label key={a} className="flex cursor-pointer items-center gap-3 rounded-lg p-2 text-sm text-ink hover:bg-sand-light">
              <input type="checkbox" checked={draft.included.includes(a)} onChange={() => toggleAmenity(a)} className="h-4 w-4 accent-navy" />
              {a}
            </label>
          )}
        </div>
      </fieldset>
    </div>);

}
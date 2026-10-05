import React from 'react';
import { CatIcon, DogIcon } from 'lucide-react';
import { CheckboxField } from '../ui/CheckboxField';
import { Counter } from '../ui/Counter';
import { petSizeOptions } from '../../data/services';
import type { ListingWizard } from '../../hooks/useListingWizard';
import { cn } from '../../utils/cn';

const careOptions = ['Oral medication', 'Injected medication', 'Senior pet care', 'Puppy care (under 1 year)', 'Special diets'];

export function StepPets({ wizard }: {wizard: ListingWizard;}) {
  const { state, update, errors } = wizard;
  return (
    <div className="space-y-7">
      <fieldset>
        <legend className="mb-2 text-sm font-bold text-stone-800">Dog sizes you accept</legend>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {petSizeOptions.map((s) => {
            const selected = state.sizes.includes(s.id);
            return (
              <label
                key={s.id}
                className={cn(
                  'flex cursor-pointer flex-col items-center gap-1 rounded-2xl border-2 px-3 py-4 text-center transition-colors',
                  selected ? 'border-primary-500 bg-primary-50' : 'border-stone-200 bg-white hover:border-stone-300'
                )}>
                
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={selected}
                  onChange={() => update({ sizes: selected ? state.sizes.filter((x) => x !== s.id) : [...state.sizes, s.id] })} />
                
                <DogIcon className={cn(selected ? 'text-primary-700' : 'text-stone-400', s.id === 'small' ? 'h-5 w-5' : s.id === 'medium' ? 'h-6 w-6' : s.id === 'large' ? 'h-7 w-7' : 'h-8 w-8')} aria-hidden="true" />
                <span className="font-extrabold text-stone-900">{s.label}</span>
                <span className="text-xs font-semibold text-stone-500">{s.range}</span>
              </label>);

          })}
        </div>
        {errors.sizes && <p className="mt-2 text-sm font-semibold text-red-600">{errors.sizes}</p>}
      </fieldset>

      <label
        className={cn(
          'flex cursor-pointer items-center gap-4 rounded-2xl border-2 p-4 transition-colors',
          state.acceptsCats ? 'border-primary-500 bg-primary-50' : 'border-stone-200 bg-white hover:border-stone-300'
        )}>
        
        <input type="checkbox" className="sr-only" checked={state.acceptsCats} onChange={(e) => update({ acceptsCats: e.target.checked })} />
        <CatIcon className={cn('h-7 w-7', state.acceptsCats ? 'text-primary-700' : 'text-stone-400')} aria-hidden="true" />
        <span className="flex-1">
          <span className="block font-extrabold text-stone-900">I accept cats</span>
          <span className="block text-sm text-stone-500">Show up in searches filtered for cat care</span>
        </span>
        <span className={cn('text-sm font-extrabold', state.acceptsCats ? 'text-primary-800' : 'text-stone-400')}>{state.acceptsCats ? 'Yes' : 'No'}</span>
      </label>

      <div className="rounded-2xl bg-white p-5 ring-1 ring-stone-200">
        <Counter label="Maximum pets at once" value={state.maxPets} min={1} max={5} onChange={(maxPets) => update({ maxPets })} hint="From the same household" />
      </div>

      <fieldset>
        <legend className="mb-3 text-sm font-bold text-stone-800">Special care you’re comfortable with</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {careOptions.map((c) =>
          <CheckboxField
            key={c}
            id={`care-${c.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
            label={c}
            checked={state.specialCare.includes(c)}
            onChange={(checked) => update({ specialCare: checked ? [...state.specialCare, c] : state.specialCare.filter((x) => x !== c) })} />

          )}
        </div>
      </fieldset>
    </div>);

}
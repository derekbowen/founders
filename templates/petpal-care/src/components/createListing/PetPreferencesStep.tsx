import React from 'react';
import { CatIcon, MinusIcon, PlusIcon } from 'lucide-react';
import { Checkbox } from '../Checkbox';
import { Toggle } from '../Toggle';
import { petSizes } from '../../data/services';
import type { StepProps } from '../../types/wizard';

export function PetPreferencesStep({ draft, update, errors }: StepProps) {
  return (
    <div className="space-y-7">
      {errors.pets &&
      <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700" role="alert">
          {errors.pets}
        </p>
      }
      <fieldset>
        <legend className="field-label">Dog sizes you accept</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {petSizes.map((s) => {
            const checked = draft.acceptedSizes.includes(s.id);
            return (
              <div key={s.id} className={`rounded-2xl border px-4 py-3 transition ${checked ? 'border-primary-500 bg-primary-50' : 'border-ink-200'}`}>
                <Checkbox
                  checked={checked}
                  onChange={() => update({ acceptedSizes: checked ? draft.acceptedSizes.filter((x) => x !== s.id) : [...draft.acceptedSizes, s.id] })}
                  label={
                  <span>
                      <span className="block text-sm font-extrabold text-ink-900">{s.label}</span>
                      <span className="block text-xs text-ink-600">{s.range}</span>
                    </span>
                  } />
                
              </div>);

          })}
        </div>
      </fieldset>

      <div className="flex items-center justify-between gap-4 rounded-3xl border border-ink-200 px-5 py-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent-100 text-accent-700">
            <CatIcon className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-bold text-ink-900">I care for cats</p>
            <p className="text-xs text-ink-600">Show up in “Accepts cats” searches</p>
          </div>
        </div>
        <Toggle checked={draft.acceptsCats} onChange={(v) => update({ acceptsCats: v })} aria-label="Accept cats" />
      </div>

      <div className="flex items-center justify-between gap-4 rounded-3xl border border-ink-200 px-5 py-4">
        <div>
          <p className="text-sm font-bold text-ink-900">Maximum pets per booking</p>
          <p className="text-xs text-ink-600">Including pets from the same household</p>
        </div>
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => update({ maxPets: Math.max(1, draft.maxPets - 1) })} disabled={draft.maxPets <= 1} className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-200 hover:border-ink-400 disabled:opacity-40" aria-label="Decrease">
            <MinusIcon className="h-4 w-4" aria-hidden="true" />
          </button>
          <span className="w-5 text-center text-lg font-black" aria-live="polite">
            {draft.maxPets}
          </span>
          <button type="button" onClick={() => update({ maxPets: Math.min(6, draft.maxPets + 1) })} disabled={draft.maxPets >= 6} className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-200 hover:border-ink-400 disabled:opacity-40" aria-label="Increase">
            <PlusIcon className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>);

}
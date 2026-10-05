import React from 'react';
import { CheckIcon } from 'lucide-react';
import { spaceTypes } from '../../data/spaceTypes';
import type { StepProps } from '../../types/draft';
import { getSpaceType } from '../../utils/lookup';
import { Stepper } from '../ui/Stepper';

export function SeatsStep({ draft, update }: StepProps) {
  const type = getSpaceType(draft.spaceType);
  return (
    <div className="space-y-8">
      <fieldset>
        <legend className="field-label">What kind of space is it?</legend>
        <div role="radiogroup" className="mt-2 grid gap-3 sm:grid-cols-2">
          {spaceTypes.map((t) => {
            const active = draft.spaceType === t.id;
            return (
              <button
                key={t.id}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => update({ spaceType: t.id, capacity: t.bookBy === 'seat' ? 1 : Math.max(draft.capacity, 4) })}
                className={`focus-ring relative flex gap-3 rounded-xl border p-4 text-left transition-colors ${
                active ? 'border-brand-700 bg-brand-50' : 'border-line bg-white hover:border-ink-subtle/50'}`
                }>
                
                <t.icon size={22} className={active ? 'text-brand-700' : 'text-ink-muted'} aria-hidden="true" />
                <span>
                  <span className="block text-sm font-semibold">{t.label}</span>
                  <span className="block text-xs text-ink-muted">{t.description}</span>
                </span>
                {active &&
                <span className="absolute right-3 top-3 grid h-5 w-5 place-items-center rounded-full bg-brand-700 text-white">
                    <CheckIcon size={12} aria-hidden="true" />
                  </span>
                }
              </button>);

          })}
        </div>
      </fieldset>

      <div className="divide-y divide-line rounded-xl border border-line">
        <div className="flex items-center justify-between gap-4 p-4">
          <div>
            <p className="text-sm font-semibold">Bookable {type.unit.many} per slot</p>
            <p className="text-xs text-ink-muted">How many {type.unit.many} can guests book at the same time?</p>
          </div>
          <Stepper label={`Bookable ${type.unit.many}`} value={draft.seats} min={1} max={200} onChange={(seats) => update({ seats })} />
        </div>
        {type.bookBy === 'space' &&
        <div className="flex items-center justify-between gap-4 p-4">
            <div>
              <p className="text-sm font-semibold">People per {type.unit.one}</p>
              <p className="text-xs text-ink-muted">Maximum capacity of each {type.unit.one}.</p>
            </div>
            <Stepper label="People per unit" value={draft.capacity} min={1} max={40} onChange={(capacity) => update({ capacity })} />
          </div>
        }
      </div>
    </div>);

}
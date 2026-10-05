import React from 'react';
import { storageTypes } from '../../data/catalog';
import type { DraftStorage, StorageType } from '../../types/marketplace';
import type { WizardStepProps } from '../../types/wizard';
import { cn, inputClass } from '../../utils/styles';
import { Field } from '../ui/Field';
import { Toggle } from '../ui/Toggle';

export function StorageStep({ draft, update }: WizardStepProps) {
  const set = (type: StorageType, patch: Partial<DraftStorage>) =>
  update({ storage: { ...draft.storage, [type]: { ...draft.storage[type], ...patch } } });

  return (
    <div className="space-y-4">
      <p className="text-sm text-steel-600">Storage is billed monthly on top of hourly bookings — a reliable source of recurring revenue.</p>
      {storageTypes.map((s) => {
        const value = draft.storage[s.key];
        return (
          <div key={s.key} className={cn('rounded-2xl border p-5 transition-colors', value.enabled ? 'border-accent/40 bg-accent-soft/40' : 'border-steel-200')}>
            <Toggle checked={value.enabled} onChange={(v) => set(s.key, { enabled: v })} label={s.label} description={s.description} />
            {value.enabled &&
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Field label="Capacity offered" htmlFor={`st-cap-${s.key}`} hint="e.g. 2 walk-in shelves">
                  <input id={`st-cap-${s.key}`} value={value.capacity} onChange={(e) => set(s.key, { capacity: e.target.value })} className={inputClass} />
                </Field>
                <Field label="Monthly price" htmlFor={`st-price-${s.key}`}>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-steel-500">$</span>
                    <input id={`st-price-${s.key}`} type="number" min={0} value={value.monthlyPrice} onChange={(e) => set(s.key, { monthlyPrice: Number(e.target.value) })} className={cn(inputClass, 'pl-7 pr-12')} />
                    <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-sm text-steel-500">/mo</span>
                  </div>
                </Field>
              </div>
            }
          </div>);

      })}
    </div>);

}
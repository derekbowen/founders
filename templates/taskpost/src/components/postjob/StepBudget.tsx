import React from 'react';
import { InfoIcon } from 'lucide-react';
import { Field } from '../ui/Field';
import { categories } from '../../data/categories';
import type { StepProps } from '../../types/postJob';
import { formatBudget } from '../../utils/format';
import { cn, inputClass, inputErrorClass } from '../../utils/styles';

export function StepBudget({ form, update, errors }: StepProps) {
  const category = categories.find((c) => c.id === form.categoryId);
  const [lo, hi] = category?.typicalBudget ?? [100, 300];
  const presets: [number, number][] = [
  [lo, Math.round((lo + hi) / 2)],
  [lo, hi],
  [Math.round((lo + hi) / 2), hi + 100]];


  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Minimum" htmlFor="pj-bmin" error={errors.budgetMin}>
          <div className="relative">
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-ink-500">$</span>
            <input
              id="pj-bmin"
              type="number"
              min={20}
              step={10}
              value={form.budgetMin || ''}
              onChange={(e) => update({ budgetMin: Number(e.target.value) })}
              aria-invalid={Boolean(errors.budgetMin)}
              className={cn(inputClass, 'pl-7 text-base font-bold', errors.budgetMin && inputErrorClass)} />
            
          </div>
        </Field>
        <Field label="Maximum" htmlFor="pj-bmax" error={errors.budgetMax}>
          <div className="relative">
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-ink-500">$</span>
            <input
              id="pj-bmax"
              type="number"
              min={20}
              step={10}
              value={form.budgetMax || ''}
              onChange={(e) => update({ budgetMax: Number(e.target.value) })}
              aria-invalid={Boolean(errors.budgetMax)}
              className={cn(inputClass, 'pl-7 text-base font-bold', errors.budgetMax && inputErrorClass)} />
            
          </div>
        </Field>
      </div>
      <div>
        <p className="mb-2 text-sm font-bold text-ink-900">Quick picks</p>
        <div className="flex flex-wrap gap-2">
          {presets.map(([min, max]) => {
            const active = form.budgetMin === min && form.budgetMax === max;
            return (
              <button
                key={`${min}-${max}`}
                type="button"
                aria-pressed={active}
                onClick={() => update({ budgetMin: min, budgetMax: max })}
                className={cn(
                  'rounded-full border px-4 py-2 text-sm font-bold transition-colors',
                  active ? 'border-primary-600 bg-primary-50 text-primary-800' : 'border-ink-300 text-ink-700 hover:border-ink-400'
                )}>
                
                {formatBudget(min, max)}
              </button>);

          })}
        </div>
      </div>
      <div className="flex gap-3 rounded-xl bg-ink-100 p-4 text-sm text-ink-700">
        <InfoIcon className="h-5 w-5 shrink-0 text-ink-500" aria-hidden="true" />
        <p>
          {category?.name} jobs in your area typically go for <strong>{formatBudget(lo, hi)}</strong>. Pros can offer above or below your range —
          you’re never obligated to accept.
        </p>
      </div>
    </div>);

}
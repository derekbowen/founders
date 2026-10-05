import React from 'react';
import { CheckCircle2Icon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { categories } from '../../data/categories';
import type { WizardStepProps } from '../../types/listingDraft';

export function CategoryStep({ draft, update }: WizardStepProps) {
  return (
    <div role="radiogroup" aria-label="Category" className="grid gap-3 sm:grid-cols-2">
      {categories.map(({ id, label, description, icon: Icon }) => {
        const active = draft.categoryId === id;
        return (
          <button
            key={id}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => update({ categoryId: id })}
            className={twMerge(
              'relative flex items-start gap-4 rounded-2xl border p-5 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
              active ? 'border-accent-700 bg-accent-50 ring-1 ring-accent-700' : 'border-slate-200 hover:border-slate-400'
            )}>
            
            <span className={twMerge('flex h-11 w-11 shrink-0 items-center justify-center rounded-xl', active ? 'bg-accent-700 text-white' : 'bg-primary-50 text-primary-600')}>
              <Icon className="h-5 w-5" aria-hidden />
            </span>
            <span>
              <span className="block font-display font-semibold text-slate-900">{label}</span>
              <span className="mt-0.5 block text-sm text-slate-600">{description}</span>
            </span>
            {active && <CheckCircle2Icon className="absolute right-4 top-4 h-5 w-5 text-accent-700" aria-hidden />}
          </button>);

      })}
    </div>);

}
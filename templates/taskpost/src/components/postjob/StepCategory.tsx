import React from 'react';
import { ChoiceCard } from '../ui/ChoiceCard';
import { CategoryIcon } from '../ui/CategoryIcon';
import { categories, jobSizes } from '../../data/categories';
import type { JobSize } from '../../types/marketplace';
import type { StepProps } from '../../types/postJob';

export function StepCategory({ form, update }: StepProps) {
  return (
    <div className="space-y-8">
      <fieldset>
        <legend className="mb-3 text-sm font-bold text-ink-900">Category</legend>
        <div role="radiogroup" className="grid gap-3 sm:grid-cols-2">
          {categories.map((c) =>
          <ChoiceCard
            key={c.id}
            selected={form.categoryId === c.id}
            onSelect={() =>
            update({ categoryId: c.id, budgetMin: c.typicalBudget[0], budgetMax: c.typicalBudget[1] })
            }
            title={c.name}
            description={c.examples.join(', ')}
            icon={<CategoryIcon id={c.id} className="h-5 w-5" />} />

          )}
        </div>
      </fieldset>
      <fieldset>
        <legend className="mb-3 text-sm font-bold text-ink-900">How big is the job?</legend>
        <div role="radiogroup" className="grid gap-3 sm:grid-cols-3">
          {jobSizes.map((s) =>
          <ChoiceCard
            key={s.id}
            selected={form.size === s.id}
            onSelect={() => update({ size: s.id as JobSize })}
            title={s.label}
            description={s.description} />

          )}
        </div>
      </fieldset>
    </div>);

}
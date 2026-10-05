import React from 'react';
import type { WizardStepProps } from './WizardStepProps';
import { Checkbox } from '../Checkbox';
import { Input } from '../Input';
import { categories, productValues } from '../../data/categories';

export function CategoryStep({ draft, errors, update }: WizardStepProps) {
  return (
    <div className="space-y-6">
      <fieldset>
        <legend className="mb-2 text-sm font-medium text-slate-800">Category</legend>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => {
            const selected = draft.categoryId === c.id;
            return (
              <label
                key={c.id}
                className={`flex cursor-pointer items-center gap-3 rounded-lg border p-2.5 transition-colors ${
                selected ? 'border-primary-600 bg-primary-50 ring-1 ring-primary-600' : 'border-slate-200 hover:border-slate-300'}`
                }>
                
                <input type="radio" name="category" value={c.id} checked={selected} onChange={() => update({ categoryId: c.id })} className="sr-only" />
                <img src={c.image} alt="" className="h-10 w-10 rounded-md object-cover" />
                <span>
                  <span className="block text-sm font-semibold text-slate-900">{c.name}</span>
                  <span className="block text-xs text-slate-500">{c.description}</span>
                </span>
              </label>);

          })}
        </div>
        {errors.categoryId && <p className="mt-1.5 text-xs text-red-600">{errors.categoryId}</p>}
      </fieldset>

      <fieldset>
        <legend className="mb-1 text-sm font-medium text-slate-800">Values</legend>
        <p className="mb-3 text-xs text-slate-500">Retailers filter by these. Only select values you can verify.</p>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {productValues.map((v) =>
          <Checkbox
            key={v.id}
            label={v.label}
            checked={draft.values.includes(v.id)}
            onChange={() =>
            update({ values: draft.values.includes(v.id) ? draft.values.filter((x) => x !== v.id) : [...draft.values, v.id] })
            } />

          )}
        </div>
      </fieldset>

      <div className="max-w-sm">
        <Input
          id="wiz-madein"
          label="Made in"
          placeholder="e.g. Oregon"
          value={draft.madeIn}
          onChange={(e) => update({ madeIn: e.target.value })}
          error={errors.madeIn}
          helperText="US state or country of manufacture." />
        
      </div>
    </div>);

}
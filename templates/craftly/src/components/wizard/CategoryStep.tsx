import React from 'react';
import { CheckIcon } from 'lucide-react';
import { categories } from '../../data/categories';
import { colorOptions, materialOptions } from '../../data/filters';
import type { ListingDraft } from '../../types/marketplace';
import type { WizardErrors } from '../../hooks/useListingWizard';

interface StepProps {
  draft: ListingDraft;
  update: (patch: Partial<ListingDraft>) => void;
  errors: WizardErrors;
}

const toggle = (list: string[], v: string) => list.includes(v) ? list.filter((x) => x !== v) : [...list, v];

export function CategoryStep({ draft, update, errors }: StepProps) {
  return (
    <div className="space-y-8">
      <fieldset>
        <legend className="field-label">Category</legend>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3" role="radiogroup">
          {categories.map((c) => {
            const active = draft.categoryId === c.id;
            return (
              <button
                key={c.id}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => update({ categoryId: c.id })}
                className={`flex items-center gap-3 rounded-xl border p-2 pr-3 text-left transition ${active ? 'border-primary bg-primary-soft/50 ring-1 ring-primary' : 'border-line bg-surface hover:border-muted/50'}`}>
                
                <img src={c.image} alt="" className="h-12 w-12 rounded-lg object-cover" />
                <span>
                  <span className="block text-sm font-medium">{c.name}</span>
                  <span className="block text-[11px] text-muted">{c.blurb}</span>
                </span>
              </button>);

          })}
        </div>
        {errors.categoryId && <p className="mt-2 text-xs font-medium text-danger">{errors.categoryId}</p>}
      </fieldset>

      <fieldset>
        <legend className="field-label">Materials</legend>
        <p className="-mt-1 mb-3 text-xs text-muted">Select everything the piece is made from.</p>
        <div className="flex flex-wrap gap-2">
          {materialOptions.map((m) => {
            const active = draft.materials.includes(m);
            return (
              <button
                key={m}
                type="button"
                aria-pressed={active}
                onClick={() => update({ materials: toggle(draft.materials, m) })}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm transition-colors ${active ? 'border-accent-ink bg-accent-ink text-white' : 'border-line bg-surface hover:border-muted/50'}`}>
                
                {active && <CheckIcon className="h-3.5 w-3.5" aria-hidden />}
                {m}
              </button>);

          })}
        </div>
        {errors.materials && <p className="mt-2 text-xs font-medium text-danger">{errors.materials}</p>}
      </fieldset>

      <fieldset>
        <legend className="field-label">Colors (optional)</legend>
        <div className="flex flex-wrap gap-3">
          {colorOptions.map((c) => {
            const active = draft.colors.includes(c.name);
            return (
              <button
                key={c.name}
                type="button"
                aria-pressed={active}
                onClick={() => update({ colors: toggle(draft.colors, c.name) })}
                className={`flex items-center gap-2 rounded-full border py-1 pl-1 pr-3 text-sm transition ${active ? 'border-ink bg-surface ring-1 ring-ink' : 'border-line bg-surface hover:border-muted/50'}`}>
                
                <span className="h-6 w-6 rounded-full border border-ink/10" style={{ backgroundColor: c.hex }} aria-hidden />
                {c.name}
              </button>);

          })}
        </div>
      </fieldset>
    </div>);

}
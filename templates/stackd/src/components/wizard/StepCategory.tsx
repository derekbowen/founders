import React from 'react';
import { CheckIcon } from 'lucide-react';
import { categories } from '../../data/categories';
import { CategoryIcon } from '../common/CategoryIcon';
import type { DraftErrors, ListingDraft } from '../../hooks/useListingDraft';

interface StepProps {
  draft: ListingDraft;
  errors: DraftErrors;
  update: (patch: Partial<ListingDraft>) => void;
}

export function StepCategory({ draft, errors, update }: StepProps) {
  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2" role="radiogroup" aria-label="Category" aria-describedby="category-msg">
        {categories.map((c) => {
          const active = draft.category === c.id;
          return (
            <button
              key={c.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => update({ category: c.id })}
              className={`relative flex items-center gap-4 rounded-xl border p-4 text-left transition ${
              active ? 'border-ink shadow-pop' : 'border-ink/20 hover:border-ink'}`
              }
              style={{ backgroundColor: active ? c.tint : undefined }}>
              
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-ink bg-white">
                <CategoryIcon id={c.id} />
              </span>
              <span>
                <span className="block font-display font-bold">{c.name}</span>
                <span className="block text-sm text-muted">{c.blurb}</span>
              </span>
              {active &&
              <span className="absolute right-3 top-3 grid h-5 w-5 place-items-center rounded-full bg-ink text-white">
                  <CheckIcon className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                </span>
              }
            </button>);

        })}
      </div>
      {errors.category &&
      <p id="category-msg" className="mt-3 text-sm text-danger">
          {errors.category}
        </p>
      }
    </div>);

}
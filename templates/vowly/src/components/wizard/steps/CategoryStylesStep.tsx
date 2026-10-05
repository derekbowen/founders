import React from "react";
import { CheckIcon } from "lucide-react";
import { categories } from "../../../data/categories";
import { styleTags } from "../../../data/filters";
import { MAX_STYLES } from "../../../data/wizardSteps";
import { chipClasses } from "../../../utils/chipClasses";
import type { ListingWizard } from "../useListingDraft";

export function CategoryStylesStep({ wizard }: {wizard: ListingWizard;}) {
  const { draft, update, toggle, errors } = wizard;
  const atMax = draft.styles.length >= MAX_STYLES;

  return (
    <div className="space-y-8">
      <fieldset>
        <legend className="mb-3 text-sm font-medium text-ink">Category</legend>
        <div id="lw-category" tabIndex={-1} className="grid grid-cols-2 gap-3 focus:outline-none sm:grid-cols-4">
          {categories.map((c) => {
            const selected = draft.category === c.id;
            return (
              <label
                key={c.id}
                className={`group relative cursor-pointer overflow-hidden rounded-2xl border-2 transition-colors focus-within:ring-2 focus-within:ring-primary ${
                selected ? "border-primary" : "border-transparent hover:border-line"}`
                }>
                
                <input type="radio" name="category" value={c.id} checked={selected} onChange={() => update({ category: c.id })} className="sr-only" />
                <div className="aspect-[4/3] overflow-hidden bg-blush">
                  <img src={c.image} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="bg-surface px-3 py-2.5">
                  <span className="text-sm font-medium text-ink">{c.label}</span>
                </div>
                {selected &&
                <span className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white">
                    <CheckIcon aria-hidden="true" className="h-3.5 w-3.5" />
                  </span>
                }
              </label>);

          })}
        </div>
        {errors.category && <p className="mt-2 text-xs text-danger">{errors.category}</p>}
      </fieldset>

      <fieldset>
        <div className="mb-3 flex items-baseline justify-between">
          <legend className="text-sm font-medium text-ink">Your style</legend>
          <span className="text-xs text-muted">{draft.styles.length}/{MAX_STYLES} selected</span>
        </div>
        <div id="lw-styles" tabIndex={-1} className="flex flex-wrap gap-2 focus:outline-none">
          {styleTags.map((tag) => {
            const selected = draft.styles.includes(tag);
            return (
              <button key={tag} type="button" aria-pressed={selected} disabled={!selected && atMax} onClick={() => toggle("styles", tag, MAX_STYLES)} className={chipClasses(selected)}>
                {tag}
              </button>);

          })}
        </div>
        {errors.styles && <p className="mt-2 text-xs text-danger">{errors.styles}</p>}
        <p className="mt-3 text-xs text-muted">Style tags help couples filter search results — pick the ones that truly describe your work.</p>
      </fieldset>
    </div>);

}
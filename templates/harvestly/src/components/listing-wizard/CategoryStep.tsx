import React from "react";
import { CheckIcon } from "lucide-react";
import { categories } from "../../data/categories";
import { DraftErrors, ListingDraft } from "../../hooks/useListingWizard";
import { Practice } from "../../types/marketplace";
import { CategoryIcon } from "../marketplace/CategoryIcon";

const allPractices: Practice[] = [
"Certified organic",
"No-spray",
"Heirloom",
"Pasture-raised",
"Grass-fed",
"Regenerative",
"Free-range",
"Raw & unfiltered",
"Wood-fired",
"Small batch"];


interface Props {
  draft: ListingDraft;
  errors: DraftErrors;
  patch: (p: Partial<ListingDraft>) => void;
}

export function CategoryStep({ draft, errors, patch }: Props) {
  function togglePractice(p: Practice) {
    const has = draft.practices.includes(p);
    const practices = has ? draft.practices.filter((x) => x !== p) : [...draft.practices, p];
    patch({ practices, organic: practices.includes("Certified organic") });
  }

  return (
    <div className="space-y-8">
      <fieldset>
        <legend className="field-label">Category</legend>
        <div role="radiogroup" className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {categories.map((c) => {
            const selected = draft.category === c.id;
            return (
              <button
                key={c.id}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => patch({ category: c.id })}
                className={`flex flex-col items-start gap-2 rounded-xl border p-4 text-left transition ${
                selected ? "border-primary bg-primary-soft/50 ring-1 ring-primary" : "border-line bg-white hover:border-primary/40"}`
                }>
                
                <CategoryIcon id={c.id} className={`h-5 w-5 ${selected ? "text-primary" : "text-muted"}`} />
                <span className="text-sm font-semibold text-ink">{c.label}</span>
              </button>);

          })}
        </div>
        {errors.category && <p className="mt-2 text-xs font-medium text-danger">{errors.category}</p>}
      </fieldset>

      <fieldset>
        <legend className="field-label">Growing practices</legend>
        <p className="mb-3 text-xs text-muted">Select all that apply. These appear as badges on your listing.</p>
        <div className="flex flex-wrap gap-2">
          {allPractices.map((p) => {
            const on = draft.practices.includes(p);
            return (
              <button
                key={p}
                type="button"
                aria-pressed={on}
                onClick={() => togglePractice(p)}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-medium transition ${
                on ? "border-primary bg-primary text-white" : "border-line bg-white text-ink hover:border-primary/40"}`
                }>
                
                {on && <CheckIcon className="h-3.5 w-3.5" aria-hidden="true" />}
                {p}
              </button>);

          })}
        </div>
      </fieldset>
    </div>);

}
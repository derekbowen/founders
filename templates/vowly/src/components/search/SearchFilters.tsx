import React from "react";
import { categories } from "../../data/categories";
import { languages, priceRanges, styleTags } from "../../data/filters";
import { FilterGroup } from "./FilterGroup";
import type { VendorSearch } from "../../hooks/useVendorSearch";

interface SearchFiltersProps {
  search: VendorSearch;
}

const chip = (active: boolean) =>
`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
active ? "border-primary bg-primary text-white" : "border-line bg-surface text-ink hover:border-ink/30"}`;


const smallInput =
"h-10 w-full rounded-lg border border-line bg-surface px-3 text-sm text-ink placeholder:text-muted/70 hover:border-ink/25 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";

export function SearchFilters({ search }: SearchFiltersProps) {
  const { filters, update, toggleInList, clearAll, activeCount } = search;

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-display text-2xl font-semibold text-ink">Filters</h2>
        <button
          type="button"
          onClick={clearAll}
          disabled={activeCount === 0}
          className="text-sm font-medium text-primary underline-offset-4 hover:underline disabled:cursor-not-allowed disabled:text-muted/60 disabled:no-underline">
          
          Clear all
        </button>
      </div>

      <FilterGroup title="Category" id="f-category">
        <div className="flex flex-col gap-1">
          {[{ id: "", label: "All vendors" }, ...categories].map((c) =>
          <label key={c.id || "all"} className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-1.5 text-sm text-ink hover:bg-blush/40">
              <input
              type="radio"
              name="category"
              checked={filters.category === c.id}
              onChange={() => update({ category: c.id })}
              className="h-4 w-4 accent-primary" />
            
              {c.label}
            </label>
          )}
        </div>
      </FilterGroup>

      <FilterGroup title="Starting price" id="f-price">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label htmlFor="f-min" className="mb-1 block text-xs text-muted">Min ($)</label>
            <input id="f-min" type="number" min={0} inputMode="numeric" placeholder="0" value={filters.minPrice} onChange={(e) => update({ minPrice: e.target.value })} className={smallInput} />
          </div>
          <div>
            <label htmlFor="f-max" className="mb-1 block text-xs text-muted">Max ($)</label>
            <input id="f-max" type="number" min={0} inputMode="numeric" placeholder="Any" value={filters.maxPrice} onChange={(e) => update({ maxPrice: e.target.value })} className={smallInput} />
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {priceRanges.map((r) => {
            const active = filters.minPrice === r.min && filters.maxPrice === r.max;
            return (
              <button
                key={r.label}
                type="button"
                aria-pressed={active}
                onClick={() => update(active ? { minPrice: "", maxPrice: "" } : { minPrice: r.min, maxPrice: r.max })}
                className={chip(active)}>
                
                {r.label}
              </button>);

          })}
        </div>
      </FilterGroup>

      <FilterGroup title="Style" id="f-style">
        <div className="flex flex-wrap gap-2">
          {styleTags.map((tag) => {
            const active = filters.styles.includes(tag);
            return (
              <button key={tag} type="button" aria-pressed={active} onClick={() => toggleInList("styles", tag)} className={chip(active)}>
                {tag}
              </button>);

          })}
        </div>
      </FilterGroup>

      <FilterGroup title="Guest count" id="f-guests">
        <label htmlFor="f-guests-input" className="mb-1 block text-xs text-muted">Can accommodate</label>
        <div className="relative">
          <input
            id="f-guests-input"
            type="number"
            min={1}
            inputMode="numeric"
            placeholder="e.g. 150"
            value={filters.guests}
            onChange={(e) => update({ guests: e.target.value })}
            className={`${smallInput} pr-16`} />
          
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted">guests</span>
        </div>
      </FilterGroup>

      <FilterGroup title="Languages" id="f-languages">
        <div className="grid grid-cols-2 gap-1">
          {languages.map((lang) =>
          <label key={lang} className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm text-ink hover:bg-blush/40">
              <input
              type="checkbox"
              checked={filters.languages.includes(lang)}
              onChange={() => toggleInList("languages", lang)}
              className="h-4 w-4 rounded accent-primary" />
            
              {lang}
            </label>
          )}
        </div>
      </FilterGroup>

      <FilterGroup title="Available on" id="f-date">
        <label htmlFor="f-date-input" className="mb-1 block text-xs text-muted">Your wedding date</label>
        <input
          id="f-date-input"
          type="date"
          min="2026-10-01"
          value={filters.date}
          onChange={(e) => update({ date: e.target.value })}
          className={smallInput} />
        
        <p className="mt-2 text-xs text-muted">Hides vendors already booked on this date.</p>
      </FilterGroup>
    </div>);

}
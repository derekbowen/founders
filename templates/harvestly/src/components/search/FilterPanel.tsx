import React from "react";
import { categories } from "../../data/categories";
import { DISTANCE_MAX, PRICE_MAX, SearchFilters } from "../../hooks/useProductSearch";
import { formatPrice } from "../../utils/format";

interface FilterPanelProps {
  filters: SearchFilters;
  update: (patch: Partial<Record<string, string | null>>) => void;
}

function Toggle({ id, label, hint, checked, onChange }: {id: string;label: string;hint: string;checked: boolean;onChange: (v: boolean) => void;}) {
  return (
    <label htmlFor={id} className="flex cursor-pointer items-start justify-between gap-4 py-1">
      <span>
        <span className="block text-sm font-medium text-ink">{label}</span>
        <span className="block text-xs text-muted">{hint}</span>
      </span>
      <span className="relative mt-0.5 inline-flex shrink-0">
        <input id={id} type="checkbox" className="peer sr-only" checked={checked} onChange={(e) => onChange(e.target.checked)} />
        <span className="h-6 w-11 rounded-full bg-line transition peer-checked:bg-primary peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2" />
        <span className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition peer-checked:translate-x-5" />
      </span>
    </label>);

}

export function FilterPanel({ filters, update }: FilterPanelProps) {
  return (
    <div className="space-y-7">
      <fieldset>
        <legend className="mb-3 text-sm font-semibold text-ink">Category</legend>
        <div className="flex flex-wrap gap-2">
          {[{ id: "", label: "All" }, ...categories].map((c) => {
            const active = filters.category === c.id;
            return (
              <button
                key={c.id || "all"}
                type="button"
                aria-pressed={active}
                onClick={() => update({ category: c.id || null })}
                className={`rounded-full border px-3 py-1.5 text-sm font-medium transition ${
                active ? "border-primary bg-primary text-white" : "border-line bg-white text-ink hover:border-primary/40"}`
                }>
                
                {c.label}
              </button>);

          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-3 text-sm font-semibold text-ink">Get it by</legend>
        <div className="grid grid-cols-3 gap-2 rounded-full bg-ink/5 p-1">
          {[
          { v: "", l: "Either" },
          { v: "pickup", l: "Pickup" },
          { v: "delivery", l: "Delivery" }].
          map((o) =>
          <button
            key={o.l}
            type="button"
            aria-pressed={filters.fulfillment === o.v}
            onClick={() => update({ fulfillment: o.v || null })}
            className={`rounded-full py-2 text-sm font-medium transition ${
            filters.fulfillment === o.v ? "bg-white text-ink shadow-card" : "text-muted hover:text-ink"}`
            }>
            
              {o.l}
            </button>
          )}
        </div>
      </fieldset>

      <div className="space-y-3">
        <Toggle
          id="f-organic"
          label="Certified organic"
          hint="USDA or NOFA-NY certified"
          checked={filters.organic}
          onChange={(v) => update({ organic: v ? "1" : null })} />
        
        <Toggle
          id="f-instock"
          label="In stock only"
          hint="Hide sold-out items"
          checked={filters.inStock}
          onChange={(v) => update({ instock: v ? "1" : null })} />
        
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <label htmlFor="f-distance" className="text-sm font-semibold text-ink">
            Distance
          </label>
          <span className="text-sm text-muted">Within {filters.maxDistance} mi</span>
        </div>
        <input
          id="f-distance"
          type="range"
          min={2}
          max={DISTANCE_MAX}
          value={filters.maxDistance}
          onChange={(e) => update({ distance: Number(e.target.value) === DISTANCE_MAX ? null : e.target.value })}
          className="w-full accent-[rgb(var(--c-primary))]" />
        
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <label htmlFor="f-price" className="text-sm font-semibold text-ink">
            Max price per unit
          </label>
          <span className="text-sm text-muted">
            {filters.maxPrice >= PRICE_MAX ? "Any" : formatPrice(filters.maxPrice)}
          </span>
        </div>
        <input
          id="f-price"
          type="range"
          min={2}
          max={PRICE_MAX}
          value={filters.maxPrice}
          onChange={(e) => update({ price: Number(e.target.value) === PRICE_MAX ? null : e.target.value })}
          className="w-full accent-[rgb(var(--c-primary))]" />
        
      </div>
    </div>);

}
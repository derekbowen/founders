import React, { useEffect, useState } from 'react';
import { CheckIcon } from 'lucide-react';
import { categories } from '../../data/categories';
import { colorOptions, materialOptions, shipsFromOptions } from '../../data/filters';
import { useListings } from '../../contexts/ListingsContext';
import type { SearchFilters } from '../../hooks/useSearchFilters';
import { CheckboxField } from '../ui/CheckboxField';
import { FilterGroup } from './FilterGroup';

interface FilterSidebarProps {
  filters: SearchFilters;
  toggleInList: (key: 'categories' | 'materials' | 'colors' | 'shipsFrom', value: string) => void;
  setParam: (key: string, value: string | null) => void;
  setPriceRange: (min: number | null, max: number | null) => void;
}

const priceChips = [
{ label: 'Under $50', min: null, max: 50 },
{ label: '$50–$100', min: 50, max: 100 },
{ label: '$100+', min: 100, max: null }];


export function FilterSidebar({ filters, toggleInList, setParam, setPriceRange }: FilterSidebarProps) {
  const { listings } = useListings();
  const [min, setMin] = useState(filters.minPrice?.toString() ?? '');
  const [max, setMax] = useState(filters.maxPrice?.toString() ?? '');
  const [showAllMaterials, setShowAllMaterials] = useState(false);

  useEffect(() => {
    setMin(filters.minPrice?.toString() ?? '');
    setMax(filters.maxPrice?.toString() ?? '');
  }, [filters.minPrice, filters.maxPrice]);

  const applyPrice = (e: React.FormEvent) => {
    e.preventDefault();
    setPriceRange(min ? Number(min) : null, max ? Number(max) : null);
  };

  const visibleMaterials = showAllMaterials ? materialOptions : materialOptions.slice(0, 7);

  return (
    <div>
      <FilterGroup title="Category">
        {categories.map((c) =>
        <CheckboxField
          key={c.id}
          label={c.name}
          checked={filters.categories.includes(c.id)}
          onChange={() => toggleInList('categories', c.id)}
          count={listings.filter((l) => l.categoryId === c.id).length} />

        )}
      </FilterGroup>

      <FilterGroup title="Price">
        <div className="mb-3 flex flex-wrap gap-2">
          {priceChips.map((p) => {
            const active = filters.minPrice === p.min && filters.maxPrice === p.max;
            return (
              <button
                key={p.label}
                type="button"
                onClick={() => active ? setPriceRange(null, null) : setPriceRange(p.min, p.max)}
                aria-pressed={active}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                active ? 'border-primary bg-primary-soft text-primary-ink' : 'border-line bg-surface text-ink hover:border-muted/50'}`
                }>
                
                {p.label}
              </button>);

          })}
        </div>
        <form onSubmit={applyPrice} className="flex items-end gap-2">
          <label className="flex-1 text-xs text-muted">
            Min
            <input type="number" min={0} inputMode="numeric" value={min} onChange={(e) => setMin(e.target.value)} placeholder="$0" className="field-input mt-1 !py-2" />
          </label>
          <span className="pb-2.5 text-muted">–</span>
          <label className="flex-1 text-xs text-muted">
            Max
            <input type="number" min={0} inputMode="numeric" value={max} onChange={(e) => setMax(e.target.value)} placeholder="$500" className="field-input mt-1 !py-2" />
          </label>
          <button type="submit" className="h-[38px] rounded-lg bg-ink px-3 text-xs font-semibold text-canvas hover:bg-ink/90">
            Go
          </button>
        </form>
      </FilterGroup>

      <FilterGroup title="Materials">
        {visibleMaterials.map((m) =>
        <CheckboxField key={m} label={m} checked={filters.materials.includes(m)} onChange={() => toggleInList('materials', m)} />
        )}
        <button type="button" onClick={() => setShowAllMaterials((s) => !s)} className="mt-2 text-xs font-medium text-primary-ink hover:underline">
          {showAllMaterials ? 'Show fewer' : `Show all ${materialOptions.length}`}
        </button>
      </FilterGroup>

      <FilterGroup title="Color">
        <div className="grid grid-cols-4 gap-3">
          {colorOptions.map((c) => {
            const active = filters.colors.includes(c.name);
            return (
              <button
                key={c.name}
                type="button"
                onClick={() => toggleInList('colors', c.name)}
                aria-pressed={active}
                className="group flex flex-col items-center gap-1.5">
                
                <span
                  className={`relative flex h-8 w-8 items-center justify-center rounded-full border transition ${active ? 'border-ink ring-2 ring-primary ring-offset-2 ring-offset-canvas' : 'border-ink/10 group-hover:scale-110'}`}
                  style={{ backgroundColor: c.hex }}>
                  
                  {active && <CheckIcon className="h-3.5 w-3.5 text-white mix-blend-difference" aria-hidden />}
                </span>
                <span className="text-[10px] leading-tight text-muted">{c.name}</span>
              </button>);

          })}
        </div>
      </FilterGroup>

      <FilterGroup title="Availability">
        <CheckboxField
          label="Made to order"
          description="Crafted after you order — allow extra time"
          checked={filters.madeToOrder}
          onChange={(e) => setParam('madeToOrder', e.target.checked ? '1' : null)} />
        
        <CheckboxField
          label="Local pickup available"
          description="Collect from the maker’s studio"
          checked={filters.pickup}
          onChange={(e) => setParam('pickup', e.target.checked ? '1' : null)} />
        
      </FilterGroup>

      <FilterGroup title="Ships from">
        {shipsFromOptions.map((s) =>
        <CheckboxField key={s} label={s} checked={filters.shipsFrom.includes(s)} onChange={() => toggleInList('shipsFrom', s)} />
        )}
      </FilterGroup>
    </div>);

}
import React from 'react';
import { FilterPopover } from './FilterPopover';
import { FilterField } from './FilterField';
import { categories, jobSizes } from '../../data/categories';
import { BUDGET_CEILING, BUDGET_FLOOR, defaultFilters } from '../../hooks/useJobSearch';
import type { SearchFilters } from '../../types/marketplace';

interface FilterBarProps {
  filters: SearchFilters;
  onChange: (patch: Partial<SearchFilters>) => void;
  onReset: () => void;
  activeCount: number;
}

const dateLabels: Record<string, string> = { '7': 'Next 7 days', '14': 'Next 2 weeks', '30': 'Next 30 days' };

export function FilterBar({ filters, onChange, onReset, activeCount }: FilterBarProps) {
  const categoryLabel =
  filters.categories.length === 1 ?
  categories.find((c) => c.id === filters.categories[0])?.name :
  filters.categories.length > 1 ?
  `Category · ${filters.categories.length}` :
  undefined;
  const budgetActive = filters.budgetMin !== BUDGET_FLOOR || filters.budgetMax !== BUDGET_CEILING;
  const sizeLabel = filters.sizes.length ?
  filters.sizes.map((s) => jobSizes.find((j) => j.id === s)?.label).join(', ') :
  undefined;

  return (
    <div className="hidden flex-wrap items-center gap-2 md:flex">
      <FilterPopover label="Category" activeLabel={categoryLabel} onClear={() => onChange({ categories: [] })}>
        <FilterField type="category" filters={filters} onChange={onChange} idPrefix="bar" />
      </FilterPopover>
      <FilterPopover
        label="Budget"
        activeLabel={budgetActive ? `$${filters.budgetMin}–${filters.budgetMax}` : undefined}
        onClear={() => onChange({ budgetMin: BUDGET_FLOOR, budgetMax: BUDGET_CEILING })}>
        
        <FilterField type="budget" filters={filters} onChange={onChange} idPrefix="bar" />
      </FilterPopover>
      <FilterPopover
        label="Date needed"
        activeLabel={filters.date !== 'any' ? dateLabels[filters.date] : undefined}
        onClear={() => onChange({ date: 'any' })}>
        
        <FilterField type="date" filters={filters} onChange={onChange} idPrefix="bar" />
      </FilterPopover>
      <FilterPopover
        label="Distance"
        activeLabel={filters.maxDistance !== defaultFilters.maxDistance ? `Within ${filters.maxDistance} mi` : undefined}
        onClear={() => onChange({ maxDistance: defaultFilters.maxDistance })}>
        
        <FilterField type="distance" filters={filters} onChange={onChange} idPrefix="bar" />
      </FilterPopover>
      <FilterPopover label="Job size" activeLabel={sizeLabel} onClear={() => onChange({ sizes: [] })}>
        <FilterField type="size" filters={filters} onChange={onChange} idPrefix="bar" />
      </FilterPopover>
      {activeCount > 0 &&
      <button
        type="button"
        onClick={onReset}
        className="ml-1 text-sm font-bold text-ink-600 underline-offset-2 hover:text-ink-900 hover:underline">
        
          Clear all
        </button>
      }
    </div>);

}
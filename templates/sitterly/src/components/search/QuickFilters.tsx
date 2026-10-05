import React from 'react';
import { SlidersHorizontalIcon } from 'lucide-react';
import { SearchFilters, SortKey } from '../../types/search';
import { sortOptions } from '../../data/filterOptions';
import { SelectField } from '../ui/SelectField';

interface QuickFiltersProps {
  filters: SearchFilters;
  setFilters: React.Dispatch<React.SetStateAction<SearchFilters>>;
  activeCount: number;
  onOpenAll: () => void;
  sort: SortKey;
  setSort: (s: SortKey) => void;
}

export function QuickFilters({ filters, setFilters, activeCount, onOpenAll, sort, setSort }: QuickFiltersProps) {
  const cpr = filters.certifications.includes('CPR');
  const pills: {label: string;on: boolean;toggle: () => void;}[] = [
  { label: 'Available tonight', on: filters.availableTonight, toggle: () => setFilters((f) => ({ ...f, availableTonight: !f.availableTonight })) },
  {
    label: 'CPR certified',
    on: cpr,
    toggle: () => setFilters((f) => ({ ...f, certifications: cpr ? f.certifications.filter((c) => c !== 'CPR') : [...f.certifications, 'CPR'] }))
  },
  { label: 'Has a car', on: filters.hasCar, toggle: () => setFilters((f) => ({ ...f, hasCar: !f.hasCar })) },
  { label: 'Non-smoker', on: filters.nonSmoker, toggle: () => setFilters((f) => ({ ...f, nonSmoker: !f.nonSmoker })) }];


  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-wrap md:px-0 md:pb-0">
        <button
          type="button"
          onClick={onOpenAll}
          className="inline-flex shrink-0 items-center gap-2 rounded-full border border-ink-300 bg-white px-4 py-2 text-sm font-semibold text-ink-800 hover:border-ink-400">
          
          <SlidersHorizontalIcon className="h-4 w-4" aria-hidden />
          Filters
          {activeCount > 0 && <span className="flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-primary-600 px-1.5 text-xs text-white">{activeCount}</span>}
        </button>
        {pills.map((p) =>
        <button
          key={p.label}
          type="button"
          aria-pressed={p.on}
          onClick={p.toggle}
          className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium ring-1 ring-inset transition ${
          p.on ? 'bg-primary-600 text-white ring-primary-600' : 'bg-white text-ink-700 ring-ink-200 hover:ring-ink-400'}`
          }>
          
            {p.label}
          </button>
        )}
      </div>
      <SelectField
        label="Sort by"
        hideLabel
        value={sort}
        onChange={(e) => setSort(e.target.value as SortKey)}
        options={sortOptions}
        className="w-full shrink-0 md:w-52" />
      
    </div>);

}
import React from 'react';
import { StarIcon } from 'lucide-react';
import { Checkbox } from '../Checkbox';
import { categories, fileTypes } from '../../data/categories';
import type { FileType, SearchFilters } from '../../types/marketplace';
import { CategoryIcon } from '../common/CategoryIcon';

interface FilterPanelProps {
  filters: SearchFilters;
  onChange: (patch: Partial<SearchFilters>) => void;
  onReset: () => void;
  categoryCounts: Record<string, number>;
  activeCount: number;
}

function Group({ title, children }: {title: string;children: React.ReactNode;}) {
  return (
    <fieldset className="border-b border-line py-5 first:pt-0 last:border-0">
      <legend className="mb-3 font-display text-sm font-bold uppercase tracking-wider">{title}</legend>
      {children}
    </fieldset>);

}

export function FilterPanel({ filters, onChange, onReset, categoryCounts, activeCount }: FilterPanelProps) {
  const toggleType = (t: FileType) =>
  onChange({
    fileTypes: filters.fileTypes.includes(t) ? filters.fileTypes.filter((x) => x !== t) : [...filters.fileTypes, t]
  });

  const radioRow = (active: boolean) =>
  `flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-sm transition ${
  active ? 'bg-ink font-semibold text-white' : 'hover:bg-paper'}`;


  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-display text-lg font-bold">Filters</h2>
        {activeCount > 0 &&
        <button type="button" onClick={onReset} className="text-sm font-semibold text-brand-ink hover:underline">
            Clear all ({activeCount})
          </button>
        }
      </div>

      <Group title="Category">
        <div className="space-y-0.5" role="radiogroup" aria-label="Category">
          <button type="button" role="radio" aria-checked={filters.category === 'all'} onClick={() => onChange({ category: 'all' })} className={radioRow(filters.category === 'all')}>
            All categories
            <span className="text-xs opacity-70">{Object.values(categoryCounts).reduce((a, b) => a + b, 0)}</span>
          </button>
          {categories.map((c) =>
          <button
            key={c.id}
            type="button"
            role="radio"
            aria-checked={filters.category === c.id}
            onClick={() => onChange({ category: c.id })}
            className={radioRow(filters.category === c.id)}>
            
              <span className="flex items-center gap-2">
                <CategoryIcon id={c.id} className="h-4 w-4" />
                {c.name}
              </span>
              <span className="text-xs opacity-70">{categoryCounts[c.id] ?? 0}</span>
            </button>
          )}
        </div>
      </Group>

      <Group title="Price">
        <div className="mb-3 grid grid-cols-3 rounded-lg border border-ink p-0.5" role="radiogroup" aria-label="Free or paid">
          {(['all', 'free', 'paid'] as const).map((p) =>
          <button
            key={p}
            type="button"
            role="radio"
            aria-checked={filters.pricing === p}
            onClick={() => onChange({ pricing: p })}
            className={`rounded-md py-1.5 text-sm font-semibold capitalize transition ${filters.pricing === p ? 'bg-brand' : 'hover:bg-paper'}`}>
            
              {p}
            </button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <label className="sr-only" htmlFor="price-min">
            Minimum price
          </label>
          <input id="price-min" inputMode="numeric" placeholder="$ Min" value={filters.priceMin} onChange={(e) => onChange({ priceMin: e.target.value.replace(/[^0-9]/g, '') })} className="field h-10" />
          <span className="text-muted" aria-hidden="true">
            –
          </span>
          <label className="sr-only" htmlFor="price-max">
            Maximum price
          </label>
          <input id="price-max" inputMode="numeric" placeholder="$ Max" value={filters.priceMax} onChange={(e) => onChange({ priceMax: e.target.value.replace(/[^0-9]/g, '') })} className="field h-10" />
        </div>
      </Group>

      <Group title="File type">
        <div className="grid grid-cols-2 gap-2">
          {fileTypes.map((t) =>
          <Checkbox key={t} label={t} checked={filters.fileTypes.includes(t)} onChange={() => toggleType(t)} />
          )}
        </div>
      </Group>

      <Group title="Rating">
        <div className="space-y-0.5" role="radiogroup" aria-label="Minimum rating">
          {[0, 4.8, 4.5, 4].map((r) =>
          <button key={r} type="button" role="radio" aria-checked={filters.minRating === r} onClick={() => onChange({ minRating: r })} className={radioRow(filters.minRating === r)}>
              <span className="flex items-center gap-1.5">
                {r === 0 ?
              'Any rating' :

              <>
                    <StarIcon className="h-4 w-4 fill-brand text-current" strokeWidth={1.5} aria-hidden="true" />
                    {r}+ stars
                  </>
              }
              </span>
            </button>
          )}
        </div>
      </Group>
    </div>);

}
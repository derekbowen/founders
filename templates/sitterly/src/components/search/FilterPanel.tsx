import React from 'react';
import { Slider } from '../Slider';
import { Checkbox } from '../Checkbox';
import { Toggle } from '../Toggle';
import { BrandButton } from '../ui/BrandButton';
import { ageGroupOptions, certificationOptions, languageOptions, priceBounds } from '../../data/filterOptions';
import { SearchFilters } from '../../types/search';

interface FilterPanelProps {
  filters: SearchFilters;
  setFilters: React.Dispatch<React.SetStateAction<SearchFilters>>;
  resultCount: number;
  resetKey: number;
  onReset: () => void;
  onDone: () => void;
}

function toggleIn<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

export function FilterPanel({ filters, setFilters, resultCount, resetKey, onReset, onDone }: FilterPanelProps) {
  return (
    <div className="flex h-full flex-col bg-white">
      <div className="border-b border-ink-200 px-6 py-5">
        <h2 className="font-heading text-xl font-bold text-ink-900">Filters</h2>
      </div>
      <div className="flex-1 space-y-8 overflow-y-auto px-6 py-6">
        <fieldset>
          <legend className="text-sm font-bold text-ink-900">Hourly rate</legend>
          <p className="mt-1 text-sm text-ink-600">
            ${filters.priceRange[0]} – ${filters.priceRange[1]}
            {filters.priceRange[1] === priceBounds[1] ? '+' : ''} per hour
          </p>
          <div className="mt-4 px-1">
            <Slider
              key={resetKey}
              min={priceBounds[0]}
              max={priceBounds[1]}
              step={1}
              value={filters.priceRange}
              showMarkers={false}
              showLabels={false}
              onChange={(v) => Array.isArray(v) && setFilters((f) => ({ ...f, priceRange: v }))} />
            
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-sm font-bold text-ink-900">Comfortable with ages</legend>
          <div className="mt-3 space-y-2.5">
            {ageGroupOptions.map((a) =>
            <Checkbox
              key={a.value}
              checked={filters.ageGroups.includes(a.value)}
              onChange={() => setFilters((f) => ({ ...f, ageGroups: toggleIn(f.ageGroups, a.value) }))}
              label={
              <span className="text-sm text-ink-800">
                    {a.value} <span className="text-ink-500">· {a.hint}</span>
                  </span>
              } />

            )}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-sm font-bold text-ink-900">Certifications</legend>
          <div className="mt-3 space-y-2.5">
            {certificationOptions.map((c) =>
            <Checkbox
              key={c}
              checked={filters.certifications.includes(c)}
              onChange={() => setFilters((f) => ({ ...f, certifications: toggleIn(f.certifications, c) }))}
              label={<span className="text-sm text-ink-800">{c}</span>} />

            )}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-sm font-bold text-ink-900">Languages</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {languageOptions.map((l) => {
              const on = filters.languages.includes(l);
              return (
                <button
                  key={l}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setFilters((f) => ({ ...f, languages: toggleIn(f.languages, l) }))}
                  className={`rounded-full px-3.5 py-1.5 text-sm font-medium ring-1 ring-inset transition ${
                  on ? 'bg-primary-600 text-white ring-primary-600' : 'bg-white text-ink-700 ring-ink-200 hover:ring-ink-300'}`
                  }>
                  
                  {l}
                </button>);

            })}
          </div>
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="mb-3 text-sm font-bold text-ink-900">Preferences</legend>
          <Toggle label="Non-smoker" checked={filters.nonSmoker} onChange={(v) => setFilters((f) => ({ ...f, nonSmoker: v }))} />
          <Toggle label="Has a car" checked={filters.hasCar} onChange={(v) => setFilters((f) => ({ ...f, hasCar: v }))} />
          <Toggle label="Available tonight" checked={filters.availableTonight} onChange={(v) => setFilters((f) => ({ ...f, availableTonight: v }))} />
        </fieldset>
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-ink-200 px-6 py-4">
        <button type="button" onClick={onReset} className="text-sm font-semibold text-ink-700 underline-offset-2 hover:underline">
          Clear all
        </button>
        <BrandButton onClick={onDone}>
          Show {resultCount} {resultCount === 1 ? 'sitter' : 'sitters'}
        </BrandButton>
      </div>
    </div>);

}
import React from 'react';
import { AccessibilityIcon } from 'lucide-react';
import { FilterGroup } from './FilterGroup';
import { CheckRow } from './CheckRow';
import { categories } from '../../data/categories';
import { durationOptions, languageOptions, timeOfDayOptions } from '../../data/options';
import { groupSizeOptions, PRICE_CEILING, type SearchFilters } from '../../utils/search';
import { toggleValue } from '../../hooks/useSearchFilters';
import { formatPrice } from '../../utils/format';

interface FilterPanelProps {
  filters: SearchFilters;
  onChange: (patch: Partial<SearchFilters>) => void;
}

export function FilterPanel({ filters, onChange }: FilterPanelProps) {
  return (
    <div>
      <FilterGroup title="Category">
        {categories.map((c) =>
        <CheckRow
          key={c.id}
          label={c.label}
          checked={filters.categories.includes(c.id)}
          onChange={() => onChange({ categories: toggleValue(filters.categories, c.id) })} />

        )}
      </FilterGroup>

      <FilterGroup title="Price per person">
        <div className="flex items-center justify-between text-sm text-slate-700">
          <span>$0</span>
          <span className="font-semibold text-slate-900">
            {filters.priceMax >= PRICE_CEILING ? `${formatPrice(PRICE_CEILING)}+` : `Up to ${formatPrice(filters.priceMax)}`}
          </span>
        </div>
        <label htmlFor="price-range" className="sr-only">Maximum price per person</label>
        <input
          id="price-range"
          type="range"
          min={20}
          max={PRICE_CEILING}
          step={5}
          value={filters.priceMax}
          onChange={(e) => onChange({ priceMax: Number(e.target.value) })}
          className="mt-3 w-full accent-[rgb(var(--color-primary-600))]" />
        
      </FilterGroup>

      <FilterGroup title="Duration">
        {durationOptions.map((o) =>
        <CheckRow
          key={o.value}
          label={o.label}
          checked={filters.durations.includes(o.value)}
          onChange={() => onChange({ durations: toggleValue(filters.durations, o.value) })} />

        )}
      </FilterGroup>

      <FilterGroup title="Time of day">
        {timeOfDayOptions.map((o) =>
        <CheckRow
          key={o.value}
          label={o.label}
          hint={o.hint}
          checked={filters.timesOfDay.includes(o.value)}
          onChange={() => onChange({ timesOfDay: toggleValue(filters.timesOfDay, o.value) })} />

        )}
      </FilterGroup>

      <FilterGroup title="Group size">
        {groupSizeOptions.map((o) =>
        <CheckRow
          key={o.value}
          label={o.label}
          checked={filters.groupSizes.includes(o.value)}
          onChange={() => onChange({ groupSizes: toggleValue(filters.groupSizes, o.value) })} />

        )}
      </FilterGroup>

      <FilterGroup title="Languages">
        <div className="grid grid-cols-2 gap-x-3">
          {languageOptions.map((l) =>
          <CheckRow
            key={l}
            label={l}
            checked={filters.languages.includes(l)}
            onChange={() => onChange({ languages: toggleValue(filters.languages, l) })} />

          )}
        </div>
      </FilterGroup>

      <FilterGroup title="Accessibility">
        <label className="flex cursor-pointer items-center justify-between gap-3">
          <span className="flex items-center gap-2 text-sm text-slate-700">
            <AccessibilityIcon className="h-4 w-4 text-accent-700" aria-hidden />
            Wheelchair accessible
          </span>
          <span className="relative inline-flex">
            <input
              type="checkbox"
              role="switch"
              checked={filters.accessible}
              onChange={() => onChange({ accessible: !filters.accessible })}
              className="peer sr-only" />
            
            <span className="h-6 w-11 rounded-full bg-slate-300 transition peer-checked:bg-accent-700 peer-focus-visible:ring-2 peer-focus-visible:ring-primary-500 peer-focus-visible:ring-offset-2" />
            <span className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition peer-checked:translate-x-5" />
          </span>
        </label>
      </FilterGroup>
    </div>);

}
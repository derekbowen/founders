import React from 'react';
import { categories } from '../../data/categories';
import { deliveryOptions, priceOptions, ratingOptions, searchLanguages } from '../../data/navigation';
import { SearchFilters } from '../../hooks/useListingSearch';
import { CategoryId } from '../../types/marketplace';
import { countListingsInCategory } from '../../utils/lookup';
import { SelectField } from '../ui/SelectField';

interface FilterSidebarProps {
  filters: SearchFilters;
  setFilter: (patch: Partial<SearchFilters>) => void;
  reset: () => void;
  activeCount: number;
  locations: string[];
}

function toggle<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

function Group({ title, children }: {title: string;children: React.ReactNode;}) {
  return (
    <fieldset className="border-t border-slate-200 py-5 first:border-t-0 first:pt-0">
      <legend className="mb-3 text-sm font-semibold text-slate-900">{title}</legend>
      <div className="space-y-2">{children}</div>
    </fieldset>);

}

const optionClass = 'flex cursor-pointer items-center gap-2.5 rounded-lg px-1 py-1 text-sm text-slate-700 hover:text-slate-900';
const inputClass = 'h-4 w-4 shrink-0 border-slate-300 accent-primary-600';

export function FilterSidebar({ filters, setFilter, reset, activeCount, locations }: FilterSidebarProps) {
  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-base font-bold text-slate-900">Filters</h2>
        {activeCount > 0 &&
        <button type="button" onClick={reset} className="text-sm font-semibold text-primary-700 hover:text-primary-800">
            Clear all ({activeCount})
          </button>
        }
      </div>

      <Group title="Category">
        {categories.map((c) =>
        <label key={c.id} className={optionClass}>
            <input
            type="checkbox"
            className={`${inputClass} rounded`}
            checked={filters.categories.includes(c.id)}
            onChange={() => setFilter({ categories: toggle<CategoryId>(filters.categories, c.id) })} />
          
            <span className="flex-1">{c.name}</span>
            <span className="text-xs text-slate-400">{countListingsInCategory(c.id)}</span>
          </label>
        )}
      </Group>

      <Group title="Starting price">
        {priceOptions.map((p) =>
        <label key={p.value} className={optionClass}>
            <input type="radio" name="price" className={inputClass} checked={filters.price === p.value} onChange={() => setFilter({ price: p.value })} />
            {p.label}
          </label>
        )}
      </Group>

      <Group title="Delivery time">
        {deliveryOptions.map((d) =>
        <label key={d.value} className={optionClass}>
            <input type="radio" name="delivery" className={inputClass} checked={filters.delivery === d.value} onChange={() => setFilter({ delivery: d.value })} />
            {d.label}
          </label>
        )}
      </Group>

      <Group title="Rating">
        {ratingOptions.map((r) =>
        <label key={r.value} className={optionClass}>
            <input type="radio" name="rating" className={inputClass} checked={filters.rating === r.value} onChange={() => setFilter({ rating: r.value })} />
            {r.label}
          </label>
        )}
      </Group>

      <Group title="Language">
        {searchLanguages.map((lang) =>
        <label key={lang} className={optionClass}>
            <input
            type="checkbox"
            className={`${inputClass} rounded`}
            checked={filters.languages.includes(lang)}
            onChange={() => setFilter({ languages: toggle(filters.languages, lang) })} />
          
            {lang}
          </label>
        )}
      </Group>

      <Group title="Freelancer location">
        <SelectField
          label="Freelancer location"
          hideLabel
          value={filters.location}
          onChange={(e) => setFilter({ location: e.target.value })}
          placeholder="Anywhere"
          options={locations.map((l) => ({ value: l, label: l }))} />
        
      </Group>
    </div>);

}
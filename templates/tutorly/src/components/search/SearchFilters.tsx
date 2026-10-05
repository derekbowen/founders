import React, { useState } from 'react';
import { StarIcon } from 'lucide-react';
import { Checkbox } from '../Checkbox';
import { FilterChip, FilterSection } from './FilterSection';
import { levels, spokenLanguages, subjects } from '../../data/subjects';
import { timesOfDay, weekDays } from '../../data/schedule';
import { toggleValue } from '../../hooks/useSearchFilters';
import type { SearchFilters as Filters } from '../../utils/search';

interface SearchFiltersProps {
  filters: Filters;
  onChange: (patch: Partial<Filters>) => void;
}

const pricePresets: {label: string;min: number | null;max: number | null;}[] = [
{ label: 'Under $40', min: null, max: 40 },
{ label: '$40 – $60', min: 40, max: 60 },
{ label: '$60+', min: 60, max: null }];


const ratingOptions = [
{ value: 0, label: 'Any rating' },
{ value: 4.8, label: '4.8 & up' },
{ value: 4.9, label: '4.9 & up' }];


export function SearchFilters({ filters, onChange }: SearchFiltersProps) {
  const [showAllLanguages, setShowAllLanguages] = useState(false);
  const languages = showAllLanguages ? spokenLanguages : spokenLanguages.slice(0, 6);

  const priceInput = (key: 'minPrice' | 'maxPrice', label: string) =>
  <label className="flex-1">
      <span className="text-xs text-ink-500">{label}</span>
      <div className="relative mt-1">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-ink-400">$</span>
        <input
        type="number"
        min={0}
        inputMode="numeric"
        value={filters[key] ?? ''}
        onChange={(e) => onChange({ [key]: e.target.value === '' ? null : Number(e.target.value) })}
        className="h-10 w-full rounded-lg border border-ink-200 pl-7 pr-2 text-sm focus:border-primary-400 focus:outline-none focus:ring-4 focus:ring-primary-100"
        placeholder={key === 'minPrice' ? '0' : 'Any'} />
      
      </div>
    </label>;


  return (
    <div>
      <FilterSection title="Subject">
        <div className="space-y-2.5">
          {subjects.map((s) =>
          <Checkbox
            key={s.id}
            label={s.name}
            checked={filters.subjects.includes(s.id)}
            onChange={() => onChange({ subjects: toggleValue(filters.subjects, s.id) })} />

          )}
        </div>
      </FilterSection>

      <FilterSection title="Level">
        <div className="space-y-2.5">
          {levels.map((l) =>
          <Checkbox
            key={l.id}
            label={l.name}
            checked={filters.levels.includes(l.id)}
            onChange={() => onChange({ levels: toggleValue(filters.levels, l.id) })} />

          )}
        </div>
      </FilterSection>

      <FilterSection title="Price per hour">
        <div className="flex gap-2">
          {priceInput('minPrice', 'Min')}
          {priceInput('maxPrice', 'Max')}
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {pricePresets.map((p) =>
          <FilterChip
            key={p.label}
            pressed={filters.minPrice === p.min && filters.maxPrice === p.max}
            onClick={() => onChange({ minPrice: p.min, maxPrice: p.max })}>
            
              {p.label}
            </FilterChip>
          )}
        </div>
      </FilterSection>

      <FilterSection title="Availability">
        <p className="mb-2 text-xs text-ink-500">Days</p>
        <div className="grid grid-cols-7 gap-1">
          {weekDays.map((d) =>
          <FilterChip
            key={d.key}
            label={d.long}
            pressed={filters.days.includes(d.key)}
            onClick={() => onChange({ days: toggleValue(filters.days, d.key) })}>
            
              <span className="block text-center text-xs">{d.short.slice(0, 2)}</span>
            </FilterChip>
          )}
        </div>
        <p className="mb-2 mt-4 text-xs text-ink-500">Time of day</p>
        <div className="grid gap-1.5">
          {timesOfDay.map((t) =>
          <FilterChip
            key={t.key}
            pressed={filters.times.includes(t.key)}
            onClick={() => onChange({ times: toggleValue(filters.times, t.key) })}>
            
              <span className="flex justify-between gap-2">
                <span>{t.label}</span>
                <span className="font-normal opacity-80">{t.range}</span>
              </span>
            </FilterChip>
          )}
        </div>
      </FilterSection>

      <FilterSection title="Languages spoken">
        <div className="space-y-2.5">
          {languages.map((lang) =>
          <Checkbox
            key={lang}
            label={lang}
            checked={filters.languages.includes(lang)}
            onChange={() => onChange({ languages: toggleValue(filters.languages, lang) })} />

          )}
        </div>
        <button
          type="button"
          onClick={() => setShowAllLanguages((s) => !s)}
          className="mt-3 text-sm font-medium text-primary-700 hover:text-primary-800">
          
          {showAllLanguages ? 'Show fewer' : `Show all ${spokenLanguages.length} languages`}
        </button>
      </FilterSection>

      <FilterSection title="Rating">
        <div className="space-y-2" role="radiogroup" aria-label="Minimum rating">
          {ratingOptions.map((r) =>
          <label key={r.value} className="flex cursor-pointer items-center gap-2.5 text-sm text-ink-800">
              <input
              type="radio"
              name="rating"
              checked={filters.minRating === r.value}
              onChange={() => onChange({ minRating: r.value })}
              className="h-4 w-4 accent-[rgb(var(--color-primary-600))]" />
            
              {r.value > 0 && <StarIcon size={14} className="fill-accent-400 text-accent-500" aria-hidden="true" />}
              {r.label}
            </label>
          )}
        </div>
      </FilterSection>
    </div>);

}
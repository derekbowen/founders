import React from 'react';
import { CheckIcon } from 'lucide-react';
import { CategoryIcon } from '../ui/CategoryIcon';
import { categories, jobSizes } from '../../data/categories';
import { BUDGET_CEILING, BUDGET_FLOOR } from '../../hooks/useJobSearch';
import type { DateWindow, FilterKey, JobSize, SearchFilters } from '../../types/marketplace';
import { cn, inputClass } from '../../utils/styles';

interface FilterFieldProps {
  type: FilterKey;
  filters: SearchFilters;
  onChange: (patch: Partial<SearchFilters>) => void;
  idPrefix: string;
}

const dateOptions: {value: DateWindow;label: string;}[] = [
{ value: 'any', label: 'Any date' },
{ value: '7', label: 'Within 7 days' },
{ value: '14', label: 'Within 2 weeks' },
{ value: '30', label: 'Within 30 days' }];


const distanceOptions = [2, 5, 10, 25];

const budgetPresets: [number, number, string][] = [
[0, 150, 'Under $150'],
[150, 300, '$150–300'],
[300, 600, '$300+']];


function toggle<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

function OptionRow({
  checked,
  onClick,
  children,
  type = 'checkbox'





}: {checked: boolean;onClick: () => void;children: React.ReactNode;type?: 'checkbox' | 'radio';}) {
  return (
    <button
      type="button"
      role={type}
      aria-checked={checked}
      onClick={onClick}
      className={cn(
        'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-semibold transition-colors',
        checked ? 'bg-primary-50 text-ink-900' : 'text-ink-700 hover:bg-ink-50'
      )}>
      
      <span
        className={cn(
          'flex h-5 w-5 shrink-0 items-center justify-center border-2 transition-colors',
          type === 'radio' ? 'rounded-full' : 'rounded-md',
          checked ? 'border-primary-600 bg-primary-600 text-white' : 'border-ink-300 bg-white'
        )}
        aria-hidden="true">
        
        {checked && <CheckIcon className="h-3 w-3" strokeWidth={3} />}
      </span>
      {children}
    </button>);

}

export function FilterField({ type, filters, onChange, idPrefix }: FilterFieldProps) {
  if (type === 'category') {
    return (
      <div role="group" aria-label="Category" className="space-y-1">
        {categories.map((c) =>
        <OptionRow
          key={c.id}
          checked={filters.categories.includes(c.id)}
          onClick={() => onChange({ categories: toggle(filters.categories, c.id) })}>
          
            <CategoryIcon id={c.id} className="h-4 w-4 text-ink-500" />
            {c.name}
          </OptionRow>
        )}
      </div>);

  }

  if (type === 'budget') {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor={`${idPrefix}-bmin`} className="mb-1 block text-xs font-bold text-ink-600">
              Min ($)
            </label>
            <input
              id={`${idPrefix}-bmin`}
              type="number"
              min={BUDGET_FLOOR}
              max={filters.budgetMax}
              step={10}
              value={filters.budgetMin}
              onChange={(e) => onChange({ budgetMin: Math.max(BUDGET_FLOOR, Number(e.target.value) || 0) })}
              className={inputClass} />
            
          </div>
          <div>
            <label htmlFor={`${idPrefix}-bmax`} className="mb-1 block text-xs font-bold text-ink-600">
              Max ($)
            </label>
            <input
              id={`${idPrefix}-bmax`}
              type="number"
              min={filters.budgetMin}
              max={BUDGET_CEILING}
              step={10}
              value={filters.budgetMax}
              onChange={(e) => onChange({ budgetMax: Math.min(BUDGET_CEILING, Number(e.target.value) || 0) })}
              className={inputClass} />
            
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {budgetPresets.map(([min, max, label]) => {
            const active = filters.budgetMin === min && filters.budgetMax === max;
            return (
              <button
                key={label}
                type="button"
                onClick={() => onChange({ budgetMin: min, budgetMax: max })}
                aria-pressed={active}
                className={cn(
                  'rounded-full border px-3 py-1.5 text-xs font-bold transition-colors',
                  active ? 'border-primary-600 bg-primary-50 text-primary-800' : 'border-ink-300 text-ink-700 hover:border-ink-400'
                )}>
                
                {label}
              </button>);

          })}
        </div>
        <p className="text-xs text-ink-500">Shows jobs whose budget range overlaps yours.</p>
      </div>);

  }

  if (type === 'date') {
    return (
      <div role="radiogroup" aria-label="Date needed" className="space-y-1">
        {dateOptions.map((o) =>
        <OptionRow key={o.value} type="radio" checked={filters.date === o.value} onClick={() => onChange({ date: o.value })}>
            {o.label}
          </OptionRow>
        )}
      </div>);

  }

  if (type === 'distance') {
    return (
      <div role="radiogroup" aria-label="Distance" className="space-y-1">
        {distanceOptions.map((d) =>
        <OptionRow key={d} type="radio" checked={filters.maxDistance === d} onClick={() => onChange({ maxDistance: d })}>
            Within {d} miles
          </OptionRow>
        )}
      </div>);

  }

  return (
    <div role="group" aria-label="Job size" className="space-y-1">
      {jobSizes.map((s) =>
      <OptionRow
        key={s.id}
        checked={filters.sizes.includes(s.id as JobSize)}
        onClick={() => onChange({ sizes: toggle(filters.sizes, s.id as JobSize) })}>
        
          <span className="flex-1">{s.label}</span>
          <span className="text-xs font-medium text-ink-500">{s.description}</span>
        </OptionRow>
      )}
    </div>);

}
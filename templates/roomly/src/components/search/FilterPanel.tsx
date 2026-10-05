import React from 'react';
import { Input } from '../Input';
import { Toggle } from '../Toggle';
import { Button } from '../Button';
import { RENT_CEILING } from '../../hooks/useSearchFilters';
import { buttonStyles, chipStyles, fieldStyles } from '../../utils/styles';
import { currencySymbol } from '../../utils/format';
import type { SearchFilters } from '../../types/listing';

interface FilterPanelProps {
  filters: SearchFilters;
  update: <K extends keyof SearchFilters>(key: K, value: SearchFilters[K]) => void;
  onReset: () => void;
  onClose: () => void;
  resultCount: number;
}

const rentPresets: {label: string;min: number;max: number;}[] = [
{ label: 'Under 500', min: 0, max: 500 },
{ label: '500–800', min: 500, max: 800 },
{ label: '800–1,200', min: 800, max: 1200 },
{ label: '1,200+', min: 1200, max: RENT_CEILING }];


const flatmateOptions: {id: SearchFilters['flatmates'];label: string;}[] = [
{ id: 'any', label: 'Any' },
{ id: 'none', label: 'Live alone' },
{ id: 'few', label: '1–2' },
{ id: 'many', label: '3+' }];


const genderOptions: {id: SearchFilters['gender'];label: string;}[] = [
{ id: 'any', label: 'Show all' },
{ id: 'female', label: "I'm a woman" },
{ id: 'male', label: "I'm a man" }];


export function FilterPanel({ filters, update, onReset, onClose, resultCount }: FilterPanelProps) {
  const symbol = currencySymbol();

  return (
    <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-card sm:p-6">
      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        <fieldset>
          <legend className={fieldStyles.label}>Monthly rent</legend>
          <div className="grid grid-cols-2 gap-3">
            <Input
              type="number"
              min={0}
              aria-label="Minimum rent"
              placeholder="Min"
              startAdornment={<span className="text-sm text-navy-400">{symbol}</span>}
              value={filters.minRent || ''}
              onChange={(e) => update('minRent', Number(e.target.value) || 0)} />
            
            <Input
              type="number"
              min={0}
              aria-label="Maximum rent"
              placeholder="Max"
              startAdornment={<span className="text-sm text-navy-400">{symbol}</span>}
              value={filters.maxRent >= RENT_CEILING ? '' : filters.maxRent}
              onChange={(e) => update('maxRent', Number(e.target.value) || RENT_CEILING)} />
            
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {rentPresets.map((p) => {
              const active = filters.minRent === p.min && filters.maxRent === p.max;
              return (
                <button
                  key={p.label}
                  type="button"
                  aria-pressed={active}
                  onClick={() => {
                    update('minRent', active ? 0 : p.min);
                    update('maxRent', active ? RENT_CEILING : p.max);
                  }}
                  className={`${chipStyles.base} !px-3 !py-1 !text-xs ${active ? chipStyles.active : chipStyles.idle}`}>
                  
                  {symbol}
                  {p.label}
                </button>);

            })}
          </div>
        </fieldset>

        <fieldset className="space-y-4">
          <legend className={fieldStyles.label}>Essentials</legend>
          <Toggle
            checked={filters.billsIncluded}
            onChange={(v) => update('billsIncluded', v)}
            label="Bills included" />
          
          <Toggle checked={filters.furnished} onChange={(v) => update('furnished', v)} label="Furnished" />
          <Toggle checked={filters.petsAllowed} onChange={(v) => update('petsAllowed', v)} label="Pets allowed" />
        </fieldset>

        <div className="grid grid-cols-2 gap-4 md:col-span-2 xl:col-span-1 xl:grid-cols-1">
          <div>
            <label htmlFor="filter-minstay" className={fieldStyles.label}>
              Minimum stay
            </label>
            <select
              id="filter-minstay"
              value={filters.maxMinStay}
              onChange={(e) => update('maxMinStay', Number(e.target.value))}
              className={fieldStyles.control}>
              
              <option value={0}>Any minimum stay</option>
              <option value={1}>1 month or less</option>
              <option value={3}>Up to 3 months</option>
              <option value={6}>Up to 6 months</option>
              <option value={12}>Up to 12 months</option>
            </select>
          </div>
          <div>
            <label htmlFor="filter-available" className={fieldStyles.label}>
              Available from
            </label>
            <input
              id="filter-available"
              type="date"
              value={filters.availableBy}
              onChange={(e) => update('availableBy', e.target.value)}
              className={fieldStyles.control} />
            
          </div>
        </div>

        <fieldset>
          <legend className={fieldStyles.label}>Flatmates</legend>
          <div className="flex flex-wrap gap-2">
            {flatmateOptions.map((o) =>
            <button
              key={o.id}
              type="button"
              aria-pressed={filters.flatmates === o.id}
              onClick={() => update('flatmates', o.id)}
              className={`${chipStyles.base} ${filters.flatmates === o.id ? chipStyles.active : chipStyles.idle}`}>
              
                {o.label}
              </button>
            )}
          </div>
        </fieldset>

        <fieldset>
          <legend className={fieldStyles.label}>Gender preference</legend>
          <div className="flex flex-wrap gap-2">
            {genderOptions.map((o) =>
            <button
              key={o.id}
              type="button"
              aria-pressed={filters.gender === o.id}
              onClick={() => update('gender', o.id)}
              className={`${chipStyles.base} ${filters.gender === o.id ? chipStyles.active : chipStyles.idle}`}>
              
                {o.label}
              </button>
            )}
          </div>
          <p className={fieldStyles.help}>Hides flats reserved for another gender.</p>
        </fieldset>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-navy-100 pt-5">
        <button
          type="button"
          onClick={onReset}
          className="text-sm font-semibold text-navy-700 underline-offset-4 hover:text-navy-900 hover:underline">
          
          Clear filters
        </button>
        <Button className={buttonStyles.navy} onClick={onClose}>
          Show {resultCount} room{resultCount === 1 ? '' : 's'}
        </Button>
      </div>
    </div>);

}
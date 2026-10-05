import React from 'react';
import { Checkbox } from '../Checkbox';
import { Toggle } from '../Toggle';
import { petSizes } from '../../data/services';
import { PRICE_CEILING, type SearchFilters } from '../../hooks/useSearchFilters';
import { formatMoney } from '../../utils/format';

interface FilterPanelProps {
  filters: SearchFilters;
  update: <K extends keyof SearchFilters>(key: K, value: SearchFilters[K]) => void;
}

const homeToggles: {key: 'acceptsCats' | 'fencedYard' | 'noOtherPets' | 'fullTimeHome';label: string;hint: string;}[] = [
{ key: 'acceptsCats', label: 'Accepts cats', hint: 'Sitters who care for cats' },
{ key: 'fencedYard', label: 'Fenced yard', hint: 'Secure outdoor space' },
{ key: 'noOtherPets', label: 'No other pets', hint: 'Your pet is the only guest' },
{ key: 'fullTimeHome', label: 'Sitter at home full-time', hint: 'Someone home all day' }];


export function FilterPanel({ filters, update }: FilterPanelProps) {
  const isPerVisit = filters.service === 'drop-in' || filters.service === 'dog-walking';
  return (
    <div className="space-y-8">
      <fieldset>
        <legend className="text-base font-extrabold text-ink-900">Price {isPerVisit ? 'per visit' : 'per night'}</legend>
        <div className="mt-3 flex items-center justify-between text-sm font-semibold text-ink-600">
          <span>{formatMoney(0)}</span>
          <span className="rounded-full bg-primary-100 px-2.5 py-0.5 font-bold text-primary-800">
            Up to {filters.priceMax >= PRICE_CEILING ? `${formatMoney(PRICE_CEILING)}+` : formatMoney(filters.priceMax)}
          </span>
        </div>
        <label htmlFor="price-range" className="sr-only">
          Maximum price
        </label>
        <input
          id="price-range"
          type="range"
          min={15}
          max={PRICE_CEILING}
          step={5}
          value={filters.priceMax}
          onChange={(e) => update('priceMax', Number(e.target.value))}
          className="mt-3 w-full accent-primary-500" />
        
      </fieldset>

      <fieldset>
        <legend className="text-base font-extrabold text-ink-900">Pet size</legend>
        <p className="mt-1 text-sm text-ink-600">Show sitters who accept every size you select.</p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {petSizes.map((s) => {
            const active = filters.sizes.includes(s.id);
            return (
              <button
                key={s.id}
                type="button"
                aria-pressed={active}
                onClick={() => update('sizes', active ? filters.sizes.filter((x) => x !== s.id) : [...filters.sizes, s.id])}
                className={`rounded-2xl border px-3 py-2.5 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${
                active ? 'border-primary-500 bg-primary-50' : 'border-ink-200 bg-white hover:border-ink-400'}`
                }>
                
                <span className="block text-sm font-extrabold text-ink-900">{s.label}</span>
                <span className="block text-xs text-ink-600">{s.range}</span>
              </button>);

          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-base font-extrabold text-ink-900">Home & sitter</legend>
        <ul className="mt-3 divide-y divide-ink-100">
          {homeToggles.map((t) =>
          <li key={t.key} className="flex items-center justify-between gap-4 py-3">
              <div>
                <p className="text-sm font-bold text-ink-900">{t.label}</p>
                <p className="text-xs text-ink-600">{t.hint}</p>
              </div>
              <Toggle checked={filters[t.key]} onChange={(v) => update(t.key, v)} aria-label={t.label} />
            </li>
          )}
        </ul>
      </fieldset>

      <fieldset>
        <legend className="text-base font-extrabold text-ink-900">Number of pets</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {[1, 2, 3, 4].map((n) =>
          <Checkbox
            key={n}
            label={n === 4 ? '4+' : String(n)}
            checked={filters.pets === n}
            onChange={() => update('pets', n)} />

          )}
        </div>
      </fieldset>
    </div>);

}
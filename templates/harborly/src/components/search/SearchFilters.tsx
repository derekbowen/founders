import React from 'react';
import { boatTypes } from '../../data/boatTypes';
import { Counter } from '../ui/Counter';
import { Toggle } from '../ui/Toggle';
import { cn, inputClass } from '../../utils/ui';
import type { SearchFilterValues, CaptainFilter } from '../../types/search';
import type { BoatTypeId } from '../../types/marketplace';

interface SearchFiltersProps {
  values: SearchFilterValues;
  onChange: (next: SearchFilterValues) => void;
}

const captainOptions: {value: CaptainFilter;label: string;}[] = [
{ value: 'any', label: 'Any' },
{ value: 'captained', label: 'Captain included' },
{ value: 'bareboat', label: 'Bareboat' }];


const lengthOptions = [
{ value: '', label: 'Any' },
{ value: '20', label: '20 ft+' },
{ value: '30', label: '30 ft+' },
{ value: '40', label: '40 ft+' },
{ value: '50', label: '50 ft+' }];


function Section({ title, children }: {title: string;children: React.ReactNode;}) {
  return (
    <fieldset className="border-b border-line py-6 first:pt-0 last:border-0">
      <legend className="mb-3 text-sm font-semibold text-ink">{title}</legend>
      {children}
    </fieldset>);

}

const chip = (active: boolean) =>
cn(
  'rounded-full border px-3.5 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral',
  active ? 'border-navy bg-navy text-white' : 'border-line bg-white text-ink hover:border-navy/40'
);

export function SearchFilters({ values, onChange }: SearchFiltersProps) {
  const set = <K extends keyof SearchFilterValues,>(key: K, value: SearchFilterValues[K]) => onChange({ ...values, [key]: value });
  const toggleType = (id: BoatTypeId) =>
  set('types', values.types.includes(id) ? values.types.filter((t) => t !== id) : [...values.types, id]);

  return (
    <div>
      <Section title="Boat type">
        <div className="flex flex-wrap gap-2">
          {boatTypes.map((t) =>
          <button key={t.id} type="button" aria-pressed={values.types.includes(t.id)} onClick={() => toggleType(t.id)} className={chip(values.types.includes(t.id))}>
              {t.label}
            </button>
          )}
        </div>
      </Section>

      <Section title="Price per day">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <label htmlFor="f-min" className="sr-only">
              Minimum price
            </label>
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-muted">$</span>
            <input id="f-min" type="number" inputMode="numeric" min={0} placeholder="Min" value={values.minPrice} onChange={(e) => set('minPrice', e.target.value)} className={inputClass + ' pl-7'} />
          </div>
          <span className="text-muted" aria-hidden="true">
            –
          </span>
          <div className="relative flex-1">
            <label htmlFor="f-max" className="sr-only">
              Maximum price
            </label>
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-muted">$</span>
            <input id="f-max" type="number" inputMode="numeric" min={0} placeholder="Max" value={values.maxPrice} onChange={(e) => set('maxPrice', e.target.value)} className={inputClass + ' pl-7'} />
          </div>
        </div>
      </Section>

      <Section title="Guests">
        <Counter label="Minimum capacity" value={values.guests} min={1} max={12} onChange={(v) => set('guests', v)} />
      </Section>

      <Section title="Captain">
        <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Captain">
          {captainOptions.map((o) =>
          <button key={o.value} type="button" role="radio" aria-checked={values.captain === o.value} onClick={() => set('captain', o.value)} className={chip(values.captain === o.value)}>
              {o.label}
            </button>
          )}
        </div>
      </Section>

      <Section title="Boat length">
        <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Boat length">
          {lengthOptions.map((o) =>
          <button key={o.label} type="button" role="radio" aria-checked={values.minLength === o.value} onClick={() => set('minLength', o.value)} className={chip(values.minLength === o.value)}>
              {o.label}
            </button>
          )}
        </div>
      </Section>

      <Section title="Amenities">
        <div className="space-y-5">
          <Toggle id="f-fishing" label="Fishing gear on board" description="Rods, tackle and bait well" checked={values.fishing} onChange={(v) => set('fishing', v)} />
          <Toggle id="f-overnight" label="Overnight allowed" description="Cabins for sleeping aboard" checked={values.overnight} onChange={(v) => set('overnight', v)} />
        </div>
      </Section>
    </div>);

}
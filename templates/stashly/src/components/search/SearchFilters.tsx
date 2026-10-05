import React from 'react';
import { Toggle } from '../Toggle';
import { spaceTypes, sizeBuckets } from '../../data/spaceTypes';
import type { SpaceType } from '../../types/marketplace';
import { ui, cx } from '../../utils/styles';

export interface FilterState {
  types: SpaceType[];
  size: string;
  climate: boolean;
  access247: boolean;
  groundFloor: boolean;
  vehicle: boolean;
  minPrice: string;
  maxPrice: string;
}

export const defaultFilters: FilterState = {
  types: [],
  size: 'any',
  climate: false,
  access247: false,
  groundFloor: false,
  vehicle: false,
  minPrice: '',
  maxPrice: ''
};

interface Props {
  value: FilterState;
  onChange: (next: FilterState) => void;
  onReset: () => void;
}

const toggles: Array<{key: 'climate' | 'access247' | 'groundFloor' | 'vehicle';label: string;hint: string;}> = [
{ key: 'climate', label: 'Climate controlled', hint: 'Temperature & humidity managed' },
{ key: 'access247', label: '24/7 access', hint: 'Visit anytime with a code' },
{ key: 'groundFloor', label: 'Ground floor', hint: 'Step-free loading' },
{ key: 'vehicle', label: 'Vehicle storage', hint: 'Cars, RVs, boats, trailers' }];


export function SearchFilters({ value, onChange, onReset }: Props) {
  const set = <K extends keyof FilterState,>(key: K, v: FilterState[K]) => onChange({ ...value, [key]: v });

  const toggleType = (t: SpaceType) =>
  set('types', value.types.includes(t) ? value.types.filter((x) => x !== t) : [...value.types, t]);

  return (
    <div className="space-y-7">
      <fieldset>
        <legend className="mb-3 text-sm font-semibold text-stone-900">Space type</legend>
        <div className="flex flex-wrap gap-2">
          {spaceTypes.map((t) => {
            const on = value.types.includes(t.value);
            return (
              <button key={t.value} type="button" aria-pressed={on} onClick={() => toggleType(t.value)} className={cx(ui.chip, on ? ui.chipOn : ui.chipOff)}>
                {t.label}
              </button>);

          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-3 text-sm font-semibold text-stone-900">Size (sq ft)</legend>
        <div className="flex flex-wrap gap-2">
          {sizeBuckets.map((b) => {
            const on = value.size === b.id;
            return (
              <button key={b.id} type="button" aria-pressed={on} onClick={() => set('size', b.id)} className={cx(ui.chip, on ? ui.chipOn : ui.chipOff)}>
                {b.label}
              </button>);

          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-3 text-sm font-semibold text-stone-900">Features</legend>
        <div className="divide-y divide-stone-100 rounded-xl border border-stone-200">
          {toggles.map((t) =>
          <div key={t.key} className="flex items-center justify-between gap-4 px-4 py-3">
              <div>
                <p className="text-sm font-medium text-stone-900">{t.label}</p>
                <p className="text-xs text-stone-500">{t.hint}</p>
              </div>
              <Toggle checked={value[t.key]} onChange={(c) => set(t.key, c)} aria-label={t.label} size="small" />
            </div>
          )}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-3 text-sm font-semibold text-stone-900">Monthly price</legend>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <label htmlFor="min-price" className="sr-only">Minimum price</label>
            <input id="min-price" inputMode="numeric" placeholder="Min $" value={value.minPrice} onChange={(e) => set('minPrice', e.target.value.replace(/\D/g, ''))} className={ui.field} />
          </div>
          <span className="text-stone-400" aria-hidden="true">–</span>
          <div className="flex-1">
            <label htmlFor="max-price" className="sr-only">Maximum price</label>
            <input id="max-price" inputMode="numeric" placeholder="Max $" value={value.maxPrice} onChange={(e) => set('maxPrice', e.target.value.replace(/\D/g, ''))} className={ui.field} />
          </div>
        </div>
      </fieldset>

      <button type="button" onClick={onReset} className="text-sm font-semibold text-brand-700 underline-offset-4 hover:underline">
        Clear all filters
      </button>
    </div>);

}
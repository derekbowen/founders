import React from 'react';
import { Checkbox } from '../Checkbox';
import { amenities } from '../../data/amenities';
import { listings } from '../../data/listings';
import { spaceTypes } from '../../data/spaceTypes';
import type { AmenityId, SpaceTypeId } from '../../types/listing';
import type { SearchFilters } from '../../utils/search';
import { SegmentedControl } from '../ui/SegmentedControl';
import { Stepper } from '../ui/Stepper';

interface FilterPanelProps {
  filters: SearchFilters;
  onChange: (patch: Partial<SearchFilters>) => void;
  onReset: () => void;
  activeCount: number;
}

function toggle<T>(list: T[], item: T): T[] {
  return list.includes(item) ? list.filter((i) => i !== item) : [...list, item];
}

export function FilterPanel({ filters, onChange, onReset, activeCount }: FilterPanelProps) {
  const unitLabel = filters.unit === 'hour' ? 'hour' : 'day';
  return (
    <div className="space-y-7">
      <div className="flex items-center justify-between">
        <h2 className="font-sans text-base font-semibold">Filters</h2>
        <button
          type="button"
          onClick={onReset}
          disabled={activeCount === 0}
          className="text-sm font-medium text-brand-700 hover:underline disabled:cursor-not-allowed disabled:text-ink-subtle disabled:no-underline">
          
          Reset{activeCount > 0 ? ` (${activeCount})` : ''}
        </button>
      </div>

      <fieldset>
        <legend className="mb-3 text-sm font-semibold">Space type</legend>
        <div className="space-y-2.5">
          {spaceTypes.map((t) => {
            const count = listings.filter((l) => l.spaceType === t.id).length;
            return (
              <Checkbox
                key={t.id}
                checked={filters.types.includes(t.id)}
                onChange={() => onChange({ types: toggle<SpaceTypeId>(filters.types, t.id) })}
                label={
                <span className="flex w-full items-center justify-between gap-2 text-sm">
                    {t.label} <span className="text-xs text-ink-subtle">{count}</span>
                  </span>
                } />);


          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-3 text-sm font-semibold">Price</legend>
        <SegmentedControl
          label="Price unit"
          value={filters.unit}
          onChange={(unit) => onChange({ unit, min: null, max: null })}
          options={[
          { value: 'hour', label: 'Per hour' },
          { value: 'day', label: 'Per day' }]
          } />
        
        <div className="mt-3 grid grid-cols-2 gap-2">
          <div>
            <label htmlFor="price-min" className="mb-1 block text-xs text-ink-muted">
              Min €/{unitLabel}
            </label>
            <input
              id="price-min"
              type="number"
              min={0}
              inputMode="numeric"
              placeholder="0"
              value={filters.min ?? ''}
              onChange={(e) => onChange({ min: e.target.value === '' ? null : Number(e.target.value) })}
              className="field" />
            
          </div>
          <div>
            <label htmlFor="price-max" className="mb-1 block text-xs text-ink-muted">
              Max €/{unitLabel}
            </label>
            <input
              id="price-max"
              type="number"
              min={0}
              inputMode="numeric"
              placeholder="Any"
              value={filters.max ?? ''}
              onChange={(e) => onChange({ max: e.target.value === '' ? null : Number(e.target.value) })}
              className="field" />
            
          </div>
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-3 text-sm font-semibold">Capacity</legend>
        <div className="flex items-center justify-between">
          <span className="text-sm text-ink-muted">People</span>
          <Stepper label="People" value={filters.people} min={1} max={20} onChange={(people) => onChange({ people })} />
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-3 text-sm font-semibold">Amenities</legend>
        <div className="space-y-2.5">
          {amenities.
          filter((a) => a.filterable).
          map((a) =>
          <Checkbox
            key={a.id}
            checked={filters.amenities.includes(a.id)}
            onChange={() => onChange({ amenities: toggle<AmenityId>(filters.amenities, a.id) })}
            label={
            <span className="flex items-center gap-2 text-sm">
                    <a.icon size={15} className="text-ink-muted" aria-hidden="true" /> {a.label}
                  </span>
            } />

          )}
        </div>
      </fieldset>
    </div>);

}
import React from 'react';
import { certifications, keyEquipment, priceBounds, segments, storageTypes } from '../../data/catalog';
import type { SearchFiltersState } from '../../types/marketplace';
import { formatMoney } from '../../utils/format';
import { toggleValue } from '../../utils/search';
import { cn, focusRing } from '../../utils/styles';
import { EquipmentIcon } from '../listing/EquipmentIcon';
import { CheckboxField } from '../ui/CheckboxField';
import { Toggle } from '../ui/Toggle';

interface SearchFiltersProps {
  filters: SearchFiltersState;
  onChange: (patch: Partial<SearchFiltersState>) => void;
  idPrefix?: string;
}

const legend = 'mb-3 font-heading text-sm font-semibold uppercase tracking-widest text-steel-900';

export function SearchFilters({ filters, onChange, idPrefix = 'f' }: SearchFiltersProps) {
  return (
    <div className="space-y-8">
      <fieldset>
        <legend className={legend}>Best for</legend>
        <div className="flex flex-wrap gap-2">
          {segments.map((s) => {
            const active = filters.use === s.key;
            return (
              <button
                key={s.key}
                type="button"
                aria-pressed={active}
                onClick={() => onChange({ use: active ? 'all' : s.key })}
                className={cn(
                  'rounded-full border px-3 py-1.5 text-sm font-medium transition-colors',
                  focusRing,
                  active ? 'border-steel-900 bg-steel-900 text-white' : 'border-steel-300 text-steel-700 hover:border-steel-500'
                )}>
                
                {s.label}
              </button>);

          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className={legend}>Price per hour</legend>
        <p className="mb-3 text-sm font-medium text-steel-800">
          {formatMoney(filters.priceMin)} – {formatMoney(filters.priceMax)}
          {filters.priceMax === priceBounds.max && '+'}
        </p>
        <div className="space-y-3">
          <label className="block text-xs text-steel-500">
            Minimum
            <input
              type="range"
              min={priceBounds.min}
              max={priceBounds.max}
              step={2}
              value={filters.priceMin}
              onChange={(e) => onChange({ priceMin: Math.min(Number(e.target.value), filters.priceMax - 2) })}
              className="mt-1 block w-full" />
            
          </label>
          <label className="block text-xs text-steel-500">
            Maximum
            <input
              type="range"
              min={priceBounds.min}
              max={priceBounds.max}
              step={2}
              value={filters.priceMax}
              onChange={(e) => onChange({ priceMax: Math.max(Number(e.target.value), filters.priceMin + 2) })}
              className="mt-1 block w-full" />
            
          </label>
        </div>
      </fieldset>

      <fieldset>
        <legend className={legend}>Equipment</legend>
        {keyEquipment.map((e) =>
        <CheckboxField
          key={e.key}
          id={`${idPrefix}-eq-${e.key}`}
          checked={filters.equipment.includes(e.key)}
          onChange={() => onChange({ equipment: toggleValue(filters.equipment, e.key) })}
          label={
          <span className="flex items-center gap-2">
                <EquipmentIcon equipment={e.key} className="h-4 w-4 text-steel-500" />
                {e.label}
              </span>
          } />

        )}
      </fieldset>

      <fieldset>
        <legend className={legend}>Storage</legend>
        {storageTypes.map((s) =>
        <CheckboxField
          key={s.key}
          id={`${idPrefix}-st-${s.key}`}
          checked={filters.storage.includes(s.key)}
          onChange={() => onChange({ storage: toggleValue(filters.storage, s.key) })}
          label={s.label}
          description={s.description} />

        )}
      </fieldset>

      <fieldset>
        <legend className={legend}>Certifications</legend>
        {certifications.map((c) =>
        <CheckboxField
          key={c.key}
          id={`${idPrefix}-ce-${c.key}`}
          checked={filters.certifications.includes(c.key)}
          onChange={() => onChange({ certifications: toggleValue(filters.certifications, c.key) })}
          label={c.label} />

        )}
      </fieldset>

      <fieldset>
        <legend className={legend}>Access</legend>
        <Toggle
          checked={filters.access247}
          onChange={(v) => onChange({ access247: v })}
          label="24/7 access"
          description="Keycard entry at any hour" />
        
      </fieldset>
    </div>);

}
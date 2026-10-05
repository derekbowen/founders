import React from 'react';
import { Checkbox } from '../Checkbox';
import { Slider } from '../Slider';
import { vehicleSizes } from '../../data/vehicles';
import { buttonClass, fieldClass, labelClass } from '../../utils/styles';
import { formatMoney } from '../../utils/format';
import { defaultFilters, type SearchFilters } from '../../utils/listings';
import type { UseCase } from '../../types/listing';

interface FilterPanelProps {
  filters: SearchFilters;
  arrive: string;
  leave: string;
  version: number;
  onChange: <K extends keyof SearchFilters>(key: K, value: SearchFilters[K]) => void;
  onWhen: (arrive: string, leave: string) => void;
  onReset: () => void;
  onClose: () => void;
  resultCount: number;
}

const useCaseOptions: {value: UseCase | 'all';label: string;}[] = [
{ value: 'all', label: 'Any purpose' },
{ value: 'commuters', label: 'Commuting' },
{ value: 'events', label: 'Events' },
{ value: 'airports', label: 'Airports' },
{ value: 'monthly', label: 'Monthly' }];


export function FilterPanel({ filters, arrive, leave, version, onChange, onWhen, onReset, onClose, resultCount }: FilterPanelProps) {
  return (
    <div className="space-y-6">
      <fieldset>
        <legend className={labelClass}>When</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="text-xs font-medium text-muted">
            Arrive
            <input type="datetime-local" value={arrive} onChange={(e) => onWhen(e.target.value, leave)} className={`${fieldClass} mt-1`} />
          </label>
          <label className="text-xs font-medium text-muted">
            Leave
            <input type="datetime-local" value={leave} onChange={(e) => onWhen(arrive, e.target.value)} className={`${fieldClass} mt-1`} />
          </label>
        </div>
      </fieldset>

      <div>
        <div className="flex items-center justify-between">
          <span className={labelClass}>Max hourly price</span>
          <span className="text-sm font-semibold">
            {filters.maxPrice >= defaultFilters.maxPrice ? 'Any' : `Up to ${formatMoney(filters.maxPrice)}/hr`}
          </span>
        </div>
        <div className="px-1 pt-2">
          <Slider
            key={version}
            min={1}
            max={defaultFilters.maxPrice}
            step={1}
            value={filters.maxPrice}
            showMarkers={false}
            showLabels={false}
            onChange={(v) => onChange('maxPrice', v as number)} />
          
        </div>
      </div>

      <fieldset>
        <legend className={labelClass}>Amenities</legend>
        <div className="grid grid-cols-2 gap-3">
          <Checkbox label="Covered" checked={filters.covered} onChange={(e) => onChange('covered', e.target.checked)} />
          <Checkbox label="EV charging" checked={filters.evCharging} onChange={(e) => onChange('evCharging', e.target.checked)} />
          <Checkbox label="24/7 access" checked={filters.access247} onChange={(e) => onChange('access247', e.target.checked)} />
          <Checkbox label="Security camera" checked={filters.securityCamera} onChange={(e) => onChange('securityCamera', e.target.checked)} />
        </div>
      </fieldset>

      <fieldset>
        <legend className={labelClass}>My vehicle</legend>
        <div className="flex flex-wrap gap-2">
          {(['any', ...vehicleSizes] as const).map((v) =>
          <button
            key={v}
            type="button"
            aria-pressed={filters.vehicle === v}
            onClick={() => onChange('vehicle', v)}
            className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
            filters.vehicle === v ? 'border-navy bg-navy text-white' : 'border-line bg-surface hover:border-ink/40'}`
            }>
            
              {v === 'any' ? 'Any size' : v}
            </button>
          )}
        </div>
      </fieldset>

      <div>
        <label htmlFor="usecase" className={labelClass}>
          Purpose
        </label>
        <select
          id="usecase"
          value={filters.useCase}
          onChange={(e) => onChange('useCase', e.target.value as UseCase | 'all')}
          className={fieldClass}>
          
          {useCaseOptions.map((o) =>
          <option key={o.value} value={o.value}>
              {o.label}
            </option>
          )}
        </select>
      </div>

      <div className="flex gap-3 border-t border-line pt-4">
        <button type="button" onClick={onReset} className={buttonClass('ghost', 'md', 'flex-1')}>
          Reset all
        </button>
        <button type="button" onClick={onClose} className={buttonClass('primary', 'md', 'flex-1')}>
          Show {resultCount} {resultCount === 1 ? 'spot' : 'spots'}
        </button>
      </div>
    </div>);

}
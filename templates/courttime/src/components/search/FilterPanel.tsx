import React from 'react';
import { motion } from 'framer-motion';
import { Toggle } from '../Toggle';
import { formatHour } from '../../utils/format';
import { SearchFilters } from '../../types/marketplace';

interface FilterPanelProps {
  filters: SearchFilters;
  surfaces: string[];
  onUpdate: (patch: Partial<SearchFilters>) => void;
  onReset: () => void;
  onClose: () => void;
}

const settings: {value: SearchFilters['setting'];label: string;}[] = [
{ value: 'any', label: 'Any' },
{ value: 'indoor', label: 'Indoor' },
{ value: 'outdoor', label: 'Outdoor' }];


const timeOptions = Array.from({ length: 17 }, (_, i) => i + 6);

function parsePrice(value: string): number | null {
  if (value === '') return null;
  const n = Number(value);
  return Number.isFinite(n) && n >= 0 ? n : null;
}

export function FilterPanel({ filters, surfaces, onUpdate, onReset, onClose }: FilterPanelProps) {
  const toggleSurface = (s: string) =>
  onUpdate({ surfaces: filters.surfaces.includes(s) ? filters.surfaces.filter((x) => x !== s) : [...filters.surfaces, s] });

  return (
    <motion.div
      id="search-filter-panel"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.18 }}
      className="overflow-hidden">
      
      <div className="card mb-6 grid gap-6 p-5 md:grid-cols-2 xl:grid-cols-4">
        <fieldset>
          <legend className="field-label">Indoor / outdoor</legend>
          <div className="flex flex-wrap gap-2">
            {settings.map((s) =>
            <button key={s.value} type="button" aria-pressed={filters.setting === s.value} onClick={() => onUpdate({ setting: s.value })} className={`chip ${filters.setting === s.value ? 'chip-active' : ''}`}>
                {s.label}
              </button>
            )}
          </div>
          <label htmlFor="filter-time" className="field-label mt-5">Free at</label>
          <select id="filter-time" className="field" value={filters.time ?? ''} onChange={(e) => onUpdate({ time: e.target.value === '' ? null : Number(e.target.value) })}>
            <option value="">Any time</option>
            {timeOptions.map((h) =>
            <option key={h} value={h}>{formatHour(h)}</option>
            )}
          </select>
        </fieldset>
        <fieldset>
          <legend className="field-label">Surface</legend>
          <div className="flex flex-wrap gap-2">
            {surfaces.map((s) => {
              const active = filters.surfaces.includes(s);
              return (
                <button key={s} type="button" aria-pressed={active} onClick={() => toggleSurface(s)} className={`chip ${active ? 'chip-active' : ''}`}>
                  {s}
                </button>);

            })}
          </div>
        </fieldset>
        <fieldset>
          <legend className="field-label">Price per hour</legend>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">$</span>
              <input type="number" min={0} inputMode="numeric" aria-label="Minimum price" placeholder="Min" className="field pl-7" value={filters.priceMin ?? ''} onChange={(e) => onUpdate({ priceMin: parsePrice(e.target.value) })} />
            </div>
            <span className="text-slate-400" aria-hidden="true">–</span>
            <div className="relative flex-1">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">$</span>
              <input type="number" min={0} inputMode="numeric" aria-label="Maximum price" placeholder="Max" className="field pl-7" value={filters.priceMax ?? ''} onChange={(e) => onUpdate({ priceMax: parsePrice(e.target.value) })} />
            </div>
          </div>
        </fieldset>
        <fieldset className="space-y-4">
          <legend className="field-label">Features</legend>
          <Toggle label="Court lights" checked={filters.lights} onChange={(v) => onUpdate({ lights: v })} />
          <Toggle label="Equipment rental" checked={filters.equipment} onChange={(v) => onUpdate({ equipment: v })} />
          <Toggle label="Open play only" checked={filters.openPlayOnly} onChange={(v) => onUpdate({ openPlayOnly: v })} />
        </fieldset>
        <div className="flex justify-end gap-2 border-t border-slate-100 pt-4 md:col-span-2 xl:col-span-4">
          <button type="button" onClick={onReset} className="btn btn-ghost btn-md">Clear filters</button>
          <button type="button" onClick={onClose} className="btn btn-primary btn-md">Show results</button>
        </div>
      </div>
    </motion.div>);

}
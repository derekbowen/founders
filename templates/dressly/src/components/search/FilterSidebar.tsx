import React, { useEffect, useState } from 'react';
import { PackageIcon, StoreIcon } from 'lucide-react';
import { Checkbox } from '../Checkbox';
import { listings } from '../../data/listings';
import { colorSwatches, lengths, occasions, pricePresets, sizes } from '../../data/taxonomy';
import type { ListingFiltersApi } from '../../hooks/useListingFilters';
import { cx } from '../../utils/styles';
import { FilterSection } from './FilterSection';

const designerOptions = Array.from(new Set(listings.map((l) => l.designer))).sort();

const chip = (active: boolean) =>
cx(
  'h-9 border text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-dark',
  active ? 'border-ink bg-ink text-paper' : 'border-line bg-paper text-ink hover:border-ink'
);

export function FilterSidebar({ api }: {api: ListingFiltersApi;}) {
  const { filters, toggle, setPrice } = api;
  const [showAllDesigners, setShowAllDesigners] = useState(false);
  const [minInput, setMinInput] = useState(filters.min?.toString() ?? '');
  const [maxInput, setMaxInput] = useState(filters.max?.toString() ?? '');

  useEffect(() => {
    setMinInput(filters.min?.toString() ?? '');
    setMaxInput(filters.max?.toString() ?? '');
  }, [filters.min, filters.max]);

  const visibleDesigners = showAllDesigners ? designerOptions : designerOptions.slice(0, 7);

  return (
    <div>
      <FilterSection title="Size" count={filters.size.length}>
        <div className="grid grid-cols-4 gap-2">
          {sizes.map((s) => {
            const active = filters.size.includes(String(s));
            return (
              <button
                key={s}
                type="button"
                aria-pressed={active}
                onClick={() => toggle('size', String(s))}
                className={chip(active)}>
                
                {s}
              </button>);

          })}
        </div>
        <p className="mt-2 text-[11px] text-muted">US sizing</p>
      </FilterSection>

      <FilterSection title="Designer" count={filters.designer.length}>
        <div className="space-y-2.5">
          {visibleDesigners.map((d) =>
          <Checkbox
            key={d}
            size="sm"
            label={<span className="text-sm text-ink">{d}</span>}
            checked={filters.designer.includes(d)}
            onChange={() => toggle('designer', d)} />

          )}
        </div>
        {designerOptions.length > 7 &&
        <button
          type="button"
          onClick={() => setShowAllDesigners((s) => !s)}
          className="mt-3 text-xs font-medium text-accent-dark underline underline-offset-4">
          
            {showAllDesigners ? 'Show fewer' : `Show all ${designerOptions.length}`}
          </button>
        }
      </FilterSection>

      <FilterSection title="Occasion" count={filters.occasion.length}>
        <div className="space-y-2.5">
          {occasions.map((o) =>
          <Checkbox
            key={o.slug}
            size="sm"
            label={<span className="text-sm text-ink">{o.label}</span>}
            checked={filters.occasion.includes(o.slug)}
            onChange={() => toggle('occasion', o.slug)} />

          )}
        </div>
      </FilterSection>

      <FilterSection title="Color" count={filters.color.length}>
        <div className="grid grid-cols-6 gap-2.5">
          {colorSwatches.map((c) => {
            const active = filters.color.includes(c.name);
            return (
              <button
                key={c.name}
                type="button"
                title={c.name}
                aria-label={c.name}
                aria-pressed={active}
                onClick={() => toggle('color', c.name)}
                className={cx(
                  'relative h-8 w-8 rounded-full border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-dark focus-visible:ring-offset-2',
                  active ? 'ring-2 ring-ink ring-offset-2' : 'border-line hover:scale-110'
                )}
                style={
                c.hex === 'conic' ?
                {
                  background:
                  'conic-gradient(#e7a1b5, #e9c64a, #2f6b4f, #b9a3d4, #e7a1b5)'
                } :
                { backgroundColor: c.hex }
                } />);


          })}
        </div>
      </FilterSection>

      <FilterSection title="Length" count={filters.length.length}>
        <div className="grid grid-cols-2 gap-2">
          {lengths.map((len) => {
            const active = filters.length.includes(len);
            return (
              <button
                key={len}
                type="button"
                aria-pressed={active}
                onClick={() => toggle('length', len)}
                className={chip(active)}>
                
                {len}
              </button>);

          })}
        </div>
      </FilterSection>

      <FilterSection
        title="Price per 4-day rental"
        count={filters.min !== null || filters.max !== null ? 1 : 0}>
        
        <div className="flex flex-wrap gap-2">
          {pricePresets.map((p) => {
            const active = filters.min === p.min && filters.max === p.max;
            return (
              <button
                key={p.label}
                type="button"
                aria-pressed={active}
                onClick={() => active ? setPrice(null, null) : setPrice(p.min, p.max)}
                className={cx(chip(active), 'px-3')}>
                
                {p.label}
              </button>);

          })}
        </div>
        <form
          className="mt-4 flex items-end gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            setPrice(minInput ? Number(minInput) : null, maxInput ? Number(maxInput) : null);
          }}>
          
          <label className="flex-1">
            <span className="mb-1 block text-[11px] text-muted">Min</span>
            <input
              inputMode="numeric"
              value={minInput}
              onChange={(e) => setMinInput(e.target.value.replace(/\D/g, ''))}
              placeholder="$0"
              className="h-9 w-full border border-line px-2 text-sm focus:border-ink focus:outline-none" />
            
          </label>
          <span className="pb-2 text-muted">–</span>
          <label className="flex-1">
            <span className="mb-1 block text-[11px] text-muted">Max</span>
            <input
              inputMode="numeric"
              value={maxInput}
              onChange={(e) => setMaxInput(e.target.value.replace(/\D/g, ''))}
              placeholder="$200"
              className="h-9 w-full border border-line px-2 text-sm focus:border-ink focus:outline-none" />
            
          </label>
          <button
            type="submit"
            className="h-9 border border-ink px-3 text-[11px] font-semibold uppercase tracking-wider transition hover:bg-ink hover:text-paper">
            
            Go
          </button>
        </form>
      </FilterSection>

      <FilterSection title="Delivery" count={filters.delivery.length}>
        <div className="grid grid-cols-2 gap-2">
          {[
          { value: 'ship', label: 'Shipping', icon: PackageIcon },
          { value: 'pickup', label: 'Local pickup', icon: StoreIcon }].
          map(({ value, label, icon: Icon }) => {
            const active = filters.delivery.includes(value);
            return (
              <button
                key={value}
                type="button"
                aria-pressed={active}
                onClick={() => toggle('delivery', value)}
                className={cx(chip(active), 'flex h-auto flex-col items-center gap-1 py-3')}>
                
                <Icon size={16} aria-hidden="true" />
                {label}
              </button>);

          })}
        </div>
      </FilterSection>
    </div>);

}
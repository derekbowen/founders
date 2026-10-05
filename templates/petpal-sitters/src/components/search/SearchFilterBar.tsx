import React, { useState } from 'react';
import { SlidersHorizontalIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogFooter, DialogHeader } from '../Dialog';
import { CheckboxField } from '../ui/CheckboxField';
import { Button } from '../ui/Button';
import { ServiceIcon } from '../ui/ServiceIcon';
import { FilterPopover } from './FilterPopover';
import { PRICE_MAX, PRICE_MIN, type SearchFilters } from '../../hooks/useListingSearch';
import { petSizeOptions, services, sortOptions } from '../../data/services';
import type { PetSize } from '../../types/marketplace';
import { cn } from '../../utils/cn';
import { getService } from '../../utils/pricing';

interface SearchFilterBarProps {
  filters: SearchFilters;
  setFilters: (patch: Partial<SearchFilters>) => void;
  moreFiltersCount: number;
}

const moreFilterOptions: {key: 'acceptsCats' | 'fencedYard' | 'noOtherPets' | 'homeFullTime';label: string;description: string;}[] = [
{ key: 'acceptsCats', label: 'Accepts cats', description: 'Sitters happy to care for cats' },
{ key: 'fencedYard', label: 'Fenced yard', description: 'Secure outdoor space for off-leash play' },
{ key: 'noOtherPets', label: 'No other pets', description: 'Your pet will be the only animal in the home' },
{ key: 'homeFullTime', label: 'Sitter at home full-time', description: 'Someone is home all day, every day' }];


export function SearchFilterBar({ filters, setFilters, moreFiltersCount }: SearchFilterBarProps) {
  const [moreOpen, setMoreOpen] = useState(false);
  const unit = filters.service ? getService(filters.service).unitLabel : 'night';
  const priceActive = filters.minPrice !== PRICE_MIN || filters.maxPrice !== PRICE_MAX;

  const toggleSize = (size: PetSize) =>
  setFilters({ sizes: filters.sizes.includes(size) ? filters.sizes.filter((s) => s !== size) : [...filters.sizes, size] });

  const pill = (selected: boolean) =>
  cn(
    'flex h-10 shrink-0 items-center gap-2 whitespace-nowrap rounded-full border px-4 text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-200',
    selected ? 'border-stone-900 bg-stone-900 text-white' : 'border-stone-300 bg-white text-stone-700 hover:border-stone-400'
  );

  return (
    <div className="space-y-3">
      <div className="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0" role="radiogroup" aria-label="Service">
        <button type="button" role="radio" aria-checked={!filters.service} className={pill(!filters.service)} onClick={() => setFilters({ service: null })}>
          All services
        </button>
        {services.map((s) =>
        <button
          key={s.id}
          type="button"
          role="radio"
          aria-checked={filters.service === s.id}
          className={pill(filters.service === s.id)}
          onClick={() => setFilters({ service: s.id })}>
          
            <ServiceIcon id={s.id} className="h-4 w-4" />
            {s.label}
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <FilterPopover
          label={priceActive ? `$${filters.minPrice}–$${filters.maxPrice}${filters.maxPrice === PRICE_MAX ? '+' : ''}` : `Price per ${unit}`}
          active={priceActive}
          onClear={() => setFilters({ minPrice: PRICE_MIN, maxPrice: PRICE_MAX })}>
          
          <p className="text-sm font-extrabold text-stone-900">Price per {unit}</p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <label className="text-xs font-bold text-stone-500">
              Min
              <div className="mt-1 flex h-10 items-center rounded-xl border border-stone-300 px-3 focus-within:border-primary-500">
                <span className="text-stone-400">$</span>
                <input
                  type="number"
                  min={PRICE_MIN}
                  max={filters.maxPrice}
                  value={filters.minPrice}
                  onChange={(e) => setFilters({ minPrice: Math.min(Number(e.target.value), filters.maxPrice) })}
                  className="w-full bg-transparent pl-1 text-[15px] font-bold text-stone-900 focus:outline-none" />
                
              </div>
            </label>
            <label className="text-xs font-bold text-stone-500">
              Max
              <div className="mt-1 flex h-10 items-center rounded-xl border border-stone-300 px-3 focus-within:border-primary-500">
                <span className="text-stone-400">$</span>
                <input
                  type="number"
                  min={filters.minPrice}
                  max={PRICE_MAX}
                  value={filters.maxPrice}
                  onChange={(e) => setFilters({ maxPrice: Math.max(Number(e.target.value), filters.minPrice) })}
                  className="w-full bg-transparent pl-1 text-[15px] font-bold text-stone-900 focus:outline-none" />
                
              </div>
            </label>
          </div>
          <label htmlFor="max-price-range" className="sr-only">
            Maximum price
          </label>
          <input
            id="max-price-range"
            type="range"
            min={PRICE_MIN}
            max={PRICE_MAX}
            step={5}
            value={filters.maxPrice}
            onChange={(e) => setFilters({ maxPrice: Math.max(Number(e.target.value), filters.minPrice) })}
            className="mt-4 w-full" />
          
          <div className="flex justify-between text-xs font-semibold text-stone-500">
            <span>${PRICE_MIN}</span>
            <span>${PRICE_MAX}+</span>
          </div>
        </FilterPopover>

        <FilterPopover
          label={filters.sizes.length ? `Pet size · ${filters.sizes.length}` : 'Pet size'}
          active={filters.sizes.length > 0}
          onClear={() => setFilters({ sizes: [] })}>
          
          <p className="text-sm font-extrabold text-stone-900">My pet’s size</p>
          <div className="mt-4 space-y-3">
            {petSizeOptions.map((s) =>
            <CheckboxField
              key={s.id}
              id={`size-${s.id}`}
              label={s.label}
              description={s.range}
              checked={filters.sizes.includes(s.id)}
              onChange={() => toggleSize(s.id)} />

            )}
          </div>
        </FilterPopover>

        <button
          type="button"
          onClick={() => setMoreOpen(true)}
          className={cn(
            'flex h-10 items-center gap-2 rounded-full border px-4 text-sm font-bold transition-colors',
            moreFiltersCount ? 'border-primary-500 bg-primary-50 text-primary-800' : 'border-stone-300 bg-white text-stone-700 hover:border-stone-400'
          )}>
          
          <SlidersHorizontalIcon className="h-4 w-4" aria-hidden="true" />
          Home & pets
          {moreFiltersCount > 0 &&
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary-500 px-1 text-xs font-black text-stone-900">{moreFiltersCount}</span>
          }
        </button>

        <div className="ml-auto flex items-center gap-2">
          <label htmlFor="sort" className="hidden text-sm font-semibold text-stone-500 sm:block">
            Sort by
          </label>
          <select
            id="sort"
            value={filters.sort}
            onChange={(e) => setFilters({ sort: e.target.value })}
            className="h-10 rounded-full border border-stone-300 bg-white px-3 text-sm font-bold text-stone-800 hover:border-stone-400 focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-100">
            
            {sortOptions.map((o) =>
            <option key={o.value} value={o.value}>
                {o.label}
              </option>
            )}
          </select>
        </div>
      </div>

      <Dialog isOpen={moreOpen} onClose={() => setMoreOpen(false)} size="md">
        <DialogHeader>Home & pet preferences</DialogHeader>
        <DialogContent>
          <div className="space-y-5 py-2">
            {moreFilterOptions.map((o) =>
            <CheckboxField
              key={o.key}
              id={`more-${o.key}`}
              label={o.label}
              description={o.description}
              checked={filters[o.key]}
              onChange={(checked) => setFilters({ [o.key]: checked } as Partial<SearchFilters>)} />

            )}
          </div>
        </DialogContent>
        <DialogFooter>
          <div className="flex w-full items-center justify-between gap-3">
            <button
              type="button"
              className="text-sm font-bold text-stone-600 hover:text-stone-900 hover:underline"
              onClick={() => setFilters({ acceptsCats: false, fencedYard: false, noOtherPets: false, homeFullTime: false })}>
              
              Clear all
            </button>
            <Button onClick={() => setMoreOpen(false)}>Show sitters</Button>
          </div>
        </DialogFooter>
      </Dialog>
    </div>);

}
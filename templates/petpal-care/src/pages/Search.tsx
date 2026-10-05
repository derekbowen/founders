import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ListIcon, MapIcon, SlidersHorizontalIcon, XIcon } from 'lucide-react';
import { ListingCard } from '../components/listing/ListingCard';
import { ListingsMap } from '../components/map/ListingsMap';
import { FilterPanel } from '../components/search/FilterPanel';
import { EmptyState } from '../components/common/EmptyState';
import { ServiceIcon } from '../components/common/ServiceIcon';
import { services } from '../data/services';
import { useSearchFilters, type SortKey } from '../hooks/useSearchFilters';
import { formatDateRange, pluralize } from '../utils/format';

const sortOptions: {value: SortKey;label: string;}[] = [
{ value: 'recommended', label: 'Recommended' },
{ value: 'price-asc', label: 'Price: low to high' },
{ value: 'price-desc', label: 'Price: high to low' },
{ value: 'rating', label: 'Highest rated' },
{ value: 'reviews', label: 'Most reviews' }];


export function Search() {
  const { filters, update, reset, sort, setSort, results, activeCount } = useSearchFilters();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [mobileView, setMobileView] = useState<'list' | 'map'>('list');
  const serviceId = filters.service === 'any' ? undefined : filters.service;

  const quickToggles = [
  { key: 'acceptsCats' as const, label: 'Accepts cats' },
  { key: 'fencedYard' as const, label: 'Fenced yard' },
  { key: 'noOtherPets' as const, label: 'No other pets' },
  { key: 'fullTimeHome' as const, label: 'Home full-time' }];


  return (
    <div className="flex flex-col bg-white lg:h-[calc(100vh-72px)]">
      {/* Filter bar */}
      <div className="border-b border-ink-200 bg-white">
        <div className="flex items-center gap-2 overflow-x-auto px-4 py-3 no-scrollbar sm:px-6">
          <div role="radiogroup" aria-label="Service" className="flex shrink-0 gap-2">
            <button type="button" role="radio" aria-checked={filters.service === 'any'} onClick={() => update('service', 'any')} className={`chip shrink-0 ${filters.service === 'any' ? 'chip-active' : ''}`}>
              All services
            </button>
            {services.map((s) =>
            <button
              key={s.id}
              type="button"
              role="radio"
              aria-checked={filters.service === s.id}
              onClick={() => update('service', s.id)}
              className={`chip shrink-0 ${filters.service === s.id ? 'chip-active' : ''}`}>
              
                <ServiceIcon serviceId={s.id} />
                {s.name}
              </button>
            )}
          </div>
          <span className="mx-1 hidden h-6 w-px shrink-0 bg-ink-200 xl:block" aria-hidden="true" />
          <div className="hidden shrink-0 gap-2 xl:flex">
            {quickToggles.map((t) =>
            <button key={t.key} type="button" aria-pressed={filters[t.key]} onClick={() => update(t.key, !filters[t.key])} className={`chip ${filters[t.key] ? 'chip-active' : ''}`}>
                {t.label}
              </button>
            )}
          </div>
          <button type="button" onClick={() => setFiltersOpen(true)} className={`chip ml-auto shrink-0 ${activeCount ? 'chip-active' : ''}`}>
            <SlidersHorizontalIcon className="h-4 w-4" aria-hidden="true" />
            Filters
            {activeCount > 0 && <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-500 text-xs font-black text-ink-900">{activeCount}</span>}
          </button>
        </div>
      </div>

      <div className="flex min-h-0 flex-1">
        {/* Results */}
        <section aria-label="Search results" className={`min-h-0 w-full overflow-y-auto lg:w-[58%] xl:w-[55%] ${mobileView === 'map' ? 'hidden lg:block' : ''}`}>
          <div className="px-4 py-5 sm:px-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-xl font-black text-ink-900" aria-live="polite">
                  {pluralize(results.length, 'sitter')} {filters.location ? `near “${filters.location}”` : 'in Portland'}
                </h1>
                <p className="text-sm text-ink-600">
                  {filters.start ? `Available ${formatDateRange(filters.start, filters.end || undefined)}` : 'Any dates'} · {pluralize(filters.pets, 'pet')}
                </p>
              </div>
              <label className="flex items-center gap-2 text-sm font-semibold text-ink-700">
                Sort by
                <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)} className="field w-auto py-2 pr-8 font-bold">
                  {sortOptions.map((o) =>
                  <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  )}
                </select>
              </label>
            </div>

            {(filters.location || filters.start) &&
            <div className="mt-3 flex flex-wrap gap-2">
                {filters.location &&
              <button type="button" onClick={() => update('location', '')} className="chip chip-active">
                    {filters.location}
                    <XIcon className="h-3.5 w-3.5" aria-label="Remove location" />
                  </button>
              }
                {filters.start &&
              <button
                type="button"
                onClick={() => {
                  update('start', '');
                  update('end', '');
                }}
                className="chip chip-active">
                
                    {formatDateRange(filters.start, filters.end || undefined)}
                    <XIcon className="h-3.5 w-3.5" aria-label="Remove dates" />
                  </button>
              }
              </div>
            }

            <div className="mt-5">
              {results.length ?
              <div className="grid gap-5 sm:grid-cols-2">
                  {results.map((l) =>
                <ListingCard key={l.id} listing={l} serviceId={serviceId} isActive={activeId === l.id} onHover={setActiveId} />
                )}
                </div> :

              <EmptyState
                title="No sitters match those filters"
                description="Try widening your price range, choosing different dates or removing a few filters."
                action={
                <button
                  type="button"
                  onClick={() => {
                    reset();
                    update('location', '');
                  }}
                  className="btn btn-md btn-primary">
                  
                      Clear all filters
                    </button>
                } />

              }
            </div>
          </div>
        </section>

        {/* Map */}
        <section aria-label="Map of sitters" className={`relative flex-1 border-l border-ink-200 ${mobileView === 'map' ? 'block h-[calc(100vh-130px)]' : 'hidden'} lg:block lg:h-auto`}>
          <ListingsMap listings={results} activeId={activeId} serviceId={serviceId} onSelect={setActiveId} />
        </section>
      </div>

      {/* Mobile map/list toggle */}
      <button
        type="button"
        onClick={() => setMobileView((v) => v === 'list' ? 'map' : 'list')}
        className="btn btn-md fixed bottom-6 left-1/2 z-30 -translate-x-1/2 bg-ink-900 text-white shadow-lift hover:bg-ink-800 lg:hidden">
        
        {mobileView === 'list' ? <MapIcon className="h-4 w-4" aria-hidden="true" /> : <ListIcon className="h-4 w-4" aria-hidden="true" />}
        {mobileView === 'list' ? 'Show map' : 'Show list'}
      </button>

      {/* Filters drawer */}
      <AnimatePresence>
        {filtersOpen &&
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-labelledby="filters-title">
            <motion.div className="absolute inset-0 bg-ink-900/40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setFiltersOpen(false)} />
            <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 32, stiffness: 320 }}
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-lift">
            
              <div className="flex items-center justify-between border-b border-ink-100 px-6 py-4">
                <h2 id="filters-title" className="text-lg font-black text-ink-900">
                  Filters
                </h2>
                <button type="button" onClick={() => setFiltersOpen(false)} className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-ink-100" aria-label="Close filters">
                  <XIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-6 py-6">
                <FilterPanel filters={filters} update={update} />
              </div>
              <div className="flex items-center justify-between gap-3 border-t border-ink-100 px-6 py-4">
                <button type="button" onClick={reset} className="btn btn-md btn-ghost underline">
                  Clear all
                </button>
                <button type="button" onClick={() => setFiltersOpen(false)} className="btn btn-md btn-primary">
                  Show {pluralize(results.length, 'sitter')}
                </button>
              </div>
            </motion.div>
          </div>
        }
      </AnimatePresence>
    </div>);

}
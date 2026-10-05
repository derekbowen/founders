import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { SlidersHorizontalIcon, MapIcon, ListIcon, XIcon, SearchXIcon, MapPinIcon } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { ListingCard } from '../components/listing/ListingCard';
import { MapView } from '../components/MapView';
import { SearchFilters, defaultFilters, type FilterState } from '../components/search/SearchFilters';
import { EmptyState } from '../components/EmptyState';
import { Button } from '../components/Button';
import { useMarketplace } from '../contexts/MarketplaceContext';
import { sqft } from '../data/listings';
import { sizeBuckets } from '../data/spaceTypes';
import type { Listing, SpaceType } from '../types/marketplace';
import { ui, cx } from '../utils/styles';

type SortKey = 'relevance' | 'price-asc' | 'price-desc' | 'size-desc' | 'rating';

const sortOptions: Array<{value: SortKey;label: string;}> = [
{ value: 'relevance', label: 'Recommended' },
{ value: 'price-asc', label: 'Price: low to high' },
{ value: 'price-desc', label: 'Price: high to low' },
{ value: 'size-desc', label: 'Size: largest first' },
{ value: 'rating', label: 'Highest rated' }];


export function Search() {
  const { listings } = useMarketplace();
  const [params, setParams] = useSearchParams();
  const location = params.get('location') ?? '';
  const date = params.get('date');
  const [filters, setFilters] = useState<FilterState>(() => ({
    ...defaultFilters,
    types: params.get('type') ? [params.get('type') as SpaceType] : [],
    size: params.get('size') ?? 'any'
  }));
  const [sort, setSort] = useState<SortKey>('relevance');
  const [panelOpen, setPanelOpen] = useState(false);
  const [mobileMap, setMobileMap] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  const results = useMemo(() => filterAndSort(listings, location, filters, sort), [listings, location, filters, sort]);

  const activeCount =
  filters.types.length + (
  filters.size !== 'any' ? 1 : 0) +
  [filters.climate, filters.access247, filters.groundFloor, filters.vehicle].filter(Boolean).length + (
  filters.minPrice || filters.maxPrice ? 1 : 0);

  const reset = () => setFilters(defaultFilters);
  const clearLocation = () => {
    const next = new URLSearchParams(params);
    next.delete('location');
    setParams(next);
  };

  return (
    <div className="flex flex-col">
      {/* Filter bar */}
      <div className="sticky top-16 z-30 border-b border-stone-200 bg-white">
        <div className="flex items-center gap-2 overflow-x-auto px-4 py-3 scrollbar-none sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => setPanelOpen(true)}
            className={cx(ui.chip, activeCount ? ui.chipOn : ui.chipOff, 'shrink-0')}>
            
            <SlidersHorizontalIcon className="h-4 w-4" aria-hidden="true" />
            Filters{activeCount ? ` (${activeCount})` : ''}
          </button>
          <span className="mx-1 h-6 w-px shrink-0 bg-stone-200" aria-hidden="true" />
          {(
          [
          ['climate', 'Climate controlled'],
          ['access247', '24/7 access'],
          ['groundFloor', 'Ground floor'],
          ['vehicle', 'Vehicle storage']] as
          const).
          map(([key, label]) =>
          <button
            key={key}
            type="button"
            aria-pressed={filters[key]}
            onClick={() => setFilters({ ...filters, [key]: !filters[key] })}
            className={cx(ui.chip, filters[key] ? ui.chipOn : ui.chipOff, 'shrink-0')}>
            
              {label}
            </button>
          )}
          <div className="ml-auto flex shrink-0 items-center gap-2 pl-2">
            <label htmlFor="sort" className="hidden text-sm text-stone-600 sm:block">Sort</label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="rounded-full border border-stone-300 bg-white py-1.5 pl-3 pr-8 text-sm font-medium text-stone-800 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200">
              
              {sortOptions.map((o) =>
              <option key={o.value} value={o.value}>{o.label}</option>
              )}
            </select>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Results */}
        <section
          aria-label="Search results"
          className={cx('w-full px-4 py-6 sm:px-6 lg:w-[58%] lg:px-8 xl:w-[60%]', mobileMap && 'hidden lg:block')}>
          
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h1 className="text-xl font-bold text-stone-900">
              {results.length} {results.length === 1 ? 'space' : 'spaces'}
              {location ? <> near “{location}”</> : ' in Portland'}
            </h1>
            {date &&
            <p className="text-sm text-stone-600">Available from {format(parseISO(date), 'MMM d, yyyy')}</p>
            }
          </div>
          {location &&
          <button onClick={clearLocation} className="mt-2 inline-flex items-center gap-1 rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-700 hover:bg-stone-200">
              <MapPinIcon className="h-3 w-3" aria-hidden="true" /> {location} <XIcon className="h-3 w-3" aria-label="Clear location" />
            </button>
          }

          {results.length === 0 ?
          <div className="mt-8">
              <EmptyState
              icon={<SearchXIcon className="h-5 w-5" />}
              title="No spaces match those filters"
              text="Try widening the size range, turning off a feature, or searching a nearby neighborhood."
              action={
              <Button className={ui.btnBrand} onClick={() => {reset();clearLocation();}}>
                    Clear filters
                  </Button>
              } />
            
            </div> :

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {results.map((l) =>
            <ListingCard key={l.id} listing={l} active={activeId === l.id} onHover={setActiveId} compact />
            )}
            </div>
          }
        </section>

        {/* Map */}
        <aside
          aria-label="Map of results"
          className={cx(
            'lg:sticky lg:top-[7.5rem] lg:block lg:h-[calc(100vh-7.5rem)] lg:flex-1',
            mobileMap ? 'block h-[calc(100vh-7.5rem)] w-full' : 'hidden'
          )}>
          
          <MapView listings={results} activeId={activeId} onHover={setActiveId} className="h-full w-full" />
        </aside>
      </div>

      {/* Mobile map toggle */}
      <button
        type="button"
        onClick={() => setMobileMap((m) => !m)}
        className="fixed bottom-6 left-1/2 z-30 inline-flex -translate-x-1/2 items-center gap-2 rounded-full bg-stone-900 px-5 py-3 text-sm font-semibold text-white shadow-lift lg:hidden">
        
        {mobileMap ? <ListIcon className="h-4 w-4" /> : <MapIcon className="h-4 w-4" />}
        {mobileMap ? 'Show list' : 'Show map'}
      </button>

      {/* Filter panel */}
      <AnimatePresence>
        {panelOpen &&
        <>
            <motion.div
            className="fixed inset-0 z-50 bg-stone-900/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPanelOpen(false)} />
          
            <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="filters-title"
            className="fixed inset-y-0 left-0 z-50 flex w-full max-w-md flex-col bg-white shadow-lift"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 380, damping: 38 }}>
            
              <div className="flex items-center justify-between border-b border-stone-200 px-6 py-4">
                <h2 id="filters-title" className="text-lg font-semibold">Filters</h2>
                <button onClick={() => setPanelOpen(false)} aria-label="Close filters" className="grid h-9 w-9 place-items-center rounded-full hover:bg-stone-100">
                  <XIcon className="h-5 w-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-6 py-6">
                <SearchFilters value={filters} onChange={setFilters} onReset={reset} />
              </div>
              <div className="border-t border-stone-200 px-6 py-4">
                <Button className={cx(ui.btnBrand, 'w-full')} size="large" onClick={() => setPanelOpen(false)}>
                  Show {results.length} {results.length === 1 ? 'space' : 'spaces'}
                </Button>
              </div>
            </motion.div>
          </>
        }
      </AnimatePresence>
    </div>);

}

function filterAndSort(all: Listing[], location: string, f: FilterState, sort: SortKey): Listing[] {
  const q = location.trim().toLowerCase();
  const bucket = sizeBuckets.find((b) => b.id === f.size) ?? sizeBuckets[0];
  const min = f.minPrice ? Number(f.minPrice) : 0;
  const max = f.maxPrice ? Number(f.maxPrice) : Infinity;

  const out = all.filter((l) => {
    if (q && !`${l.title} ${l.neighborhood} ${l.city}`.toLowerCase().includes(q)) return false;
    if (f.types.length && !f.types.includes(l.type)) return false;
    const area = sqft(l);
    if (area < bucket.min || area > bucket.max) return false;
    if (f.climate && !l.climateControlled) return false;
    if (f.access247 && !l.access247) return false;
    if (f.groundFloor && !l.groundFloor) return false;
    if (f.vehicle && !l.vehicleStorage) return false;
    if (l.monthlyPrice < min || l.monthlyPrice > max) return false;
    return true;
  });

  const sorted = [...out];
  if (sort === 'price-asc') sorted.sort((a, b) => a.monthlyPrice - b.monthlyPrice);
  if (sort === 'price-desc') sorted.sort((a, b) => b.monthlyPrice - a.monthlyPrice);
  if (sort === 'size-desc') sorted.sort((a, b) => sqft(b) - sqft(a));
  if (sort === 'rating') sorted.sort((a, b) => b.rating - a.rating);
  return sorted;
}
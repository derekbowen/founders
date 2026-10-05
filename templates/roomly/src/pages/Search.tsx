import React, { useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ListIcon, MapIcon, SearchXIcon, SlidersHorizontalIcon } from 'lucide-react';
import { Button } from '../components/Button';
import { ListingCard } from '../components/ListingCard';
import { EmptyState } from '../components/EmptyState';
import { RoomMap } from '../components/map/RoomMap';
import { FilterPanel } from '../components/search/FilterPanel';
import { useApp } from '../contexts/AppContext';
import { useSearchFilters } from '../hooks/useSearchFilters';
import { cityOptions } from '../data/features';
import { roomTypes } from '../data/discover';
import { buttonStyles, chipStyles } from '../utils/styles';
import type { ListingSort } from '../types/listing';

const sortOptions: {id: ListingSort;label: string;}[] = [
{ id: 'recommended', label: 'Recommended' },
{ id: 'rent-asc', label: 'Rent: low to high' },
{ id: 'rent-desc', label: 'Rent: high to low' },
{ id: 'newest', label: 'Newest' },
{ id: 'available', label: 'Available soonest' }];


export function Search() {
  const location = useLocation();
  // Remount when the URL search changes (e.g. new search from the top bar)
  return <SearchView key={location.search} />;
}

function SearchView() {
  const { listings } = useApp();
  const [params] = useSearchParams();
  const { filters, update, toggleRoomType, reset, resetAll, sort, setSort, results, advancedCount } =
  useSearchFilters(listings, params);
  const [panelOpen, setPanelOpen] = useState(false);
  const [mobileMap, setMobileMap] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  const cityIsKnown = !filters.city || cityOptions.includes(filters.city);

  return (
    <div className="w-full">
      {/* Filter bar */}
      <div className="sticky top-16 z-30 border-b border-navy-100 bg-white lg:top-[72px]">
        <div className="flex items-center gap-2 overflow-x-auto px-4 py-3 scrollbar-none sm:px-6 lg:px-8">
          <label htmlFor="search-city" className="sr-only">
            City
          </label>
          <select
            id="search-city"
            value={cityIsKnown ? filters.city : '__custom'}
            onChange={(e) => update('city', e.target.value)}
            className="shrink-0 rounded-full border border-navy-200 bg-white py-1.5 pl-3.5 pr-8 text-sm font-semibold text-navy-900 transition hover:border-navy-300 focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-100">
            
            <option value="">All cities</option>
            {!cityIsKnown && <option value="__custom">“{filters.city}”</option>}
            {cityOptions.map((c) =>
            <option key={c} value={c}>
                {c}
              </option>
            )}
          </select>
          <span className="mx-1 h-6 w-px shrink-0 bg-navy-100" aria-hidden />
          {roomTypes.map((t) => {
            const active = filters.roomTypes.includes(t.id);
            return (
              <button
                key={t.id}
                type="button"
                aria-pressed={active}
                onClick={() => toggleRoomType(t.id)}
                className={`${chipStyles.base} shrink-0 ${active ? chipStyles.active : chipStyles.idle}`}>
                
                {t.label}
              </button>);

          })}
          <span className="mx-1 h-6 w-px shrink-0 bg-navy-100" aria-hidden />
          <button
            type="button"
            onClick={() => setPanelOpen((o) => !o)}
            aria-expanded={panelOpen}
            aria-controls="filter-panel"
            className={`${chipStyles.base} shrink-0 ${panelOpen || advancedCount ? 'border-navy-900 bg-navy-50 text-navy-900' : chipStyles.idle}`}>
            
            <SlidersHorizontalIcon size={15} aria-hidden />
            Filters
            {advancedCount > 0 &&
            <span className="grid h-5 min-w-[20px] place-items-center rounded-full bg-navy-900 px-1 text-[11px] font-bold text-white">
                {advancedCount}
              </span>
            }
          </button>
          <div className="ml-auto flex shrink-0 items-center gap-2 pl-2">
            <label htmlFor="search-sort" className="hidden text-sm text-navy-500 sm:block">
              Sort
            </label>
            <select
              id="search-sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as ListingSort)}
              className="rounded-full border border-navy-200 bg-white py-1.5 pl-3.5 pr-8 text-sm font-medium text-navy-900 focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-100">
              
              {sortOptions.map((o) =>
              <option key={o.id} value={o.id}>
                  {o.label}
                </option>
              )}
            </select>
          </div>
        </div>
        <AnimatePresence initial={false}>
          {panelOpen &&
          <motion.div
            id="filter-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="overflow-hidden">
            
              <div className="max-h-[70vh] overflow-y-auto px-4 pb-4 sm:px-6 lg:px-8">
                <FilterPanel
                filters={filters}
                update={update}
                onReset={reset}
                onClose={() => setPanelOpen(false)}
                resultCount={results.length} />
              
              </div>
            </motion.div>
          }
        </AnimatePresence>
      </div>

      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        {/* Results */}
        <section
          className={`px-4 py-6 sm:px-6 lg:block lg:px-8 ${mobileMap ? 'hidden' : 'block'}`}
          aria-labelledby="results-heading">
          
          <h1 id="results-heading" className="text-xl font-bold text-navy-900">
            {results.length} room{results.length === 1 ? '' : 's'}
            {filters.city ? ` in ${filters.city}` : ' across all cities'}
          </h1>
          <p className="mt-1 text-sm text-navy-500">
            Rent shown per month. Contact landlords directly — no booking fees.
          </p>

          {results.length === 0 ?
          <EmptyState
            className="mt-8"
            icon={<SearchXIcon size={26} />}
            title="No rooms match your search"
            text="Try widening your budget, changing the move-in date or removing a few filters."
            action={
            <Button className={buttonStyles.primary} onClick={resetAll}>
                  Clear all filters
                </Button>
            } /> :


          <div className="mt-6 grid gap-x-6 gap-y-8 sm:grid-cols-2">
              {results.map((l) =>
            <ListingCard key={l.id} listing={l} isActive={activeId === l.id} onHover={setActiveId} />
            )}
            </div>
          }
        </section>

        {/* Map */}
        <aside
          className={`lg:sticky lg:top-[129px] lg:block lg:h-[calc(100vh-129px)] ${
          mobileMap ? 'block h-[calc(100vh-121px)]' : 'hidden'}`
          }
          aria-label="Map of results">
          
          <RoomMap
            listings={results}
            activeId={activeId}
            onHover={setActiveId}
            resizeKey={`${mobileMap}-${panelOpen}`} />
          
        </aside>
      </div>

      <button
        type="button"
        onClick={() => setMobileMap((m) => !m)}
        className="fixed bottom-6 left-1/2 z-30 inline-flex -translate-x-1/2 items-center gap-2 rounded-full bg-navy-900 px-5 py-3 text-sm font-semibold text-white shadow-lift transition hover:bg-navy-800 lg:hidden">
        
        {mobileMap ? <ListIcon size={16} /> : <MapIcon size={16} />}
        {mobileMap ? 'Show list' : 'Show map'}
      </button>
    </div>);

}
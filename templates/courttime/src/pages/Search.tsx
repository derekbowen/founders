import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ListIcon, MapIcon, SearchXIcon } from 'lucide-react';
import { EmptyState } from '../components/common/EmptyState';
import { FilterBar } from '../components/search/FilterBar';
import { FilterPanel } from '../components/search/FilterPanel';
import { ListingCard } from '../components/search/ListingCard';
import { ListingsMap } from '../components/search/ListingsMap';
import { brand } from '../data/brand';
import { useSearchFilters } from '../hooks/useSearchFilters';
import { formatDateShort, formatHour, fromDateKey, pluralize, todayKey } from '../utils/format';

export function Search() {
  const { filters, update, toggleSport, resetAdvanced, resetAll, sort, setSort, results, surfaces, advancedCount } = useSearchFilters();
  const [panelOpen, setPanelOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [mobileMap, setMobileMap] = useState(false);

  const dateLabel = filters.dateKey === todayKey() ? 'today' : formatDateShort(fromDateKey(filters.dateKey));

  return (
    <div className="bg-canvas">
      <FilterBar
        selectedSports={filters.sports}
        onToggleSport={toggleSport}
        onClearSports={() => update({ sports: [] })}
        advancedCount={advancedCount}
        panelOpen={panelOpen}
        onTogglePanel={() => setPanelOpen((v) => !v)}
        sort={sort}
        onSort={setSort} />
      
      <div className="flex">
        <section className={`min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8 ${mobileMap ? 'hidden lg:block' : ''}`} aria-labelledby="results-heading">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h1 id="results-heading" className="heading-md">
                {pluralize(results.length, 'court')} {filters.query ? `matching “${filters.query}”` : `in ${brand.city}`}
              </h1>
              <p className="mt-1 text-sm text-slate-600">
                Showing availability for {dateLabel}
                {filters.time !== null && ` at ${formatHour(filters.time)}`}
              </p>
            </div>
            <label className="flex items-center gap-2 text-sm md:hidden">
              <span className="text-slate-600">Sort</span>
              <select className="field w-auto py-2" value={sort} onChange={(e) => setSort(e.target.value as typeof sort)}>
                <option value="recommended">Recommended</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
                <option value="rating">Top rated</option>
              </select>
            </label>
          </div>
          <AnimatePresence initial={false}>
            {panelOpen &&
            <FilterPanel filters={filters} surfaces={surfaces} onUpdate={update} onReset={resetAdvanced} onClose={() => setPanelOpen(false)} />
            }
          </AnimatePresence>
          {results.length ?
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {results.map((listing) =>
            <ListingCard key={listing.id} listing={listing} dateKey={filters.dateKey} isActive={activeId === listing.id} onHover={setActiveId} />
            )}
            </div> :

          <EmptyState
            icon={<SearchXIcon size={26} />}
            title="No courts match"
            description="Try removing a filter, choosing a different time, or searching a nearby neighborhood."
            action={<button type="button" onClick={resetAll} className="btn btn-primary btn-md">Reset all filters</button>} />

          }
        </section>
        <aside
          className={`isolate ${mobileMap ? 'block h-[calc(100vh-8rem)] w-full' : 'hidden'} lg:sticky lg:top-32 lg:block lg:h-[calc(100vh-8rem)] lg:w-[42%] lg:shrink-0`}
          aria-label="Map view">
          
          <ListingsMap listings={results} activeId={activeId} onHover={setActiveId} />
        </aside>
      </div>
      <button
        type="button"
        onClick={() => setMobileMap((v) => !v)}
        className="btn btn-md fixed bottom-6 left-1/2 z-30 -translate-x-1/2 rounded-full bg-ink text-white shadow-xl hover:bg-ink/90 lg:hidden">
        
        {mobileMap ? <ListIcon size={16} aria-hidden="true" /> : <MapIcon size={16} aria-hidden="true" />}
        {mobileMap ? 'Show list' : 'Show map'}
      </button>
    </div>);

}
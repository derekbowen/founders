import React, { useState } from 'react';
import { MapIcon, SearchXIcon, SlidersHorizontalIcon, XIcon } from 'lucide-react';
import { Drawer } from '../components/Drawer';
import { FilterPanel } from '../components/search/FilterPanel';
import { ListingCard } from '../components/listing/ListingCard';
import { MapView } from '../components/listing/MapView';
import { EmptyState } from '../components/ui/EmptyState';
import { BrandButton } from '../components/ui/BrandButton';
import { cities } from '../data/cities';
import { useSearchFilters } from '../hooks/useSearchFilters';
import type { SortKey } from '../utils/search';
import { formatDate } from '../utils/time';

const sortOptions: {value: SortKey;label: string;}[] = [
{ value: 'recommended', label: 'Recommended' },
{ value: 'price-asc', label: 'Price: low to high' },
{ value: 'price-desc', label: 'Price: high to low' },
{ value: 'rating', label: 'Top rated' }];


export function Search() {
  const { filters, results, update, resetFilters, clearAll, activeCount } = useSearchFilters();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [showMap, setShowMap] = useState(true);
  const [mobileFilters, setMobileFilters] = useState(false);

  const where = filters.city || 'all cities';

  return (
    <div className="mx-auto w-full max-w-[1480px] px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold sm:text-3xl">
              {results.length} {results.length === 1 ? 'space' : 'spaces'} in {where}
            </h1>
            <p className="mt-1 text-sm text-ink-muted">
              {filters.date ? `Available on ${formatDate(filters.date)}` : 'Any date'}
              {filters.people > 1 ? ` · ${filters.people} people` : ''}
              {filters.q ? ` · matching “${filters.q}”` : ''}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => setMobileFilters(true)} className="chip lg:hidden">
              <SlidersHorizontalIcon size={15} aria-hidden="true" /> Filters
              {activeCount > 0 &&
              <span className="grid h-5 min-w-5 place-items-center rounded-full bg-brand-700 px-1 text-[11px] font-bold text-white">
                  {activeCount}
                </span>
              }
            </button>
            <label htmlFor="sort" className="sr-only">
              Sort results
            </label>
            <select
              id="sort"
              value={filters.sort}
              onChange={(e) => update({ sort: e.target.value as SortKey })}
              className="field !w-auto !rounded-full !py-2 pr-8">
              
              {sortOptions.map((o) =>
              <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              )}
            </select>
            <button
              type="button"
              onClick={() => setShowMap((s) => !s)}
              aria-pressed={showMap}
              className={`chip ${showMap ? 'chip-active' : ''}`}>
              
              <MapIcon size={15} aria-hidden="true" /> Map
            </button>
          </div>
        </div>

        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0" role="group" aria-label="City">
          <button type="button" onClick={() => update({ city: '' })} className={`chip shrink-0 ${!filters.city ? 'chip-active' : ''}`}>
            All cities
          </button>
          {cities.map((c) =>
          <button
            key={c.name}
            type="button"
            onClick={() => update({ city: c.name })}
            className={`chip shrink-0 ${filters.city === c.name ? 'chip-active' : ''}`}
            aria-pressed={filters.city === c.name}>
            
              {c.name}
            </button>
          )}
          {filters.q &&
          <button type="button" onClick={() => update({ q: '' })} className="chip chip-active shrink-0">
              “{filters.q}” <XIcon size={14} aria-label="Clear search text" />
            </button>
          }
        </div>
      </div>

      <div className="mt-6 flex gap-8">
        <aside className="hidden w-64 shrink-0 lg:block" aria-label="Filters">
          <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pb-6 pr-1">
            <FilterPanel filters={filters} onChange={update} onReset={resetFilters} activeCount={activeCount} />
          </div>
        </aside>

        <section className="min-w-0 flex-1" aria-label="Results">
          {showMap &&
          <MapView
            listings={results}
            activeId={hoveredId}
            priceMode={filters.unit}
            className="mb-6 h-72 xl:hidden" />

          }
          {results.length === 0 ?
          <EmptyState
            icon={SearchXIcon}
            title="No spaces match those filters"
            description="Try widening your price range, removing an amenity or searching another city."
            action={
            <div className="flex gap-2">
                  <BrandButton tone="secondary" onClick={resetFilters}>
                    Reset filters
                  </BrandButton>
                  <BrandButton onClick={clearAll}>Show all spaces</BrandButton>
                </div>
            } /> :


          <div className={`grid gap-x-6 gap-y-10 sm:grid-cols-2 ${showMap ? '' : 'xl:grid-cols-3'}`}>
              {results.map((l) =>
            <ListingCard key={l.id} listing={l} highlighted={hoveredId === l.id} onHover={setHoveredId} />
            )}
            </div>
          }
        </section>

        {showMap &&
        <div className="hidden w-[400px] shrink-0 xl:block 2xl:w-[480px]">
            <div className="sticky top-24 h-[calc(100vh-7rem)]">
              <MapView listings={results} activeId={hoveredId} priceMode={filters.unit} className="h-full" />
            </div>
          </div>
        }
      </div>

      <Drawer isOpen={mobileFilters} onClose={() => setMobileFilters(false)} position="left" size="md">
        <div className="flex h-full flex-col bg-white">
          <div className="flex-1 overflow-y-auto p-6">
            <FilterPanel filters={filters} onChange={update} onReset={resetFilters} activeCount={activeCount} />
          </div>
          <div className="border-t border-line p-4">
            <BrandButton fullWidth onClick={() => setMobileFilters(false)}>
              Show {results.length} {results.length === 1 ? 'space' : 'spaces'}
            </BrandButton>
          </div>
        </div>
      </Drawer>
    </div>);

}
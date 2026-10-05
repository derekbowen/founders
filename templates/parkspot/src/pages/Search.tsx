import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CameraIcon, ClockIcon, ListIcon, MapIcon, SearchXIcon, SlidersHorizontalIcon, UmbrellaIcon, XIcon, ZapIcon } from 'lucide-react';
import { ListingCard } from '../components/listing/ListingCard';
import { ListingsMap } from '../components/map/ListingsMap';
import { FilterPanel } from '../components/search/FilterPanel';
import { EmptyState } from '../components/common/EmptyState';
import { useListingSearch } from '../hooks/useListingSearch';
import { buttonClass } from '../utils/styles';
import { formatRange } from '../utils/format';
import type { SearchFilters, SortOption } from '../utils/listings';

const quickToggles: {key: keyof Pick<SearchFilters, 'covered' | 'evCharging' | 'access247' | 'securityCamera'>;label: string;icon: React.ReactNode;}[] = [
{ key: 'covered', label: 'Covered', icon: <UmbrellaIcon size={14} aria-hidden /> },
{ key: 'evCharging', label: 'EV charging', icon: <ZapIcon size={14} aria-hidden /> },
{ key: 'access247', label: '24/7 access', icon: <ClockIcon size={14} aria-hidden /> },
{ key: 'securityCamera', label: 'Security camera', icon: <CameraIcon size={14} aria-hidden /> }];


export function Search() {
  const s = useListingSearch();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [mobileView, setMobileView] = useState<'list' | 'map'>('list');

  return (
    <div className="relative w-full bg-canvas lg:grid lg:h-[calc(100vh-4rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)]">
      {/* Results column */}
      <section
        aria-label="Search results"
        className={`lg:h-full lg:overflow-y-auto ${mobileView === 'map' ? 'hidden lg:block' : 'block'}`}>
        
        <div className="sticky top-16 z-[600] border-b border-line bg-canvas/95 px-4 py-3 backdrop-blur sm:px-6 lg:top-0">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setFiltersOpen((o) => !o)}
              aria-expanded={filtersOpen}
              className={`inline-flex h-9 items-center gap-2 rounded-full border px-3.5 text-sm font-semibold transition-colors ${
              filtersOpen || s.activeCount ? 'border-navy bg-navy text-white' : 'border-line bg-surface hover:border-ink/40'}`
              }>
              
              <SlidersHorizontalIcon size={14} aria-hidden /> Filters
              {s.activeCount > 0 &&
              <span className="grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 text-[11px] font-bold text-ink">{s.activeCount}</span>
              }
            </button>
            <div className="no-scrollbar flex gap-2 overflow-x-auto">
              {quickToggles.map((t) =>
              <button
                key={t.key}
                type="button"
                aria-pressed={s.filters[t.key]}
                onClick={() => s.updateFilter(t.key, !s.filters[t.key])}
                className={`inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full border px-3 text-sm font-medium transition-colors ${
                s.filters[t.key] ? 'border-ink bg-accent text-ink' : 'border-line bg-surface hover:border-ink/40'}`
                }>
                
                  {t.icon}
                  {t.label}
                </button>
              )}
            </div>
          </div>

          <AnimatePresence initial={false}>
            {filtersOpen &&
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden">
              
                <div className="mt-3 rounded-2xl border border-line bg-surface p-5">
                  <FilterPanel
                  filters={s.filters}
                  arrive={s.arrive}
                  leave={s.leave}
                  version={s.filterVersion}
                  onChange={s.updateFilter}
                  onWhen={s.setWhen}
                  onReset={s.resetFilters}
                  onClose={() => setFiltersOpen(false)}
                  resultCount={s.results.length} />
                
                </div>
              </motion.div>
            }
          </AnimatePresence>
        </div>

        <div className="px-4 pb-24 pt-5 sm:px-6 lg:pb-10">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
                {s.results.length} {s.results.length === 1 ? 'spot' : 'spots'}
                {s.address && !s.addressFallback ? ` near “${s.address}”` : ' in San Francisco'}
              </h1>
              {s.addressFallback &&
              <p className="mt-1 text-sm font-medium text-warning">
                  No exact matches for “{s.address}” — showing all spots nearby.
                </p>
              }
              <p className="mt-0.5 text-sm text-muted">{formatRange(s.arrive, s.leave)}</p>
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-sm text-muted">
                Sort
              </label>
              <select
                id="sort"
                value={s.sort}
                onChange={(e) => s.setSort(e.target.value as SortOption)}
                className="h-9 rounded-lg border border-line bg-surface px-2 text-sm font-medium focus:border-navy focus:outline-none focus:ring-2 focus:ring-accent/60">
                
                <option value="recommended">Recommended</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
                <option value="rating">Top rated</option>
              </select>
            </div>
          </div>

          {s.address &&
          <button
            type="button"
            onClick={s.resetFilters}
            className="mt-3 inline-flex items-center gap-1 rounded-full bg-ink/5 px-3 py-1 text-xs font-medium hover:bg-ink/10">
            
              “{s.address}” <XIcon size={12} aria-label="Clear search" />
            </button>
          }

          {s.results.length === 0 ?
          <div className="mt-8 rounded-2xl border border-dashed border-line bg-surface">
              <EmptyState
              icon={<SearchXIcon size={24} aria-hidden />}
              title="No spots match those filters"
              text="Try a higher price, a different vehicle size, or clear your search to see everything nearby."
              action={
              <button type="button" onClick={s.resetFilters} className={buttonClass('primary')}>
                    Clear all filters
                  </button>
              } />
            
            </div> :

          <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3">
              {s.results.map((l) =>
            <ListingCard
              key={l.id}
              listing={l}
              search={s.carry}
              highlighted={s.activeId === l.id || s.selectedId === l.id}
              onHover={s.setActiveId} />

            )}
            </div>
          }
        </div>
      </section>

      {/* Map column */}
      <section
        aria-label="Map of results"
        className={`${mobileView === 'map' ? 'fixed inset-x-0 bottom-0 top-16 z-[500]' : 'hidden'} lg:static lg:block lg:h-full lg:border-l lg:border-line`}>
        
        <ListingsMap
          listings={s.results}
          activeId={s.activeId}
          selectedId={s.selectedId}
          onSelect={s.setSelectedId}
          search={s.carry} />
        
      </section>

      {/* Mobile map toggle */}
      <button
        type="button"
        onClick={() => setMobileView((v) => v === 'list' ? 'map' : 'list')}
        className="fixed bottom-6 left-1/2 z-[700] inline-flex h-12 -translate-x-1/2 items-center gap-2 rounded-full bg-navy px-5 text-sm font-semibold text-white shadow-pop hover:bg-navy-soft lg:hidden">
        
        {mobileView === 'list' ?
        <>
            <MapIcon size={16} aria-hidden /> Map
          </> :

        <>
            <ListIcon size={16} aria-hidden /> List
          </>
        }
      </button>
    </div>);

}
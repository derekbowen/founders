import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { SlidersHorizontalIcon, MapIcon, ListIcon, XIcon, SearchXIcon } from 'lucide-react';
import { ListingCard } from '../components/ListingCard';
import { ListingsMap } from '../components/ListingsMap';
import { SearchFilters } from '../components/search/SearchFilters';
import { EmptyState } from '../components/ui/EmptyState';
import { Button } from '../components/ui/Button';
import { useMarketplace } from '../contexts/MarketplaceContext';
import { boatTypes } from '../data/boatTypes';
import { destinations } from '../data/destinations';
import { countActiveFilters, emptyFilters, filterListings, filtersToParams, parseFilters, sortListings, sortOptions } from '../utils/search';
import { formatDate } from '../utils/format';
import { cn } from '../utils/ui';
import type { SearchFilterValues, SortOption } from '../types/search';

export function Search() {
  const { listings } = useMarketplace();
  const [params, setParams] = useSearchParams();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filters = useMemo(() => parseFilters(params), [params]);
  const [draft, setDraft] = useState<SearchFilterValues>(filters);
  const location = params.get('location') ?? '';
  const date = params.get('date') ?? '';
  const sort = params.get('sort') as SortOption ?? 'relevance';

  useEffect(() => {
    if (drawerOpen) setDraft(filters);
  }, [drawerOpen, filters]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setDrawerOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const results = useMemo(() => sortListings(filterListings(listings, filters, location, date), sort), [listings, filters, location, date, sort]);
  const draftCount = useMemo(() => filterListings(listings, draft, location, date).length, [listings, draft, location, date]);
  const activeCount = countActiveFilters(filters);

  const destination = destinations.find((d) => d.id === location);
  const locationLabel = destination ? `${destination.name}, ${destination.region}` : location || 'All destinations';

  const applyFilters = (next: SearchFilterValues) => setParams(filtersToParams(next, params), { replace: true });
  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);else
    next.delete(key);
    setParams(next, { replace: true });
  };
  const clearAll = () => setParams(new URLSearchParams(location ? { location } : {}), { replace: true });

  const toggleQuickType = (id: (typeof boatTypes)[number]['id']) =>
  applyFilters({ ...filters, types: filters.types.includes(id) ? filters.types.filter((t) => t !== id) : [...filters.types, id] });

  return (
    <div className="flex w-full bg-white">
      <section className={cn('w-full lg:w-[58%] xl:w-[55%]', showMap && 'hidden lg:block')} aria-labelledby="results-heading">
        <div className="sticky top-16 z-20 border-b border-line bg-white/95 px-4 py-4 backdrop-blur sm:px-6 lg:top-[72px] lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 id="results-heading" className="font-heading text-2xl text-navy">
                {locationLabel}
              </h1>
              <p className="text-sm text-muted" aria-live="polite">
                {results.length} {results.length === 1 ? 'boat' : 'boats'} available{date ? ` on ${formatDate(date, 'MMM d')}` : ''}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="sr-only">
                Sort by
              </label>
              <select id="sort" value={sort} onChange={(e) => setParam('sort', e.target.value === 'relevance' ? '' : e.target.value)} className="h-10 rounded-full border border-line bg-white px-4 text-sm font-medium text-ink focus:border-navy focus:outline-none">
                {sortOptions.map((o) =>
                <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                )}
              </select>
              <button type="button" onClick={() => setDrawerOpen(true)} className="inline-flex h-10 items-center gap-2 rounded-full border border-line px-4 text-sm font-medium text-ink transition-colors hover:border-navy/40">
                <SlidersHorizontalIcon className="h-4 w-4" aria-hidden="true" />
                Filters
                {activeCount > 0 && <span className="flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-navy px-1.5 text-[11px] font-bold text-white">{activeCount}</span>}
              </button>
            </div>
          </div>
          <div className="no-scrollbar -mx-4 mt-3 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0">
            {boatTypes.map((t) => {
              const active = filters.types.includes(t.id);
              return (
                <button
                  key={t.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => toggleQuickType(t.id)}
                  className={cn('inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-colors', active ? 'border-navy bg-navy text-white' : 'border-line text-ink hover:border-navy/40')}>
                  
                  <t.icon className="h-3.5 w-3.5" aria-hidden="true" />
                  {t.label}
                </button>);

            })}
            {date &&
            <button type="button" onClick={() => setParam('date', '')} className="inline-flex shrink-0 items-center gap-1 rounded-full bg-sand-light px-3 py-1.5 text-sm text-ink hover:bg-sand">
                {formatDate(date, 'MMM d')} <XIcon className="h-3.5 w-3.5" aria-label="Clear date" />
              </button>
            }
          </div>
        </div>

        <div className="px-4 py-6 sm:px-6 lg:px-8">
          {results.length === 0 ?
          <EmptyState
            icon={SearchXIcon}
            title="No boats match these filters"
            text="Try widening your price range, removing a filter, or searching a nearby harbor."
            action={<Button onClick={clearAll} variant="outline">Clear all filters</Button>} /> :


          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2">
              {results.map((l) =>
            <ListingCard key={l.id} listing={l} onHover={setHoveredId} highlighted={hoveredId === l.id} />
            )}
            </div>
          }
        </div>
      </section>

      <aside className={cn('sticky top-16 h-[calc(100vh-4rem)] flex-1 border-l border-line lg:top-[72px] lg:block lg:h-[calc(100vh-72px)]', showMap ? 'block' : 'hidden')} aria-label="Map of results">
        <ListingsMap listings={results} activeId={hoveredId} onHover={setHoveredId} />
      </aside>

      <button
        type="button"
        onClick={() => setShowMap((s) => !s)}
        className="fixed bottom-6 left-1/2 z-30 inline-flex -translate-x-1/2 items-center gap-2 rounded-full bg-navy px-5 py-3 text-sm font-semibold text-white shadow-lift lg:hidden">
        
        {showMap ? <ListIcon className="h-4 w-4" aria-hidden="true" /> : <MapIcon className="h-4 w-4" aria-hidden="true" />}
        {showMap ? 'Show list' : 'Show map'}
      </button>

      <AnimatePresence>
        {drawerOpen &&
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-labelledby="filters-title">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-ink/40" onClick={() => setDrawerOpen(false)} />
            <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="absolute inset-y-0 left-0 flex w-full max-w-md flex-col bg-white shadow-lift">
            
              <div className="flex items-center justify-between border-b border-line px-6 py-4">
                <h2 id="filters-title" className="font-heading text-xl text-navy">
                  Filters
                </h2>
                <button type="button" autoFocus onClick={() => setDrawerOpen(false)} className="rounded-full p-2 hover:bg-sand-light" aria-label="Close filters">
                  <XIcon className="h-5 w-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-6 py-6">
                <SearchFilters values={draft} onChange={setDraft} />
              </div>
              <div className="flex items-center justify-between gap-3 border-t border-line px-6 py-4">
                <button type="button" onClick={() => setDraft(emptyFilters)} className="text-sm font-semibold text-navy underline-offset-4 hover:underline">
                  Clear all
                </button>
                <Button
                onClick={() => {
                  applyFilters(draft);
                  setDrawerOpen(false);
                }}
                disabled={draftCount === 0}>
                
                  {draftCount === 0 ? 'No boats match' : `Show ${draftCount} ${draftCount === 1 ? 'boat' : 'boats'}`}
                </Button>
              </div>
            </motion.div>
          </div>
        }
      </AnimatePresence>
    </div>);

}
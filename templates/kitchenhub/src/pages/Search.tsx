import React, { useState } from 'react';
import { ListIcon, MapIcon, SearchXIcon, SlidersHorizontalIcon, XIcon } from 'lucide-react';
import { KitchenMap } from '../components/listing/KitchenMap';
import { ListingCard } from '../components/listing/ListingCard';
import { SearchFilters } from '../components/search/SearchFilters';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';
import { Modal } from '../components/ui/Modal';
import { certifications, cities, keyEquipment, priceBounds, segments, sortOptions, storageTypes } from '../data/catalog';
import { useSearchFilters } from '../hooks/useSearchFilters';
import type { City, SortKey } from '../types/marketplace';
import { formatDate, formatMoney } from '../utils/format';
import { toggleValue } from '../utils/search';
import { cn, focusRing } from '../utils/styles';

const selectClass =
'h-10 rounded-lg border border-steel-300 bg-white px-3 text-sm font-medium text-steel-800 hover:border-steel-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20';

export function SearchPage() {
  const { filters, update, reset, sort, setSort, results, hoveredId, setHoveredId, activeCount, date, hours, linkSearch } =
  useSearchFilters();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [showMap, setShowMap] = useState(false);

  const chips: {key: string;label: string;onRemove: () => void;}[] = [
  ...(filters.query ? [{ key: 'q', label: `“${filters.query}”`, onRemove: () => update({ query: '' }) }] : []),
  ...(filters.use !== 'all' ?
  [{ key: 'use', label: segments.find((s) => s.key === filters.use)?.label ?? '', onRemove: () => update({ use: 'all' }) }] :
  []),
  ...(filters.priceMin !== priceBounds.min || filters.priceMax !== priceBounds.max ?
  [{ key: 'price', label: `${formatMoney(filters.priceMin)}–${formatMoney(filters.priceMax)}/hr`, onRemove: () => update({ priceMin: priceBounds.min, priceMax: priceBounds.max }) }] :
  []),
  ...filters.equipment.map((e) => ({ key: e, label: keyEquipment.find((k) => k.key === e)?.label ?? e, onRemove: () => update({ equipment: toggleValue(filters.equipment, e) }) })),
  ...filters.storage.map((s) => ({ key: s, label: storageTypes.find((k) => k.key === s)?.label ?? s, onRemove: () => update({ storage: toggleValue(filters.storage, s) }) })),
  ...filters.certifications.map((c) => ({ key: c, label: certifications.find((k) => k.key === c)?.label ?? c, onRemove: () => update({ certifications: toggleValue(filters.certifications, c) }) })),
  ...(filters.access247 ? [{ key: '247', label: '24/7 access', onRemove: () => update({ access247: false }) }] : [])];


  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 border-b border-steel-200 bg-white px-4 py-3 sm:px-6">
        <div className="mr-auto min-w-0">
          <h1 className="font-heading text-xl font-bold uppercase tracking-wide text-steel-900">
            {results.length} {results.length === 1 ? 'kitchen' : 'kitchens'}
            {filters.city !== 'all' && <span className="text-steel-500"> in {filters.city}</span>}
          </h1>
          {date &&
          <p className="text-xs text-steel-500">
              {formatDate(date, 'EEE, MMM d')}
              {hours && ` · ${hours} hours`}
            </p>
          }
        </div>
        <label className="sr-only" htmlFor="search-city">City</label>
        <select id="search-city" value={filters.city} onChange={(e) => update({ city: e.target.value as City | 'all' })} className={selectClass}>
          <option value="all">All cities</option>
          {cities.map((c) =>
          <option key={c} value={c}>{c}</option>
          )}
        </select>
        <label className="sr-only" htmlFor="search-sort">Sort by</label>
        <select id="search-sort" value={sort} onChange={(e) => setSort(e.target.value as SortKey)} className={selectClass}>
          {sortOptions.map((o) =>
          <option key={o.value} value={o.value}>{o.label}</option>
          )}
        </select>
        <Button variant="outline" size="sm" className="h-10 lg:hidden" onClick={() => setFiltersOpen(true)}>
          <SlidersHorizontalIcon className="h-4 w-4" aria-hidden="true" />
          Filters
          {activeCount > 0 && <span className="grid h-5 min-w-[1.25rem] place-items-center rounded-full bg-primary px-1.5 text-xs text-white">{activeCount}</span>}
        </Button>
        <Button variant="dark" size="sm" className="h-10 xl:hidden" onClick={() => setShowMap((m) => !m)} aria-pressed={showMap}>
          {showMap ? <ListIcon className="h-4 w-4" aria-hidden="true" /> : <MapIcon className="h-4 w-4" aria-hidden="true" />}
          {showMap ? 'List' : 'Map'}
        </Button>
      </div>

      <div className="flex min-h-0 flex-1">
        <aside className="hidden w-72 shrink-0 overflow-y-auto border-r border-steel-200 p-6 lg:block" aria-label="Filters">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-steel-900">Filters{activeCount > 0 && ` (${activeCount})`}</h2>
            {activeCount > 0 &&
            <button type="button" onClick={reset} className={cn('rounded text-sm font-medium text-primary hover:underline', focusRing)}>
                Clear all
              </button>
            }
          </div>
          <SearchFilters filters={filters} onChange={update} idPrefix="side" />
        </aside>

        <section aria-label="Results" className={cn('min-h-0 flex-1 overflow-y-auto px-4 py-6 sm:px-6', showMap && 'hidden xl:block')}>
          {chips.length > 0 &&
          <div className="mb-5 flex flex-wrap gap-2">
              {chips.map((chip) =>
            <button
              key={chip.key}
              type="button"
              onClick={chip.onRemove}
              className={cn('inline-flex items-center gap-1.5 rounded-full bg-steel-100 py-1.5 pl-3 pr-2 text-xs font-semibold text-steel-800 hover:bg-steel-200', focusRing)}
              aria-label={`Remove filter ${chip.label}`}>
              
                  {chip.label}
                  <XIcon className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
            )}
              <button type="button" onClick={reset} className={cn('rounded px-2 text-xs font-semibold text-primary hover:underline', focusRing)}>
                Clear all
              </button>
            </div>
          }
          {results.length === 0 ?
          <EmptyState
            icon={<SearchXIcon className="h-5 w-5" aria-hidden="true" />}
            title="No kitchens match those filters"
            body="Try removing an equipment or certification filter, widening your price range or searching another city."
            action={<Button onClick={reset}>Reset filters</Button>} /> :


          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 2xl:grid-cols-3">
              {results.map((l) =>
            <ListingCard key={l.id} listing={l} active={hoveredId === l.id} onHover={setHoveredId} linkSearch={linkSearch} />
            )}
            </div>
          }
        </section>

        <div className={cn('min-h-0 flex-1 xl:block xl:w-[40%] xl:flex-none xl:border-l xl:border-steel-200', showMap ? 'block' : 'hidden')}>
          <KitchenMap listings={results} activeId={hoveredId} onHover={setHoveredId} />
        </div>
      </div>

      <Modal
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        title="Filters"
        position="right"
        footer={
        <div className="flex gap-3">
            <Button variant="outline" onClick={reset} className="flex-1">Clear all</Button>
            <Button onClick={() => setFiltersOpen(false)} className="flex-1">
              Show {results.length} {results.length === 1 ? 'kitchen' : 'kitchens'}
            </Button>
          </div>
        }>
        
        <div className="p-5">
          <SearchFilters filters={filters} onChange={update} idPrefix="drawer" />
        </div>
      </Modal>
    </div>);

}
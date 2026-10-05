import React, { useCallback, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ListIcon, MapIcon, SearchXIcon, SlidersHorizontalIcon, XIcon } from 'lucide-react';
import { ListingCard } from '../components/ListingCard';
import { EmptyState } from '../components/EmptyState';
import { SearchMap } from '../components/maps/SearchMap';
import { FilterDrawer } from '../components/search/FilterDrawer';
import { amenities, searchAmenityFilters } from '../data/amenities';
import { listings } from '../data/listings';
import { siteTypes } from '../data/siteTypes';
import type { SearchFilters, SortKey } from '../types/search';
import { formatMoney } from '../utils/currency';
import { formatRange } from '../utils/dates';
import { countActiveFilters, emptyFilters, filterListings, filtersFromParams, filtersToParams } from '../utils/search';
import { getListing } from '../utils/lookup';
import { brand } from '../data/brand';

const sortOptions: {value: SortKey;label: string;}[] = [
{ value: 'recommended', label: 'Recommended' },
{ value: 'price-asc', label: 'Price: low to high' },
{ value: 'price-desc', label: 'Price: high to low' },
{ value: 'rating', label: 'Top rated' }];


export function Search() {
  const [params, setParams] = useSearchParams();
  const filters = useMemo(() => filtersFromParams(params), [params]);
  const results = useMemo(() => filterListings(listings, filters), [filters]);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileMap, setMobileMap] = useState(false);

  const update = useCallback((next: SearchFilters) => setParams(filtersToParams(next), { replace: true }), [setParams]);
  const activeCount = countActiveFilters(filters);
  const selected = getListing(selectedId ?? undefined);

  const dateSearch = new URLSearchParams();
  if (filters.start) dateSearch.set('start', filters.start);
  if (filters.end) dateSearch.set('end', filters.end);
  if (filters.campers > 1) dateSearch.set('campers', String(filters.campers));
  const cardSearch = dateSearch.toString() ? `?${dateSearch.toString()}` : '';

  const toggleAmenity = (key: (typeof searchAmenityFilters)[number]) =>
  update({ ...filters, amenities: filters.amenities.includes(key) ? filters.amenities.filter((a) => a !== key) : [...filters.amenities, key] });

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">
      <div className="border-b border-sand-200 bg-white">
        <div className="no-scrollbar flex items-center gap-2 overflow-x-auto px-4 py-3 sm:px-6">
          <button type="button" onClick={() => setDrawerOpen(true)} className={`chip shrink-0 ${activeCount ? 'border-primary-700 text-primary-800' : ''}`}>
            <SlidersHorizontalIcon size={15} aria-hidden="true" />
            Filters
            {activeCount > 0 &&
            <span className="grid h-5 min-w-[20px] place-items-center rounded-full bg-primary-700 px-1.5 text-[11px] font-bold text-white">{activeCount}</span>
            }
          </button>
          <span className="h-6 w-px shrink-0 bg-sand-200" aria-hidden="true" />
          {siteTypes.map((t) => {
            const active = filters.siteTypes.includes(t.key);
            return (
              <button
                key={t.key}
                type="button"
                aria-pressed={active}
                onClick={() =>
                update({ ...filters, siteTypes: active ? filters.siteTypes.filter((x) => x !== t.key) : [...filters.siteTypes, t.key] })
                }
                className={`chip shrink-0 ${active ? 'chip-active' : ''}`}>
                
                <t.icon size={15} aria-hidden="true" />
                {t.label}
              </button>);

          })}
          <span className="h-6 w-px shrink-0 bg-sand-200" aria-hidden="true" />
          {searchAmenityFilters.map((key) => {
            const a = amenities.find((x) => x.key === key);
            if (!a) return null;
            const active = filters.amenities.includes(key);
            return (
              <button key={key} type="button" aria-pressed={active} onClick={() => toggleAmenity(key)} className={`chip shrink-0 ${active ? 'chip-active' : ''}`}>
                <a.icon size={15} aria-hidden="true" />
                {a.label}
              </button>);

          })}
        </div>
      </div>

      <div className="flex min-h-0 flex-1">
        <section className={`min-h-0 flex-1 overflow-y-auto ${mobileMap ? 'hidden lg:block' : ''}`} aria-label="Search results">
          <div className="px-4 py-6 sm:px-6">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h1 className="text-2xl font-bold text-ink-900">
                  {results.length} {results.length === 1 ? 'site' : 'sites'}
                  {filters.location ? ` near “${filters.location}”` : ' to book'}
                </h1>
                <p className="mt-1 text-sm text-ink-500">
                  {filters.start && filters.end ? formatRange(filters.start, filters.end) : 'Any dates'} · {filters.campers}{' '}
                  {filters.campers === 1 ? 'camper' : 'campers'} · Prices per {brand.unitLabel}
                </p>
              </div>
              <label className="flex items-center gap-2 text-sm text-ink-600">
                Sort
                <select
                  value={filters.sort}
                  onChange={(e) => update({ ...filters, sort: e.target.value as SortKey })}
                  className="rounded-lg border border-sand-300 bg-white px-3 py-2 text-sm font-medium text-ink-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20">
                  
                  {sortOptions.map((o) =>
                  <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  )}
                </select>
              </label>
            </div>

            {(activeCount > 0 || filters.location) &&
            <div className="mt-4 flex flex-wrap gap-2">
                {filters.location &&
              <ActiveTag label={`“${filters.location}”`} onRemove={() => update({ ...filters, location: '' })} />
              }
                {(filters.minPrice > emptyFilters.minPrice || filters.maxPrice < emptyFilters.maxPrice) &&
              <ActiveTag
                label={`${formatMoney(filters.minPrice)} – ${formatMoney(filters.maxPrice)}`}
                onRemove={() => update({ ...filters, minPrice: emptyFilters.minPrice, maxPrice: emptyFilters.maxPrice })} />

              }
                {filters.vehicleLength > 0 &&
              <ActiveTag label={`Fits ${filters.vehicleLength} ft+`} onRemove={() => update({ ...filters, vehicleLength: 0 })} />
              }
                <button
                type="button"
                onClick={() => update({ ...emptyFilters, start: filters.start, end: filters.end, campers: filters.campers })}
                className="text-sm font-semibold text-primary-700 underline-offset-4 hover:underline">
                
                  Clear all
                </button>
              </div>
            }

            {results.length === 0 ?
            <div className="mt-8">
                <EmptyState
                icon={SearchXIcon}
                title="No sites match those filters"
                description="Try widening your price range, removing an amenity or searching a nearby park or region."
                action={
                <button type="button" className="btn-primary" onClick={() => update(emptyFilters)}>
                      Reset search
                    </button>
                } />
              
              </div> :

            <div className="mt-6 grid gap-x-6 gap-y-10 sm:grid-cols-2 2xl:grid-cols-3">
                {results.map((l) =>
              <ListingCard key={l.id} listing={l} search={cardSearch} highlighted={l.id === hoveredId || l.id === selectedId} onHover={setHoveredId} />
              )}
              </div>
            }
          </div>
        </section>

        <aside className={`relative min-h-0 lg:block lg:w-[44%] ${mobileMap ? 'block flex-1' : 'hidden'}`} aria-label="Map of results">
          <SearchMap listings={results} activeId={hoveredId ?? selectedId} onSelect={setSelectedId} />
          {selected &&
          <div className="absolute inset-x-4 bottom-6 z-[500] mx-auto max-w-sm rounded-2xl bg-white p-3 shadow-lift">
              <button
              type="button"
              onClick={() => setSelectedId(null)}
              className="absolute -right-2 -top-2 z-10 grid h-8 w-8 place-items-center rounded-full bg-white text-ink-700 shadow-card hover:text-ink-900"
              aria-label="Close preview">
              
                <XIcon size={16} />
              </button>
              <ListingCard listing={selected} search={cardSearch} />
            </div>
          }
        </aside>
      </div>

      <button
        type="button"
        onClick={() => setMobileMap((m) => !m)}
        className="btn fixed bottom-6 left-1/2 z-30 -translate-x-1/2 rounded-full bg-ink-900 px-5 text-white shadow-lift hover:bg-ink-700 lg:hidden">
        
        {mobileMap ? <ListIcon size={16} /> : <MapIcon size={16} />}
        {mobileMap ? 'Show list' : 'Show map'}
      </button>

      <FilterDrawer
        open={drawerOpen}
        filters={filters}
        onClose={() => setDrawerOpen(false)}
        onApply={(f) => {
          update(f);
          setDrawerOpen(false);
        }} />
      
    </div>);

}

function ActiveTag({ label, onRemove }: {label: string;onRemove: () => void;}) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-primary-50 py-1 pl-3 pr-1 text-sm font-medium text-primary-800">
      {label}
      <button type="button" onClick={onRemove} className="grid h-6 w-6 place-items-center rounded-full hover:bg-primary-100" aria-label={`Remove ${label}`}>
        <XIcon size={13} />
      </button>
    </span>);

}
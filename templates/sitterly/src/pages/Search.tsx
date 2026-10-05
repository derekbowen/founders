import React, { useState } from 'react';
import { ListIcon, MapIcon, SearchXIcon, XIcon } from 'lucide-react';
import { Drawer } from '../components/Drawer';
import { SitterCard } from '../components/SitterCard';
import { SearchMap } from '../components/maps/SearchMap';
import { FilterPanel } from '../components/search/FilterPanel';
import { QuickFilters } from '../components/search/QuickFilters';
import { BrandButton } from '../components/ui/BrandButton';
import { useSitterSearch } from '../hooks/useSitterSearch';
import { careTypes } from '../data/careTypes';
import { brand } from '../data/brand';
import { formatDate, formatTime } from '../utils/format';

export function Search() {
  const s = useSitterSearch();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  const careLabel = careTypes.find((c) => c.id === s.care)?.title;
  const date = s.params.get('date');
  const start = s.params.get('start');
  const kids = s.params.get('kids');
  const where = s.location || brand.city;

  return (
    <div className="lg:grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
      <section className="px-4 py-6 sm:px-6 lg:px-8" aria-labelledby="results-heading">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <h1 id="results-heading" className="font-heading text-2xl font-bold text-ink-900 sm:text-3xl">
              {s.isLoading ? 'Searching sitters…' : `${s.results.length} ${s.results.length === 1 ? 'sitter' : 'sitters'} in ${where}`}
            </h1>
            {(date || kids) &&
            <p className="mt-1 text-sm text-ink-600">
                {date && formatDate(date, 'EEEE, MMM d')}
                {start && ` from ${formatTime(start)}`}
                {kids && ` · ${kids} ${kids === '1' ? 'child' : 'children'}`}
              </p>
            }
          </div>
        </div>

        {(s.location || careLabel) &&
        <div className="mt-3 flex flex-wrap gap-2">
            {s.location &&
          <button type="button" onClick={() => s.clearParam('location')} className="inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1.5 text-sm font-medium text-primary-800 ring-1 ring-primary-200 hover:bg-primary-100">
                {s.location} <XIcon className="h-3.5 w-3.5" aria-label="Remove location" />
              </button>
          }
            {careLabel &&
          <button type="button" onClick={() => s.clearParam('care')} className="inline-flex items-center gap-1.5 rounded-full bg-accent-50 px-3 py-1.5 text-sm font-medium text-accent-800 ring-1 ring-accent-200 hover:bg-accent-100">
                {careLabel} <XIcon className="h-3.5 w-3.5" aria-label="Remove care type" />
              </button>
          }
          </div>
        }

        <div className="mt-5">
          <QuickFilters
            filters={s.filters}
            setFilters={s.setFilters}
            activeCount={s.activeFilterCount}
            onOpenAll={() => setFiltersOpen(true)}
            sort={s.sort}
            setSort={s.setSort} />
          
        </div>

        <div className="mt-6" aria-live="polite" aria-busy={s.isLoading}>
          {s.isLoading ?
          <div className="grid gap-5 sm:grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) =>
            <div key={i} className="animate-pulse overflow-hidden rounded-3xl border border-ink-200 bg-white">
                  <div className="aspect-[5/4] bg-ink-100" />
                  <div className="space-y-2 p-4">
                    <div className="h-4 w-2/3 rounded bg-ink-100" />
                    <div className="h-3 w-1/2 rounded bg-ink-100" />
                    <div className="h-6 w-3/4 rounded bg-ink-100" />
                  </div>
                </div>
            )}
            </div> :
          s.results.length === 0 ?
          <div className="flex flex-col items-center rounded-3xl border border-dashed border-ink-300 bg-white px-6 py-16 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-50 text-primary-600">
                <SearchXIcon className="h-7 w-7" aria-hidden />
              </span>
              <h2 className="mt-4 font-heading text-xl font-bold text-ink-900">No sitters match just yet</h2>
              <p className="mt-2 max-w-sm text-sm text-ink-600">
                Try widening your rate range, removing a filter, or searching a nearby neighborhood.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                <BrandButton onClick={s.resetFilters}>Clear filters</BrandButton>
                {(s.location || s.care) &&
              <BrandButton tone="outline" onClick={() => {s.clearParam('location');s.clearParam('care');}}>
                    Search all of {brand.city}
                  </BrandButton>
              }
              </div>
            </div> :

          <div className="grid gap-5 sm:grid-cols-2">
              {s.results.map((sitter) =>
            <SitterCard key={sitter.id} sitter={sitter} active={activeId === sitter.id} onHover={setActiveId} linkSearch={s.bookingSearch} />
            )}
            </div>
          }
        </div>
      </section>

      <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] lg:block" aria-label="Sitters on map">
        <SearchMap sitters={s.results} activeId={activeId} onSelect={setActiveId} />
      </aside>

      {showMap &&
      <div className="fixed inset-x-0 bottom-0 top-16 z-30 lg:hidden">
          <SearchMap sitters={s.results} activeId={activeId} onSelect={setActiveId} />
        </div>
      }
      <button
        type="button"
        onClick={() => setShowMap((v) => !v)}
        className="fixed bottom-6 left-1/2 z-30 inline-flex -translate-x-1/2 items-center gap-2 rounded-full bg-ink-900 px-5 py-3 text-sm font-semibold text-white shadow-lift hover:bg-ink-800 lg:hidden">
        
        {showMap ? <ListIcon className="h-4 w-4" aria-hidden /> : <MapIcon className="h-4 w-4" aria-hidden />}
        {showMap ? 'Show list' : 'Show map'}
      </button>

      <Drawer isOpen={filtersOpen} onClose={() => setFiltersOpen(false)} position="right" size="md">
        <FilterPanel
          filters={s.filters}
          setFilters={s.setFilters}
          resultCount={s.results.length}
          resetKey={s.resetKey}
          onReset={s.resetFilters}
          onDone={() => setFiltersOpen(false)} />
        
      </Drawer>
    </div>);

}
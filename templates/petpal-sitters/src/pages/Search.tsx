import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ListIcon, MapIcon, SearchXIcon, StarIcon, XIcon } from 'lucide-react';
import { ListingCard } from '../components/listing/ListingCard';
import { MapView } from '../components/search/MapView';
import { SearchFilterBar } from '../components/search/SearchFilterBar';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';
import { brand } from '../data/brand';
import { useListingSearch } from '../hooks/useListingSearch';
import { cn } from '../utils/cn';
import { formatMoney } from '../utils/format';
import { getService, getStartingPrice } from '../utils/pricing';

export function Search() {
  const { filters, setFilters, clearFilters, resetAll, results, activeCount, moreFiltersCount } = useListingSearch();
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showMap, setShowMap] = useState(false);
  const selected = results.find((l) => l.id === selectedId);
  const where = filters.location || brand.defaultCity;
  const serviceLabel = filters.service ? getService(filters.service).label.toLowerCase() : 'pet sitters';

  const handleSelect = (id: string) => {
    setSelectedId(id);
    document.getElementById(`listing-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className="flex w-full bg-canvas lg:h-[calc(100vh-72px)]">
      <section className={cn('w-full overflow-y-auto lg:w-[58%] xl:w-[55%]', showMap && 'hidden lg:block')} aria-label="Search results">
        <div className="sticky top-0 z-20 border-b border-stone-200 bg-canvas/95 px-4 py-4 backdrop-blur sm:px-6">
          <SearchFilterBar filters={filters} setFilters={setFilters} moreFiltersCount={moreFiltersCount} />
        </div>
        <div className="px-4 py-6 sm:px-6">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h1 className="text-xl font-black text-stone-900 sm:text-2xl">
              {results.length} {results.length === 1 ? 'sitter' : 'sitters'} for {serviceLabel} near {where}
            </h1>
            {activeCount > 0 &&
            <button type="button" onClick={clearFilters} className="text-sm font-bold text-primary-700 hover:underline">
                Clear {activeCount} {activeCount === 1 ? 'filter' : 'filters'}
              </button>
            }
          </div>
          {results.length === 0 ?
          <EmptyState
            className="mt-8"
            icon={<SearchXIcon className="h-7 w-7" />}
            title="No sitters match your search"
            text="Try widening your price range, removing a filter or searching a nearby neighborhood."
            action={
            <Button variant="secondary" onClick={resetAll}>
                  Reset search
                </Button>
            } /> :


          <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {results.map((listing) =>
            <ListingCard
              key={listing.id}
              listing={listing}
              serviceId={filters.service}
              active={listing.id === selectedId || listing.id === hoverId}
              onHover={setHoverId} />

            )}
            </div>
          }
        </div>
      </section>

      <aside
        className={cn(
          'relative lg:block lg:flex-1',
          showMap ? 'fixed inset-x-0 bottom-0 top-[72px] z-30 block' : 'hidden'
        )}
        aria-label="Map">
        
        <MapView listings={results} serviceId={filters.service} activeId={hoverId ?? selectedId} onSelect={handleSelect} />
        {selected &&
        <div className="absolute bottom-6 left-1/2 z-[500] w-[calc(100%-2rem)] max-w-sm -translate-x-1/2">
            <div className="relative flex gap-3 overflow-hidden rounded-2xl bg-white p-2 shadow-lift">
              <img src={selected.photos[0]} alt="" className="h-24 w-24 shrink-0 rounded-xl object-cover" />
              <div className="min-w-0 flex-1 py-1 pr-6">
                <p className="flex items-center gap-1 text-xs font-bold text-stone-600">
                  <StarIcon className="h-3 w-3 fill-primary-400 text-primary-400" aria-hidden="true" />
                  {selected.rating.toFixed(2)} · {selected.neighborhood}
                </p>
                <Link to={`/l/${selected.id}${filters.service ? `?service=${filters.service}` : ''}`} className="mt-0.5 line-clamp-2 text-sm font-extrabold text-stone-900 hover:text-primary-700">
                  {selected.title}
                </Link>
                <p className="mt-1 text-sm text-stone-500">
                  from <span className="font-black text-stone-900">{formatMoney(getStartingPrice(selected, filters.service).price)}</span> /{' '}
                  {getStartingPrice(selected, filters.service).unitLabel}
                </p>
              </div>
              <button
              type="button"
              onClick={() => setSelectedId(null)}
              aria-label="Close preview"
              className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full text-stone-500 hover:bg-stone-100">
              
                <XIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        }
      </aside>

      <button
        type="button"
        onClick={() => setShowMap((s) => !s)}
        className="fixed bottom-6 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full bg-stone-900 px-5 py-3 text-sm font-extrabold text-white shadow-lift lg:hidden">
        
        {showMap ? <ListIcon className="h-4 w-4" /> : <MapIcon className="h-4 w-4" />}
        {showMap ? 'Show list' : 'Show map'}
      </button>
    </div>);

}
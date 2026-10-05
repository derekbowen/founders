import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListIcon, MapIcon, SearchXIcon, SlidersHorizontalIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { ExperienceCard } from '../components/ExperienceCard';
import { FilterDrawer } from '../components/search/FilterDrawer';
import { MapView } from '../components/map/MapView';
import { Chip } from '../components/ui/Chip';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';
import { SelectField } from '../components/ui/SelectField';
import { experiences } from '../data/experiences';
import { categories } from '../data/categories';
import { sortOptions } from '../data/options';
import { useSearchFilters, toggleValue } from '../hooks/useSearchFilters';
import { applyFilters, countActiveFilters } from '../utils/search';
import { getDestination } from '../utils/lookup';
import { formatDate, formatPrice, pluralize } from '../utils/format';

export function Search() {
  const navigate = useNavigate();
  const { filters, update, reset } = useSearchFilters();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [mobileMap, setMobileMap] = useState(false);

  const results = useMemo(() => applyFilters(experiences, filters), [filters]);
  const activeCount = countActiveFilters(filters);
  const destination = getDestination(filters.destination);
  const heading = destination ?
  `Experiences in ${destination.city}` :
  filters.destination ?
  `Results for “${filters.destination}”` :
  'All experiences';

  const markers = results.map((e) => ({
    id: e.id,
    lat: e.meetingPoint.lat,
    lng: e.meetingPoint.lng,
    label: formatPrice(e.pricePerPerson),
    active: hovered === e.id
  }));

  return (
    <div className="flex w-full flex-col lg:flex-row">
      <section className={twMerge('w-full px-4 pb-16 pt-6 sm:px-6 lg:w-[58%] lg:px-8', mobileMap && 'hidden lg:block')}>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{heading}</h1>
            <p className="mt-1 text-sm text-slate-600">
              {pluralize(results.length, 'experience')}
              {filters.date && ` · ${formatDate(filters.date, 'EEE, MMM d')}`}
              {filters.guests > 1 && ` · ${filters.guests} guests`}
            </p>
          </div>
          <SelectField
            label="Sort by"
            hideLabel
            value={filters.sort}
            onChange={(e) => update({ sort: e.target.value })}
            options={sortOptions}
            className="w-48" />
          
        </div>

        <div className="sticky top-[72px] z-20 -mx-4 mt-5 flex items-center gap-2 overflow-x-auto bg-white/95 px-4 py-3 backdrop-blur scrollbar-none sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <Chip
            onClick={() => setDrawerOpen(true)}
            selected={activeCount > 0}
            icon={<SlidersHorizontalIcon className="h-4 w-4" aria-hidden />}>
            
            Filters{activeCount > 0 && ` · ${activeCount}`}
          </Chip>
          <span className="h-6 w-px shrink-0 bg-slate-200" aria-hidden />
          {categories.map(({ id, label, icon: Icon }) =>
          <Chip
            key={id}
            selected={filters.categories.includes(id)}
            onClick={() => update({ categories: toggleValue(filters.categories, id) })}
            icon={<Icon className="h-4 w-4" aria-hidden />}>
            
              {label}
            </Chip>
          )}
          {activeCount > 0 &&
          <button type="button" onClick={reset} className="shrink-0 px-2 text-sm font-semibold text-slate-700 underline underline-offset-4 hover:text-slate-900">
              Clear
            </button>
          }
        </div>

        <div className="mt-6">
          {results.length === 0 ?
          <EmptyState
            icon={SearchXIcon}
            title="No experiences match"
            description="Try removing a filter, widening your price range or searching a different destination."
            action={
            <div className="flex flex-wrap justify-center gap-2">
                  <Button variant="outline" onClick={reset}>Clear filters</Button>
                  <Button onClick={() => navigate('/s')}>Browse all</Button>
                </div>
            } /> :


          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2">
              {results.map((e) =>
            <ExperienceCard key={e.id} experience={e} active={hovered === e.id} onHover={setHovered} />
            )}
            </div>
          }
        </div>
      </section>

      <aside
        className={twMerge(
          'lg:sticky lg:top-[72px] lg:block lg:h-[calc(100vh-72px)] lg:w-[42%]',
          mobileMap ? 'block h-[calc(100vh-72px)] w-full' : 'hidden'
        )}
        aria-label="Map of results">
        
        <MapView
          markers={markers}
          ariaLabel="Map showing experience meeting points"
          onMarkerClick={(id) => navigate(`/l/${id}`)}
          className="h-full w-full" />
        
      </aside>

      <button
        type="button"
        onClick={() => setMobileMap((m) => !m)}
        className="fixed bottom-6 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-float transition hover:bg-slate-700 lg:hidden">
        
        {mobileMap ? <ListIcon className="h-4 w-4" aria-hidden /> : <MapIcon className="h-4 w-4" aria-hidden />}
        {mobileMap ? 'Show list' : 'Show map'}
      </button>

      <FilterDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        filters={filters}
        onChange={update}
        onReset={reset}
        resultCount={results.length} />
      
    </div>);

}
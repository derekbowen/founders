import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListIcon, MapIcon, SearchIcon, SearchXIcon, SlidersHorizontalIcon } from 'lucide-react';
import { JobCard } from '../components/jobs/JobCard';
import { JobMap } from '../components/jobs/JobMap';
import { FilterBar } from '../components/search/FilterBar';
import { FilterDrawer } from '../components/search/FilterDrawer';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';
import { brand } from '../data/brand';
import { sortOptions, useJobSearch } from '../hooks/useJobSearch';
import type { SortOption } from '../types/marketplace';
import { cn, inputClass } from '../utils/styles';

export function Search() {
  const navigate = useNavigate();
  const { filters, updateFilters, resetFilters, sort, setSort, results, activeCount } = useJobSearch();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileView, setMobileView] = useState<'list' | 'map'>('list');

  return (
    <div className="bg-ink-50">
      <div className="border-b border-ink-200 bg-white">
        <div className="mx-auto max-w-[1440px] px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-ink-900">Find work near you</h1>
              <p className="mt-0.5 text-sm text-ink-600" aria-live="polite">
                <span className="font-bold text-ink-900">{results.length}</span> open{' '}
                {results.length === 1 ? 'job' : 'jobs'} in {brand.city}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative sm:w-80">
                <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" aria-hidden="true" />
                <label htmlFor="job-q" className="sr-only">
                  Search jobs
                </label>
                <input
                  id="job-q"
                  type="search"
                  value={filters.q}
                  onChange={(e) => updateFilters({ q: e.target.value })}
                  placeholder="Search jobs, e.g. “fence”"
                  className={cn(inputClass, 'pl-9')} />
                
              </div>
              <div className="flex items-center gap-2">
                <label htmlFor="sort" className="shrink-0 text-sm font-bold text-ink-600">
                  Sort
                </label>
                <select
                  id="sort"
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortOption)}
                  className={cn(inputClass, 'pr-8 sm:w-56')}>
                  
                  {sortOptions.map((o) =>
                  <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  )}
                </select>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <FilterBar filters={filters} onChange={updateFilters} onReset={resetFilters} activeCount={activeCount} />
            <div className="flex gap-2 md:hidden">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setDrawerOpen(true)}
                leftIcon={<SlidersHorizontalIcon className="h-4 w-4" />}>
                
                Filters{activeCount > 0 && ` (${activeCount})`}
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setMobileView((v) => v === 'list' ? 'map' : 'list')}
                leftIcon={mobileView === 'list' ? <MapIcon className="h-4 w-4" /> : <ListIcon className="h-4 w-4" />}>
                
                {mobileView === 'list' ? 'Map' : 'List'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1440px] lg:grid-cols-[minmax(0,1fr)_minmax(0,42%)]">
        <section
          aria-label="Job results"
          className={cn('px-4 py-6 sm:px-6 lg:px-8', mobileView === 'map' && 'hidden lg:block')}>
          
          {results.length === 0 ?
          <EmptyState
            icon={<SearchXIcon className="h-5 w-5" />}
            title="No jobs match your filters"
            description="Try widening your budget or distance, or clear filters to see every open job."
            action={
            <Button variant="secondary" onClick={() => {resetFilters();updateFilters({ q: '' });}}>
                  Clear all filters
                </Button>
            } /> :


          <div className="grid gap-5 sm:grid-cols-2">
              {results.map((job) =>
            <JobCard key={job.id} job={job} highlighted={hoveredId === job.id} onHover={setHoveredId} />
            )}
            </div>
          }
        </section>
        <aside
          className={cn(
            'border-l border-ink-200 lg:block',
            mobileView === 'map' ? 'block h-[calc(100vh-180px)]' : 'hidden',
            'lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)]'
          )}
          aria-label="Map">
          
          <JobMap
            jobs={results}
            activeId={hoveredId}
            onHover={setHoveredId}
            onSelect={(id) => navigate(`/jobs/${id}`)} />
          
        </aside>
      </div>

      <FilterDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        filters={filters}
        onChange={updateFilters}
        onReset={resetFilters}
        resultCount={results.length} />
      
    </div>);

}
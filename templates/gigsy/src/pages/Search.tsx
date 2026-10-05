import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SearchXIcon, SlidersHorizontalIcon, XIcon } from 'lucide-react';
import { useListingSearch } from '../hooks/useListingSearch';
import { FilterSidebar } from '../components/search/FilterSidebar';
import { ListingCard } from '../components/ListingCard';
import { SearchBar } from '../components/SearchBar';
import { EmptyState } from '../components/ui/EmptyState';
import { Button } from '../components/ui/Button';
import { SelectField } from '../components/ui/SelectField';
import { sortOptions } from '../data/navigation';
import { getCategory } from '../utils/lookup';

export function Search() {
  const { filters, setFilter, reset, results, activeCount, locations } = useListingSearch();
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawerOpen]);

  const singleCategory = filters.categories.length === 1 ? getCategory(filters.categories[0]) : undefined;
  const heading = filters.q ? `Results for “${filters.q}”` : singleCategory ? singleCategory.name : 'All services';

  const sidebar =
  <FilterSidebar filters={filters} setFilter={setFilter} reset={reset} activeCount={activeCount} locations={locations} />;


  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 md:hidden">
        <SearchBar />
      </div>
      <div className="flex gap-8">
        <aside className="hidden w-64 shrink-0 lg:block" aria-label="Search filters">
          <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-5 scrollbar-none">
            {sidebar}
          </div>
        </aside>

        <section className="min-w-0 flex-1" aria-labelledby="results-heading">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 id="results-heading" className="text-2xl font-bold tracking-tight text-slate-900">{heading}</h1>
              <p className="mt-1 text-sm text-slate-600" aria-live="polite">
                {results.length} {results.length === 1 ? 'service' : 'services'} available
              </p>
            </div>
            <div className="flex items-end gap-2">
              <Button
                variant="secondary"
                size="sm"
                className="h-11 lg:hidden"
                leftIcon={<SlidersHorizontalIcon className="h-4 w-4" aria-hidden="true" />}
                onClick={() => setDrawerOpen(true)}>
                
                Filters{activeCount > 0 ? ` (${activeCount})` : ''}
              </Button>
              <SelectField
                label="Sort by"
                hideLabel
                className="w-48"
                value={filters.sort}
                onChange={(e) => setFilter({ sort: e.target.value })}
                options={sortOptions} />
              
            </div>
          </div>

          {results.length === 0 ?
          <EmptyState
            className="mt-8"
            icon={<SearchXIcon className="h-6 w-6" />}
            title="No services match your search"
            text="Try removing a filter or searching for a broader skill like “design” or “video”."
            action={<Button variant="secondary" onClick={reset}>Clear filters</Button>} /> :


          <ul className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((l) =>
            <li key={l.id} className="flex">
                  <div className="w-full"><ListingCard listing={l} /></div>
                </li>
            )}
            </ul>
          }
        </section>
      </div>

      <AnimatePresence>
        {drawerOpen &&
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Filters">
            <motion.button
            type="button"
            aria-label="Close filters"
            className="absolute inset-0 bg-slate-950/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDrawerOpen(false)} />
          
            <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 380, damping: 38 }}
            className="absolute inset-y-0 left-0 flex w-[88%] max-w-sm flex-col bg-white shadow-pop">
            
              <div className="flex items-center justify-end border-b border-slate-200 px-4 py-3">
                <button type="button" onClick={() => setDrawerOpen(false)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100" aria-label="Close filters">
                  <XIcon className="h-5 w-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-5">{sidebar}</div>
              <div className="border-t border-slate-200 p-4">
                <Button fullWidth onClick={() => setDrawerOpen(false)}>Show {results.length} results</Button>
              </div>
            </motion.div>
          </div>
        }
      </AnimatePresence>
    </div>);

}
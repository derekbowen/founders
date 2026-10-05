import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SearchXIcon, SlidersHorizontalIcon, XIcon } from 'lucide-react';
import { ListingCard } from '../components/ListingCard';
import { EmptyState } from '../components/EmptyState';
import { FilterSidebar } from '../components/search/FilterSidebar';
import { useListingFilters, type ListKey } from '../hooks/useListingFilters';
import { sortOptions } from '../data/taxonomy';
import { occasionLabel } from '../utils/lookup';
import { formatMoney } from '../utils/format';
import { btn, eyebrow } from '../utils/styles';

export function Search() {
  const api = useListingFilters();
  const { filters, results, setSort, clearAll, toggle, setPrice, clearQuery, activeCount } = api;
  const [drawerOpen, setDrawerOpen] = useState(false);

  const title =
  filters.occasion.length === 1 ?
  `${occasionLabel(filters.occasion[0])} dresses` :
  filters.designer.length === 1 ?
  filters.designer[0] :
  filters.q ?
  `“${filters.q}”` :
  'All dresses';

  const chips: {key: ListKey;value: string;label: string;}[] = (
  ['size', 'designer', 'occasion', 'color', 'length', 'delivery'] as ListKey[]).
  flatMap((key) =>
  filters[key].map((value) => ({
    key,
    value,
    label:
    key === 'size' ?
    `US ${value}` :
    key === 'occasion' ?
    occasionLabel(value) :
    key === 'delivery' ?
    value === 'ship' ?
    'Shipping' :
    'Local pickup' :
    value
  }))
  );

  return (
    <div className="mx-auto max-w-[1400px] px-4 pb-20 pt-8 md:px-8 md:pt-12">
      <header className="mb-8 border-b border-line pb-6">
        <p className={eyebrow}>Rent the look</p>
        <h1 className="mt-2 font-display text-4xl text-ink md:text-5xl">{title}</h1>
        <p className="mt-2 text-sm text-muted">
          {results.length} {results.length === 1 ? 'dress' : 'dresses'} available · prices shown per
          4-day rental, cleaning included
        </p>
      </header>

      <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
        <aside aria-label="Filters" className="hidden lg:block">
          <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-2">
            <div className="flex items-center justify-between pb-2">
              <h2 className="font-display text-2xl">Filters</h2>
              {activeCount > 0 &&
              <button
                type="button"
                onClick={clearAll}
                className="text-xs text-accent-dark underline underline-offset-4">
                
                  Clear all
                </button>
              }
            </div>
            <FilterSidebar api={api} />
          </div>
        </aside>

        <section aria-label="Results">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className={btn('outline', 'sm', 'lg:hidden')}>
              
              <SlidersHorizontalIcon size={14} aria-hidden="true" />
              Filters{activeCount > 0 && ` (${activeCount})`}
            </button>
            <div className="flex flex-1 flex-wrap items-center gap-2">
              {filters.q &&
              <button
                type="button"
                onClick={clearQuery}
                className="inline-flex items-center gap-1.5 bg-accent-soft px-3 py-1.5 text-xs text-ink transition hover:bg-accent/40">
                
                  Search: {filters.q} <XIcon size={12} aria-hidden="true" />
                  <span className="sr-only">Remove</span>
                </button>
              }
              {chips.map((c) =>
              <button
                key={`${c.key}-${c.value}`}
                type="button"
                onClick={() => toggle(c.key, c.value)}
                className="inline-flex items-center gap-1.5 bg-accent-soft px-3 py-1.5 text-xs text-ink transition hover:bg-accent/40">
                
                  {c.label} <XIcon size={12} aria-hidden="true" />
                  <span className="sr-only">Remove filter</span>
                </button>
              )}
              {(filters.min !== null || filters.max !== null) &&
              <button
                type="button"
                onClick={() => setPrice(null, null)}
                className="inline-flex items-center gap-1.5 bg-accent-soft px-3 py-1.5 text-xs text-ink transition hover:bg-accent/40">
                
                  {formatMoney(filters.min ?? 0)} – {filters.max !== null ? formatMoney(filters.max) : 'any'}
                  <XIcon size={12} aria-hidden="true" />
                </button>
              }
            </div>
            <label className="ml-auto flex items-center gap-2 text-sm">
              <span className="text-muted">Sort</span>
              <select
                value={filters.sort}
                onChange={(e) => setSort(e.target.value)}
                className="h-9 border border-line bg-paper px-2 text-sm text-ink focus:border-ink focus:outline-none">
                
                {sortOptions.map((o) =>
                <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                )}
              </select>
            </label>
          </div>

          {results.length === 0 ?
          <EmptyState
            icon={SearchXIcon}
            title="Nothing in your size… yet"
            text="Try removing a filter or two — new dresses are listed every day."
            action={
            <button type="button" onClick={clearAll} className={btn('primary', 'md')}>
                  Clear all filters
                </button>
            } /> :


          <motion.div layout className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3">
              {results.map((l) =>
            <motion.div
              key={l.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}>
              
                  <ListingCard listing={l} />
                </motion.div>
            )}
            </motion.div>
          }
        </section>
      </div>

      <AnimatePresence>
        {drawerOpen &&
        <div className="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-modal="true" aria-label="Filters">
            <motion.div
            className="absolute inset-0 bg-ink/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDrawerOpen(false)} />
          
            <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 380, damping: 38 }}
            className="absolute left-0 top-0 flex h-full w-full max-w-sm flex-col bg-paper">
            
              <div className="flex h-16 items-center justify-between border-b border-line px-5">
                <h2 className="font-display text-2xl">Filters</h2>
                <button
                type="button"
                aria-label="Close filters"
                onClick={() => setDrawerOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-cream">
                
                  <XIcon size={20} aria-hidden="true" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-5">
                <FilterSidebar api={api} />
              </div>
              <div className="grid grid-cols-2 gap-3 border-t border-line p-5">
                <button type="button" onClick={clearAll} className={btn('outline', 'md')}>
                  Clear
                </button>
                <button type="button" onClick={() => setDrawerOpen(false)} className={btn('primary', 'md')}>
                  Show {results.length}
                </button>
              </div>
            </motion.div>
          </div>
        }
      </AnimatePresence>
    </div>);

}
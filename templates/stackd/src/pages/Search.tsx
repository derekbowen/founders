import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { SearchXIcon, SlidersHorizontalIcon, XIcon } from 'lucide-react';
import { FilterPanel } from '../components/search/FilterPanel';
import { ListingCard } from '../components/listing/ListingCard';
import { EmptyState } from '../components/common/EmptyState';
import { useStore } from '../contexts/StoreContext';
import { categories } from '../data/categories';
import { countActiveFilters, defaultFilters, filterListings, sortOptions } from '../utils/search';
import type { CategoryId, SearchFilters, SortOption } from '../types/marketplace';

export function Search() {
  const { listings, getCreator } = useStore();
  const [params, setParams] = useSearchParams();
  const [local, setLocal] = useState<Omit<SearchFilters, 'query' | 'category' | 'sort'>>({
    priceMin: '',
    priceMax: '',
    pricing: 'all',
    fileTypes: [],
    minRating: 0
  });
  const [mobileFilters, setMobileFilters] = useState(false);

  const filters: SearchFilters = {
    ...local,
    query: params.get('q') ?? '',
    category: params.get('category') as CategoryId | null ?? 'all',
    sort: params.get('sort') as SortOption | null ?? 'relevance'
  };

  const update = (patch: Partial<SearchFilters>) => {
    const { query, category, sort, ...rest } = patch;
    if (query !== undefined || category !== undefined || sort !== undefined) {
      const next = new URLSearchParams(params);
      if (query !== undefined) query ? next.set('q', query) : next.delete('q');
      if (category !== undefined) category !== 'all' ? next.set('category', category) : next.delete('category');
      if (sort !== undefined) sort !== 'relevance' ? next.set('sort', sort) : next.delete('sort');
      setParams(next, { replace: true });
    }
    if (Object.keys(rest).length) setLocal((l) => ({ ...l, ...rest }));
  };

  const reset = (clearQuery = false) => {
    const { query, category, sort, ...rest } = defaultFilters;
    setLocal(rest);
    const next = new URLSearchParams();
    if (filters.query && !clearQuery) next.set('q', filters.query);
    setParams(next, { replace: true });
  };

  const creatorName = (id: string) => getCreator(id)?.name ?? '';
  const results = useMemo(() => filterListings(listings, filters, creatorName), [listings, JSON.stringify(filters)]);

  const categoryCounts = useMemo(() => {
    const base = filterListings(listings, { ...filters, category: 'all' }, creatorName);
    return base.reduce<Record<string, number>>((acc, l) => ({ ...acc, [l.category]: (acc[l.category] ?? 0) + 1 }), {});
  }, [listings, JSON.stringify(filters)]);

  const activeCount = countActiveFilters(filters);
  const categoryName = categories.find((c) => c.id === filters.category)?.name;

  const heading = filters.query ? `Results for “${filters.query}”` : categoryName ?? 'All products';

  const panel = <FilterPanel filters={filters} onChange={update} onReset={() => reset()} categoryCounts={categoryCounts} activeCount={activeCount} />;

  return (
    <div className="container-page py-8 md:py-12">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-ink pb-6">
        <div>
          <p className="eyebrow mb-1">Explore</p>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{heading}</h1>
          <p className="mt-1 text-sm text-muted" aria-live="polite">
            {results.length} {results.length === 1 ? 'product' : 'products'} · instant download
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => setMobileFilters(true)} className="btn btn-outline btn-sm lg:hidden">
            <SlidersHorizontalIcon className="h-4 w-4" aria-hidden="true" />
            Filters{activeCount > 0 && ` (${activeCount})`}
          </button>
          <label htmlFor="sort" className="sr-only">
            Sort by
          </label>
          <select id="sort" value={filters.sort} onChange={(e) => update({ sort: e.target.value as SortOption })} className="field h-9 w-auto pr-8 font-semibold">
            {sortOptions.map((o) =>
            <option key={o.value} value={o.value}>
                {o.label}
              </option>
            )}
          </select>
        </div>
      </div>

      <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:block" aria-label="Filters">
          <div className="sticky top-24">{panel}</div>
        </aside>

        <div>
          {activeCount > 0 &&
          <div className="mb-5 flex flex-wrap gap-2">
              {filters.category !== 'all' &&
            <button type="button" className="chip border-ink bg-brand-soft" onClick={() => update({ category: 'all' })}>
                  {categoryName} <XIcon className="h-3 w-3" aria-hidden="true" />
                </button>
            }
              {filters.pricing !== 'all' &&
            <button type="button" className="chip border-ink bg-brand-soft capitalize" onClick={() => update({ pricing: 'all' })}>
                  {filters.pricing} <XIcon className="h-3 w-3" aria-hidden="true" />
                </button>
            }
              {(filters.priceMin || filters.priceMax) &&
            <button type="button" className="chip border-ink bg-brand-soft" onClick={() => update({ priceMin: '', priceMax: '' })}>
                  ${filters.priceMin || '0'} – {filters.priceMax ? `$${filters.priceMax}` : 'any'} <XIcon className="h-3 w-3" aria-hidden="true" />
                </button>
            }
              {filters.fileTypes.map((t) =>
            <button key={t} type="button" className="chip border-ink bg-brand-soft" onClick={() => update({ fileTypes: filters.fileTypes.filter((x) => x !== t) })}>
                  {t} <XIcon className="h-3 w-3" aria-hidden="true" />
                </button>
            )}
              {filters.minRating > 0 &&
            <button type="button" className="chip border-ink bg-brand-soft" onClick={() => update({ minRating: 0 })}>
                  {filters.minRating}+ stars <XIcon className="h-3 w-3" aria-hidden="true" />
                </button>
            }
            </div>
          }

          {results.length === 0 ?
          <EmptyState
            icon={SearchXIcon}
            title="Nothing matches yet"
            body="Try a different keyword or loosen a filter — new files drop every day."
            action={
            <button type="button" onClick={() => reset(true)} className="btn btn-ink">
                  Clear search & filters
                </button>
            } /> :


          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((l) =>
            <ListingCard key={l.id} listing={l} />
            )}
            </div>
          }
        </div>
      </div>

      <AnimatePresence>
        {mobileFilters &&
        <motion.div className="fixed inset-0 z-50 lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button type="button" aria-label="Close filters" className="absolute inset-0 bg-ink/40" onClick={() => setMobileFilters(false)} />
            <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Filters"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.22 }}
            className="absolute inset-y-0 left-0 flex w-[88%] max-w-sm flex-col border-r border-ink bg-white">
            
              <div className="flex-1 overflow-y-auto p-5">{panel}</div>
              <div className="border-t border-ink p-4">
                <button type="button" onClick={() => setMobileFilters(false)} className="btn btn-accent w-full">
                  Show {results.length} results
                </button>
              </div>
            </motion.div>
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}
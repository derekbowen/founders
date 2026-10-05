import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SearchXIcon, SlidersHorizontalIcon, XIcon } from 'lucide-react';
import { ProductCard } from '../components/product/ProductCard';
import { SearchFilters } from '../components/search/SearchFilters';
import { BrandButton } from '../components/ui/BrandButton';
import { EmptyState } from '../components/ui/EmptyState';
import { SelectField } from '../components/ui/SelectField';
import { useProductSearch, type SortOption } from '../hooks/useProductSearch';
import { getCategory } from '../utils/catalog';

const sortOptions: {value: SortOption;label: string;}[] = [
{ value: 'relevance', label: 'Best selling' },
{ value: 'newest', label: 'Newest' },
{ value: 'price-asc', label: 'Wholesale: low to high' },
{ value: 'price-desc', label: 'Wholesale: high to low' },
{ value: 'margin-desc', label: 'Highest margin' }];


export function Search() {
  const search = useProductSearch();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const categoryName = getCategory(search.category ?? undefined)?.name;

  const filters =
  <SearchFilters
    category={search.category}
    onCategoryChange={search.setCategory}
    filters={search.filters}
    onFiltersChange={search.setFilters}
    madeInOptions={search.madeInOptions} />;



  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          {search.query ? `Results for “${search.query}”` : categoryName ?? 'All wholesale products'}
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Wholesale prices per unit. Order in case quantities — tier pricing applies automatically at checkout.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[248px_1fr]">
        <aside className="hidden lg:block" aria-label="Filters">
          <div className="sticky top-32 rounded-xl border border-slate-200 bg-white p-4">{filters}</div>
        </aside>

        <section aria-label="Search results">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-slate-600" aria-live="polite">
              <span className="font-semibold text-slate-900 tabular-nums">{search.results.length}</span> product
              {search.results.length === 1 ? '' : 's'}
            </p>
            <div className="flex items-center gap-2">
              <BrandButton variant="secondary" size="md" className="lg:hidden" onClick={() => setDrawerOpen(true)}>
                <SlidersHorizontalIcon className="h-4 w-4" aria-hidden="true" />
                Filters
                {search.chips.length > 0 &&
                <span className="rounded-full bg-primary-700 px-1.5 text-[11px] text-white">{search.chips.length}</span>
                }
              </BrandButton>
              <SelectField
                label="Sort by"
                hideLabel
                id="sort"
                value={search.sort}
                onChange={(e) => search.setSort(e.target.value as SortOption)}
                options={sortOptions}
                className="w-52" />
              
            </div>
          </div>

          {search.chips.length > 0 &&
          <div className="mb-5 flex flex-wrap items-center gap-2">
              {search.chips.map((c) =>
            <button
              key={c.key}
              type="button"
              onClick={c.onRemove}
              className="inline-flex items-center gap-1 rounded-full border border-primary-200 bg-primary-50 py-1 pl-3 pr-2 text-xs font-medium text-primary-800 transition-colors hover:border-primary-300 hover:bg-primary-100"
              aria-label={`Remove filter ${c.label}`}>
              
                  {c.label}
                  <XIcon className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
            )}
              <button type="button" onClick={search.clearAll} className="ml-1 text-xs font-semibold text-slate-600 underline-offset-2 hover:text-slate-900 hover:underline">
                Clear all
              </button>
            </div>
          }

          {search.results.length > 0 ?
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
              {search.results.map((p) =>
            <ProductCard key={p.id} product={p} />
            )}
            </div> :

          <EmptyState
            icon={SearchXIcon}
            title="No products match those filters"
            description="Try a broader keyword, raising your price range, or removing a value filter."
            action={
            <BrandButton variant="secondary" onClick={search.clearAll}>
                  Clear all filters
                </BrandButton>
            } />

          }
        </section>
      </div>

      <AnimatePresence>
        {drawerOpen &&
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Filters">
            <motion.div className="absolute inset-0 bg-slate-900/40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDrawerOpen(false)} />
            <motion.div
            className="absolute inset-y-0 left-0 flex w-full max-w-sm flex-col bg-white"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}>
            
              <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
                <h2 className="text-base font-semibold">Filters</h2>
                <button type="button" onClick={() => setDrawerOpen(false)} className="rounded-lg p-2 text-slate-600 hover:bg-slate-100" aria-label="Close filters">
                  <XIcon className="h-5 w-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4">{filters}</div>
              <div className="flex gap-2 border-t border-slate-200 p-4">
                <BrandButton variant="secondary" onClick={search.clearAll} className="flex-1">
                  Clear
                </BrandButton>
                <BrandButton onClick={() => setDrawerOpen(false)} className="flex-[2]">
                  Show {search.results.length} results
                </BrandButton>
              </div>
            </motion.div>
          </div>
        }
      </AnimatePresence>
    </div>);

}
import React, { useState } from 'react';
import { SearchXIcon, SlidersHorizontalIcon, XIcon } from 'lucide-react';
import { categories } from '../data/categories';
import { sortOptions } from '../data/filters';
import { useSearchFilters } from '../hooks/useSearchFilters';
import { FilterSidebar } from '../components/search/FilterSidebar';
import { ProductCard } from '../components/product/ProductCard';
import { Drawer } from '../components/ui/Drawer';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';
import { SelectField } from '../components/ui/SelectField';
import { pluralize } from '../utils/format';

export function Search() {
  const { filters, results, toggleInList, setParam, setPriceRange, clearAll, activeChips } = useSearchFilters();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const singleCategory = filters.categories.length === 1 ? categories.find((c) => c.id === filters.categories[0]) : undefined;
  const heading = filters.q ? `Results for “${filters.q}”` : singleCategory ? singleCategory.name : 'All handmade goods';

  const sidebar = <FilterSidebar filters={filters} toggleInList={toggleInList} setParam={setParam} setPriceRange={setPriceRange} />;

  return (
    <div className="container-page py-8 lg:py-12">
      <div className="flex flex-col gap-4 border-b border-line pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">Shop</p>
          <h1 className="mt-1 text-3xl font-medium tracking-tight sm:text-4xl">{heading}</h1>
          <p className="mt-1 text-sm text-muted" aria-live="polite">
            {pluralize(results.length, 'piece')} from independent makers
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            className="h-11 lg:hidden"
            leftIcon={<SlidersHorizontalIcon className="h-4 w-4" />}
            onClick={() => setDrawerOpen(true)}>
            
            Filters{activeChips.length ? ` (${activeChips.length})` : ''}
          </Button>
          <SelectField
            label="Sort by"
            hideLabel
            className="w-48"
            value={filters.sort}
            onChange={(e) => setParam('sort', e.target.value === 'relevance' ? null : e.target.value)}
            options={sortOptions} />
          
        </div>
      </div>

      {activeChips.length > 0 &&
      <div className="flex flex-wrap items-center gap-2 pt-4">
          {activeChips.map((chip) =>
        <button
          key={chip.label}
          type="button"
          onClick={chip.onRemove}
          className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface py-1 pl-3 pr-2 text-xs font-medium text-ink transition-colors hover:border-primary hover:text-primary-ink"
          aria-label={`Remove filter ${chip.label}`}>
          
              {chip.label}
              <XIcon className="h-3 w-3" aria-hidden />
            </button>
        )}
          <button type="button" onClick={clearAll} className="px-2 text-xs font-medium text-primary-ink hover:underline">
            Clear all
          </button>
        </div>
      }

      <div className="mt-6 grid gap-10 lg:grid-cols-[240px_1fr]">
        <aside className="hidden lg:block" aria-label="Filters">
          <div className="sticky top-32">{sidebar}</div>
        </aside>
        <section aria-label="Results">
          {results.length > 0 ?
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:gap-x-6">
              {results.map((l) =>
            <ProductCard key={l.id} listing={l} />
            )}
            </div> :

          <EmptyState
            icon={<SearchXIcon className="h-5 w-5" />}
            title="Nothing matches just yet"
            description="Try removing a filter or searching for something broader, like “mug” or “print”."
            action={<Button onClick={clearAll}>Clear filters</Button>} />

          }
        </section>
      </div>

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="Filters"
        footer={
        <div className="grid grid-cols-2 gap-3">
            <Button variant="secondary" onClick={clearAll}>
              Clear all
            </Button>
            <Button onClick={() => setDrawerOpen(false)}>Show {results.length}</Button>
          </div>
        }>
        
        {sidebar}
      </Drawer>
    </div>);

}
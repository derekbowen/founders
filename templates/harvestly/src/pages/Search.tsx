import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ListIcon, MapIcon, MapPinIcon, SearchXIcon, SlidersHorizontalIcon, XIcon } from "lucide-react";
import { FarmMap } from "../components/marketplace/FarmMap";
import { ProductCard } from "../components/marketplace/ProductCard";
import { FilterPanel } from "../components/search/FilterPanel";
import { Button } from "../components/ui/Button";
import { EmptyState } from "../components/ui/EmptyState";
import { SelectField } from "../components/ui/SelectField";
import { brand } from "../data/brand";
import { categories } from "../data/categories";
import { useProductSearch } from "../hooks/useProductSearch";

const sortOptions = [
{ value: "relevance", label: "Recommended" },
{ value: "distance", label: "Nearest first" },
{ value: "price-asc", label: "Price: low to high" },
{ value: "price-desc", label: "Price: high to low" },
{ value: "rating", label: "Top rated" }];


export function Search() {
  const { filters, update, clearAll, results, farmCounts, visibleFarms, activeCount } = useProductSearch();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [mobileView, setMobileView] = useState<"list" | "map">("list");
  const [hoverFarm, setHoverFarm] = useState<string | null>(null);

  const categoryLabel = categories.find((c) => c.id === filters.category)?.label;
  const heading = filters.q ?
  `Results for “${filters.q}”` :
  categoryLabel ?
  categoryLabel :
  "All local products";

  return (
    <div className="container-site py-6 lg:py-8">
      <div className="mb-5 flex flex-col gap-1">
        <p className="flex items-center gap-1.5 text-sm text-muted">
          <MapPinIcon className="h-4 w-4 text-primary" aria-hidden="true" />
          Near {filters.location || brand.defaultLocation}
        </p>
        <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">{heading}</h1>
      </div>

      <div className="sticky top-16 z-30 -mx-4 mb-6 flex items-center gap-2 border-y border-line bg-kraft/95 px-4 py-3 backdrop-blur sm:mx-0 sm:rounded-2xl sm:border sm:px-3 lg:top-[72px]">
        <button
          type="button"
          onClick={() => setFiltersOpen(true)}
          className="inline-flex h-10 items-center gap-2 rounded-full border border-line bg-white px-4 text-sm font-semibold text-ink transition hover:border-primary/40">
          
          <SlidersHorizontalIcon className="h-4 w-4" aria-hidden="true" />
          Filters
          {activeCount > 0 &&
          <span className="flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-primary px-1 text-xs text-white">
              {activeCount}
            </span>
          }
        </button>
        <div className="no-scrollbar hidden flex-1 gap-2 overflow-x-auto md:flex">
          {categories.map((c) =>
          <button
            key={c.id}
            type="button"
            aria-pressed={filters.category === c.id}
            onClick={() => update({ category: filters.category === c.id ? null : c.id })}
            className={`h-10 shrink-0 rounded-full border px-4 text-sm font-medium transition ${
            filters.category === c.id ?
            "border-primary bg-primary text-white" :
            "border-line bg-white text-ink hover:border-primary/40"}`
            }>
            
              {c.label}
            </button>
          )}
        </div>
        <SelectField
          label="Sort by"
          hideLabel
          options={sortOptions}
          value={filters.sort}
          onChange={(e) => update({ sort: e.target.value === "relevance" ? null : e.target.value })}
          className="ml-auto w-44 shrink-0 md:ml-0" />
        
      </div>

      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-muted" aria-live="polite">
          <span className="font-semibold text-ink">{results.length}</span> products from{" "}
          <span className="font-semibold text-ink">{visibleFarms.length}</span> farms
        </p>
        {activeCount > 0 &&
        <button type="button" onClick={clearAll} className="text-sm font-semibold text-primary hover:underline">
            Clear filters
          </button>
        }
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_460px]">
        <section aria-label="Search results" className={mobileView === "map" ? "hidden lg:block" : ""}>
          {results.length === 0 ?
          <EmptyState
            icon={<SearchXIcon className="h-6 w-6" />}
            title="Nothing growing here yet"
            text="Try widening your distance, removing a filter, or searching for something else in season."
            action={<Button onClick={clearAll}>Clear all filters</Button>} /> :


          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((p) =>
            <ProductCard key={p.id} product={p} highlighted={hoverFarm === p.farmId} onHover={setHoverFarm} />
            )}
            </div>
          }
        </section>
        <aside aria-label="Farm map" className={mobileView === "list" ? "hidden lg:block" : ""}>
          <div className="lg:sticky lg:top-40">
            <FarmMap
              farms={visibleFarms}
              counts={farmCounts}
              activeFarmId={hoverFarm}
              onHover={setHoverFarm}
              className="h-[70vh] lg:h-[calc(100vh-12rem)]" />
            
          </div>
        </aside>
      </div>

      <div className="fixed bottom-5 left-1/2 z-30 -translate-x-1/2 lg:hidden">
        <button
          type="button"
          onClick={() => setMobileView((v) => v === "list" ? "map" : "list")}
          className="inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-white shadow-lift">
          
          {mobileView === "list" ? <MapIcon className="h-4 w-4" /> : <ListIcon className="h-4 w-4" />}
          {mobileView === "list" ? "Show map" : "Show list"}
        </button>
      </div>

      <AnimatePresence>
        {filtersOpen &&
        <>
            <motion.div
            className="fixed inset-0 z-50 bg-ink/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setFiltersOpen(false)} />
          
            <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Filters"
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-kraft"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 380, damping: 38 }}>
            
              <div className="flex items-center justify-between border-b border-line px-5 py-4">
                <h2 className="font-display text-xl font-semibold text-ink">Filters</h2>
                <button
                type="button"
                onClick={() => setFiltersOpen(false)}
                aria-label="Close filters"
                className="rounded-full p-2 hover:bg-ink/5">
                
                  <XIcon className="h-5 w-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-5 py-6">
                <FilterPanel filters={filters} update={update} />
              </div>
              <div className="flex items-center justify-between gap-3 border-t border-line px-5 py-4">
                <Button variant="ghost" onClick={clearAll}>
                  Clear all
                </Button>
                <Button onClick={() => setFiltersOpen(false)}>Show {results.length} products</Button>
              </div>
            </motion.div>
          </>
        }
      </AnimatePresence>
    </div>);

}
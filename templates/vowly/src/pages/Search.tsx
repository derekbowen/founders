import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpDownIcon, ListIcon, MapIcon, SearchXIcon, SlidersHorizontalIcon, XIcon } from "lucide-react";
import { useVendorSearch } from "../hooks/useVendorSearch";
import { sortOptions } from "../data/filters";
import { getCategory } from "../utils/vendors";
import { formatDate, formatPrice } from "../utils/format";
import { SearchFilters } from "../components/search/SearchFilters";
import { ActiveFilterChips } from "../components/search/ActiveFilterChips";
import { FilterDrawer } from "../components/search/FilterDrawer";
import { VendorCard } from "../components/vendor/VendorCard";
import { VendorMap } from "../components/map/VendorMap";
import { EmptyState } from "../components/ui/EmptyState";
import { Button } from "../components/ui/Button";
import { StarRating } from "../components/ui/StarRating";
import type { Vendor } from "../types/marketplace";

export function Search() {
  const search = useVendorSearch();
  const { filters, results, update, clearAll, activeCount } = search;
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selected, setSelected] = useState<Vendor | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mapView, setMapView] = useState(false);

  const categoryLabel = filters.category ? getCategory(filters.category)?.label : null;
  const title = categoryLabel ? `Wedding ${categoryLabel.toLowerCase()}` : "Wedding vendors";

  const mapPanel =
  <div className="relative h-full overflow-hidden rounded-2xl border border-line bg-blush/30">
      <VendorMap vendors={results} activeId={hoveredId ?? selected?.id} onMarkerClick={setSelected} label="Map of search results" />
      {selected &&
    <div className="absolute inset-x-3 bottom-3 z-[500] flex gap-3 rounded-2xl border border-line bg-surface p-3 shadow-lift">
          <img src={selected.images[0]} alt="" className="h-20 w-24 shrink-0 rounded-xl object-cover" />
          <div className="min-w-0 flex-1">
            <Link to={`/l/${selected.slug}`} className="block truncate font-display text-xl font-semibold text-ink hover:text-primary">
              {selected.name}
            </Link>
            <p className="text-xs text-muted">{selected.city}</p>
            <div className="mt-1 flex items-center gap-3 text-sm">
              <StarRating rating={selected.rating} count={selected.reviewCount} />
              <span className="font-semibold">{formatPrice(selected.startingPrice)}</span>
            </div>
          </div>
          <button type="button" onClick={() => setSelected(null)} aria-label="Close preview" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full hover:bg-blush/60">
            <XIcon aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>
    }
    </div>;


  return (
    <div className="mx-auto w-full max-w-[1600px] px-4 pb-16 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 border-b border-line py-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-4xl font-semibold text-ink sm:text-5xl">{title}</h1>
          <p className="mt-1 text-sm text-muted" aria-live="polite">
            {results.length} {results.length === 1 ? "result" : "results"}
            {filters.location && ` near ${filters.location}`}
            {filters.date && ` · available ${formatDate(filters.date)}`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" onClick={() => setDrawerOpen(true)} className="lg:hidden">
            <SlidersHorizontalIcon aria-hidden="true" className="h-4 w-4" />
            Filters{activeCount > 0 && ` (${activeCount})`}
          </Button>
          <Button variant="secondary" size="sm" onClick={() => setMapView((v) => !v)} className="xl:hidden" aria-pressed={mapView}>
            {mapView ? <ListIcon aria-hidden="true" className="h-4 w-4" /> : <MapIcon aria-hidden="true" className="h-4 w-4" />}
            {mapView ? "List" : "Map"}
          </Button>
          <div className="relative">
            <label htmlFor="sort" className="sr-only">Sort by</label>
            <ArrowUpDownIcon aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <select
              id="sort"
              value={filters.sort}
              onChange={(e) => update({ sort: e.target.value })}
              className="h-9 cursor-pointer appearance-none rounded-full border border-line bg-surface pl-9 pr-4 text-sm font-medium text-ink hover:border-ink/25 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20">
              
              {sortOptions.map((o) =>
              <option key={o.value} value={o.value}>{o.label}</option>
              )}
            </select>
          </div>
        </div>
      </div>

      {activeCount > 0 &&
      <div className="pt-4">
          <ActiveFilterChips search={search} />
        </div>
      }

      <div className="mt-6 grid gap-8 lg:grid-cols-[250px_minmax(0,1fr)] xl:grid-cols-[250px_minmax(0,1fr)_minmax(0,0.85fr)]">
        <aside aria-label="Search filters" className="hidden lg:block">
          <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pb-6 pr-2 no-scrollbar">
            <SearchFilters search={search} />
          </div>
        </aside>

        <section aria-label="Search results">
          {mapView ?
          <div className="h-[70vh] xl:hidden">{mapPanel}</div> :
          results.length === 0 ?
          <EmptyState
            icon={SearchXIcon}
            title="No vendors match yet"
            description="Try widening your price range, removing a style, or choosing a different date."
            action={<Button onClick={clearAll}>Clear all filters</Button>} /> :


          <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2">
              {results.map((vendor) =>
            <li key={vendor.id}>
                  <VendorCard vendor={vendor} active={hoveredId === vendor.id || selected?.id === vendor.id} onHover={setHoveredId} />
                </li>
            )}
            </ul>
          }
        </section>

        <div className="hidden xl:block">
          <div className="sticky top-24 h-[calc(100vh-7rem)]">{mapPanel}</div>
        </div>
      </div>

      <FilterDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} search={search} />
    </div>);

}
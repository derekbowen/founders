import React, { useEffect, useState } from 'react';
import { SearchIcon, SlidersHorizontalIcon, XIcon, SearchXIcon } from 'lucide-react';
import { Select } from '../components/Select';
import { Button } from '../components/Button';
import { Drawer } from '../components/Drawer';
import { TutorCard } from '../components/tutors/TutorCard';
import { SearchFilters } from '../components/search/SearchFilters';
import { EmptyState } from '../components/common/EmptyState';
import { useSearchFilters } from '../hooks/useSearchFilters';
import { sortOptions } from '../utils/search';
import { getLevelName, getSubjectName } from '../utils/tutors';
import { brandButton } from '../utils/buttonStyles';
import { weekDays, timesOfDay } from '../data/schedule';

export function SearchPage() {
  const { filters, results, update, clear, activeCount, total } = useSearchFilters();
  const [keyword, setKeyword] = useState(filters.q);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => setKeyword(filters.q), [filters.q]);

  const chips: {key: string;label: string;remove: () => void;}[] = [
  ...filters.subjects.map((s) => ({ key: `s-${s}`, label: getSubjectName(s), remove: () => update({ subjects: filters.subjects.filter((x) => x !== s) }) })),
  ...filters.levels.map((l) => ({ key: `l-${l}`, label: getLevelName(l), remove: () => update({ levels: filters.levels.filter((x) => x !== l) }) })),
  ...(filters.minPrice !== null || filters.maxPrice !== null ?
  [{ key: 'price', label: `$${filters.minPrice ?? 0} – ${filters.maxPrice !== null ? `$${filters.maxPrice}` : 'any'}/hr`, remove: () => update({ minPrice: null, maxPrice: null }) }] :
  []),
  ...filters.days.map((d) => ({ key: `d-${d}`, label: weekDays.find((w) => w.key === d)?.long ?? d, remove: () => update({ days: filters.days.filter((x) => x !== d) }) })),
  ...filters.times.map((t) => ({ key: `t-${t}`, label: timesOfDay.find((w) => w.key === t)?.label ?? t, remove: () => update({ times: filters.times.filter((x) => x !== t) }) })),
  ...filters.languages.map((lang) => ({ key: `g-${lang}`, label: lang, remove: () => update({ languages: filters.languages.filter((x) => x !== lang) }) })),
  ...(filters.minRating ? [{ key: 'rating', label: `${filters.minRating}+ stars`, remove: () => update({ minRating: 0 }) }] : [])];


  return (
    <div className="bg-white">
      <div className="border-b border-ink-200 bg-primary-50">
        <div className="mx-auto max-w-page px-4 py-8 sm:px-6">
          <h1 className="text-2xl font-semibold tracking-tight text-ink-900 sm:text-3xl">
            {filters.q ? `Tutors for "${filters.q}"` : 'Find your tutor'}
          </h1>
          <form
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
              update({ q: keyword.trim() });
            }}
            className="mt-4 flex max-w-2xl gap-2">
            
            <label htmlFor="search-keyword" className="sr-only">Keyword</label>
            <div className="relative flex-1">
              <SearchIcon size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" aria-hidden="true" />
              <input
                id="search-keyword"
                type="search"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Try “AP Chemistry”, “IELTS” or “Scratch”"
                className="h-12 w-full rounded-xl border border-ink-200 bg-white pl-11 pr-4 text-ink-900 placeholder:text-ink-400 focus:border-primary-400 focus:outline-none focus:ring-4 focus:ring-primary-100" />
              
            </div>
            <Button type="submit" size="large" className={brandButton.primary}>Search</Button>
          </form>
        </div>
      </div>

      <div className="mx-auto grid max-w-page gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:block" aria-label="Filters">
          <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-2">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-semibold text-ink-900">Filters</h2>
              {activeCount > 0 &&
              <button type="button" onClick={clear} className="text-sm font-medium text-primary-700 hover:text-primary-800">
                  Clear all
                </button>
              }
            </div>
            <SearchFilters filters={filters} onChange={update} />
          </div>
        </aside>

        <section aria-labelledby="results-heading">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p id="results-heading" className="text-sm text-ink-600" aria-live="polite">
              <span className="font-semibold text-ink-900">{results.length}</span> of {total} tutors
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                className="inline-flex h-10 items-center gap-2 rounded-xl border border-ink-200 px-3 text-sm font-medium text-ink-800 hover:bg-ink-50 lg:hidden">
                
                <SlidersHorizontalIcon size={16} aria-hidden="true" />
                Filters{activeCount > 0 && ` (${activeCount})`}
              </button>
              <div className="w-48">
                <Select
                  key={filters.sort}
                  value={filters.sort}
                  options={sortOptions}
                  onChange={(v) => update({ sort: v as typeof filters.sort })}
                  placeholder="Sort by" />
                
              </div>
            </div>
          </div>

          {chips.length > 0 &&
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Active filters">
              {chips.map((c) =>
            <li key={c.key}>
                  <button
                type="button"
                onClick={c.remove}
                className="inline-flex items-center gap-1 rounded-full bg-primary-50 px-3 py-1 text-sm font-medium text-primary-800 hover:bg-primary-100"
                aria-label={`Remove filter ${c.label}`}>
                
                    {c.label} <XIcon size={14} aria-hidden="true" />
                  </button>
                </li>
            )}
            </ul>
          }

          <div className="mt-6">
            {results.length === 0 ?
            <EmptyState
              icon={SearchXIcon}
              title="No tutors match your search"
              description="Try removing a filter or searching a broader keyword like “math” or “Spanish”."
              action={
              <Button
                className={brandButton.primary}
                onClick={() =>
                update({
                  q: '',
                  subjects: [],
                  levels: [],
                  minPrice: null,
                  maxPrice: null,
                  days: [],
                  times: [],
                  languages: [],
                  minRating: 0
                })
                }>
                
                    Clear search & filters
                  </Button>
              } /> :


            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {results.map((t) =>
              <TutorCard key={t.id} tutor={t} />
              )}
              </div>
            }
          </div>
        </section>
      </div>

      <Drawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} position="left" size="md">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-ink-200 p-5">
            <h2 className="text-lg font-semibold text-ink-900">Filters</h2>
            {activeCount > 0 &&
            <button type="button" onClick={clear} className="mr-10 text-sm font-medium text-primary-700">
                Clear all
              </button>
            }
          </div>
          <div className="flex-1 overflow-y-auto p-5">
            <SearchFilters filters={filters} onChange={update} />
          </div>
          <div className="border-t border-ink-200 p-4">
            <Button className={`w-full ${brandButton.primary}`} size="large" onClick={() => setDrawerOpen(false)}>
              Show {results.length} tutors
            </Button>
          </div>
        </div>
      </Drawer>
    </div>);

}
import React from 'react';
import { SlidersHorizontalIcon } from 'lucide-react';
import { Select } from '../Select';
import { sports } from '../../data/sports';
import { SortOption, SportId } from '../../types/marketplace';

interface FilterBarProps {
  selectedSports: SportId[];
  onToggleSport: (id: SportId) => void;
  onClearSports: () => void;
  advancedCount: number;
  panelOpen: boolean;
  onTogglePanel: () => void;
  sort: SortOption;
  onSort: (sort: SortOption) => void;
}

const sortOptions = [
{ value: 'recommended', label: 'Recommended' },
{ value: 'price-asc', label: 'Price: low to high' },
{ value: 'price-desc', label: 'Price: high to low' },
{ value: 'rating', label: 'Top rated' }];


export function FilterBar({ selectedSports, onToggleSport, onClearSports, advancedCount, panelOpen, onTogglePanel, sort, onSort }: FilterBarProps) {
  return (
    <div className="sticky top-16 z-30 border-b border-slate-200 bg-white">
      <div className="flex items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <div className="-my-1 flex min-w-0 flex-1 gap-2 overflow-x-auto py-1" role="group" aria-label="Filter by sport">
          <button type="button" onClick={onClearSports} aria-pressed={selectedSports.length === 0} className={`chip ${selectedSports.length === 0 ? 'chip-active' : ''}`}>
            All sports
          </button>
          {sports.map((s) => {
            const active = selectedSports.includes(s.id);
            return (
              <button key={s.id} type="button" onClick={() => onToggleSport(s.id)} aria-pressed={active} className={`chip ${active ? 'chip-active' : ''}`}>
                {s.label}
              </button>);

          })}
        </div>
        <button
          type="button"
          onClick={onTogglePanel}
          aria-expanded={panelOpen}
          aria-controls="search-filter-panel"
          className={`chip ${panelOpen || advancedCount ? 'border-brand text-brand' : ''}`}>
          
          <SlidersHorizontalIcon size={15} aria-hidden="true" />
          Filters
          {advancedCount > 0 && <span className="grid h-5 min-w-[20px] place-items-center rounded-full bg-brand px-1 text-[11px] font-bold text-white">{advancedCount}</span>}
        </button>
        <div className="hidden w-48 shrink-0 md:block">
          <Select options={sortOptions} value={sort} onChange={(v) => onSort(v as SortOption)} placeholder="Sort" />
        </div>
      </div>
    </div>);

}
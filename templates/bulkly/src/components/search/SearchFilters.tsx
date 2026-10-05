import React from 'react';
import { FilterGroup } from './FilterGroup';
import { Checkbox } from '../Checkbox';
import { categories, productValues } from '../../data/categories';
import type { ProductFilters } from '../../hooks/useProductSearch';
import type { CategoryId, ProductValue } from '../../types/marketplace';
import { getCategoryCount } from '../../utils/catalog';

interface SearchFiltersProps {
  category: CategoryId | null;
  onCategoryChange: (id: CategoryId | null) => void;
  filters: ProductFilters;
  onFiltersChange: React.Dispatch<React.SetStateAction<ProductFilters>>;
  madeInOptions: string[];
}

const marginOptions = [
{ value: 0, label: 'Any margin' },
{ value: 45, label: '45% or more' },
{ value: 50, label: '50% or more' },
{ value: 55, label: '55% or more' }];


const minOrderOptions = [
{ value: 0, label: 'Any minimum' },
{ value: 1, label: '1 case' },
{ value: 2, label: 'Up to 2 cases' }];


function OptionRadio({
  name,
  checked,
  onChange,
  children,
  count






}: {name: string;checked: boolean;onChange: () => void;children: React.ReactNode;count?: number;}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-2 rounded-md px-2 py-1.5 text-sm text-slate-700 hover:bg-slate-50">
      <span className="flex items-center gap-2.5">
        <input type="radio" name={name} checked={checked} onChange={onChange} className="h-4 w-4 accent-primary-700" />
        <span className={checked ? 'font-medium text-slate-900' : ''}>{children}</span>
      </span>
      {count !== undefined && <span className="text-xs tabular-nums text-slate-400">{count}</span>}
    </label>);

}

export function SearchFilters({ category, onCategoryChange, filters, onFiltersChange, madeInOptions }: SearchFiltersProps) {
  const toggleValue = (v: ProductValue) =>
  onFiltersChange((f) => ({ ...f, values: f.values.includes(v) ? f.values.filter((x) => x !== v) : [...f.values, v] }));
  const toggleMadeIn = (m: string) =>
  onFiltersChange((f) => ({ ...f, madeIn: f.madeIn.includes(m) ? f.madeIn.filter((x) => x !== m) : [...f.madeIn, m] }));

  return (
    <div>
      <FilterGroup title="Category">
        <div className="-mx-2 space-y-0.5">
          <OptionRadio name="category" checked={category === null} onChange={() => onCategoryChange(null)}>
            All categories
          </OptionRadio>
          {categories.map((c) =>
          <OptionRadio key={c.id} name="category" checked={category === c.id} onChange={() => onCategoryChange(c.id)} count={getCategoryCount(c.id)}>
              {c.name}
            </OptionRadio>
          )}
        </div>
      </FilterGroup>

      <FilterGroup title="Wholesale price (per unit)">
        <div className="flex items-center gap-2">
          {(['priceMin', 'priceMax'] as const).map((key, i) =>
          <React.Fragment key={key}>
              {i === 1 && <span className="text-slate-400">–</span>}
              <div className="relative flex-1">
                <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-sm text-slate-400">$</span>
                <input
                type="number"
                min={0}
                inputMode="decimal"
                value={filters[key]}
                onChange={(e) => onFiltersChange((f) => ({ ...f, [key]: e.target.value }))}
                placeholder={i === 0 ? 'Min' : 'Max'}
                aria-label={i === 0 ? 'Minimum wholesale price' : 'Maximum wholesale price'}
                className="h-9 w-full rounded-lg border border-slate-300 bg-white pl-6 pr-2 text-sm tabular-nums focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20" />
              
              </div>
            </React.Fragment>
          )}
        </div>
      </FilterGroup>

      <FilterGroup title="MSRP margin">
        <div className="-mx-2 space-y-0.5">
          {marginOptions.map((o) =>
          <OptionRadio key={o.value} name="margin" checked={filters.minMargin === o.value} onChange={() => onFiltersChange((f) => ({ ...f, minMargin: o.value }))}>
              {o.label}
            </OptionRadio>
          )}
        </div>
      </FilterGroup>

      <FilterGroup title="Minimum order">
        <div className="-mx-2 space-y-0.5">
          {minOrderOptions.map((o) =>
          <OptionRadio key={o.value} name="moq" checked={filters.maxMinOrder === o.value} onChange={() => onFiltersChange((f) => ({ ...f, maxMinOrder: o.value }))}>
              {o.label}
            </OptionRadio>
          )}
        </div>
        <div className="mt-3">
          <Checkbox
            label="In stock only"
            size="sm"
            checked={filters.inStockOnly}
            onChange={(e) => onFiltersChange((f) => ({ ...f, inStockOnly: e.target.checked }))} />
          
        </div>
      </FilterGroup>

      <FilterGroup title="Made in">
        <div className="space-y-2">
          {madeInOptions.map((m) =>
          <Checkbox key={m} label={m} size="sm" checked={filters.madeIn.includes(m)} onChange={() => toggleMadeIn(m)} />
          )}
        </div>
      </FilterGroup>

      <FilterGroup title="Values">
        <div className="space-y-2">
          {productValues.map((v) =>
          <Checkbox key={v.id} label={v.label} size="sm" checked={filters.values.includes(v.id)} onChange={() => toggleValue(v.id)} />
          )}
        </div>
      </FilterGroup>
    </div>);

}
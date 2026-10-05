import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products } from '../data/products';
import type { CategoryId, Product, ProductValue } from '../types/marketplace';
import { getBrand, getCategory } from '../utils/catalog';
import { getBaseUnitPrice, getProductMargin } from '../utils/pricing';

export type SortOption = 'relevance' | 'newest' | 'price-asc' | 'price-desc' | 'margin-desc';

export interface ProductFilters {
  priceMin: string;
  priceMax: string;
  minMargin: number;
  maxMinOrder: number;
  madeIn: string[];
  values: ProductValue[];
  inStockOnly: boolean;
}

export const emptyFilters: ProductFilters = {
  priceMin: '',
  priceMax: '',
  minMargin: 0,
  maxMinOrder: 0,
  madeIn: [],
  values: [],
  inStockOnly: false
};

export interface FilterChip {
  key: string;
  label: string;
  onRemove: () => void;
}

function matchesQuery(product: Product, q: string): boolean {
  if (!q) return true;
  const haystack = [
  product.title,
  product.description,
  product.unitDescription,
  getBrand(product.brandId)?.name ?? '',
  getCategory(product.categoryId)?.name ?? ''].

  join(' ').
  toLowerCase();
  return q.
  toLowerCase().
  split(/\s+/).
  filter(Boolean).
  every((term) => haystack.includes(term.replace(/s$/, '')));
}

export function useProductSearch() {
  const [params, setParams] = useSearchParams();
  const query = params.get('q') ?? '';
  const category = params.get('category') as CategoryId | null ?? null;
  const sort = params.get('sort') as SortOption | null ?? 'relevance';
  const [filters, setFilters] = useState<ProductFilters>(emptyFilters);

  const updateParam = (key: string, value: string | null) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);else
    next.delete(key);
    setParams(next, { replace: true });
  };

  const madeInOptions = useMemo(() => Array.from(new Set(products.map((p) => p.madeIn))).sort(), []);

  const results = useMemo(() => {
    const min = parseFloat(filters.priceMin);
    const max = parseFloat(filters.priceMax);
    const filtered = products.filter((p) => {
      const price = getBaseUnitPrice(p);
      if (!matchesQuery(p, query)) return false;
      if (category && p.categoryId !== category) return false;
      if (!Number.isNaN(min) && price < min) return false;
      if (!Number.isNaN(max) && price > max) return false;
      if (filters.minMargin && getProductMargin(p) < filters.minMargin) return false;
      if (filters.maxMinOrder && p.minOrderCases > filters.maxMinOrder) return false;
      if (filters.madeIn.length && !filters.madeIn.includes(p.madeIn)) return false;
      if (filters.values.length && !filters.values.every((v) => p.values.includes(v))) return false;
      if (filters.inStockOnly && p.stockCases === 0) return false;
      return true;
    });
    const sorted = [...filtered];
    switch (sort) {
      case 'newest':
        sorted.sort((a, b) => b.listedAt.localeCompare(a.listedAt));
        break;
      case 'price-asc':
        sorted.sort((a, b) => getBaseUnitPrice(a) - getBaseUnitPrice(b));
        break;
      case 'price-desc':
        sorted.sort((a, b) => getBaseUnitPrice(b) - getBaseUnitPrice(a));
        break;
      case 'margin-desc':
        sorted.sort((a, b) => getProductMargin(b) - getProductMargin(a));
        break;
      default:
        sorted.sort((a, b) => b.reviewCount * b.rating - a.reviewCount * a.rating);
    }
    return sorted;
  }, [query, category, sort, filters]);

  const chips: FilterChip[] = [];
  if (query) chips.push({ key: 'q', label: `“${query}”`, onRemove: () => updateParam('q', null) });
  if (category)
  chips.push({ key: 'cat', label: getCategory(category)?.name ?? category, onRemove: () => updateParam('category', null) });
  if (filters.priceMin || filters.priceMax)
  chips.push({
    key: 'price',
    label: `$${filters.priceMin || '0'} – ${filters.priceMax ? `$${filters.priceMax}` : 'any'}`,
    onRemove: () => setFilters((f) => ({ ...f, priceMin: '', priceMax: '' }))
  });
  if (filters.minMargin)
  chips.push({ key: 'margin', label: `${filters.minMargin}%+ margin`, onRemove: () => setFilters((f) => ({ ...f, minMargin: 0 })) });
  if (filters.maxMinOrder)
  chips.push({
    key: 'moq',
    label: `Min ≤ ${filters.maxMinOrder} case${filters.maxMinOrder > 1 ? 's' : ''}`,
    onRemove: () => setFilters((f) => ({ ...f, maxMinOrder: 0 }))
  });
  filters.madeIn.forEach((m) =>
  chips.push({ key: `m-${m}`, label: `Made in ${m}`, onRemove: () => setFilters((f) => ({ ...f, madeIn: f.madeIn.filter((x) => x !== m) })) })
  );
  filters.values.forEach((v) =>
  chips.push({
    key: `v-${v}`,
    label: v === 'women-owned' ? 'Women-owned' : v[0].toUpperCase() + v.slice(1),
    onRemove: () => setFilters((f) => ({ ...f, values: f.values.filter((x) => x !== v) }))
  })
  );
  if (filters.inStockOnly) chips.push({ key: 'stock', label: 'In stock', onRemove: () => setFilters((f) => ({ ...f, inStockOnly: false })) });

  const clearAll = () => {
    setFilters(emptyFilters);
    const next = new URLSearchParams();
    if (sort !== 'relevance') next.set('sort', sort);
    setParams(next, { replace: true });
  };

  return {
    query,
    category,
    sort,
    filters,
    setFilters,
    setCategory: (id: CategoryId | null) => updateParam('category', id),
    setSort: (s: SortOption) => updateParam('sort', s === 'relevance' ? null : s),
    results,
    chips,
    clearAll,
    madeInOptions
  };
}
import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useListings } from '../contexts/ListingsContext';
import { categories } from '../data/categories';
import type { Listing } from '../types/marketplace';

export interface SearchFilters {
  q: string;
  categories: string[];
  minPrice: number | null;
  maxPrice: number | null;
  materials: string[];
  colors: string[];
  madeToOrder: boolean;
  shipsFrom: string[];
  pickup: boolean;
  sort: string;
}

type ListKey = 'categories' | 'materials' | 'colors' | 'shipsFrom';
const LIST_PARAM: Record<ListKey, string> = {
  categories: 'category',
  materials: 'materials',
  colors: 'colors',
  shipsFrom: 'shipsFrom'
};

const splitParam = (v: string | null) => v ? v.split(',').filter(Boolean) : [];
const numParam = (v: string | null) => v && !Number.isNaN(Number(v)) ? Number(v) : null;

export function useSearchFilters() {
  const [params, setParams] = useSearchParams();
  const { listings, getMaker } = useListings();

  const filters: SearchFilters = useMemo(
    () => ({
      q: params.get('q') ?? '',
      categories: splitParam(params.get('category')),
      minPrice: numParam(params.get('minPrice')),
      maxPrice: numParam(params.get('maxPrice')),
      materials: splitParam(params.get('materials')),
      colors: splitParam(params.get('colors')),
      madeToOrder: params.get('madeToOrder') === '1',
      shipsFrom: splitParam(params.get('shipsFrom')),
      pickup: params.get('pickup') === '1',
      sort: params.get('sort') ?? 'relevance'
    }),
    [params]
  );

  const update = useCallback(
    (mutate: (p: URLSearchParams) => void) => {
      const next = new URLSearchParams(params);
      mutate(next);
      setParams(next, { replace: true });
    },
    [params, setParams]
  );

  const toggleInList = useCallback(
    (key: ListKey, value: string) =>
    update((p) => {
      const current = splitParam(p.get(LIST_PARAM[key]));
      const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
      if (next.length) p.set(LIST_PARAM[key], next.join(','));else
      p.delete(LIST_PARAM[key]);
    }),
    [update]
  );

  const setParam = useCallback(
    (key: string, value: string | null) =>
    update((p) => {
      if (value === null || value === '') p.delete(key);else
      p.set(key, value);
    }),
    [update]
  );

  const setPriceRange = useCallback(
    (min: number | null, max: number | null) =>
    update((p) => {
      if (min === null) p.delete('minPrice');else
      p.set('minPrice', String(min));
      if (max === null) p.delete('maxPrice');else
      p.set('maxPrice', String(max));
    }),
    [update]
  );

  const clearAll = useCallback(() => {
    const next = new URLSearchParams();
    if (filters.q) next.set('q', filters.q);
    setParams(next, { replace: true });
  }, [filters.q, setParams]);

  const results = useMemo(() => {
    const q = filters.q.trim().toLowerCase();
    const matches = (l: Listing) => {
      if (q) {
        const maker = getMaker(l.makerId);
        const hay = [l.title, l.description, l.categoryId, ...l.materials, ...l.colors, maker?.shopName ?? '', maker?.location ?? ''].
        join(' ').
        toLowerCase();
        if (!q.split(/\s+/).every((word) => hay.includes(word))) return false;
      }
      if (filters.categories.length && !filters.categories.includes(l.categoryId)) return false;
      if (filters.minPrice !== null && l.price < filters.minPrice) return false;
      if (filters.maxPrice !== null && l.price > filters.maxPrice) return false;
      if (filters.materials.length && !filters.materials.some((m) => l.materials.includes(m))) return false;
      if (filters.colors.length && !filters.colors.some((c) => l.colors.includes(c))) return false;
      if (filters.madeToOrder && !l.madeToOrder) return false;
      if (filters.shipsFrom.length && !filters.shipsFrom.includes(l.shipsFrom)) return false;
      if (filters.pickup && !l.localPickup) return false;
      return true;
    };
    const list = listings.filter(matches);
    switch (filters.sort) {
      case 'newest':
        return list.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      case 'price-asc':
        return list.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return list.sort((a, b) => b.price - a.price);
      case 'rating':
        return list.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
      default:
        return list;
    }
  }, [listings, filters, getMaker]);

  const activeChips = useMemo(() => {
    const chips: {label: string;onRemove: () => void;}[] = [];
    filters.categories.forEach((c) =>
    chips.push({ label: categories.find((x) => x.id === c)?.name ?? c, onRemove: () => toggleInList('categories', c) })
    );
    if (filters.minPrice !== null || filters.maxPrice !== null) {
      const label =
      filters.minPrice !== null && filters.maxPrice !== null ?
      `$${filters.minPrice}–$${filters.maxPrice}` :
      filters.maxPrice !== null ?
      `Under $${filters.maxPrice}` :
      `$${filters.minPrice}+`;
      chips.push({ label, onRemove: () => setPriceRange(null, null) });
    }
    filters.materials.forEach((m) => chips.push({ label: m, onRemove: () => toggleInList('materials', m) }));
    filters.colors.forEach((c) => chips.push({ label: c, onRemove: () => toggleInList('colors', c) }));
    if (filters.madeToOrder) chips.push({ label: 'Made to order', onRemove: () => setParam('madeToOrder', null) });
    filters.shipsFrom.forEach((s) => chips.push({ label: `Ships from ${s}`, onRemove: () => toggleInList('shipsFrom', s) }));
    if (filters.pickup) chips.push({ label: 'Local pickup', onRemove: () => setParam('pickup', null) });
    return chips;
  }, [filters, toggleInList, setPriceRange, setParam]);

  return { filters, results, toggleInList, setParam, setPriceRange, clearAll, activeChips };
}
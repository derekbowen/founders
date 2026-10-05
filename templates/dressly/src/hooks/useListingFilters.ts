import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { listings } from '../data/listings';
import type { Listing } from '../types/marketplace';

export type ListKey = 'size' | 'designer' | 'occasion' | 'color' | 'length' | 'delivery';

export interface Filters {
  q: string;
  size: string[];
  designer: string[];
  occasion: string[];
  color: string[];
  length: string[];
  delivery: string[];
  min: number | null;
  max: number | null;
  sort: string;
}

const listKeys: ListKey[] = ['size', 'designer', 'occasion', 'color', 'length', 'delivery'];

function matches(l: Listing, f: Filters): boolean {
  if (f.q) {
    const hay = `${l.title} ${l.designer} ${l.color} ${l.occasions.join(' ')} ${l.length}`.toLowerCase();
    const terms = f.q.toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.every((t) => hay.includes(t.replace(/-/g, ' ')) || hay.includes(t))) return false;
  }
  if (f.size.length && !f.size.includes(String(l.size))) return false;
  if (f.designer.length && !f.designer.includes(l.designer)) return false;
  if (f.occasion.length && !l.occasions.some((o) => f.occasion.includes(o))) return false;
  if (f.color.length && !f.color.includes(l.color)) return false;
  if (f.length.length && !f.length.includes(l.length)) return false;
  if (f.delivery.length && !l.delivery.some((d) => f.delivery.includes(d))) return false;
  if (f.min !== null && l.price4 < f.min) return false;
  if (f.max !== null && l.price4 > f.max) return false;
  return true;
}

function sortListings(items: Listing[], sort: string): Listing[] {
  const copy = [...items];
  switch (sort) {
    case 'newest':
      return copy.sort((a, b) => Number(b.isNew) - Number(a.isNew));
    case 'price-asc':
      return copy.sort((a, b) => a.price4 - b.price4);
    case 'price-desc':
      return copy.sort((a, b) => b.price4 - a.price4);
    case 'rating':
      return copy.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
    default:
      return copy.sort((a, b) => b.reviewCount * b.rating - a.reviewCount * a.rating);
  }
}

export function useListingFilters() {
  const [params, setParams] = useSearchParams();

  const filters: Filters = useMemo(() => {
    const list = (k: string) => params.get(k)?.split(',').filter(Boolean) ?? [];
    const num = (k: string) => {
      const v = params.get(k);
      return v === null || v === '' ? null : Number(v);
    };
    return {
      q: params.get('q') ?? '',
      size: list('size'),
      designer: list('designer'),
      occasion: list('occasion'),
      color: list('color'),
      length: list('length'),
      delivery: list('delivery'),
      min: num('min'),
      max: num('max'),
      sort: params.get('sort') ?? 'recommended'
    };
  }, [params]);

  const update = useCallback(
    (mutate: (p: URLSearchParams) => void) => {
      const next = new URLSearchParams(params);
      mutate(next);
      setParams(next, { replace: true });
    },
    [params, setParams]
  );

  const toggle = useCallback(
    (key: ListKey, value: string) =>
    update((p) => {
      const current = p.get(key)?.split(',').filter(Boolean) ?? [];
      const next = current.includes(value) ?
      current.filter((v) => v !== value) :
      [...current, value];
      if (next.length) p.set(key, next.join(','));else
      p.delete(key);
    }),
    [update]
  );

  const setPrice = useCallback(
    (min: number | null, max: number | null) =>
    update((p) => {
      if (min === null) p.delete('min');else
      p.set('min', String(min));
      if (max === null) p.delete('max');else
      p.set('max', String(max));
    }),
    [update]
  );

  const setSort = useCallback((sort: string) => update((p) => p.set('sort', sort)), [update]);

  const clearQuery = useCallback(() => update((p) => p.delete('q')), [update]);

  const clearAll = useCallback(
    () =>
    update((p) => {
      ;[...listKeys, 'min', 'max', 'q'].forEach((k) => p.delete(k));
    }),
    [update]
  );

  const results = useMemo(
    () => sortListings(listings.filter((l) => matches(l, filters)), filters.sort),
    [filters]
  );

  const activeCount =
  listKeys.reduce((n, k) => n + filters[k].length, 0) + (
  filters.min !== null || filters.max !== null ? 1 : 0);

  return { filters, results, toggle, setPrice, setSort, clearAll, clearQuery, activeCount };
}

export type ListingFiltersApi = ReturnType<typeof useListingFilters>;
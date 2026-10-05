import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { cities, segments } from '../data/catalog';
import { listings } from '../data/listings';
import type { City, SearchFiltersState, SegmentKey, SortKey } from '../types/marketplace';
import { countActiveFilters, defaultFilters, filterListings, sortListings } from '../utils/search';

const parseCity = (v: string | null): City | 'all' =>
v && (cities as string[]).includes(v) ? v as City : 'all';
const parseUse = (v: string | null): SegmentKey | 'all' =>
v && segments.some((s) => s.key === v) ? v as SegmentKey : 'all';

export function useSearchFilters() {
  const [params, setParams] = useSearchParams();
  const [filters, setFilters] = useState<SearchFiltersState>(() => ({
    ...defaultFilters,
    city: parseCity(params.get('city')),
    query: params.get('q') ?? '',
    use: parseUse(params.get('use'))
  }));
  const [sort, setSort] = useState<SortKey>('relevance');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    setFilters((f) => ({
      ...f,
      city: parseCity(params.get('city')),
      query: params.get('q') ?? '',
      use: parseUse(params.get('use'))
    }));
  }, [params]);

  const update = (patch: Partial<SearchFiltersState>) => {
    const next = { ...filters, ...patch };
    setFilters(next);
    if ('city' in patch || 'query' in patch || 'use' in patch) {
      const p = new URLSearchParams(params);
      const set = (key: string, value: string) => value ? p.set(key, value) : p.delete(key);
      set('city', next.city === 'all' ? '' : next.city);
      set('q', next.query);
      set('use', next.use === 'all' ? '' : next.use);
      setParams(p, { replace: true });
    }
  };

  const reset = () => {
    setFilters({ ...defaultFilters });
    const p = new URLSearchParams();
    const date = params.get('date');
    const hours = params.get('hours');
    if (date) p.set('date', date);
    if (hours) p.set('hours', hours);
    setParams(p, { replace: true });
  };

  const results = useMemo(() => sortListings(filterListings(listings, filters), sort), [filters, sort]);

  const date = params.get('date');
  const hours = params.get('hours');
  const carry = new URLSearchParams();
  if (date) carry.set('date', date);
  if (hours) carry.set('hours', hours);
  const linkSearch = carry.toString() ? `?${carry.toString()}` : '';

  return {
    filters,
    update,
    reset,
    sort,
    setSort,
    results,
    hoveredId,
    setHoveredId,
    activeCount: countActiveFilters(filters),
    date,
    hours,
    linkSearch
  };
}
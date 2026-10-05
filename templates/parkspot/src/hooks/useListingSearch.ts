import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { listings } from '../data/listings';
import {
  countActiveFilters,
  defaultFilters,
  filterListings,
  sortListings,
  type SearchFilters,
  type SortOption } from
'../utils/listings';
import { defaultArriveLeave } from '../utils/format';
import type { UseCase } from '../types/listing';

export function useListingSearch() {
  const [params, setParams] = useSearchParams();
  const address = params.get('address') ?? '';
  const fallback = useMemo(() => defaultArriveLeave(), []);
  const arrive = params.get('arrive') ?? fallback.arrive;
  const leave = params.get('leave') ?? fallback.leave;
  const useCaseParam = params.get('useCase') as UseCase | null ?? 'all';

  const [filters, setFilters] = useState<SearchFilters>({ ...defaultFilters, useCase: useCaseParam });
  const [sort, setSort] = useState<SortOption>('recommended');
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filterVersion, setFilterVersion] = useState(0);

  useEffect(() => {
    setFilters((f) => ({ ...f, useCase: useCaseParam }));
  }, [useCaseParam]);

  const { results, addressFallback } = useMemo(() => {
    const matched = filterListings(listings, filters, address);
    if (address && matched.length === 0) {
      const all = filterListings(listings, filters, '');
      if (all.length > 0) return { results: sortListings(all, sort), addressFallback: true };
    }
    return { results: sortListings(matched, sort), addressFallback: false };
  }, [filters, address, sort]);

  const updateFilter = <K extends keyof SearchFilters,>(key: K, value: SearchFilters[K]) => {
    setFilters((f) => ({ ...f, [key]: value }));
    if (key === 'useCase') {
      const next = new URLSearchParams(params);
      if (value === 'all') next.delete('useCase');else
      next.set('useCase', String(value));
      setParams(next, { replace: true });
    }
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
    setFilterVersion((v) => v + 1);
    const next = new URLSearchParams(params);
    next.delete('useCase');
    next.delete('address');
    setParams(next, { replace: true });
  };

  const setWhen = (nextArrive: string, nextLeave: string) => {
    const next = new URLSearchParams(params);
    next.set('arrive', nextArrive);
    next.set('leave', nextLeave);
    setParams(next, { replace: true });
  };

  const carry = new URLSearchParams({ arrive, leave }).toString();

  return {
    address,
    arrive,
    leave,
    filters,
    sort,
    setSort,
    results,
    addressFallback,
    activeId,
    setActiveId,
    selectedId,
    setSelectedId,
    updateFilter,
    resetFilters,
    setWhen,
    carry,
    filterVersion,
    activeCount: countActiveFilters(filters)
  };
}
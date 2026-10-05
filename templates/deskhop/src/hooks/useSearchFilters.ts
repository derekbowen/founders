import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { listings } from '../data/listings';
import {
  countActiveFilters,
  filterListings,
  parseFilters,
  serializeFilters,
  type SearchFilters } from
'../utils/search';

export function useSearchFilters() {
  const [params, setParams] = useSearchParams();
  const filters = useMemo(() => parseFilters(params), [params]);
  const results = useMemo(() => filterListings(listings, filters), [filters]);

  function update(patch: Partial<SearchFilters>) {
    setParams(serializeFilters({ ...filters, ...patch }), { replace: true });
  }

  function resetFilters() {
    update({ types: [], amenities: [], min: null, max: null, people: 1 });
  }

  function clearAll() {
    setParams(new URLSearchParams(), { replace: true });
  }

  return {
    filters,
    results,
    update,
    resetFilters,
    clearAll,
    activeCount: countActiveFilters(filters)
  };
}
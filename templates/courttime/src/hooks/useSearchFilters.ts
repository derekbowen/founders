import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { listings } from '../data/listings';
import { SearchFilters, SortOption, SportId } from '../types/marketplace';
import { countAdvancedFilters, defaultFilters, filterListings, filtersFromParams, getSurfaceOptions, sortListings } from '../utils/search';

export function useSearchFilters() {
  const [params] = useSearchParams();
  const paramKey = params.toString();
  const [filters, setFilters] = useState<SearchFilters>(() => filtersFromParams(params));
  const [sort, setSort] = useState<SortOption>('recommended');

  useEffect(() => {
    setFilters(filtersFromParams(new URLSearchParams(paramKey)));
  }, [paramKey]);

  const results = useMemo(() => sortListings(filterListings(listings, filters), sort), [filters, sort]);
  const surfaces = useMemo(() => getSurfaceOptions(listings), []);

  const update = (patch: Partial<SearchFilters>) => setFilters((prev) => ({ ...prev, ...patch }));
  const toggleSport = (id: SportId) =>
  setFilters((prev) => ({
    ...prev,
    sports: prev.sports.includes(id) ? prev.sports.filter((s) => s !== id) : [...prev.sports, id]
  }));
  const resetAdvanced = () =>
  setFilters((prev) => {
    const base = defaultFilters();
    return { ...base, sports: prev.sports, query: prev.query, dateKey: prev.dateKey };
  });
  const resetAll = () => setFilters(defaultFilters());

  return {
    filters,
    update,
    toggleSport,
    resetAdvanced,
    resetAll,
    sort,
    setSort,
    results,
    surfaces,
    advancedCount: countAdvancedFilters(filters)
  };
}
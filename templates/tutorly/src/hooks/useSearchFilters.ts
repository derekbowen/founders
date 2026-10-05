import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { tutors } from '../data/tutors';
import { countActiveFilters, filterTutors, filtersToParams, parseFilters } from '../utils/search';
import type { SearchFilters } from '../utils/search';

export function toggleValue<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

export function useSearchFilters() {
  const [params, setParams] = useSearchParams();
  const filters = useMemo(() => parseFilters(params), [params]);
  const results = useMemo(() => filterTutors(tutors, filters), [filters]);

  const update = useCallback(
    (patch: Partial<SearchFilters>) => setParams(filtersToParams({ ...filters, ...patch }), { replace: true }),
    [filters, setParams]
  );

  const clear = useCallback(
    () =>
    setParams(
      filtersToParams({
        q: filters.q,
        sort: filters.sort,
        subjects: [],
        levels: [],
        minPrice: null,
        maxPrice: null,
        days: [],
        times: [],
        languages: [],
        minRating: 0
      }),
      { replace: true }
    ),
    [filters.q, filters.sort, setParams]
  );

  return { filters, results, update, clear, activeCount: countActiveFilters(filters), total: tutors.length };
}
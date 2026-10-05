import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { filtersToParams, parseFilters, PRICE_CEILING, type SearchFilters } from '../utils/search';

export function useSearchFilters() {
  const [params, setParams] = useSearchParams();
  const filters = useMemo(() => parseFilters(params), [params]);

  const update = useCallback(
    (patch: Partial<SearchFilters>) => {
      setParams(filtersToParams({ ...filters, ...patch }), { replace: true });
    },
    [filters, setParams]
  );

  const reset = useCallback(() => {
    update({
      categories: [],
      durations: [],
      timesOfDay: [],
      groupSizes: [],
      languages: [],
      accessible: false,
      priceMax: PRICE_CEILING
    });
  }, [update]);

  return { filters, update, reset };
}

export function toggleValue<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}
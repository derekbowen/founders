import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { sitters } from '../data/sitters';
import { priceBounds } from '../data/filterOptions';
import { SearchFilters, SortKey } from '../types/search';
import { CareTypeId, Sitter } from '../types/sitter';

export const defaultFilters: SearchFilters = {
  priceRange: priceBounds,
  ageGroups: [],
  certifications: [],
  languages: [],
  nonSmoker: false,
  hasCar: false,
  availableTonight: false
};

function matchesLocation(s: Sitter, raw: string): boolean {
  const q = raw.trim().toLowerCase();
  if (!q || q.includes('austin') || /^787\d{2}$/.test(q)) return true;
  const hood = s.neighborhood.toLowerCase();
  return hood.includes(q) || q.includes(hood);
}

export function useSitterSearch() {
  const [params, setParams] = useSearchParams();
  const location = params.get('location') ?? '';
  const care = params.get('care') as CareTypeId | null ?? null;
  const tonightParam = params.get('tonight') === '1';

  const [filters, setFilters] = useState<SearchFilters>({ ...defaultFilters, availableTonight: tonightParam });
  const [sort, setSort] = useState<SortKey>('recommended');
  const [resetKey, setResetKey] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setFilters((f) => ({ ...f, availableTonight: tonightParam }));
  }, [tonightParam]);

  const results = useMemo(() => {
    const filtered = sitters.filter((s) => {
      if (!matchesLocation(s, location)) return false;
      if (care && !s.careTypes.includes(care)) return false;
      if (s.hourlyRate < filters.priceRange[0] || s.hourlyRate > filters.priceRange[1]) return false;
      if (filters.ageGroups.length && !filters.ageGroups.every((a) => s.ageGroups.includes(a))) return false;
      if (filters.certifications.length && !filters.certifications.every((c) => s.certifications.includes(c))) return false;
      if (filters.languages.length && !filters.languages.some((l) => s.languages.includes(l))) return false;
      if (filters.nonSmoker && !s.nonSmoker) return false;
      if (filters.hasCar && !s.hasCar) return false;
      if (filters.availableTonight && !s.availableTonight) return false;
      return true;
    });
    const sorted = [...filtered];
    switch (sort) {
      case 'price-asc':
        return sorted.sort((a, b) => a.hourlyRate - b.hourlyRate);
      case 'price-desc':
        return sorted.sort((a, b) => b.hourlyRate - a.hourlyRate);
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
      case 'experience':
        return sorted.sort((a, b) => b.experienceYears - a.experienceYears);
      default:
        return sorted.sort((a, b) => b.rating * Math.log(b.reviewCount + 1) - a.rating * Math.log(a.reviewCount + 1));
    }
  }, [location, care, filters, sort]);

  // Brief loading state to mimic a network search
  useEffect(() => {
    setIsLoading(true);
    const t = window.setTimeout(() => setIsLoading(false), 350);
    return () => window.clearTimeout(t);
  }, [location, care, filters, sort]);

  const activeFilterCount =
  (filters.priceRange[0] !== priceBounds[0] || filters.priceRange[1] !== priceBounds[1] ? 1 : 0) +
  filters.ageGroups.length +
  filters.certifications.length +
  filters.languages.length +
  [filters.nonSmoker, filters.hasCar, filters.availableTonight].filter(Boolean).length;

  const resetFilters = () => {
    setFilters(defaultFilters);
    setResetKey((k) => k + 1);
  };

  const clearParam = (key: string) => {
    const next = new URLSearchParams(params);
    next.delete(key);
    setParams(next);
  };

  const setLocation = (value: string) => {
    const next = new URLSearchParams(params);
    if (value.trim()) next.set('location', value.trim());else
    next.delete('location');
    setParams(next);
  };

  const bookingSearch = (() => {
    const p = new URLSearchParams();
    ['date', 'start', 'kids'].forEach((k) => {
      const v = params.get(k);
      if (v) p.set(k, v);
    });
    const s = p.toString();
    return s ? `?${s}` : '';
  })();

  return {
    location,
    care,
    params,
    filters,
    setFilters,
    sort,
    setSort,
    results,
    isLoading,
    activeFilterCount,
    resetFilters,
    resetKey,
    clearParam,
    setLocation,
    bookingSearch
  };
}
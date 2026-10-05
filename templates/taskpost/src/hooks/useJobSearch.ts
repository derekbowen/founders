import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { addDays, parseISO } from 'date-fns';
import { categories } from '../data/categories';
import type { CategoryId, Job, SearchFilters, SortOption } from '../types/marketplace';
import { now } from '../utils/time';
import { useApp } from './useApp';

export const BUDGET_FLOOR = 0;
export const BUDGET_CEILING = 600;

export const defaultFilters: SearchFilters = {
  q: '',
  categories: [],
  budgetMin: BUDGET_FLOOR,
  budgetMax: BUDGET_CEILING,
  date: 'any',
  maxDistance: 25,
  sizes: []
};

export const sortOptions: {value: SortOption;label: string;}[] = [
{ value: 'newest', label: 'Newest first' },
{ value: 'date_soon', label: 'Date needed: soonest' },
{ value: 'budget_high', label: 'Budget: high to low' },
{ value: 'budget_low', label: 'Budget: low to high' },
{ value: 'nearest', label: 'Distance: nearest' },
{ value: 'fewest_offers', label: 'Fewest offers' }];


function sortJobs(list: Job[], sort: SortOption): Job[] {
  const sorted = [...list];
  switch (sort) {
    case 'date_soon':
      return sorted.sort((a, b) => a.preferredDate.localeCompare(b.preferredDate));
    case 'budget_high':
      return sorted.sort((a, b) => b.budgetMax - a.budgetMax);
    case 'budget_low':
      return sorted.sort((a, b) => a.budgetMin - b.budgetMin);
    case 'nearest':
      return sorted.sort((a, b) => a.distanceMi - b.distanceMi);
    case 'fewest_offers':
      return sorted.sort((a, b) => a.offerCount - b.offerCount);
    default:
      return sorted.sort((a, b) => b.postedAt.localeCompare(a.postedAt));
  }
}

export function countActiveFilters(f: SearchFilters): number {
  let n = 0;
  if (f.categories.length) n++;
  if (f.budgetMin !== BUDGET_FLOOR || f.budgetMax !== BUDGET_CEILING) n++;
  if (f.date !== 'any') n++;
  if (f.maxDistance !== defaultFilters.maxDistance) n++;
  if (f.sizes.length) n++;
  return n;
}

export function useJobSearch() {
  const { jobs } = useApp();
  const [params] = useSearchParams();
  const initialCategory = params.get('category');
  const [filters, setFilters] = useState<SearchFilters>(() => ({
    ...defaultFilters,
    categories: categories.some((c) => c.id === initialCategory) ? [initialCategory as CategoryId] : []
  }));
  const [sort, setSort] = useState<SortOption>('newest');

  const results = useMemo(() => {
    const q = filters.q.trim().toLowerCase();
    const cutoff = filters.date === 'any' ? null : addDays(now(), Number(filters.date));
    const filtered = jobs.filter((job) => {
      if (job.status !== 'open') return false;
      if (q && !`${job.title} ${job.description} ${job.area}`.toLowerCase().includes(q)) return false;
      if (filters.categories.length && !filters.categories.includes(job.categoryId)) return false;
      if (job.budgetMax < filters.budgetMin || job.budgetMin > filters.budgetMax) return false;
      if (cutoff && parseISO(job.preferredDate) > cutoff) return false;
      if (job.distanceMi > filters.maxDistance) return false;
      if (filters.sizes.length && !filters.sizes.includes(job.size)) return false;
      return true;
    });
    return sortJobs(filtered, sort);
  }, [jobs, filters, sort]);

  function updateFilters(patch: Partial<SearchFilters>) {
    setFilters((prev) => ({ ...prev, ...patch }));
  }

  function resetFilters() {
    setFilters((prev) => ({ ...defaultFilters, q: prev.q }));
  }

  return { filters, updateFilters, resetFilters, sort, setSort, results, activeCount: countActiveFilters(filters) };
}
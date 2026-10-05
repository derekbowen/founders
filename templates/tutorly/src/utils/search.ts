import { subjects, levels } from '../data/subjects';
import { timesOfDay } from '../data/schedule';
import type { DayKey, LevelId, SubjectId, TimeOfDay, Tutor } from '../types/marketplace';

export type SortKey = 'recommended' | 'price-asc' | 'price-desc' | 'rating' | 'reviews';

export interface SearchFilters {
  q: string;
  subjects: SubjectId[];
  levels: LevelId[];
  minPrice: number | null;
  maxPrice: number | null;
  days: DayKey[];
  times: TimeOfDay[];
  languages: string[];
  minRating: number;
  sort: SortKey;
}

export const sortOptions: {value: SortKey;label: string;}[] = [
{ value: 'recommended', label: 'Recommended' },
{ value: 'rating', label: 'Highest rated' },
{ value: 'reviews', label: 'Most reviews' },
{ value: 'price-asc', label: 'Price: low to high' },
{ value: 'price-desc', label: 'Price: high to low' }];


const list = (params: URLSearchParams, key: string) =>
(params.get(key) ?? '').split(',').filter(Boolean);

const num = (value: string | null) => value && !Number.isNaN(Number(value)) ? Number(value) : null;

export function parseFilters(params: URLSearchParams): SearchFilters {
  const subjectIds = subjects.map((s) => s.id as string);
  const levelIds = levels.map((l) => l.id as string);
  return {
    q: params.get('q') ?? '',
    subjects: list(params, 'subject').filter((s) => subjectIds.includes(s)) as SubjectId[],
    levels: list(params, 'level').filter((l) => levelIds.includes(l)) as LevelId[],
    minPrice: num(params.get('min')),
    maxPrice: num(params.get('max')),
    days: list(params, 'days') as DayKey[],
    times: list(params, 'times') as TimeOfDay[],
    languages: list(params, 'lang'),
    minRating: num(params.get('rating')) ?? 0,
    sort: params.get('sort') as SortKey || 'recommended'
  };
}

export function filtersToParams(f: SearchFilters): URLSearchParams {
  const p = new URLSearchParams();
  if (f.q) p.set('q', f.q);
  if (f.subjects.length) p.set('subject', f.subjects.join(','));
  if (f.levels.length) p.set('level', f.levels.join(','));
  if (f.minPrice !== null) p.set('min', String(f.minPrice));
  if (f.maxPrice !== null) p.set('max', String(f.maxPrice));
  if (f.days.length) p.set('days', f.days.join(','));
  if (f.times.length) p.set('times', f.times.join(','));
  if (f.languages.length) p.set('lang', f.languages.join(','));
  if (f.minRating) p.set('rating', String(f.minRating));
  if (f.sort !== 'recommended') p.set('sort', f.sort);
  return p;
}

export function countActiveFilters(f: SearchFilters): number {
  return (
    f.subjects.length +
    f.levels.length + (
    f.minPrice !== null || f.maxPrice !== null ? 1 : 0) +
    f.days.length +
    f.times.length +
    f.languages.length + (
    f.minRating ? 1 : 0));

}

function matchesKeyword(tutor: Tutor, q: string): boolean {
  if (!q.trim()) return true;
  const haystack = [
  tutor.name,
  tutor.headline,
  tutor.bio,
  ...tutor.languages,
  ...tutor.subjects.flatMap((s) => [
  subjects.find((x) => x.id === s.subject)?.name ?? '',
  ...s.topics]
  )].

  join(' ').
  toLowerCase();
  return q.
  toLowerCase().
  split(/\s+/).
  filter(Boolean).
  every((term) => haystack.includes(term));
}

function matchesAvailability(tutor: Tutor, days: DayKey[], times: TimeOfDay[]): boolean {
  if (!days.length && !times.length) return true;
  const dayKeys = days.length ? days : Object.keys(tutor.availability) as DayKey[];
  const ranges = timesOfDay.filter((t) => !times.length || times.includes(t.key));
  return dayKeys.some((d) =>
  tutor.availability[d].some((h) => ranges.some((r) => h >= r.start && h < r.end))
  );
}

export function filterTutors(all: Tutor[], f: SearchFilters): Tutor[] {
  const result = all.filter(
    (t) =>
    matchesKeyword(t, f.q) && (
    !f.subjects.length || t.subjects.some((s) => f.subjects.includes(s.subject))) && (
    !f.levels.length || t.subjects.some((s) => s.levels.some((l) => f.levels.includes(l)))) && (
    f.minPrice === null || t.hourlyRate >= f.minPrice) && (
    f.maxPrice === null || t.hourlyRate <= f.maxPrice) && (
    !f.languages.length || f.languages.some((l) => t.languages.includes(l))) &&
    t.rating >= f.minRating &&
    matchesAvailability(t, f.days, f.times)
  );
  const sorted = [...result];
  switch (f.sort) {
    case 'price-asc':
      return sorted.sort((a, b) => a.hourlyRate - b.hourlyRate);
    case 'price-desc':
      return sorted.sort((a, b) => b.hourlyRate - a.hourlyRate);
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'reviews':
      return sorted.sort((a, b) => b.reviewCount - a.reviewCount);
    default:
      return sorted.sort(
        (a, b) => Number(!!b.featured) - Number(!!a.featured) || b.rating * b.reviewCount - a.rating * a.reviewCount
      );
  }
}
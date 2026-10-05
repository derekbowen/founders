import type { CategoryId, Experience, TimeOfDay } from '../types/marketplace';
import { getDestination } from './lookup';

export const PRICE_CEILING = 100;

export interface SearchFilters {
  destination: string;
  date: string;
  guests: number;
  categories: CategoryId[];
  priceMax: number;
  durations: string[];
  timesOfDay: TimeOfDay[];
  groupSizes: string[];
  languages: string[];
  accessible: boolean;
  sort: string;
}

export const groupSizeOptions = [
{ value: 'small', label: 'Intimate (up to 6)' },
{ value: 'medium', label: 'Small group (7–10)' },
{ value: 'large', label: 'Larger group (11+)' }];


const list = (v: string | null) => v ? v.split(',').filter(Boolean) : [];

export function parseFilters(params: URLSearchParams): SearchFilters {
  return {
    destination: params.get('dest') ?? '',
    date: params.get('date') ?? '',
    guests: Number(params.get('guests') ?? 1) || 1,
    categories: list(params.get('cat')) as CategoryId[],
    priceMax: Number(params.get('price') ?? PRICE_CEILING) || PRICE_CEILING,
    durations: list(params.get('dur')),
    timesOfDay: list(params.get('tod')) as TimeOfDay[],
    groupSizes: list(params.get('group')),
    languages: list(params.get('lang')),
    accessible: params.get('access') === '1',
    sort: params.get('sort') ?? 'recommended'
  };
}

export function filtersToParams(f: SearchFilters): URLSearchParams {
  const p = new URLSearchParams();
  if (f.destination) p.set('dest', f.destination);
  if (f.date) p.set('date', f.date);
  if (f.guests > 1) p.set('guests', String(f.guests));
  if (f.categories.length) p.set('cat', f.categories.join(','));
  if (f.priceMax < PRICE_CEILING) p.set('price', String(f.priceMax));
  if (f.durations.length) p.set('dur', f.durations.join(','));
  if (f.timesOfDay.length) p.set('tod', f.timesOfDay.join(','));
  if (f.groupSizes.length) p.set('group', f.groupSizes.join(','));
  if (f.languages.length) p.set('lang', f.languages.join(','));
  if (f.accessible) p.set('access', '1');
  if (f.sort !== 'recommended') p.set('sort', f.sort);
  return p;
}

export function durationBucket(hours: number) {
  if (hours <= 2) return 'short';
  if (hours < 4) return 'medium';
  return 'long';
}

export function groupBucket(maxGuests: number) {
  if (maxGuests <= 6) return 'small';
  if (maxGuests <= 10) return 'medium';
  return 'large';
}

export function countActiveFilters(f: SearchFilters) {
  return (
    f.categories.length +
    f.durations.length +
    f.timesOfDay.length +
    f.groupSizes.length +
    f.languages.length + (
    f.accessible ? 1 : 0) + (
    f.priceMax < PRICE_CEILING ? 1 : 0));

}

function matchesDestination(e: Experience, query: string) {
  if (!query) return true;
  const q = query.toLowerCase().trim();
  const d = getDestination(e.destinationId);
  return (
    e.destinationId === q ||
    Boolean(d && (d.city.toLowerCase().includes(q) || d.country.toLowerCase().includes(q))) ||
    e.title.toLowerCase().includes(q));

}

export function applyFilters(items: Experience[], f: SearchFilters): Experience[] {
  const filtered = items.filter(
    (e) =>
    matchesDestination(e, f.destination) &&
    e.maxGuests >= f.guests && (
    !f.categories.length || f.categories.includes(e.categoryId)) &&
    e.pricePerPerson <= f.priceMax && (
    !f.durations.length || f.durations.includes(durationBucket(e.durationHours))) && (
    !f.timesOfDay.length || e.timesOfDay.some((t) => f.timesOfDay.includes(t))) && (
    !f.groupSizes.length || f.groupSizes.includes(groupBucket(e.maxGuests))) && (
    !f.languages.length || e.languages.some((l) => f.languages.includes(l))) && (
    !f.accessible || e.wheelchairAccessible)
  );

  const sorted = [...filtered];
  switch (f.sort) {
    case 'rating':
      sorted.sort((a, b) => b.rating - a.rating);
      break;
    case 'price-asc':
      sorted.sort((a, b) => a.pricePerPerson - b.pricePerPerson);
      break;
    case 'price-desc':
      sorted.sort((a, b) => b.pricePerPerson - a.pricePerPerson);
      break;
    case 'duration':
      sorted.sort((a, b) => a.durationHours - b.durationHours);
      break;
    default:
      sorted.sort((a, b) => b.rating * Math.log(b.reviewCount) - a.rating * Math.log(a.reviewCount));
  }
  return sorted;
}
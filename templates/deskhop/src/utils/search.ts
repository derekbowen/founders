import type { AmenityId, BookingMode, Listing, SpaceTypeId } from '../types/listing';
import { seatsLeft } from './availability';
import { getSpaceType } from './lookup';

export type SortKey = 'recommended' | 'price-asc' | 'price-desc' | 'rating';

export interface SearchFilters {
  q: string;
  city: string;
  date: string;
  types: SpaceTypeId[];
  unit: BookingMode;
  min: number | null;
  max: number | null;
  people: number;
  amenities: AmenityId[];
  sort: SortKey;
}

export function parseFilters(params: URLSearchParams): SearchFilters {
  const list = (key: string) => params.get(key) ? (params.get(key) as string).split(',').filter(Boolean) : [];
  const num = (key: string) => {
    const v = params.get(key);
    return v && !Number.isNaN(Number(v)) ? Number(v) : null;
  };
  return {
    q: params.get('q') ?? '',
    city: params.get('city') ?? '',
    date: params.get('date') ?? '',
    types: list('type') as SpaceTypeId[],
    unit: params.get('unit') === 'day' ? 'day' : 'hour',
    min: num('min'),
    max: num('max'),
    people: Math.max(1, num('people') ?? 1),
    amenities: list('amenities') as AmenityId[],
    sort: params.get('sort') as SortKey || 'recommended'
  };
}

export function serializeFilters(f: SearchFilters): URLSearchParams {
  const p = new URLSearchParams();
  if (f.q) p.set('q', f.q);
  if (f.city) p.set('city', f.city);
  if (f.date) p.set('date', f.date);
  if (f.types.length) p.set('type', f.types.join(','));
  if (f.unit !== 'hour') p.set('unit', f.unit);
  if (f.min !== null) p.set('min', String(f.min));
  if (f.max !== null) p.set('max', String(f.max));
  if (f.people > 1) p.set('people', String(f.people));
  if (f.amenities.length) p.set('amenities', f.amenities.join(','));
  if (f.sort !== 'recommended') p.set('sort', f.sort);
  return p;
}

export function filterListings(all: Listing[], f: SearchFilters): Listing[] {
  const q = f.q.trim().toLowerCase();
  const price = (l: Listing) => f.unit === 'hour' ? l.pricePerHour : l.pricePerDay;

  const results = all.filter((l) => {
    if (q && ![l.title, l.city, l.neighborhood, getSpaceType(l.spaceType).label].some((s) => s.toLowerCase().includes(q)))
    return false;
    if (f.city && l.city !== f.city) return false;
    if (f.types.length && !f.types.includes(l.spaceType)) return false;
    if (f.min !== null && price(l) < f.min) return false;
    if (f.max !== null && price(l) > f.max) return false;
    if (f.amenities.length && !f.amenities.every((a) => l.amenities.includes(a))) return false;
    if (f.people > 1) {
      const fits =
      getSpaceType(l.spaceType).bookBy === 'seat' ?
      seatsLeft(l, f.date || undefined) >= f.people :
      l.capacity * l.seats >= f.people;
      if (!fits) return false;
    }
    return true;
  });

  switch (f.sort) {
    case 'price-asc':
      return [...results].sort((a, b) => price(a) - price(b));
    case 'price-desc':
      return [...results].sort((a, b) => price(b) - price(a));
    case 'rating':
      return [...results].sort((a, b) => b.rating - a.rating);
    default:
      return results;
  }
}

export function countActiveFilters(f: SearchFilters): number {
  return (
    f.types.length +
    f.amenities.length + (
    f.min !== null ? 1 : 0) + (
    f.max !== null ? 1 : 0) + (
    f.people > 1 ? 1 : 0));

}
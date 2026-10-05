import { destinations } from '../data/destinations';
import type { BoatTypeId, Listing } from '../types/marketplace';
import type { CaptainFilter, SearchFilterValues, SortOption } from '../types/search';

export const emptyFilters: SearchFilterValues = {
  types: [],
  minPrice: '',
  maxPrice: '',
  guests: 1,
  captain: 'any',
  minLength: '',
  fishing: false,
  overnight: false
};

export function parseFilters(params: URLSearchParams): SearchFilterValues {
  return {
    types: (params.get('type')?.split(',').filter(Boolean) ?? []) as BoatTypeId[],
    minPrice: params.get('minPrice') ?? '',
    maxPrice: params.get('maxPrice') ?? '',
    guests: Number(params.get('guests') ?? 1) || 1,
    captain: params.get('captain') as CaptainFilter ?? 'any',
    minLength: params.get('minLength') ?? '',
    fishing: params.get('fishing') === '1',
    overnight: params.get('overnight') === '1'
  };
}

export function filtersToParams(filters: SearchFilterValues, base: URLSearchParams): URLSearchParams {
  const next = new URLSearchParams(base);
  const set = (k: string, v: string | null) => v ? next.set(k, v) : next.delete(k);
  set('type', filters.types.join(','));
  set('minPrice', filters.minPrice);
  set('maxPrice', filters.maxPrice);
  set('guests', filters.guests > 1 ? String(filters.guests) : null);
  set('captain', filters.captain !== 'any' ? filters.captain : null);
  set('minLength', filters.minLength);
  set('fishing', filters.fishing ? '1' : null);
  set('overnight', filters.overnight ? '1' : null);
  return next;
}

export function countActiveFilters(f: SearchFilterValues): number {
  return [
  f.types.length > 0,
  !!f.minPrice || !!f.maxPrice,
  f.guests > 1,
  f.captain !== 'any',
  !!f.minLength,
  f.fishing,
  f.overnight].
  filter(Boolean).length;
}

function matchesLocation(listing: Listing, location: string): boolean {
  if (!location) return true;
  const q = location.toLowerCase();
  const dest = destinations.find((d) => d.id === listing.destinationId);
  if (dest?.id === q) return true;
  return [dest?.name, dest?.region, listing.marina.name, listing.marina.address, listing.title].
  filter(Boolean).
  some((s) => (s as string).toLowerCase().includes(q));
}

export function filterListings(all: Listing[], f: SearchFilterValues, location: string, date: string): Listing[] {
  return all.filter((l) => {
    if (!matchesLocation(l, location)) return false;
    if (date && l.blockedDates.includes(date)) return false;
    if (f.types.length && !f.types.includes(l.type)) return false;
    if (f.minPrice && l.pricing.fullDay < Number(f.minPrice)) return false;
    if (f.maxPrice && l.pricing.fullDay > Number(f.maxPrice)) return false;
    if (l.specs.capacity < f.guests) return false;
    if (f.captain === 'captained' && l.captainMode === 'none') return false;
    if (f.captain === 'bareboat' && l.captainMode === 'required') return false;
    if (f.minLength && l.specs.length < Number(f.minLength)) return false;
    if (f.fishing && !l.fishingGear) return false;
    if (f.overnight && !l.overnight) return false;
    return true;
  });
}

export function sortListings(list: Listing[], sort: SortOption): Listing[] {
  const copy = [...list];
  switch (sort) {
    case 'price-asc':
      return copy.sort((a, b) => a.pricing.fullDay - b.pricing.fullDay);
    case 'price-desc':
      return copy.sort((a, b) => b.pricing.fullDay - a.pricing.fullDay);
    case 'rating':
      return copy.sort((a, b) => b.rating - a.rating);
    case 'length-desc':
      return copy.sort((a, b) => b.specs.length - a.specs.length);
    default:
      return copy;
  }
}

export const sortOptions: {value: SortOption;label: string;}[] = [
{ value: 'relevance', label: 'Recommended' },
{ value: 'price-asc', label: 'Price: low to high' },
{ value: 'price-desc', label: 'Price: high to low' },
{ value: 'rating', label: 'Top rated' },
{ value: 'length-desc', label: 'Longest first' }];
import type { Listing, SiteType } from '../types/listing';
import type { AmenityFilterKey, SearchFilters, SortKey } from '../types/search';

export const PRICE_MIN = 0;
export const PRICE_MAX = 300;

export const emptyFilters: SearchFilters = {
  location: '',
  start: '',
  end: '',
  campers: 1,
  siteTypes: [],
  minPrice: PRICE_MIN,
  maxPrice: PRICE_MAX,
  amenities: [],
  vehicleLength: 0,
  sort: 'recommended'
};

export function filtersFromParams(params: URLSearchParams): SearchFilters {
  const list = (key: string) => (params.get(key) ?? '').split(',').filter(Boolean);
  return {
    location: params.get('location') ?? '',
    start: params.get('start') ?? '',
    end: params.get('end') ?? '',
    campers: Number(params.get('campers')) || 1,
    siteTypes: list('type') as SiteType[],
    minPrice: Number(params.get('min')) || PRICE_MIN,
    maxPrice: Number(params.get('max')) || PRICE_MAX,
    amenities: list('amenities') as AmenityFilterKey[],
    vehicleLength: Number(params.get('vehicle')) || 0,
    sort: params.get('sort') as SortKey || 'recommended'
  };
}

export function filtersToParams(f: SearchFilters): URLSearchParams {
  const p = new URLSearchParams();
  if (f.location) p.set('location', f.location);
  if (f.start) p.set('start', f.start);
  if (f.end) p.set('end', f.end);
  if (f.campers > 1) p.set('campers', String(f.campers));
  if (f.siteTypes.length) p.set('type', f.siteTypes.join(','));
  if (f.minPrice > PRICE_MIN) p.set('min', String(f.minPrice));
  if (f.maxPrice < PRICE_MAX) p.set('max', String(f.maxPrice));
  if (f.amenities.length) p.set('amenities', f.amenities.join(','));
  if (f.vehicleLength > 0) p.set('vehicle', String(f.vehicleLength));
  if (f.sort !== 'recommended') p.set('sort', f.sort);
  return p;
}

export function countActiveFilters(f: SearchFilters): number {
  return (
    f.siteTypes.length +
    f.amenities.length + (
    f.minPrice > PRICE_MIN || f.maxPrice < PRICE_MAX ? 1 : 0) + (
    f.vehicleLength > 0 ? 1 : 0));

}

export function filterListings(listings: Listing[], f: SearchFilters): Listing[] {
  const q = f.location.trim().toLowerCase();
  const result = listings.filter((l) => {
    if (q) {
      const haystack = `${l.title} ${l.location.town} ${l.location.region} ${l.location.park}`.toLowerCase();
      const words = q.split(/[\s,]+/).filter((w) => w.length > 2);
      if (!haystack.includes(q) && !words.some((w) => haystack.includes(w))) return false;
    }
    if (f.siteTypes.length && !f.siteTypes.includes(l.siteType)) return false;
    if (l.price < f.minPrice || l.price > f.maxPrice) return false;
    if (l.maxCampers < f.campers) return false;
    if (f.amenities.some((a) => !l.amenities.includes(a))) return false;
    if (f.vehicleLength > 0 && l.maxVehicleLength < f.vehicleLength) return false;
    return true;
  });
  switch (f.sort) {
    case 'price-asc':
      return [...result].sort((a, b) => a.price - b.price);
    case 'price-desc':
      return [...result].sort((a, b) => b.price - a.price);
    case 'rating':
      return [...result].sort((a, b) => b.rating - a.rating);
    default:
      return result;
  }
}
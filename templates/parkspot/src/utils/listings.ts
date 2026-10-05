import { vehicleSizes } from '../data/vehicles';
import type { Listing, UseCase, VehicleSize } from '../types/listing';

export type SortOption = 'recommended' | 'price-asc' | 'price-desc' | 'rating';

export interface SearchFilters {
  maxPrice: number;
  covered: boolean;
  evCharging: boolean;
  access247: boolean;
  securityCamera: boolean;
  vehicle: VehicleSize | 'any';
  useCase: UseCase | 'all';
}

export const defaultFilters: SearchFilters = {
  maxPrice: 12,
  covered: false,
  evCharging: false,
  access247: false,
  securityCamera: false,
  vehicle: 'any',
  useCase: 'all'
};

export function fitsVehicle(max: VehicleSize, wanted: VehicleSize | 'any') {
  if (wanted === 'any') return true;
  return vehicleSizes.indexOf(max) >= vehicleSizes.indexOf(wanted);
}

export function countActiveFilters(f: SearchFilters) {
  let n = 0;
  if (f.maxPrice < defaultFilters.maxPrice) n++;
  if (f.covered) n++;
  if (f.evCharging) n++;
  if (f.access247) n++;
  if (f.securityCamera) n++;
  if (f.vehicle !== 'any') n++;
  if (f.useCase !== 'all') n++;
  return n;
}

export function filterListings(listings: Listing[], f: SearchFilters, query: string) {
  const q = query.trim().toLowerCase();
  return listings.filter((l) => {
    if (l.hourlyPrice > f.maxPrice) return false;
    if (f.covered && !l.covered) return false;
    if (f.evCharging && !l.evCharging) return false;
    if (f.access247 && !l.access247) return false;
    if (f.securityCamera && !l.securityCamera) return false;
    if (!fitsVehicle(l.maxVehicle, f.vehicle)) return false;
    if (f.useCase !== 'all' && !l.useCases.includes(f.useCase)) return false;
    if (q) {
      const haystack = [l.title, l.neighborhood, l.city, l.featuredVenue ?? '', ...l.nearby].
      join(' ').
      toLowerCase();
      const words = q.split(/[\s,]+/).filter((w) => w.length > 2);
      if (words.length && !words.some((w) => haystack.includes(w))) return false;
    }
    return true;
  });
}

export function sortListings(listings: Listing[], sort: SortOption) {
  const copy = [...listings];
  switch (sort) {
    case 'price-asc':
      return copy.sort((a, b) => a.hourlyPrice - b.hourlyPrice);
    case 'price-desc':
      return copy.sort((a, b) => b.hourlyPrice - a.hourlyPrice);
    case 'rating':
      return copy.sort((a, b) => b.rating - a.rating);
    default:
      return copy;
  }
}
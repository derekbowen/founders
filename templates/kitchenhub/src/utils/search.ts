import { priceBounds } from '../data/catalog';
import type { Listing, SearchFiltersState, SortKey } from '../types/marketplace';

export const defaultFilters: SearchFiltersState = {
  city: 'all',
  query: '',
  use: 'all',
  priceMin: priceBounds.min,
  priceMax: priceBounds.max,
  equipment: [],
  storage: [],
  certifications: [],
  access247: false
};

export function filterListings(list: Listing[], f: SearchFiltersState): Listing[] {
  const q = f.query.trim().toLowerCase();
  return list.filter(
    (l) =>
    (f.city === 'all' || l.city === f.city) && (
    !q || [l.title, l.neighborhood, l.city, l.tagline].join(' ').toLowerCase().includes(q)) && (
    f.use === 'all' || l.useCases.includes(f.use)) &&
    l.pricePerHour >= f.priceMin &&
    l.pricePerHour <= f.priceMax &&
    f.equipment.every((e) => l.keyEquipment.includes(e)) &&
    f.storage.every((s) => l.storage.some((o) => o.type === s)) &&
    f.certifications.every((c) => l.certifications.includes(c)) && (
    !f.access247 || l.access247)
  );
}

export function sortListings(list: Listing[], sort: SortKey): Listing[] {
  const copy = [...list];
  switch (sort) {
    case 'price-asc':
      return copy.sort((a, b) => a.pricePerHour - b.pricePerHour);
    case 'price-desc':
      return copy.sort((a, b) => b.pricePerHour - a.pricePerHour);
    case 'rating':
      return copy.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
    default:
      return copy.sort((a, b) => Number(b.featured) - Number(a.featured) || b.reviewCount - a.reviewCount);
  }
}

export function countActiveFilters(f: SearchFiltersState): number {
  return (
    f.equipment.length +
    f.storage.length +
    f.certifications.length + (
    f.access247 ? 1 : 0) + (
    f.use !== 'all' ? 1 : 0) + (
    f.priceMin !== priceBounds.min || f.priceMax !== priceBounds.max ? 1 : 0));

}

export function toggleValue<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}
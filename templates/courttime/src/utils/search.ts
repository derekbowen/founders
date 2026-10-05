import { Listing, SearchFilters, SortOption, SportId } from '../types/marketplace';
import { sports } from '../data/sports';
import { getDaySlots } from './availability';
import { todayKey } from './format';

export function defaultFilters(): SearchFilters {
  return {
    sports: [],
    query: '',
    dateKey: todayKey(),
    time: null,
    setting: 'any',
    surfaces: [],
    lights: false,
    equipment: false,
    openPlayOnly: false,
    priceMin: null,
    priceMax: null
  };
}

export function filtersFromParams(params: URLSearchParams): SearchFilters {
  const base = defaultFilters();
  const sportParam = params.get('sport');
  const validIds = sports.map((s) => s.id);
  const time = params.get('time');
  const date = params.get('date');
  return {
    ...base,
    sports: sportParam ? sportParam.split(',').filter((id) => validIds.includes(id as SportId)) as SportId[] : [],
    query: params.get('location') ?? '',
    dateKey: date && date >= base.dateKey ? date : base.dateKey,
    time: time ? Number(time) : null,
    openPlayOnly: params.get('openPlay') === '1'
  };
}

export function filterListings(list: Listing[], f: SearchFilters): Listing[] {
  const q = f.query.trim().toLowerCase();
  return list.filter((l) => {
    if (f.sports.length && !f.sports.includes(l.sport)) return false;
    if (q) {
      const sportLabel = sports.find((s) => s.id === l.sport)?.label ?? '';
      const haystack = `${l.title} ${l.clubName} ${l.location.neighborhood} ${l.location.address} ${sportLabel}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    if (f.setting !== 'any' && l.setting !== f.setting) return false;
    if (f.surfaces.length && !f.surfaces.includes(l.surface)) return false;
    if (f.lights && !l.lights) return false;
    if (f.equipment && !l.addOns.some((a) => a.kind === 'equipment')) return false;
    if (f.openPlayOnly && !l.openPlay) return false;
    if (f.priceMin !== null && l.pricePerHour < f.priceMin) return false;
    if (f.priceMax !== null && l.pricePerHour > f.priceMax) return false;
    if (f.time !== null) {
      const slot = getDaySlots(l, f.dateKey).find((s) => s.hour === f.time);
      if (!slot || slot.status !== 'available' && !(f.openPlayOnly && slot.status === 'openplay')) return false;
    }
    return true;
  });
}

export function sortListings(list: Listing[], sort: SortOption): Listing[] {
  const copy = [...list];
  switch (sort) {
    case 'price-asc':
      return copy.sort((a, b) => a.pricePerHour - b.pricePerHour);
    case 'price-desc':
      return copy.sort((a, b) => b.pricePerHour - a.pricePerHour);
    case 'rating':
      return copy.sort((a, b) => b.rating - a.rating);
    default:
      return copy.sort((a, b) => Number(!!b.featured) - Number(!!a.featured) || b.reviewCount - a.reviewCount);
  }
}

export function getSurfaceOptions(list: Listing[]): string[] {
  return Array.from(new Set(list.map((l) => l.surface))).sort();
}

export function countAdvancedFilters(f: SearchFilters): number {
  return (
    (f.setting !== 'any' ? 1 : 0) +
    f.surfaces.length + (
    f.lights ? 1 : 0) + (
    f.equipment ? 1 : 0) + (
    f.openPlayOnly ? 1 : 0) + (
    f.priceMin !== null || f.priceMax !== null ? 1 : 0) + (
    f.time !== null ? 1 : 0));

}
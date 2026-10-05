import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { listings } from '../data/listings';
import type { Listing, PetSize, ServiceId } from '../types/marketplace';
import { getStartingPrice } from '../utils/pricing';

export const PRICE_MIN = 0;
export const PRICE_MAX = 100;

export interface SearchFilters {
  service: ServiceId | null;
  location: string;
  start: string;
  end: string;
  pets: number;
  minPrice: number;
  maxPrice: number;
  sizes: PetSize[];
  acceptsCats: boolean;
  fencedYard: boolean;
  noOtherPets: boolean;
  homeFullTime: boolean;
  sort: string;
}

const defaults: SearchFilters = {
  service: null,
  location: '',
  start: '',
  end: '',
  pets: 1,
  minPrice: PRICE_MIN,
  maxPrice: PRICE_MAX,
  sizes: [],
  acceptsCats: false,
  fencedYard: false,
  noOtherPets: false,
  homeFullTime: false,
  sort: 'recommended'
};

function parse(params: URLSearchParams): SearchFilters {
  return {
    service: params.get('service') as ServiceId || null,
    location: params.get('location') ?? '',
    start: params.get('start') ?? '',
    end: params.get('end') ?? '',
    pets: Number(params.get('pets')) || 1,
    minPrice: Number(params.get('minPrice')) || PRICE_MIN,
    maxPrice: Number(params.get('maxPrice')) || PRICE_MAX,
    sizes: params.get('sizes')?.split(',').filter(Boolean) as PetSize[] ?? [],
    acceptsCats: params.get('cats') === '1',
    fencedYard: params.get('fenced') === '1',
    noOtherPets: params.get('noPets') === '1',
    homeFullTime: params.get('fullTime') === '1',
    sort: params.get('sort') ?? 'recommended'
  };
}

function serialize(f: SearchFilters): URLSearchParams {
  const p = new URLSearchParams();
  if (f.service) p.set('service', f.service);
  if (f.location) p.set('location', f.location);
  if (f.start) p.set('start', f.start);
  if (f.end) p.set('end', f.end);
  if (f.pets !== 1) p.set('pets', String(f.pets));
  if (f.minPrice !== PRICE_MIN) p.set('minPrice', String(f.minPrice));
  if (f.maxPrice !== PRICE_MAX) p.set('maxPrice', String(f.maxPrice));
  if (f.sizes.length) p.set('sizes', f.sizes.join(','));
  if (f.acceptsCats) p.set('cats', '1');
  if (f.fencedYard) p.set('fenced', '1');
  if (f.noOtherPets) p.set('noPets', '1');
  if (f.homeFullTime) p.set('fullTime', '1');
  if (f.sort !== 'recommended') p.set('sort', f.sort);
  return p;
}

function matches(listing: Listing, f: SearchFilters): boolean {
  if (f.service && !listing.services.some((s) => s.serviceId === f.service)) return false;
  if (f.location && !/^\d{5}$/.test(f.location.trim())) {
    const q = f.location.toLowerCase();
    const hay = `${listing.neighborhood} ${listing.city} ${listing.title}`.toLowerCase();
    if (!hay.includes(q) && !q.includes(listing.neighborhood.toLowerCase()) && !q.includes('portland')) return false;
  }
  const price = getStartingPrice(listing, f.service).price;
  if (price < f.minPrice) return false;
  if (f.maxPrice < PRICE_MAX && price > f.maxPrice) return false;
  if (f.sizes.length && !f.sizes.every((s) => listing.petSizes.includes(s))) return false;
  if (f.acceptsCats && !listing.acceptsCats) return false;
  if (f.fencedYard && listing.home.yard !== 'fenced') return false;
  if (f.noOtherPets && listing.home.otherPets !== null) return false;
  if (f.homeFullTime && !listing.home.homeFullTime) return false;
  if (f.pets > listing.maxPets) return false;
  return true;
}

export function useListingSearch() {
  const [params, setParams] = useSearchParams();
  const filters = useMemo(() => parse(params), [params]);

  const setFilters = useCallback(
    (patch: Partial<SearchFilters>) => setParams(serialize({ ...parse(params), ...patch }), { replace: true }),
    [params, setParams]
  );

  const clearFilters = useCallback(
    () => setParams(serialize({ ...defaults, service: filters.service, location: filters.location, start: filters.start, end: filters.end, pets: filters.pets }), { replace: true }),
    [filters, setParams]
  );

  const resetAll = useCallback(() => setParams(new URLSearchParams(), { replace: true }), [setParams]);

  const results = useMemo(() => {
    const list = listings.filter((l) => matches(l, filters));
    const priceOf = (l: Listing) => getStartingPrice(l, filters.service).price;
    switch (filters.sort) {
      case 'price-asc':
        return list.sort((a, b) => priceOf(a) - priceOf(b));
      case 'price-desc':
        return list.sort((a, b) => priceOf(b) - priceOf(a));
      case 'rating':
        return list.sort((a, b) => b.rating - a.rating);
      case 'reviews':
        return list.sort((a, b) => b.reviewCount - a.reviewCount);
      default:
        return list.sort((a, b) => b.rating * Math.log(b.reviewCount + 1) - a.rating * Math.log(a.reviewCount + 1));
    }
  }, [filters]);

  const moreFiltersCount = [filters.acceptsCats, filters.fencedYard, filters.noOtherPets, filters.homeFullTime].filter(Boolean).length;
  const activeCount =
  moreFiltersCount + (filters.sizes.length ? 1 : 0) + (filters.minPrice !== PRICE_MIN || filters.maxPrice !== PRICE_MAX ? 1 : 0);

  return { filters, setFilters, clearFilters, resetAll, results, activeCount, moreFiltersCount };
}
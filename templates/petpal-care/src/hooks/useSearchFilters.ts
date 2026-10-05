import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { addDays, differenceInCalendarDays, parseISO } from 'date-fns';
import { listings } from '../data/listings';
import { getStartingPrice, isDateBlocked } from '../utils/listing';
import type { PetSize, ServiceId } from '../types/listing';

export type SortKey = 'recommended' | 'price-asc' | 'price-desc' | 'rating' | 'reviews';

export interface SearchFilters {
  service: ServiceId | 'any';
  location: string;
  pets: number;
  priceMax: number;
  sizes: PetSize[];
  acceptsCats: boolean;
  fencedYard: boolean;
  noOtherPets: boolean;
  fullTimeHome: boolean;
  start: string;
  end: string;
}

export const PRICE_CEILING = 100;

const serviceIds: ServiceId[] = ['boarding', 'house-sitting', 'drop-in', 'dog-walking'];

function initialFilters(params: URLSearchParams): SearchFilters {
  const service = params.get('service') as ServiceId | null;
  return {
    service: service && serviceIds.includes(service) ? service : 'any',
    location: params.get('location') ?? '',
    pets: Math.max(1, Number(params.get('pets')) || 1),
    priceMax: PRICE_CEILING,
    sizes: [],
    acceptsCats: false,
    fencedYard: false,
    noOtherPets: false,
    fullTimeHome: false,
    start: params.get('start') ?? '',
    end: params.get('end') ?? ''
  };
}

export function useSearchFilters() {
  const [params] = useSearchParams();
  const [filters, setFilters] = useState<SearchFilters>(() => initialFilters(params));
  const [sort, setSort] = useState<SortKey>('recommended');

  const update = <K extends keyof SearchFilters,>(key: K, value: SearchFilters[K]) =>
  setFilters((f) => ({ ...f, [key]: value }));

  const reset = () =>
  setFilters((f) => ({
    ...initialFilters(new URLSearchParams()),
    service: f.service
  }));

  const results = useMemo(() => {
    const q = filters.location.trim().toLowerCase();
    const serviceKey = filters.service === 'any' ? undefined : filters.service;
    const filtered = listings.filter((l) => {
      if (serviceKey && !l.services.some((s) => s.serviceId === serviceKey)) return false;
      if (q && !`${l.neighborhood} ${l.city} ${l.title}`.toLowerCase().includes(q)) return false;
      if (l.maxPets < filters.pets) return false;
      if (getStartingPrice(l, serviceKey).price > filters.priceMax) return false;
      if (filters.sizes.length && !filters.sizes.every((s) => l.acceptedSizes.includes(s))) return false;
      if (filters.acceptsCats && !l.acceptsCats) return false;
      if (filters.fencedYard && l.home.yard !== 'fenced') return false;
      if (filters.noOtherPets && l.home.otherPets !== null) return false;
      if (filters.fullTimeHome && !l.home.fullTimeHome) return false;
      if (filters.start) {
        const start = parseISO(filters.start);
        const end = filters.end ? parseISO(filters.end) : start;
        const days = Math.max(1, differenceInCalendarDays(end, start));
        for (let i = 0; i < days; i++) {
          if (isDateBlocked(l, addDays(start, i))) return false;
        }
      }
      return true;
    });
    const price = (id: string) => getStartingPrice(listings.find((l) => l.id === id)!, serviceKey).price;
    return [...filtered].sort((a, b) => {
      switch (sort) {
        case 'price-asc':
          return price(a.id) - price(b.id);
        case 'price-desc':
          return price(b.id) - price(a.id);
        case 'rating':
          return b.rating - a.rating;
        case 'reviews':
          return b.reviewCount - a.reviewCount;
        default:
          return b.rating * Math.log(b.reviewCount + 1) - a.rating * Math.log(a.reviewCount + 1);
      }
    });
  }, [filters, sort]);

  const activeCount =
  (filters.priceMax < PRICE_CEILING ? 1 : 0) +
  filters.sizes.length +
  [filters.acceptsCats, filters.fencedYard, filters.noOtherPets, filters.fullTimeHome].filter(Boolean).length;

  return { filters, update, reset, sort, setSort, results, activeCount };
}
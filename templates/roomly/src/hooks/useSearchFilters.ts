import { useMemo, useState } from 'react';
import { cityOptions } from '../data/features';
import { universities } from '../data/discover';
import type { Listing, ListingSort, RoomType, SearchFilters } from '../types/listing';

export const RENT_CEILING = 2000;

export const defaultFilters: SearchFilters = {
  city: '',
  minRent: 0,
  maxRent: RENT_CEILING,
  roomTypes: [],
  billsIncluded: false,
  furnished: false,
  maxMinStay: 0,
  flatmates: 'any',
  petsAllowed: false,
  gender: 'any',
  availableBy: ''
};

const roomTypeIds: RoomType[] = ['private', 'studio', 'shared', 'whole'];
const sortIds: ListingSort[] = ['recommended', 'rent-asc', 'rent-desc', 'newest', 'available'];

export function resolveCity(query: string): string {
  const q = query.trim().toLowerCase();
  if (!q) return '';
  const city = cityOptions.find((c) => c.toLowerCase() === q);
  if (city) return city;
  const uni = universities.find(
    (u) => u.short.toLowerCase().includes(q) || u.name.toLowerCase().includes(q) || q.includes(u.short.toLowerCase())
  );
  return uni ? uni.city : query.trim();
}

function initialFromParams(params: URLSearchParams): SearchFilters {
  const type = params.get('type') as RoomType | null;
  const maxRent = Number(params.get('maxRent'));
  return {
    ...defaultFilters,
    city: resolveCity(params.get('city') ?? ''),
    maxRent: maxRent > 0 ? maxRent : RENT_CEILING,
    roomTypes: type && roomTypeIds.includes(type) ? [type] : [],
    availableBy: params.get('moveIn') ?? ''
  };
}

function matches(l: Listing, f: SearchFilters): boolean {
  if (f.city) {
    const q = f.city.toLowerCase();
    if (!l.city.toLowerCase().includes(q) && !l.neighborhood.toLowerCase().includes(q)) return false;
  }
  if (l.rent < f.minRent) return false;
  if (f.maxRent < RENT_CEILING && l.rent > f.maxRent) return false;
  if (f.roomTypes.length && !f.roomTypes.includes(l.roomType)) return false;
  if (f.billsIncluded && !l.billsIncluded) return false;
  if (f.furnished && !l.furnished) return false;
  if (f.maxMinStay && l.minStay > f.maxMinStay) return false;
  if (f.flatmates === 'none' && l.flatmates.length > 0) return false;
  if (f.flatmates === 'few' && (l.flatmates.length < 1 || l.flatmates.length > 2)) return false;
  if (f.flatmates === 'many' && l.flatmates.length < 3) return false;
  if (f.petsAllowed && !l.petsAllowed) return false;
  if (f.gender !== 'any' && l.genderPreference !== 'any' && l.genderPreference !== f.gender) return false;
  if (f.availableBy && l.availableFrom > f.availableBy) return false;
  return true;
}

function sortListings(items: Listing[], sort: ListingSort): Listing[] {
  const copy = [...items];
  switch (sort) {
    case 'rent-asc':
      return copy.sort((a, b) => a.rent - b.rent);
    case 'rent-desc':
      return copy.sort((a, b) => b.rent - a.rent);
    case 'newest':
      return copy.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    case 'available':
      return copy.sort((a, b) => a.availableFrom.localeCompare(b.availableFrom));
    default:
      return copy;
  }
}

export function useSearchFilters(listings: Listing[], params: URLSearchParams) {
  const [filters, setFilters] = useState<SearchFilters>(() => initialFromParams(params));
  const [sort, setSort] = useState<ListingSort>(() => {
    const s = params.get('sort') as ListingSort | null;
    return s && sortIds.includes(s) ? s : 'recommended';
  });

  const results = useMemo(
    () => sortListings(listings.filter((l) => matches(l, filters)), sort),
    [listings, filters, sort]
  );

  const advancedCount = useMemo(() => {
    let n = 0;
    if (filters.minRent > 0 || filters.maxRent < RENT_CEILING) n++;
    if (filters.billsIncluded) n++;
    if (filters.furnished) n++;
    if (filters.maxMinStay) n++;
    if (filters.flatmates !== 'any') n++;
    if (filters.petsAllowed) n++;
    if (filters.gender !== 'any') n++;
    if (filters.availableBy) n++;
    return n;
  }, [filters]);

  const update = <K extends keyof SearchFilters,>(key: K, value: SearchFilters[K]) =>
  setFilters((prev) => ({ ...prev, [key]: value }));

  const toggleRoomType = (type: RoomType) =>
  setFilters((prev) => ({
    ...prev,
    roomTypes: prev.roomTypes.includes(type) ?
    prev.roomTypes.filter((t) => t !== type) :
    [...prev.roomTypes, type]
  }));

  const reset = () => setFilters((prev) => ({ ...defaultFilters, city: prev.city }));
  const resetAll = () => setFilters(defaultFilters);

  return { filters, update, toggleRoomType, reset, resetAll, sort, setSort, results, advancedCount };
}
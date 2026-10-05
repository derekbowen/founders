import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { listings } from '../data/listings';
import { priceOptions } from '../data/navigation';
import { CategoryId, Listing } from '../types/marketplace';
import { getCategory, getUser } from '../utils/lookup';

export interface SearchFilters {
  q: string;
  categories: CategoryId[];
  price: string;
  delivery: number;
  rating: number;
  languages: string[];
  location: string;
  sort: string;
}

function parse(params: URLSearchParams): SearchFilters {
  const list = (key: string) => (params.get(key) ?? '').split(',').filter(Boolean);
  return {
    q: params.get('q') ?? '',
    categories: list('category') as CategoryId[],
    price: params.get('price') ?? 'any',
    delivery: Number(params.get('delivery') ?? 0),
    rating: Number(params.get('rating') ?? 0),
    languages: list('lang'),
    location: params.get('location') ?? '',
    sort: params.get('sort') ?? 'relevance'
  };
}

function serialize(f: SearchFilters): Record<string, string> {
  const out: Record<string, string> = {};
  if (f.q) out.q = f.q;
  if (f.categories.length) out.category = f.categories.join(',');
  if (f.price !== 'any') out.price = f.price;
  if (f.delivery) out.delivery = String(f.delivery);
  if (f.rating) out.rating = String(f.rating);
  if (f.languages.length) out.lang = f.languages.join(',');
  if (f.location) out.location = f.location;
  if (f.sort !== 'relevance') out.sort = f.sort;
  return out;
}

function matchesKeyword(listing: Listing, q: string): boolean {
  if (!q) return true;
  const haystack = [
  listing.title,
  listing.summary,
  listing.skills.join(' '),
  getUser(listing.freelancerId)?.name ?? '',
  getCategory(listing.category)?.name ?? ''].

  join(' ').
  toLowerCase();
  return q.
  toLowerCase().
  split(/\s+/).
  filter(Boolean).
  every((term) => haystack.includes(term));
}

export function useListingSearch() {
  const [params, setParams] = useSearchParams();
  const filters = useMemo(() => parse(params), [params]);

  const setFilter = useCallback(
    (patch: Partial<SearchFilters>) => setParams(serialize({ ...filters, ...patch }), { replace: true }),
    [filters, setParams]
  );

  const reset = useCallback(() => setParams(filters.q ? { q: filters.q } : {}, { replace: true }), [filters.q, setParams]);

  const results = useMemo(() => {
    const price = priceOptions.find((p) => p.value === filters.price) ?? priceOptions[0];
    const filtered = listings.filter(
      (l) =>
      matchesKeyword(l, filters.q) && (
      !filters.categories.length || filters.categories.includes(l.category)) &&
      l.startingPrice >= price.min &&
      l.startingPrice <= price.max && (
      !filters.delivery || l.deliveryDays <= filters.delivery) && (
      !filters.rating || l.rating >= filters.rating) && (
      !filters.languages.length || filters.languages.some((lang) => l.languages.includes(lang))) && (
      !filters.location || l.location === filters.location)
    );
    const sorted = [...filtered];
    switch (filters.sort) {
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
        break;
      case 'price-asc':
        sorted.sort((a, b) => a.startingPrice - b.startingPrice);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.startingPrice - a.startingPrice);
        break;
      case 'delivery':
        sorted.sort((a, b) => a.deliveryDays - b.deliveryDays);
        break;
      default:
        sorted.sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
    }
    return sorted;
  }, [filters]);

  const activeCount =
  filters.categories.length + (
  filters.price !== 'any' ? 1 : 0) + (
  filters.delivery ? 1 : 0) + (
  filters.rating ? 1 : 0) +
  filters.languages.length + (
  filters.location ? 1 : 0);

  const locations = useMemo(() => Array.from(new Set(listings.map((l) => l.location))).sort(), []);

  return { filters, setFilter, reset, results, activeCount, locations };
}
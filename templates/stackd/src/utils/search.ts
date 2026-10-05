import type { Listing, SearchFilters } from '../types/marketplace';
import { basePrice } from './format';

export const sortOptions: {value: SearchFilters['sort'];label: string;}[] = [
{ value: 'relevance', label: 'Most relevant' },
{ value: 'bestselling', label: 'Bestselling' },
{ value: 'newest', label: 'Newest' },
{ value: 'rating', label: 'Highest rated' },
{ value: 'price-asc', label: 'Price: low to high' },
{ value: 'price-desc', label: 'Price: high to low' }];


export const defaultFilters: SearchFilters = {
  query: '',
  category: 'all',
  priceMin: '',
  priceMax: '',
  pricing: 'all',
  fileTypes: [],
  minRating: 0,
  sort: 'relevance'
};

function matchesQuery(listing: Listing, query: string, creatorName: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const haystack = [listing.title, listing.subtitle, creatorName, listing.category, ...listing.tags].
  join(' ').
  toLowerCase();
  return q.split(/\s+/).every((word) => haystack.includes(word));
}

export function filterListings(
listings: Listing[],
filters: SearchFilters,
creatorNameById: (id: string) => string)
: Listing[] {
  const min = filters.priceMin === '' ? null : Number(filters.priceMin);
  const max = filters.priceMax === '' ? null : Number(filters.priceMax);

  const result = listings.filter((l) => {
    const price = basePrice(l);
    if (!matchesQuery(l, filters.query, creatorNameById(l.creatorId))) return false;
    if (filters.category !== 'all' && l.category !== filters.category) return false;
    if (filters.pricing === 'free' && price !== 0) return false;
    if (filters.pricing === 'paid' && price === 0) return false;
    if (min !== null && !Number.isNaN(min) && price < min) return false;
    if (max !== null && !Number.isNaN(max) && price > max) return false;
    if (filters.fileTypes.length > 0 && !filters.fileTypes.includes(l.fileType)) return false;
    if (filters.minRating > 0 && l.rating < filters.minRating) return false;
    return true;
  });

  const sorted = [...result];
  switch (filters.sort) {
    case 'bestselling':
      sorted.sort((a, b) => b.sales - a.sales);
      break;
    case 'newest':
      sorted.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      break;
    case 'rating':
      sorted.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
      break;
    case 'price-asc':
      sorted.sort((a, b) => basePrice(a) - basePrice(b));
      break;
    case 'price-desc':
      sorted.sort((a, b) => basePrice(b) - basePrice(a));
      break;
    default:
      break;
  }
  return sorted;
}

export function countActiveFilters(filters: SearchFilters): number {
  let n = 0;
  if (filters.category !== 'all') n++;
  if (filters.priceMin !== '' || filters.priceMax !== '') n++;
  if (filters.pricing !== 'all') n++;
  if (filters.fileTypes.length) n++;
  if (filters.minRating > 0) n++;
  return n;
}
import type { BoatTypeId } from './marketplace';

export type CaptainFilter = 'any' | 'captained' | 'bareboat';
export type SortOption = 'relevance' | 'price-asc' | 'price-desc' | 'rating' | 'length-desc';

export interface SearchFilterValues {
  types: BoatTypeId[];
  minPrice: string;
  maxPrice: string;
  guests: number;
  captain: CaptainFilter;
  minLength: string;
  fishing: boolean;
  overnight: boolean;
}
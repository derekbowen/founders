import type { SiteType } from './listing';

export type SortKey = 'recommended' | 'price-asc' | 'price-desc' | 'rating';

export type AmenityFilterKey = 'pets' | 'campfires' | 'water' | 'toilets' | 'showers' | 'hookups';

export interface SearchFilters {
  location: string;
  start: string;
  end: string;
  campers: number;
  siteTypes: SiteType[];
  minPrice: number;
  maxPrice: number;
  amenities: AmenityFilterKey[];
  vehicleLength: number;
  sort: SortKey;
}
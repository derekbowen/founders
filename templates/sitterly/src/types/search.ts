import { AgeGroup, Certification } from './sitter';

export type SortKey = 'recommended' | 'price-asc' | 'price-desc' | 'rating' | 'experience';

export interface SearchFilters {
  priceRange: [number, number];
  ageGroups: AgeGroup[];
  certifications: Certification[];
  languages: string[];
  nonSmoker: boolean;
  hasCar: boolean;
  availableTonight: boolean;
}
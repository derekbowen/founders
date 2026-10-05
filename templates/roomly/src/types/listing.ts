export type RoomType = 'private' | 'studio' | 'shared' | 'whole';
export type GenderPreference = 'any' | 'female' | 'male';
export type TransitType = 'metro' | 'tram' | 'bus' | 'train' | 'bike';

export interface Flatmate {
  name: string;
  age: number;
  occupation: string;
}

export interface TransitLine {
  name: string;
  type: TransitType;
  minutes: number;
}

export interface Listing {
  id: string;
  title: string;
  description: string;
  city: string;
  neighborhood: string;
  lat: number;
  lng: number;
  roomType: RoomType;
  rent: number;
  billsIncluded: boolean;
  billsEstimate: number;
  billsNote: string;
  deposit: number;
  minStay: number;
  maxStay: number | null;
  availableFrom: string;
  furnished: boolean;
  roomSize: number;
  flatSize: number;
  bedrooms: number;
  bathrooms: number;
  roomFeatures: string[];
  flatFeatures: string[];
  flatmates: Flatmate[];
  genderPreference: GenderPreference;
  petsAllowed: boolean;
  smokingAllowed: boolean;
  couplesAllowed: boolean;
  houseRules: string[];
  neighborhoodInfo: string;
  transit: TransitLine[];
  images: string[];
  landlordId: string;
  createdAt: string;
  idealFor: string[];
}

export interface ListingDraft {
  title: string;
  description: string;
  roomType: RoomType | '';
  roomSize: string;
  furnished: boolean;
  roomFeatures: string[];
  bedrooms: string;
  bathrooms: string;
  flatSize: string;
  flatFeatures: string[];
  flatmates: Flatmate[];
  genderPreference: GenderPreference;
  petsAllowed: boolean;
  smokingAllowed: boolean;
  couplesAllowed: boolean;
  houseRules: string;
  rent: string;
  deposit: string;
  billsIncluded: boolean;
  billsEstimate: string;
  billsNote: string;
  availableFrom: string;
  minStay: number;
  maxStay: number | null;
  city: string;
  neighborhood: string;
  street: string;
  transit: TransitLine[];
  images: string[];
}

export type ListingSort = 'recommended' | 'rent-asc' | 'rent-desc' | 'newest' | 'available';

export interface SearchFilters {
  city: string;
  minRent: number;
  maxRent: number;
  roomTypes: RoomType[];
  billsIncluded: boolean;
  furnished: boolean;
  maxMinStay: number;
  flatmates: 'any' | 'none' | 'few' | 'many';
  petsAllowed: boolean;
  gender: GenderPreference;
  availableBy: string;
}
export type ServiceId = 'boarding' | 'house-sitting' | 'drop-in' | 'dog-walking';
export type UnitType = 'night' | 'fixed';
export type PetSize = 'small' | 'medium' | 'large' | 'giant';
export type YardType = 'fenced' | 'unfenced' | 'none';

export interface ServiceMeta {
  id: ServiceId;
  name: string;
  unitType: UnitType;
  unitLabel: string;
  shortDescription: string;
}

export interface PriceVariant {
  id: string;
  label: string;
  description: string;
  price: number;
  durationMinutes?: number;
}

export interface ListingService {
  serviceId: ServiceId;
  variants: PriceVariant[];
  extraPetFee: number;
}

export interface Sitter {
  id: string;
  name: string;
  firstName: string;
  memberSince: string;
  responseTime: string;
  repeatClients: number;
  experienceYears: number;
  verified: boolean;
  languages: string[];
  bio: string;
}

export interface HomeDetails {
  homeType: 'House' | 'Apartment' | 'Townhouse' | 'Condo' | 'Loft';
  yard: YardType;
  childrenAtHome: string;
  otherPets: string | null;
  fullTimeHome: boolean;
  smokeFree: boolean;
}

export interface Listing {
  id: string;
  title: string;
  tagline: string;
  neighborhood: string;
  city: string;
  lat: number;
  lng: number;
  photos: string[];
  rating: number;
  reviewCount: number;
  services: ListingService[];
  home: HomeDetails;
  acceptedSizes: PetSize[];
  acceptsCats: boolean;
  maxPets: number;
  blockedDayOffsets: number[];
  highlights: string[];
  sitter: Sitter;
}

export interface Review {
  id: string;
  listingId: string;
  author: string;
  petName: string;
  petDescription: string;
  rating: number;
  date: string;
  text: string;
}
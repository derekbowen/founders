export type ServiceId = 'boarding' | 'house-sitting' | 'drop-in' | 'dog-walking';
export type UnitType = 'night' | 'fixed';
export type PetSize = 'small' | 'medium' | 'large' | 'giant';
export type YardType = 'fenced' | 'unfenced' | 'none';

export interface ServiceDefinition {
  id: ServiceId;
  label: string;
  description: string;
  unitType: UnitType;
  unitLabel: string;
}

export interface PriceVariation {
  id: string;
  label: string;
  price: number;
  durationMins?: number;
}

export interface ServiceOffering {
  serviceId: ServiceId;
  variations: PriceVariation[];
  extraPetPrice: number;
}

export interface Sitter {
  id: string;
  name: string;
  firstName: string;
  avatar: string;
  bio: string;
  memberSince: string;
  responseTime: string;
  repeatClients: number;
  yearsExperience: number;
  verified: boolean;
}

export interface HomeDetails {
  homeType: 'House' | 'Apartment' | 'Townhouse';
  yard: YardType;
  children: string;
  otherPets: string | null;
  smokeFree: boolean;
  homeFullTime: boolean;
}

export interface Listing {
  id: string;
  title: string;
  sitter: Sitter;
  neighborhood: string;
  city: string;
  lat: number;
  lng: number;
  rating: number;
  reviewCount: number;
  photos: string[];
  description: string;
  highlights: string[];
  services: ServiceOffering[];
  home: HomeDetails;
  petSizes: PetSize[];
  acceptsCats: boolean;
  maxPets: number;
  /** Days from today that are unavailable */
  blockedDays: number[];
}

export interface Review {
  id: string;
  listingId: string;
  author: string;
  petName: string;
  petType: string;
  rating: number;
  date: string;
  text: string;
}

export interface Pet {
  id: string;
  name: string;
  species: 'Dog' | 'Cat';
  breed: string;
  age: string;
  size: PetSize;
  photo?: string;
  careNotes: string;
}

export type TransactionStatus = 'requested' | 'confirmed' | 'in-care' | 'completed' | 'cancelled';
export type TransactionRole = 'customer' | 'provider';

export interface Message {
  id: string;
  from: 'me' | 'them' | 'system';
  text: string;
  time: string;
}

export interface PhotoUpdate {
  id: string;
  image: string;
  caption: string;
  time: string;
}

export interface Transaction {
  id: string;
  role: TransactionRole;
  listingId?: string;
  listingTitle: string;
  counterpartName: string;
  counterpartAvatar?: string;
  petNames: string[];
  petPhoto?: string;
  serviceId: ServiceId;
  variationLabel: string;
  unitPrice: number;
  extraPetPrice: number;
  /** Day offset from today */
  startDay: number;
  /** Day offset from today (night services only) */
  endDay?: number;
  time?: string;
  pets: number;
  status: TransactionStatus;
  unread: boolean;
  messages: Message[];
  photoUpdates: PhotoUpdate[];
}

export interface User {
  id: string;
  name: string;
  firstName: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  memberSince: string;
  avatar?: string;
}
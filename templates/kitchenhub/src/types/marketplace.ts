export type EquipmentKey = 'convection-oven' | 'walk-in-cooler' | 'mixer' | 'fryer' | 'hood';
export type StorageType = 'dry' | 'cold' | 'frozen';
export type CertificationKey =
'health-permit' |
'fire-inspection' |
'servsafe' |
'kosher' |
'halal' |
'gluten-free' |
'organic';
export type SegmentKey = 'caterers' | 'food-trucks' | 'bakers' | 'meal-prep' | 'pop-ups';
export type City = 'Chicago' | 'Brooklyn' | 'Austin' | 'Los Angeles';
export type BookingStatus = 'requested' | 'approved' | 'in-session' | 'completed' | 'cancelled';
export type SortKey = 'relevance' | 'price-asc' | 'price-desc' | 'rating';

export interface EquipmentItem {
  name: string;
  quantity?: number;
}

export interface EquipmentCategory {
  category: string;
  items: EquipmentItem[];
}

export interface StorageOption {
  type: StorageType;
  capacity: string;
  monthlyPrice: number;
}

export interface Listing {
  id: string;
  title: string;
  tagline: string;
  city: City;
  neighborhood: string;
  address: string;
  lat: number;
  lng: number;
  pricePerHour: number;
  minHours: number;
  cleaningFee: number;
  rating: number;
  reviewCount: number;
  images: string[];
  hostId: string;
  description: string;
  squareFeet: number;
  stations: number;
  useCases: SegmentKey[];
  keyEquipment: EquipmentKey[];
  equipment: EquipmentCategory[];
  storage: StorageOption[];
  certifications: CertificationKey[];
  access247: boolean;
  openHour: number;
  closeHour: number;
  rules: string[];
  featured: boolean;
}

export interface Host {
  id: string;
  name: string;
  business: string;
  email: string;
  avatar?: string;
  city: string;
  joined: string;
  bio: string;
  responseTime: string;
  responseRate: number;
  verified: boolean;
  languages: string[];
}

export interface Review {
  id: string;
  listingId: string;
  author: string;
  business: string;
  rating: number;
  date: string;
  body: string;
}

export interface Message {
  id: string;
  from: 'me' | 'them';
  text: string;
  at: string;
}

export interface TimelineEvent {
  label: string;
  at: string;
}

export interface Transaction {
  id: string;
  role: 'customer' | 'provider';
  listingId: string;
  counterpartName: string;
  counterpartBusiness: string;
  status: BookingStatus;
  date: string;
  startHour: number;
  hours: number;
  storage: StorageType[];
  messages: Message[];
  timeline: TimelineEvent[];
  checklistDone: string[];
}

export interface SearchFiltersState {
  city: City | 'all';
  query: string;
  use: SegmentKey | 'all';
  priceMin: number;
  priceMax: number;
  equipment: EquipmentKey[];
  storage: StorageType[];
  certifications: CertificationKey[];
  access247: boolean;
}

export interface DraftStorage {
  enabled: boolean;
  capacity: string;
  monthlyPrice: number;
}

export interface DaySchedule {
  day: string;
  open: boolean;
  start: number;
  end: number;
}

export interface ListingDraft {
  title: string;
  city: City | '';
  neighborhood: string;
  address: string;
  description: string;
  squareFeet: number;
  stations: number;
  useCases: SegmentKey[];
  equipment: EquipmentCategory[];
  storage: Record<StorageType, DraftStorage>;
  certifications: CertificationKey[];
  permitNumber: string;
  permitExpiry: string;
  insuranceRequired: boolean;
  pricePerHour: number;
  minHours: number;
  cleaningFee: number;
  access247: boolean;
  schedule: DaySchedule[];
  photos: string[];
}
import type { LucideIcon } from 'lucide-react';

export type BoatTypeId = 'pontoon' | 'sailboat' | 'yacht' | 'fishing' | 'jetski' | 'catamaran';
export type CaptainMode = 'required' | 'optional' | 'none';
export type PackageId = 'half' | 'full';
export type CancellationPolicyId = 'flexible' | 'moderate' | 'strict';

export interface BoatType {
  id: BoatTypeId;
  label: string;
  plural: string;
  description: string;
  icon: LucideIcon;
}

export interface Destination {
  id: string;
  name: string;
  region: string;
  image: string;
  blurb: string;
  lat: number;
  lng: number;
}

export interface Marina {
  name: string;
  address: string;
  lat: number;
  lng: number;
}

export interface ListingPricing {
  halfDay: number;
  fullDay: number;
  captainHalfDay: number;
  captainFullDay: number;
  fuelDeposit: number;
}

export interface ListingSpecs {
  make: string;
  model: string;
  length: number;
  capacity: number;
  engine: string;
  year: number;
  cabins: number;
}

export interface Listing {
  id: string;
  title: string;
  type: BoatTypeId;
  summary: string;
  description: string;
  images: string[];
  destinationId: string;
  marina: Marina;
  pricing: ListingPricing;
  captainMode: CaptainMode;
  captainId?: string;
  specs: ListingSpecs;
  fishingGear: boolean;
  overnight: boolean;
  included: string[];
  ownerId: string;
  rating: number;
  reviewCount: number;
  cancellation: CancellationPolicyId;
  blockedDates: string[];
}

export interface User {
  id: string;
  name: string;
  initials: string;
  role: 'owner' | 'captain' | 'renter';
  location: string;
  joined: string;
  bio: string;
  languages: string[];
  verified: boolean;
  responseTime: string;
  email?: string;
  phone?: string;
  yearsExperience?: number;
  license?: string;
  specialties?: string[];
}

export interface Review {
  id: string;
  listingId: string;
  authorName: string;
  authorInitials: string;
  date: string;
  rating: number;
  text: string;
}

export type TxStatus = 'requested' | 'confirmed' | 'on-the-water' | 'completed' | 'cancelled';

export interface Message {
  id: string;
  senderId: string;
  text: string;
  sentAt: string;
}

export interface ChecklistItem {
  id: string;
  label: string;
  done: boolean;
}

export interface Transaction {
  id: string;
  listingId: string;
  customerId: string;
  providerId: string;
  status: TxStatus;
  tripDate: string;
  pkg: PackageId;
  departure: string;
  withCaptain: boolean;
  guests: number;
  experience?: string;
  history: Partial<Record<TxStatus, string>>;
  messages: Message[];
  checklist: ChecklistItem[];
}

export interface NewTransactionInput {
  listingId: string;
  tripDate: string;
  pkg: PackageId;
  departure: string;
  withCaptain: boolean;
  guests: number;
  experience: string;
  message: string;
}
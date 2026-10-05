import type { LucideIcon } from 'lucide-react';

export type CategoryId =
'food' |
'outdoors' |
'culture' |
'workshops' |
'nightlife' |
'photography';

export type TimeOfDay = 'morning' | 'afternoon' | 'evening';

export interface Category {
  id: CategoryId;
  label: string;
  description: string;
  icon: LucideIcon;
}

export interface Destination {
  id: string;
  city: string;
  country: string;
  tagline: string;
  image: string;
  lat: number;
  lng: number;
}

export interface Host {
  id: string;
  name: string;
  avatar?: string;
  destinationId: string;
  headline: string;
  bio: string;
  languages: string[];
  joined: string;
  responseRate: number;
  responseTime: string;
  verified: boolean;
  localLegend: boolean;
  guestsHosted: number;
}

export interface ItineraryStep {
  time: string;
  title: string;
  description: string;
}

export interface MeetingPoint {
  name: string;
  address: string;
  lat: number;
  lng: number;
  instructions: string;
}

export interface Experience {
  id: string;
  title: string;
  destinationId: string;
  categoryId: CategoryId;
  hostId: string;
  image: string;
  gallery: string[];
  pricePerPerson: number;
  privateGroupPrice: number;
  durationHours: number;
  minGuests: number;
  maxGuests: number;
  languages: string[];
  timesOfDay: TimeOfDay[];
  departureTimes: string[];
  wheelchairAccessible: boolean;
  rating: number;
  reviewCount: number;
  summary: string;
  description: string;
  itinerary: ItineraryStep[];
  included: string[];
  notIncluded: string[];
  whatToBring: string[];
  meetingPoint: MeetingPoint;
}

export interface Review {
  id: string;
  experienceId: string;
  author: string;
  country: string;
  date: string;
  rating: number;
  text: string;
}

export type TransactionStatus =
'booked' |
'confirmed' |
'completed' |
'cancelled' |
'refunded';

export type TransactionRole = 'trip' | 'hosting';

export interface Message {
  id: string;
  from: 'me' | 'them';
  text: string;
  at: string;
}

export interface Transaction {
  id: string;
  role: TransactionRole;
  experienceId: string;
  counterpartName: string;
  date: string;
  time: string;
  guests: number;
  privateGroup: boolean;
  total: number;
  status: TransactionStatus;
  createdAt: string;
  messages: Message[];
}

export interface Departure {
  time: string;
  seatsLeft: number;
  capacity: number;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}
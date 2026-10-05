export type SpaceType =
'closet' |
'room' |
'basement' |
'attic' |
'garage' |
'shed' |
'parking';

export type AccessFrequency = 'anytime' | 'daily' | 'weekly' | 'by-appointment';

export interface Host {
  id: string;
  name: string;
  avatar?: string;
  city: string;
  joined: string;
  responseTime: string;
  responseRate: number;
  verified: boolean;
  bio: string;
}

export interface Listing {
  id: string;
  title: string;
  type: SpaceType;
  neighborhood: string;
  city: string;
  lat: number;
  lng: number;
  /** Monthly price shown to customers. Booked by the day (monthly / 30). */
  monthlyPrice: number;
  deposit: number;
  width: number;
  length: number;
  height?: number;
  images: string[];
  rating: number;
  reviewCount: number;
  hostId: string;
  climateControlled: boolean;
  access247: boolean;
  groundFloor: boolean;
  vehicleStorage: boolean;
  security: string[];
  accessHours: string;
  accessFrequency: AccessFrequency;
  accessNotes: string;
  prohibited: string[];
  description: string;
  minDays: number;
}

export interface Review {
  id: string;
  listingId: string;
  author: string;
  date: string;
  rating: number;
  text: string;
}

export type TransactionStatus =
'requested' |
'accepted' |
'active' |
'ending' |
'completed' |
'declined';

export type TransactionRole = 'storing' | 'hosting';

export interface ChatMessage {
  id: string;
  from: 'me' | 'them' | 'system';
  text: string;
  time: string;
}

export interface AccessLogEntry {
  id: string;
  time: string;
  action: 'Entry' | 'Exit';
  note: string;
}

export interface Transaction {
  id: string;
  role: TransactionRole;
  listingId: string;
  counterpartName: string;
  counterpartAvatar?: string;
  status: TransactionStatus;
  moveIn: string;
  moveOut: string | null;
  monthlyPrice: number;
  deposit: number;
  inventory: string[];
  messages: ChatMessage[];
  accessLog: AccessLogEntry[];
  updatedAt: string;
  unread: boolean;
}

export interface CurrentUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
}
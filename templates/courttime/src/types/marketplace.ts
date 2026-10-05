export type SportId = 'tennis' | 'pickleball' | 'padel' | 'basketball' | 'soccer' | 'volleyball';
export type Setting = 'indoor' | 'outdoor';
export type AmenityId =
'lights' |
'lockers' |
'parking' |
'proShop' |
'showers' |
'water' |
'seating' |
'wifi' |
'cafe';

export interface Sport {
  id: SportId;
  label: string;
  image: string;
  blurb: string;
}

export interface Amenity {
  id: AmenityId;
  label: string;
}

export interface AddOn {
  id: string;
  label: string;
  description: string;
  price: number;
  per: 'hour' | 'booking';
  kind: 'equipment' | 'service';
}

export interface OpenPlaySession {
  id: string;
  startHour: number;
  durationHours: number;
  level: string;
  seatsTaken: number;
}

export interface OpenPlayConfig {
  seatsTotal: number;
  pricePerSeat: number;
  sessions: OpenPlaySession[];
}

export interface ListingLocation {
  neighborhood: string;
  address: string;
  lat: number;
  lng: number;
}

export interface Listing {
  id: string;
  title: string;
  clubName: string;
  hostId: string;
  sport: SportId;
  surface: string;
  setting: Setting;
  lights: boolean;
  amenities: AmenityId[];
  pricePerHour: number;
  minHours: number;
  maxHours: number;
  capacity: number;
  images: string[];
  location: ListingLocation;
  rating: number;
  reviewCount: number;
  description: string;
  houseRules: string[];
  cancellationPolicy: string;
  addOns: AddOn[];
  hours: {open: number;close: number;};
  openPlay?: OpenPlayConfig;
  featured?: boolean;
}

export type SlotStatus = 'available' | 'booked' | 'openplay' | 'past';

export interface HourSlot {
  hour: number;
  status: SlotStatus;
}

export interface OpenPlaySessionInstance extends OpenPlaySession {
  seatsTotal: number;
  seatsLeft: number;
  pricePerSeat: number;
  isPast: boolean;
}

export interface User {
  id: string;
  name: string;
  role: 'player' | 'host' | 'both';
  bio: string;
  location: string;
  joined: string;
  sports: SportId[];
  verified: boolean;
  responseTime?: string;
}

export interface Review {
  id: string;
  listingId: string;
  authorName: string;
  rating: number;
  dateLabel: string;
  text: string;
}

export type TransactionStatus = 'booked' | 'confirmed' | 'played' | 'cancelled' | 'no-show';
export type TransactionRole = 'customer' | 'provider';
export type BookingType = 'private' | 'openplay';

export interface ChatMessage {
  id: string;
  fromMe: boolean;
  text: string;
  timeLabel: string;
}

export interface Transaction {
  id: string;
  listingId: string;
  role: TransactionRole;
  counterpartyId: string;
  dayOffset: number;
  startHour: number;
  hours: number;
  bookingType: BookingType;
  seats: number;
  addOnIds: string[];
  players: string[];
  status: TransactionStatus;
  messages: ChatMessage[];
}

export interface BookingDraft {
  listingId: string;
  dateKey: string;
  startHour: number;
  hours: number;
  bookingType: BookingType;
  seats: number;
  sessionId: string | null;
  addOnIds: string[];
}

export interface PriceLine {
  label: string;
  amount: number;
}

export interface PriceQuote {
  lines: PriceLine[];
  subtotal: number;
  fee: number;
  total: number;
}

export type SortOption = 'recommended' | 'price-asc' | 'price-desc' | 'rating';

export interface SearchFilters {
  sports: SportId[];
  query: string;
  dateKey: string;
  time: number | null;
  setting: 'any' | Setting;
  surfaces: string[];
  lights: boolean;
  equipment: boolean;
  openPlayOnly: boolean;
  priceMin: number | null;
  priceMax: number | null;
}

export interface NavLinkItem {
  label: string;
  to: string;
}

export interface NavGroup {
  title: string;
  links: NavLinkItem[];
}

export interface LegalSection {
  heading: string;
  body: string;
}

export interface TimelineStep {
  label: string;
  detail: string;
  state: 'done' | 'current' | 'upcoming' | 'cancelled';
}
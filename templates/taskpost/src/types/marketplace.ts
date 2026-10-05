export type UserRole = 'customer' | 'pro';
export type CategoryId = 'handyman' | 'moving' | 'cleaning' | 'assembly' | 'yard';
export type JobSize = 'small' | 'medium' | 'large';
export type Timing = 'specific' | 'flexible' | 'asap';
export type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'any';
export type JobStatus = 'open' | 'in_progress' | 'completed';

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
  examples: string[];
  image: string;
  typicalBudget: [number, number];
}

export interface Review {
  id: string;
  authorId: string;
  rating: number;
  text: string;
  date: string;
  jobTitle: string;
}

export interface User {
  id: string;
  name: string;
  roles: UserRole[];
  avatar?: string;
  location: string;
  memberSince: string;
  bio: string;
  verified: boolean;
  headline?: string;
  skills?: string[];
  categories?: CategoryId[];
  rating?: number;
  reviewCount?: number;
  completedJobs?: number;
  responseTime?: string;
  jobsPosted?: number;
  reviews: Review[];
}

export interface Neighborhood {
  name: string;
  lat: number;
  lng: number;
  distanceMi: number;
}

export interface Job {
  id: string;
  title: string;
  categoryId: CategoryId;
  description: string;
  details: string[];
  photos: string[];
  area: string;
  city: string;
  lat: number;
  lng: number;
  distanceMi: number;
  preferredDate: string;
  timing: Timing;
  timeOfDay: TimeOfDay;
  budgetMin: number;
  budgetMax: number;
  size: JobSize;
  customerId: string;
  offerCount: number;
  postedAt: string;
  status: JobStatus;
}

export type TransactionStatus =
'offer_sent' |
'countered' |
'accepted' |
'paid' |
'completed' |
'declined';

export type OfferState = 'active' | 'superseded' | 'accepted' | 'declined';

export interface Offer {
  id: string;
  by: UserRole;
  amount: number;
  earliestDate: string;
  message: string;
  createdAt: string;
  state: OfferState;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  createdAt: string;
}

export type TransactionEventType =
'offer' |
'counter' |
'accepted' |
'declined' |
'paid' |
'marked_done' |
'completed' |
'reviewed';

export interface TransactionEvent {
  id: string;
  type: TransactionEventType;
  label: string;
  createdAt: string;
}

export interface Transaction {
  id: string;
  jobId: string;
  customerId: string;
  proId: string;
  status: TransactionStatus;
  offers: Offer[];
  messages: Message[];
  events: TransactionEvent[];
  proMarkedDone: boolean;
  review?: {rating: number;text: string;};
  updatedAt: string;
}

export interface PayoutDetails {
  holder: string;
  bankName: string;
  last4: string;
  schedule: 'weekly' | 'daily';
}

export interface CurrentUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  roles: UserRole[];
  payout?: PayoutDetails;
}

export interface OfferInput {
  amount: number;
  earliestDate: string;
  message: string;
}

export interface NewJobInput {
  title: string;
  description: string;
  categoryId: CategoryId;
  size: JobSize;
  area: string;
  accessNotes: string;
  timing: Timing;
  preferredDate: string;
  timeOfDay: TimeOfDay;
  budgetMin: number;
  budgetMax: number;
  photos: string[];
}

export type DateWindow = 'any' | '7' | '14' | '30';
export type SortOption =
'newest' |
'date_soon' |
'budget_high' |
'budget_low' |
'nearest' |
'fewest_offers';

export interface SearchFilters {
  q: string;
  categories: CategoryId[];
  budgetMin: number;
  budgetMax: number;
  date: DateWindow;
  maxDistance: number;
  sizes: JobSize[];
}

export type FilterKey = 'category' | 'budget' | 'date' | 'distance' | 'size';
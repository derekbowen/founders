export type CategoryId =
"photographers" |
"venues" |
"florists" |
"caterers" |
"music" |
"planners" |
"attire" |
"cakes";

export interface Category {
  id: CategoryId;
  label: string;
  singular: string;
  description: string;
  image: string;
}

export interface VendorPackage {
  name: string;
  price: number;
  description: string;
  includes: string[];
}

export interface Vendor {
  id: string;
  slug: string;
  name: string;
  category: CategoryId;
  ownerId: string;
  tagline: string;
  description: string;
  city: string;
  lat: number;
  lng: number;
  startingPrice: number;
  priceUnit: string;
  rating: number;
  reviewCount: number;
  styles: string[];
  languages: string[];
  guestCapacity: {min: number;max: number;} | null;
  serviceArea: string[];
  travelRadius: number;
  awards: string[];
  packages: VendorPackage[];
  images: string[];
  responseTime: string;
  yearsInBusiness: number;
  unavailableDates: string[];
}

export interface Owner {
  id: string;
  name: string;
  role: string;
  city: string;
  memberSince: string;
  bio: string;
  languages: string[];
}

export interface Review {
  id: string;
  vendorId: string;
  couple: string;
  weddingDate: string;
  location: string;
  rating: number;
  text: string;
}

export type InquiryStatus = "inquiry-sent" | "replied" | "booked-offline" | "closed";

export type ParticipantRole = "couple" | "vendor";

export interface Message {
  id: string;
  from: ParticipantRole;
  text: string;
  sentAt: string;
}

export interface TimelineEvent {
  id: string;
  status: InquiryStatus | "message";
  label: string;
  at: string;
}

export interface Conversation {
  id: string;
  vendorId: string;
  /** Which side of the conversation the signed-in user is on */
  role: ParticipantRole;
  coupleName: string;
  email: string;
  weddingDate: string;
  guestCount: number;
  budget: string;
  status: InquiryStatus;
  unread: boolean;
  createdAt: string;
  messages: Message[];
  timeline: TimelineEvent[];
}

export interface RealWedding {
  id: string;
  couple: string;
  location: string;
  season: string;
  style: string;
  image: string;
  excerpt: string;
  vendorIds: string[];
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  /** Present when the user also runs a vendor business */
  ownerId?: string;
}

export interface SignupInput {
  firstName: string;
  lastName: string;
  email: string;
  accountType: ParticipantRole;
}

export interface NewInquiryInput {
  vendorId: string;
  partnerOne: string;
  partnerTwo: string;
  email: string;
  weddingDate: string;
  guestCount: number;
  budget: string;
  message: string;
}
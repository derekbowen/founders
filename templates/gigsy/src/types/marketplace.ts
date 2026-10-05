export type CategoryId = 'design' | 'development' | 'writing' | 'video' | 'marketing';

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
  image: string;
  skills: string[];
}

export interface User {
  id: string;
  name: string;
  avatar?: string;
  headline: string;
  location: string;
  country: string;
  languages: string[];
  memberSince: string;
  bio: string;
  rating: number;
  reviewCount: number;
  responseTime: string;
  completedJobs: number;
  isFreelancer: boolean;
  skills: string[];
  verified?: boolean;
  company?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Listing {
  id: string;
  title: string;
  freelancerId: string;
  category: CategoryId;
  skills: string[];
  startingPrice: number;
  deliveryDays: number;
  rating: number;
  reviewCount: number;
  cover: string;
  gallery: string[];
  summary: string;
  description: string[];
  includes: string[];
  faq: FaqItem[];
  languages: string[];
  location: string;
  featured?: boolean;
}

export interface Review {
  id: string;
  listingId: string;
  freelancerId: string;
  authorName: string;
  authorAvatar?: string;
  authorRole: string;
  rating: number;
  date: string;
  text: string;
}

export type TxStatus =
'quote-requested' |
'offer-sent' |
'countered' |
'accepted' |
'delivered' |
'completed' |
'declined';

export type TxRole = 'client' | 'freelancer';

export interface Offer {
  id: string;
  from: TxRole;
  price: number;
  deliveryDate: string;
  scope: string;
  createdAt: string;
  status: 'pending' | 'accepted' | 'declined' | 'countered';
}

export interface Message {
  id: string;
  authorId: string;
  text: string;
  at: string;
}

export interface TimelineEvent {
  id: string;
  status: TxStatus;
  label: string;
  at: string;
}

export interface DeliveryFile {
  id: string;
  name: string;
  size: string;
  at: string;
}

export interface ProjectBrief {
  description: string;
  budgetMin: number;
  budgetMax: number;
  deadline: string;
  attachments: string[];
}

export interface Transaction {
  id: string;
  listingId: string;
  clientId: string;
  freelancerId: string;
  status: TxStatus;
  brief: ProjectBrief;
  offers: Offer[];
  messages: Message[];
  timeline: TimelineEvent[];
  deliveries: DeliveryFile[];
  deliveryNote?: string;
  updatedAt: string;
  unread?: boolean;
}

export interface ListingDraft {
  title: string;
  summary: string;
  description: string;
  category: CategoryId | '';
  skills: string[];
  startingPrice: string;
  deliveryDays: string;
  revisions: string;
  portfolio: string[];
  faq: FaqItem[];
}
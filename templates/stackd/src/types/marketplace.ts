export type CategoryId =
'ebooks' |
'printables' |
'templates' |
'photo-packs' |
'audio' |
'courses';

export type FileType = 'PDF' | 'ZIP' | 'MP3' | 'XLSX';

export type LicenseType = 'personal' | 'commercial';

export interface Category {
  id: CategoryId;
  name: string;
  blurb: string;
  /** Pastel tile color (hex) */
  tint: string;
}

export interface ListingFile {
  name: string;
  size: string;
}

export interface Listing {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  creatorId: string;
  category: CategoryId;
  /** Fixed price, or suggested price when payWhatYouWant is true */
  price: number;
  payWhatYouWant: boolean;
  /** Minimum accepted price for pay-what-you-want listings */
  minPrice: number;
  fileType: FileType;
  fileSize: string;
  format: string;
  files: ListingFile[];
  cover: string;
  included: string[];
  description: string[];
  rating: number;
  reviewCount: number;
  sales: number;
  createdAt: string;
  tags: string[];
  license: LicenseType;
}

export interface Creator {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  headline: string;
  bio: string;
  location: string;
  joinedAt: string;
  followers: number;
  tint: string;
}

export interface Review {
  id: string;
  listingSlug: string;
  author: string;
  rating: number;
  date: string;
  text: string;
}

export type OrderStatus = 'purchased' | 'downloaded' | 'refunded';

export interface Message {
  id: string;
  from: 'me' | 'them';
  text: string;
  sentAt: string;
}

export interface Order {
  id: string;
  listingSlug: string;
  /** 'buyer' = in my library, 'seller' = one of my sales */
  role: 'buyer' | 'seller';
  counterpartyName: string;
  amount: number;
  createdAt: string;
  status: OrderStatus;
  paymentMethod: string;
  email: string;
  messages: Message[];
}

export interface LegalSection {
  heading: string;
  body: string[];
}

export type SortOption =
'relevance' |
'bestselling' |
'newest' |
'price-asc' |
'price-desc' |
'rating';

export interface SearchFilters {
  query: string;
  category: CategoryId | 'all';
  priceMin: string;
  priceMax: string;
  pricing: 'all' | 'free' | 'paid';
  fileTypes: FileType[];
  minRating: number;
  sort: SortOption;
}
export type CategoryId = 'ceramics' | 'jewelry' | 'candles' | 'textiles' | 'woodwork' | 'prints';

export interface Category {
  id: CategoryId;
  name: string;
  blurb: string;
  image: string;
}

export interface Maker {
  id: string;
  shopName: string;
  ownerName: string;
  portrait: string;
  location: string;
  state: string;
  tagline: string;
  bio: string;
  joined: string;
  rating: number;
  reviewCount: number;
  sales: number;
  responseTime: string;
  pickupArea: string;
}

export interface Variation {
  name: string;
  options: string[];
}

export interface Listing {
  id: string;
  title: string;
  makerId: string;
  categoryId: CategoryId;
  price: number;
  image: string;
  stock: number;
  materials: string[];
  colors: string[];
  madeToOrder: boolean;
  processingTime: string;
  shipsFrom: string;
  shippingPrice: number;
  localPickup: boolean;
  description: string;
  care: string;
  variations: Variation[];
  rating: number;
  reviewCount: number;
  createdAt: string;
  shippingDisabled?: boolean;
}

export interface ListingDraft {
  title: string;
  description: string;
  care: string;
  categoryId: CategoryId | '';
  materials: string[];
  colors: string[];
  madeToOrder: boolean;
  stock: string;
  variations: Variation[];
  price: string;
  shipping: boolean;
  shippingPrice: string;
  processingTime: string;
  localPickup: boolean;
  photos: string[];
}

export interface Review {
  id: string;
  listingId: string;
  makerId: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  text: string;
}

export interface Story {
  id: string;
  makerId: string;
  title: string;
  excerpt: string;
  readTime: string;
}

export interface GiftGuide {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  to: string;
}

export type OrderStatus = 'purchased' | 'shipped' | 'delivered' | 'received' | 'disputed' | 'cancelled';

export type DeliveryMethod = 'shipping' | 'pickup';

export interface OrderEvent {
  status: OrderStatus;
  at: string;
  note?: string;
}

export interface OrderMessage {
  id: string;
  from: 'me' | 'them';
  text: string;
  at: string;
}

export interface Address {
  fullName: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface Order {
  id: string;
  role: 'purchase' | 'sale';
  listingId: string;
  quantity: number;
  selections: Record<string, string>;
  unitPrice: number;
  deliveryFee: number;
  deliveryMethod: DeliveryMethod;
  status: OrderStatus;
  carrier?: string;
  trackingNumber?: string;
  counterparty: {name: string;location: string;};
  createdAt: string;
  events: OrderEvent[];
  messages: OrderMessage[];
  shippingAddress?: Address;
  giftNote?: string;
}

export interface CartItem {
  key: string;
  listingId: string;
  quantity: number;
  selections: Record<string, string>;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  shopId: string;
  shippingAddress: Address;
  payout: {accountHolder: string;bankLast4: string;connected: boolean;};
}
export type CategoryId = 'food-beverage' | 'home' | 'beauty' | 'apparel' | 'stationery' | 'pet';

export type ProductValue = 'organic' | 'vegan' | 'women-owned';

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
  image: string;
}

export interface PriceTier {
  minCases: number;
  /** null = open-ended (e.g. 10+ cases) */
  maxCases: number | null;
  /** Wholesale price per unit at this tier, USD */
  unitPrice: number;
}

export interface Product {
  id: string;
  title: string;
  brandId: string;
  categoryId: CategoryId;
  sku: string;
  unitDescription: string;
  msrp: number;
  casePack: number;
  tiers: PriceTier[];
  minOrderCases: number;
  stockCases: number;
  leadTime: string;
  leadTimeDays: number;
  madeIn: string;
  shipsFrom: string;
  values: ProductValue[];
  description: string;
  highlights: string[];
  rating: number;
  reviewCount: number;
  image: string;
  listedAt: string;
  restockNote?: string;
}

export interface Brand {
  id: string;
  name: string;
  tagline: string;
  location: string;
  state: string;
  founded: number;
  ownerName: string;
  story: string;
  values: ProductValue[];
  rating: number;
  reviewCount: number;
  retailerCount: number;
  minOrderValue: number;
  responseTime: string;
  monogramColor: string;
}

export interface Review {
  id: string;
  productId: string;
  brandId: string;
  author: string;
  store: string;
  storeType: string;
  location: string;
  rating: number;
  date: string;
  body: string;
}

export type OrderStatus = 'Ordered' | 'Confirmed' | 'Shipped' | 'Delivered' | 'Received' | 'Disputed';

export type OrderRole = 'purchase' | 'sale';

export interface OrderEvent {
  status: OrderStatus;
  at: string;
  note?: string;
}

export interface OrderMessage {
  id: string;
  from: 'me' | 'them';
  author: string;
  body: string;
  sentAt: string;
}

export interface Order {
  id: string;
  role: OrderRole;
  productId: string;
  cases: number;
  unitPrice: number;
  shipping: number;
  status: OrderStatus;
  placedAt: string;
  counterparty: {
    name: string;
    business: string;
    location: string;
  };
  tracking?: {
    carrier: string;
    number: string;
    eta: string;
  };
  history: OrderEvent[];
  messages: OrderMessage[];
}

export interface CartItem {
  productId: string;
  cases: number;
}

export interface CurrentUser {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  businessName: string;
  businessType: string;
  location: string;
  ownedBrandId: string;
}
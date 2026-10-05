export type CategoryId =
"vegetables" |
"fruit" |
"eggs-dairy" |
"meat" |
"honey" |
"bakery" |
"flowers";

export type Unit = "lb" | "dozen" | "half dozen" | "bunch" | "pint" | "jar" | "loaf" | "each";

export type Practice =
"Certified organic" |
"No-spray" |
"Heirloom" |
"Pasture-raised" |
"Grass-fed" |
"Regenerative" |
"Free-range" |
"Raw & unfiltered" |
"Wood-fired" |
"Small batch";

export type FulfillmentType = "pickup" | "delivery";

export interface Category {
  id: CategoryId;
  label: string;
  blurb: string;
  image: string;
}

export interface PickupWindow {
  day: string;
  window: string;
  location: string;
}

export interface DeliveryZone {
  name: string;
  fee: number;
  minOrder: number;
  days: string;
}

export interface Farm {
  id: string;
  name: string;
  tagline: string;
  owner: string;
  location: string;
  address: string;
  distanceMi: number;
  coords: {x: number;y: number;};
  coverImage: string;
  shortStory: string;
  story: string[];
  since: number;
  acres: number;
  practices: Practice[];
  pickup: PickupWindow[];
  deliveryZones: DeliveryZone[];
  rating: number;
  reviewCount: number;
  responseTime: string;
  pickupInstructions: string;
}

export interface Product {
  id: string;
  title: string;
  farmId: string;
  category: CategoryId;
  price: number;
  unit: Unit;
  stock: number;
  images: string[];
  description: string;
  practices: Practice[];
  organic: boolean;
  fulfillment: FulfillmentType[];
  inSeason: boolean;
  harvestNote: string;
  rating: number;
  reviewCount: number;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  text: string;
}

export type OrderStatus = "ordered" | "ready" | "out-for-delivery" | "received" | "cancelled";

export interface OrderFulfillment {
  type: FulfillmentType;
  /** Pickup slot label or delivery window label */
  slot: string;
  /** Pickup location or delivery address */
  place: string;
}

export interface TimelineEvent {
  status: OrderStatus;
  at: string;
  note?: string;
}

export interface ChatMessage {
  id: string;
  from: "me" | "them";
  text: string;
  at: string;
}

export interface Order {
  id: string;
  role: "order" | "sale";
  productId: string;
  quantity: number;
  subtotal: number;
  fees: number;
  total: number;
  status: OrderStatus;
  fulfillment: OrderFulfillment;
  counterpart: string;
  placedAt: string;
  timeline: TimelineEvent[];
  messages: ChatMessage[];
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface User {
  name: string;
  email: string;
  phone: string;
  farmId: string | null;
}
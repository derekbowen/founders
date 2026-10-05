import type { ServiceId } from './listing';

export type TransactionStatus = 'requested' | 'confirmed' | 'in-care' | 'completed' | 'cancelled';
export type TransactionRole = 'customer' | 'provider';

export interface ChatMessage {
  id: string;
  from: 'me' | 'them';
  text: string;
  time: string;
}

export interface PhotoUpdate {
  id: string;
  image: string;
  caption: string;
  time: string;
}

export interface Transaction {
  id: string;
  role: TransactionRole;
  status: TransactionStatus;
  listingId: string;
  counterpartName: string;
  serviceId: ServiceId;
  variantId: string;
  start: string;
  end?: string;
  sessionTime?: string;
  petNames: string[];
  createdAt: string;
  messages: ChatMessage[];
  photoUpdates: PhotoUpdate[];
}
import type { BookingMode } from './listing';

export type TxStatus = 'requested' | 'confirmed' | 'checked-in' | 'completed' | 'cancelled';

export interface TxMessage {
  id: string;
  senderId: string;
  text: string;
  at: string;
}

export interface TxEvent {
  status: TxStatus;
  at: string;
}

export interface Transaction {
  id: string;
  listingId: string;
  customerId: string;
  providerId: string;
  status: TxStatus;
  date: string;
  mode: BookingMode;
  start: string;
  end: string;
  seats: number;
  doorCode: string;
  companyName?: string;
  history: TxEvent[];
  messages: TxMessage[];
}
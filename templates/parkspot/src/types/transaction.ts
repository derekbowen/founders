import type { UnitType, VehicleSize } from './listing';

export type TransactionStatus = 'Requested' | 'Confirmed' | 'Active' | 'Completed' | 'Cancelled';

export type InboxTab = 'parking' | 'hosting';

export interface Message {
  id: string;
  senderId: string;
  text: string;
  sentAt: string;
}

export interface TimelineEvent {
  id: string;
  label: string;
  at: string;
}

export interface Transaction {
  id: string;
  listingId: string;
  customerId: string;
  providerId: string;
  status: TransactionStatus;
  arrive: string;
  leave: string;
  unit: UnitType;
  plate: string;
  vehicle: string;
  vehicleSize: VehicleSize;
  createdAt: string;
  messages: Message[];
  timeline: TimelineEvent[];
}

export interface NewTransactionInput {
  listingId: string;
  customerId: string;
  arrive: string;
  leave: string;
  unit: UnitType;
  plate: string;
  vehicle: string;
  vehicleSize: VehicleSize;
  message?: string;
}
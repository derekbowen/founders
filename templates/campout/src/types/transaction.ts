export type TransactionRole = 'trip' | 'hosting';

export type TransactionStatus = 'requested' | 'booked' | 'checked-in' | 'completed' | 'cancelled';

export interface Message {
  id: string;
  fromMe: boolean;
  text: string;
  at: string;
}

export interface TimelineEvent {
  label: string;
  at: string;
}

export interface Transaction {
  id: string;
  role: TransactionRole;
  listingId: string;
  otherUserId: string;
  status: TransactionStatus;
  start: string;
  end: string;
  campers: number;
  vehicles: number;
  total: number;
  arrivalTime: string;
  updatedAt: string;
  messages: Message[];
  timeline: TimelineEvent[];
}
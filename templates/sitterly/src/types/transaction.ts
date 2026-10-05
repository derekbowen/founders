import { CareTypeId } from './sitter';

export type TxStatus = 'Requested' | 'Confirmed' | 'In progress' | 'Completed' | 'Cancelled';
export type TxKind = 'booking' | 'job';

export interface Child {
  name: string;
  age: string;
}

export interface Message {
  id: string;
  from: 'me' | 'them';
  text: string;
  at: string;
}

export interface TimelineEvent {
  label: string;
  at?: string;
  state: 'done' | 'current' | 'upcoming' | 'cancelled';
}

export interface Transaction {
  id: string;
  kind: TxKind;
  status: TxStatus;
  sitterId: string;
  counterpartName: string;
  counterpartPhoto?: string;
  careType: CareTypeId;
  date: string;
  start: string;
  end: string;
  children: Child[];
  notes: string;
  address: string;
  emergencyContact: {name: string;relation: string;phone: string;};
  total: number;
  lastActivity: string;
  messages: Message[];
  timeline: TimelineEvent[];
}
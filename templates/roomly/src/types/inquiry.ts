export type InquiryStatus = 'sent' | 'replied' | 'viewing' | 'agreed' | 'closed';

export interface Message {
  id: string;
  senderId: string;
  text: string;
  sentAt: string;
}

export interface TimelineEvent {
  status: InquiryStatus;
  at: string;
  note?: string;
}

export interface Inquiry {
  id: string;
  listingId: string;
  renterId: string;
  landlordId: string;
  status: InquiryStatus;
  moveIn: string;
  stayMonths: number;
  aboutYou: string;
  messages: Message[];
  timeline: TimelineEvent[];
  createdAt: string;
  viewingAt?: string;
  unreadFor: string[];
}
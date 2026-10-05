export type DeliveryMethod = 'ship' | 'pickup';
export type RentalDays = 4 | 8;
export type DressLength = 'Mini' | 'Midi' | 'Maxi' | 'Floor-length';
export type FitType = 'True to size' | 'Runs small' | 'Runs large';
export type StretchType = 'No stretch' | 'Slight stretch' | 'Stretchy';

export interface Measurements {
  bust: number;
  waist: number;
  hips: number;
  length: number;
}

export interface Listing {
  id: string;
  title: string;
  designer: string;
  image: string;
  size: number;
  fit: FitType;
  stretch: StretchType;
  fitNotes: string;
  measurements: Measurements;
  retailPrice: number;
  price4: number;
  price8: number;
  occasions: string[];
  color: string;
  length: DressLength;
  delivery: DeliveryMethod[];
  lenderId: string;
  rating: number;
  reviewCount: number;
  /** Booked ranges as [startOffset, endOffset] days from today */
  booked: [number, number][];
  isNew: boolean;
  description: string;
  fabric: string;
}

export interface User {
  id: string;
  name: string;
  city: string;
  initials: string;
  avatarColor: string;
  bio: string;
  joined: string;
  responseTime: string;
  rentalsCompleted: number;
  rating: number;
  reviewCount: number;
  usualSize?: number;
}

export interface Review {
  id: string;
  listingId: string;
  authorId: string;
  rating: number;
  date: string;
  text: string;
  sizeWorn: number;
  fitFeedback: FitType;
  occasion: string;
  photo?: string;
}

export type TxStatus =
'requested' |
'confirmed' |
'shipped' |
'worn' |
'returned' |
'completed' |
'declined';

export interface Message {
  id: string;
  fromMe: boolean;
  text: string;
  time: string;
}

export interface Transaction {
  id: string;
  listingId: string;
  role: 'renter' | 'lender';
  counterpartyId: string;
  status: TxStatus;
  startOffset: number;
  days: RentalDays;
  delivery: DeliveryMethod;
  messages: Message[];
  updatedLabel: string;
}

export interface Occasion {
  slug: string;
  label: string;
  blurb: string;
  image: string;
}

export interface Designer {
  name: string;
  image: string;
  pieces: number;
}
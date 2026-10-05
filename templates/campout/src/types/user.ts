export interface User {
  id: string;
  name: string;
  location: string;
  joinedYear: number;
  bio: string;
  isHost: boolean;
  verified: boolean;
  languages: string[];
  responseRate?: number;
  responseTime?: string;
  email?: string;
  phone?: string;
}

export interface Review {
  id: string;
  listingId: string;
  authorName: string;
  authorLocation: string;
  rating: number;
  date: string;
  text: string;
}
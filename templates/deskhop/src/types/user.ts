export interface User {
  id: string;
  name: string;
  firstName: string;
  email: string;
  city: string;
  bio: string;
  joined: string;
  languages: string[];
  responseTime: string;
  isHost: boolean;
  verified: boolean;
  company?: string;
}

export interface Review {
  id: string;
  listingId: string;
  authorId: string;
  rating: number;
  date: string;
  text: string;
}
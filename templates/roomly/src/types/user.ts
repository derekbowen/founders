export type UserType = 'renter' | 'landlord';

export interface LookingFor {
  city: string;
  budget: number;
  moveIn: string;
  stayMonths: number;
}

export interface User {
  id: string;
  name: string;
  type: UserType;
  email: string;
  phone?: string;
  city: string;
  bio: string;
  occupation?: string;
  joined: string;
  languages: string[];
  verified: boolean;
  avatar?: string;
  responseRate?: number;
  responseTime?: string;
  lookingFor?: LookingFor;
}
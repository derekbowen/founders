import type { PetSize } from './listing';

export interface Pet {
  id: string;
  name: string;
  species: 'Dog' | 'Cat';
  breed: string;
  age: string;
  size: PetSize;
  photo?: string;
  careNotes: string;
}

export interface CurrentUser {
  id: string;
  name: string;
  firstName: string;
  email: string;
  phone: string;
  neighborhood: string;
  memberSince: string;
  bio: string;
}
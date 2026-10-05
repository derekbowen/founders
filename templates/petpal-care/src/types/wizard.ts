import type { HomeDetails, PetSize, ServiceId, YardType } from './listing';

export interface DraftVariant {
  id: string;
  label: string;
  price: number;
}

export interface DraftService {
  enabled: boolean;
  extraPetFee: number;
  variants: DraftVariant[];
}

export interface ListingDraft {
  title: string;
  tagline: string;
  bio: string;
  neighborhood: string;
  experienceYears: number;
  services: Record<ServiceId, DraftService>;
  homeType: HomeDetails['homeType'];
  yard: YardType;
  childrenAtHome: string;
  otherPets: string;
  fullTimeHome: boolean;
  smokeFree: boolean;
  acceptedSizes: PetSize[];
  acceptsCats: boolean;
  maxPets: number;
  weekdays: boolean[];
  blockedDates: string[];
  photos: string[];
}

export type WizardStepId = 'about' | 'services' | 'home' | 'pets' | 'availability' | 'photos';

export interface StepProps {
  draft: ListingDraft;
  update: (patch: Partial<ListingDraft>) => void;
  errors: Record<string, string>;
}
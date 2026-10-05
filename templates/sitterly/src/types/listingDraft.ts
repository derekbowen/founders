import { AgeGroup, CareTypeId, Certification, WeeklyAvailability } from './sitter';

export type WizardStepId =
'about' |
'experience' |
'certifications' |
'rates' |
'availability' |
'service-area' |
'photo';

export interface ListingDraft {
  displayName: string;
  headline: string;
  bio: string;
  experienceYears: string;
  ageGroups: AgeGroup[];
  careTypes: CareTypeId[];
  certifications: Certification[];
  languages: string[];
  backgroundCheckConsent: boolean;
  nonSmoker: boolean;
  hourlyRate: string;
  extraChildRate: string;
  maxKids: string;
  availability: WeeklyAvailability;
  neighborhood: string;
  serviceRadiusMiles: number;
  hasCar: boolean;
  photoUrl: string | null;
}
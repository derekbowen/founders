import { AmenityId, Setting, SportId } from './marketplace';

export interface DayHours {
  day: string;
  open: boolean;
  from: number;
  to: number;
}

export interface DraftSession {
  id: string;
  startHour: number;
  durationHours: number;
  level: string;
}

export interface ListingDraft {
  title: string;
  clubName: string;
  description: string;
  capacity: number;
  sport: SportId;
  surface: string;
  setting: Setting;
  lights: boolean;
  amenities: AmenityId[];
  address: string;
  neighborhood: string;
  city: string;
  zip: string;
  pricePerHour: number;
  minHours: number;
  openPlayEnabled: boolean;
  seatsTotal: number;
  pricePerSeat: number;
  sessions: DraftSession[];
  weeklyHours: DayHours[];
  photos: string[];
}

export type WizardStepId = 'details' | 'sport' | 'amenities' | 'location' | 'pricing' | 'hours' | 'photos';

export interface WizardStep {
  id: WizardStepId;
  label: string;
  description: string;
}

export interface StepProps {
  draft: ListingDraft;
  update: (patch: Partial<ListingDraft>) => void;
}
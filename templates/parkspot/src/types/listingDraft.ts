import type { SpotType, VehicleSize } from './listing';

export interface DaySchedule {
  day: string;
  enabled: boolean;
  start: string;
  end: string;
}

export interface ListingDraft {
  title: string;
  spotType: SpotType | '';
  description: string;
  address: string;
  neighborhood: string;
  access247: boolean;
  accessInstructions: string;
  accessCode: string;
  securityCamera: boolean;
  lengthFt: string;
  widthFt: string;
  clearanceFt: string;
  maxVehicle: VehicleSize;
  covered: boolean;
  evCharging: boolean;
  hourlyEnabled: boolean;
  dailyEnabled: boolean;
  hourlyPrice: string;
  dailyPrice: string;
  minHours: string;
  instantBook: boolean;
  alwaysAvailable: boolean;
  schedule: DaySchedule[];
  photos: string[];
}

export type DraftErrors = Partial<Record<keyof ListingDraft, string>>;

export type WizardStepId = 'details' | 'location' | 'size' | 'pricing' | 'availability' | 'photos';

export interface StepProps {
  draft: ListingDraft;
  update: (patch: Partial<ListingDraft>) => void;
  errors: DraftErrors;
}
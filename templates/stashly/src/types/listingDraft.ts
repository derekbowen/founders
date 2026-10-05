import type { AccessFrequency, SpaceType } from './marketplace';

export interface ListingDraft {
  type: SpaceType | null;
  title: string;
  width: string;
  length: string;
  height: string;
  accessHours: string;
  accessFrequency: AccessFrequency;
  climateControlled: boolean;
  access247: boolean;
  groundFloor: boolean;
  vehicleStorage: boolean;
  security: string[];
  neighborhood: string;
  address: string;
  zip: string;
  monthlyPrice: string;
  deposit: string;
  availableFrom: string;
  minDays: string;
  photos: string[];
  description: string;
}

export type DraftErrors = Partial<Record<keyof ListingDraft, string>>;

export interface StepProps {
  draft: ListingDraft;
  set: <K extends keyof ListingDraft>(key: K, value: ListingDraft[K]) => void;
  errors: DraftErrors;
}
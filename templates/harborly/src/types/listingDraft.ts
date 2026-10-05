import type { BoatTypeId, CancellationPolicyId, CaptainMode } from './marketplace';

export interface ListingDraft {
  title: string;
  type: BoatTypeId | '';
  summary: string;
  description: string;
  make: string;
  model: string;
  year: string;
  length: string;
  capacity: string;
  engine: string;
  cabins: string;
  fishingGear: boolean;
  overnight: boolean;
  included: string[];
  captainMode: CaptainMode;
  captainName: string;
  captainLicense: string;
  captainHalfDay: string;
  captainFullDay: string;
  destinationId: string;
  marinaName: string;
  marinaAddress: string;
  halfDay: string;
  fullDay: string;
  fuelDeposit: string;
  cancellation: CancellationPolicyId;
  blockedDates: string[];
  photos: string[];
}

export type DraftErrors = Partial<Record<keyof ListingDraft, string>>;

export interface StepProps {
  draft: ListingDraft;
  update: (patch: Partial<ListingDraft>) => void;
  errors: DraftErrors;
}

export type WizardStepId = 'details' | 'specs' | 'captain' | 'location' | 'pricing' | 'availability' | 'photos';
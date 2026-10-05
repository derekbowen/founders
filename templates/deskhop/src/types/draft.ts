import type { AmenityId, DayHours, SpaceTypeId } from './listing';

export interface ListingDraft {
  title: string;
  description: string;
  spaceType: SpaceTypeId;
  seats: number;
  capacity: number;
  amenities: AmenityId[];
  city: string;
  address: string;
  postcode: string;
  pricePerHour: string;
  pricePerDay: string;
  minHours: number;
  instantBook: boolean;
  openingHours: DayHours[];
  photos: string[];
}

export type DraftErrors = Partial<Record<keyof ListingDraft, string>>;

export interface StepProps {
  draft: ListingDraft;
  update: (patch: Partial<ListingDraft>) => void;
  errors: DraftErrors;
}
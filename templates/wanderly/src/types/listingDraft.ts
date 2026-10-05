import type { CategoryId, ItineraryStep } from './marketplace';

export interface ListingDraft {
  title: string;
  summary: string;
  description: string;
  destinationId: string;
  languages: string[];
  categoryId: CategoryId | '';
  itinerary: ItineraryStep[];
  durationHours: number;
  minGuests: number;
  maxGuests: number;
  privateGroupsEnabled: boolean;
  wheelchairAccessible: boolean;
  weekdays: string[];
  departureTimes: string[];
  startDate: string;
  pricePerPerson: number;
  privateGroupPrice: number;
  meetingName: string;
  meetingAddress: string;
  meetingInstructions: string;
  photos: string[];
}

export interface WizardStepProps {
  draft: ListingDraft;
  update: (patch: Partial<ListingDraft>) => void;
}
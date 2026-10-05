import type { CategoryId } from "./marketplace";

export type WizardStepId = "details" | "category" | "packages" | "area" | "photos";

export interface DraftPackage {
  id: string;
  name: string;
  price: string;
  description: string;
}

export interface ListingDraft {
  businessName: string;
  tagline: string;
  description: string;
  yearsInBusiness: string;
  website: string;
  languages: string[];
  category: CategoryId | "";
  styles: string[];
  startingPrice: string;
  priceUnit: string;
  minGuests: string;
  maxGuests: string;
  packages: DraftPackage[];
  baseCity: string;
  travelRadius: number;
  serviceRegions: string[];
  photos: string[];
}
import type { CategoryId, ProductValue } from './marketplace';

export type ShippingProfile = 'standard' | 'free-threshold' | 'calculated';

export interface DraftPhoto {
  id: string;
  url: string;
  name: string;
}

export interface ListingDraft {
  title: string;
  description: string;
  sku: string;
  unitDescription: string;
  categoryId: CategoryId | '';
  values: ProductValue[];
  madeIn: string;
  casePack: string;
  basePrice: string;
  msrp: string;
  minOrderCases: string;
  tier2Discount: string;
  tier3Discount: string;
  stockCases: string;
  leadTimeMin: string;
  leadTimeMax: string;
  shipsFrom: string;
  shippingProfile: ShippingProfile;
  caseWeight: string;
  caseDimensions: string;
  photos: DraftPhoto[];
}

export type DraftErrors = Partial<Record<keyof ListingDraft, string>>;
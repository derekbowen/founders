import type { DeliveryMethod, DressLength, FitType, StretchType } from './marketplace';

export interface ListingDraft {
  title: string;
  description: string;
  occasions: string[];
  color: string;
  length: DressLength | '';
  designer: string;
  size: number | null;
  fit: FitType;
  stretch: StretchType;
  fitNotes: string;
  bust: string;
  waist: string;
  hips: string;
  dressLength: string;
  retailPrice: string;
  price4: string;
  price8: string;
  delivery: DeliveryMethod[];
  blocked: string[];
  notice: string;
  photos: string[];
}

export type DraftUpdater = <K extends keyof ListingDraft>(key: K, value: ListingDraft[K]) => void;
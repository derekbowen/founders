import type { ListingDraft } from './listing';

export type WizardStepKey = 'type' | 'location' | 'capacity' | 'amenities' | 'activities' | 'pricing' | 'calendar' | 'photos';

export interface WizardStepProps {
  draft: ListingDraft;
  update: (patch: Partial<ListingDraft>) => void;
}
import type { ListingDraft } from './marketplace';

export interface WizardStepProps {
  draft: ListingDraft;
  update: (patch: Partial<ListingDraft>) => void;
  errors: Record<string, string>;
}
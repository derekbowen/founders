import type { DraftErrors, ListingDraft } from '../../types/listingDraft';

export interface WizardStepProps {
  draft: ListingDraft;
  errors: DraftErrors;
  update: (patch: Partial<ListingDraft>) => void;
}
import { DraftErrors } from '../hooks/useListingDraft';
import { ListingDraft } from './marketplace';

export interface StepProps {
  draft: ListingDraft;
  update: (patch: Partial<ListingDraft>) => void;
  errors: DraftErrors;
}
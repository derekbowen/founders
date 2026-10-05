import React from 'react';
import type { ListingDraft } from '../../types/marketplace';
import type { WizardErrors } from '../../hooks/useListingWizard';
import { TextArea } from '../ui/TextArea';
import { TextField } from '../ui/TextField';

interface StepProps {
  draft: ListingDraft;
  update: (patch: Partial<ListingDraft>) => void;
  errors: WizardErrors;
}

export function DetailsStep({ draft, update, errors }: StepProps) {
  return (
    <div className="space-y-5">
      <TextField
        label="Listing title"
        value={draft.title}
        onChange={(e) => update({ title: e.target.value })}
        error={errors.title}
        maxLength={80}
        placeholder="e.g. Speckled Stoneware Mug"
        hint="Lead with what it is. Buyers search by object, then by material." />
      
      <TextArea
        label="Description"
        value={draft.description}
        onChange={(e) => update({ description: e.target.value })}
        error={errors.description}
        maxLength={1000}
        rows={6}
        placeholder="How it’s made, dimensions, what makes each one unique…"
        hint="Share your process — buyers love knowing the story behind a piece." />
      
      <TextArea
        label="Care instructions (optional)"
        value={draft.care}
        onChange={(e) => update({ care: e.target.value })}
        maxLength={300}
        rows={3}
        placeholder="Dishwasher safe. Avoid sudden temperature changes." />
      
    </div>);

}
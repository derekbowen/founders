import React from 'react';
import { TextField } from '../ui/TextField';
import { TextAreaField } from '../ui/TextAreaField';
import { StepProps } from '../../types/listingWizard';

export function DetailsStep({ draft, update, errors }: StepProps) {
  return (
    <div className="space-y-5">
      <TextField
        label="Service title"
        placeholder="e.g. High-converting landing page in Webflow"
        maxLength={80}
        value={draft.title}
        onChange={(e) => update({ title: e.target.value })}
        error={errors.title}
        hint={`${draft.title.length}/80 · Start with what you deliver, not who you are`} />
      
      <TextField
        label="One-line summary"
        placeholder="Designed and built in Webflow, with CMS and analytics ready to go."
        maxLength={140}
        value={draft.summary}
        onChange={(e) => update({ summary: e.target.value })}
        error={errors.summary}
        hint={`${draft.summary.length}/140`} />
      
      <TextAreaField
        label="Description"
        rows={7}
        placeholder="Explain your process, what's included, and what clients should prepare before you start."
        value={draft.description}
        onChange={(e) => update({ description: e.target.value })}
        error={errors.description}
        hint={`${draft.description.trim().length} characters · 80 minimum`} />
      
    </div>);

}
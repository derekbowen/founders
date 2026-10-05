import React from 'react';
import { Input } from '../Input';
import type { DraftErrors, ListingDraft } from '../../hooks/useListingDraft';

interface StepProps {
  draft: ListingDraft;
  errors: DraftErrors;
  update: (patch: Partial<ListingDraft>) => void;
}

export function StepDetails({ draft, errors, update }: StepProps) {
  return (
    <div className="space-y-5">
      <Input
        id="title"
        label="Title"
        placeholder="e.g. The Undated Daily Planner"
        maxLength={80}
        showCharacterCount
        value={draft.title}
        error={errors.title}
        onChange={(e) => update({ title: e.target.value })} />
      
      <Input
        id="subtitle"
        label="One-line summary"
        placeholder="What will buyers get, in one sentence?"
        maxLength={120}
        value={draft.subtitle}
        error={errors.subtitle}
        onChange={(e) => update({ subtitle: e.target.value })} />
      
      <div>
        <label htmlFor="description" className="label">
          Description
        </label>
        <textarea
          id="description"
          rows={5}
          value={draft.description}
          onChange={(e) => update({ description: e.target.value })}
          aria-invalid={!!errors.description}
          aria-describedby="description-msg"
          placeholder="Who is it for? What problem does it solve? What makes it special?"
          className={`field h-auto py-3 leading-relaxed ${errors.description ? 'border-danger' : ''}`} />
        
        <p id="description-msg" className={`mt-1.5 text-xs ${errors.description ? 'text-danger' : 'text-muted'}`}>
          {errors.description ?? 'Line breaks become separate paragraphs.'}
        </p>
      </div>
      <div>
        <label htmlFor="included" className="label">
          What’s included <span className="font-normal text-muted">(optional, one per line)</span>
        </label>
        <textarea
          id="included"
          rows={4}
          value={draft.included}
          onChange={(e) => update({ included: e.target.value })}
          placeholder={'366 daily pages\nWeekly reflection spreads\nA4 and US Letter versions'}
          className="field h-auto py-3 leading-relaxed" />
        
      </div>
    </div>);

}
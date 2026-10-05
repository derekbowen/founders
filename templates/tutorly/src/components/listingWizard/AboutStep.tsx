import React from 'react';
import { Input } from '../Input';
import { Select } from '../Select';
import { spokenLanguages } from '../../data/subjects';
import type { ListingDraft } from '../../hooks/useListingWizard';

interface StepProps {
  draft: ListingDraft;
  update: (patch: Partial<ListingDraft>) => void;
  showErrors: boolean;
}

const countries = ['United States', 'Canada', 'United Kingdom', 'Australia', 'Mexico', 'Spain', 'France', 'Germany', 'India', 'Brazil', 'Japan', 'South Korea'];

export function AboutStep({ draft, update, showErrors }: StepProps) {
  return (
    <div className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          id="display-name"
          label="Display name"
          value={draft.displayName}
          onChange={(e) => update({ displayName: e.target.value })}
          error={showErrors && draft.displayName.trim().length < 2 ? 'Enter your name' : undefined} />
        
        <Select
          label="Country"
          value={draft.country}
          options={countries.map((c) => ({ value: c, label: c }))}
          onChange={(v) => update({ country: v as string })} />
        
      </div>
      <Input
        id="headline"
        label="Headline"
        maxLength={80}
        showCharacterCount
        placeholder="e.g. Patient chemistry tutor for high-school and AP students"
        value={draft.headline}
        onChange={(e) => update({ headline: e.target.value })}
        helperText="Shown on search results. Lead with what makes you great."
        error={showErrors && draft.headline.trim().length < 10 ? 'Headline needs at least 10 characters' : undefined} />
      
      <div>
        <label htmlFor="bio" className="text-sm font-medium text-ink-800">Bio</label>
        <textarea
          id="bio"
          rows={6}
          maxLength={1200}
          value={draft.bio}
          onChange={(e) => update({ bio: e.target.value })}
          placeholder="Your teaching experience, who you love working with and the results your students achieve."
          aria-invalid={showErrors && draft.bio.trim().length < 50}
          className={`mt-1.5 w-full rounded-xl border p-3 text-sm focus:outline-none focus:ring-4 focus:ring-primary-100 ${
          showErrors && draft.bio.trim().length < 50 ? 'border-red-400' : 'border-ink-200 focus:border-primary-400'}`
          } />
        
        <div className="mt-1 flex justify-between text-xs">
          <span className={showErrors && draft.bio.trim().length < 50 ? 'text-red-600' : 'text-ink-500'}>Minimum 50 characters</span>
          <span className="text-ink-500">{draft.bio.length}/1200</span>
        </div>
      </div>
      <Select
        label="Languages you speak"
        multiple
        searchable
        value={draft.languages}
        options={spokenLanguages.map((l) => ({ value: l, label: l }))}
        onChange={(v) => update({ languages: v as string[] })} />
      
    </div>);

}
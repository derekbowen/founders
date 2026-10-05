import React from 'react';
import { SelectField } from '../ui/SelectField';
import { TextArea } from '../ui/TextArea';
import { TextField } from '../ui/TextField';
import type { ListingWizard } from '../../hooks/useListingWizard';

export function StepAbout({ wizard }: {wizard: ListingWizard;}) {
  const { state, update, errors } = wizard;
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <TextField
        id="w-name"
        label="Display name"
        placeholder="e.g. Jordan R."
        value={state.displayName}
        onChange={(e) => update({ displayName: e.target.value })}
        error={errors.displayName} />
      
      <TextField
        id="w-neighborhood"
        label="Neighborhood"
        placeholder="e.g. Kenton"
        value={state.neighborhood}
        onChange={(e) => update({ neighborhood: e.target.value })}
        error={errors.neighborhood}
        hint="Only your neighborhood is shown publicly." />
      
      <TextField
        id="w-headline"
        label="Listing headline"
        containerClassName="sm:col-span-2"
        placeholder="e.g. Cozy home with a fenced yard and daily park trips"
        maxLength={70}
        value={state.headline}
        onChange={(e) => update({ headline: e.target.value })}
        error={errors.headline}
        hint={`${state.headline.length}/70 characters`} />
      
      <TextArea
        id="w-bio"
        label="About you"
        containerClassName="sm:col-span-2"
        rows={6}
        placeholder="Share your experience with pets, your daily routine and what makes your care special."
        value={state.bio}
        onChange={(e) => update({ bio: e.target.value })}
        error={errors.bio} />
      
      <SelectField
        id="w-years"
        label="Years of pet care experience"
        value={state.years}
        onChange={(e) => update({ years: e.target.value })}
        options={[
        { value: '', label: 'Select' },
        { value: '1', label: 'Less than 2 years' },
        { value: '3', label: '2–5 years' },
        { value: '7', label: '5–10 years' },
        { value: '10', label: '10+ years' }]
        } />
      
    </div>);

}
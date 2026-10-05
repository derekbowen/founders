import React from 'react';
import { Input } from '../Input';
import { TextAreaField } from '../ui/TextAreaField';
import { StepProps } from '../../hooks/useListingDraft';

export function AboutStep({ draft, update, errors }: StepProps) {
  return (
    <div className="space-y-5">
      <Input id="displayName" label="Display name" placeholder="e.g. Maya T." value={draft.displayName} error={errors.displayName} helperText="First name and last initial is perfect." onChange={(e) => update({ displayName: e.target.value })} />
      <Input id="headline" label="Headline" placeholder="e.g. Playful, patient, and always armed with a craft project" maxLength={80} showCharacterCount value={draft.headline} error={errors.headline} onChange={(e) => update({ headline: e.target.value })} />
      <TextAreaField
        id="bio"
        label="Bio"
        rows={6}
        maxLength={800}
        value={draft.bio}
        error={errors.bio}
        helperText="Share your background, what kids love about you, and how you keep them safe."
        placeholder="Hi! I'm a grad student who has been babysitting since I was 16…"
        onChange={(e) => update({ bio: e.target.value })} />
      
    </div>);

}
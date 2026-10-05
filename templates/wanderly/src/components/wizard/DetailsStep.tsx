import React from 'react';
import { TextField } from '../ui/TextField';
import { TextArea } from '../ui/TextArea';
import { SelectField } from '../ui/SelectField';
import { Chip } from '../ui/Chip';
import { destinations } from '../../data/destinations';
import { languageOptions } from '../../data/options';
import { toggleValue } from '../../hooks/useSearchFilters';
import type { WizardStepProps } from '../../types/listingDraft';

export function DetailsStep({ draft, update }: WizardStepProps) {
  return (
    <div className="space-y-6">
      <TextField
        label="Experience title"
        value={draft.title}
        maxLength={60}
        onChange={(e) => update({ title: e.target.value })}
        placeholder="e.g. Sunrise Market Walk & Breakfast Feast"
        hint={`${draft.title.length}/60 · Short, specific titles get more clicks`} />
      
      <TextField
        label="One-line summary"
        value={draft.summary}
        maxLength={120}
        onChange={(e) => update({ summary: e.target.value })}
        placeholder="What will guests remember most?"
        hint={`${draft.summary.length}/120`} />
      
      <TextArea
        label="Full description"
        rows={6}
        value={draft.description}
        onChange={(e) => update({ description: e.target.value })}
        placeholder="Describe the vibe, the places you'll go, and why you love hosting it." />
      
      <SelectField
        label="City"
        value={draft.destinationId}
        onChange={(e) => update({ destinationId: e.target.value })}
        options={destinations.map((d) => ({ value: d.id, label: `${d.city}, ${d.country}` }))} />
      
      <fieldset>
        <legend className="mb-2 text-sm font-medium text-slate-700">Languages you host in</legend>
        <div className="flex flex-wrap gap-2">
          {languageOptions.map((l) =>
          <Chip key={l} selected={draft.languages.includes(l)} onClick={() => update({ languages: toggleValue(draft.languages, l) })}>
              {l}
            </Chip>
          )}
        </div>
      </fieldset>
    </div>);

}
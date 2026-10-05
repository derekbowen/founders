import React from 'react';
import { Input } from '../Input';
import { Stepper } from '../common/Stepper';
import { StepProps } from '../../types/listingDraft';
import { pluralize } from '../../utils/format';

export function DetailsStep({ draft, update }: StepProps) {
  return (
    <div className="space-y-5">
      <Input id="wiz-title" label="Listing title" placeholder="e.g. Centre Court under the lights" maxLength={60} showCharacterCount value={draft.title} onChange={(e) => update({ title: e.target.value })} />
      <Input id="wiz-club" label="Club or venue name" placeholder="e.g. Barton Hills Tennis Club" value={draft.clubName} onChange={(e) => update({ clubName: e.target.value })} />
      <div>
        <label htmlFor="wiz-desc" className="field-label">Description</label>
        <textarea
          id="wiz-desc"
          rows={5}
          value={draft.description}
          onChange={(e) => update({ description: e.target.value })}
          placeholder="Surface condition, nets, lighting, what's nearby, who it's great for…"
          className="field resize-none" />
        
        <p className="mt-1 text-xs text-slate-500">{draft.description.length} characters · aim for 2–4 sentences</p>
      </div>
      <div className="max-w-xs">
        <Stepper label="Max players per booking" value={draft.capacity} min={2} max={30} onChange={(v) => update({ capacity: v })} formatValue={(v) => pluralize(v, 'player')} />
      </div>
    </div>);

}
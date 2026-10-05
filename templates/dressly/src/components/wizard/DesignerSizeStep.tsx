import React from 'react';
import { Input } from '../Input';
import { listings } from '../../data/listings';
import { sizes } from '../../data/taxonomy';
import type { FitType, StretchType } from '../../types/marketplace';
import type { DraftUpdater, ListingDraft } from '../../types/draft';
import { labelClass } from '../../utils/styles';
import { ChipToggle } from './ChipToggle';

const designerList = Array.from(new Set(listings.map((l) => l.designer))).sort();
const fits: FitType[] = ['True to size', 'Runs small', 'Runs large'];
const stretches: StretchType[] = ['No stretch', 'Slight stretch', 'Stretchy'];

export function DesignerSizeStep({ draft, set }: {draft: ListingDraft;set: DraftUpdater;}) {
  return (
    <div className="space-y-6">
      <div>
        <Input
          label="Designer"
          list="designer-options"
          value={draft.designer}
          onChange={(e) => set('designer', e.target.value)}
          placeholder="Start typing a designer"
          helperText="We only accept designer and contemporary labels." />
        
        <datalist id="designer-options">
          {designerList.map((d) =>
          <option key={d} value={d} />
          )}
        </datalist>
      </div>
      <fieldset>
        <legend className={labelClass}>Size (US)</legend>
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">
          {sizes.map((s) =>
          <ChipToggle key={s} active={draft.size === s} onClick={() => set('size', s)} className="px-0">
              {s}
            </ChipToggle>
          )}
        </div>
      </fieldset>
      <fieldset>
        <legend className={labelClass}>How does it fit?</legend>
        <div className="flex flex-wrap gap-2">
          {fits.map((f) =>
          <ChipToggle key={f} active={draft.fit === f} onClick={() => set('fit', f)}>
              {f}
            </ChipToggle>
          )}
        </div>
      </fieldset>
      <fieldset>
        <legend className={labelClass}>Stretch</legend>
        <div className="flex flex-wrap gap-2">
          {stretches.map((s) =>
          <ChipToggle key={s} active={draft.stretch === s} onClick={() => set('stretch', s)}>
              {s}
            </ChipToggle>
          )}
        </div>
      </fieldset>
      <div>
        <label htmlFor="fitnotes" className={labelClass}>Fit notes</label>
        <textarea
          id="fitnotes"
          rows={3}
          value={draft.fitNotes}
          onChange={(e) => set('fitNotes', e.target.value)}
          placeholder="e.g. Fitted through the waist, best for 5′5″–5′9″ in heels."
          className="w-full border border-line bg-paper p-3 text-sm focus:border-ink focus:outline-none" />
        
      </div>
    </div>);

}
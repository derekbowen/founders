import React from 'react';
import { Input } from '../Input';
import { colorSwatches, lengths, occasions } from '../../data/taxonomy';
import type { DraftUpdater, ListingDraft } from '../../types/draft';
import { labelClass } from '../../utils/styles';
import { ChipToggle } from './ChipToggle';

export function DetailsStep({ draft, set }: {draft: ListingDraft;set: DraftUpdater;}) {
  return (
    <div className="space-y-6">
      <Input
        label="Listing title"
        value={draft.title}
        onChange={(e) => set('title', e.target.value)}
        placeholder="e.g. Emerald Satin One-Shoulder Gown"
        maxLength={60}
        showCharacterCount />
      
      <div>
        <label htmlFor="desc" className={labelClass}>Description</label>
        <textarea
          id="desc"
          rows={5}
          value={draft.description}
          onChange={(e) => set('description', e.target.value)}
          placeholder="What makes it special? Where have you worn it? Any condition notes?"
          className="w-full border border-line bg-paper p-3 text-sm focus:border-ink focus:outline-none" />
        
      </div>
      <fieldset>
        <legend className={labelClass}>Occasions</legend>
        <div className="flex flex-wrap gap-2">
          {occasions.map((o) =>
          <ChipToggle
            key={o.slug}
            active={draft.occasions.includes(o.slug)}
            onClick={() =>
            set(
              'occasions',
              draft.occasions.includes(o.slug) ?
              draft.occasions.filter((x) => x !== o.slug) :
              [...draft.occasions, o.slug]
            )
            }>
            
              {o.label}
            </ChipToggle>
          )}
        </div>
      </fieldset>
      <fieldset>
        <legend className={labelClass}>Color</legend>
        <div className="flex flex-wrap gap-3">
          {colorSwatches.map((c) =>
          <button
            key={c.name}
            type="button"
            aria-pressed={draft.color === c.name}
            onClick={() => set('color', c.name)}
            className={`flex items-center gap-2 border px-3 py-1.5 text-sm transition ${draft.color === c.name ? 'border-ink' : 'border-line hover:border-ink'}`}>
            
              <span
              className="h-4 w-4 rounded-full border border-line"
              style={
              c.hex === 'conic' ?
              { background: 'conic-gradient(#e7a1b5, #e9c64a, #2f6b4f, #b9a3d4, #e7a1b5)' } :
              { backgroundColor: c.hex }
              }
              aria-hidden="true" />
            
              {c.name}
            </button>
          )}
        </div>
      </fieldset>
      <fieldset>
        <legend className={labelClass}>Length</legend>
        <div className="flex flex-wrap gap-2">
          {lengths.map((l) =>
          <ChipToggle key={l} active={draft.length === l} onClick={() => set('length', l)}>
              {l}
            </ChipToggle>
          )}
        </div>
      </fieldset>
    </div>);

}
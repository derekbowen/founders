import React from 'react';
import { Input } from '../Input';
import { FieldError } from './FieldError';
import { spotTypeOptions } from '../../data/wizard';
import { labelClass, textareaClass } from '../../utils/styles';
import type { StepProps } from '../../types/listingDraft';

export function DetailsStep({ draft, update, errors }: StepProps) {
  return (
    <div className="space-y-6">
      <Input
        id="w-title"
        label="Listing title"
        placeholder="Covered garage 2 blocks from Chase Center"
        value={draft.title}
        onChange={(e) => update({ title: e.target.value })}
        error={errors.title}
        maxLength={70}
        showCharacterCount />
      

      <fieldset>
        <legend className={labelClass}>Spot type</legend>
        <div className="grid gap-3 sm:grid-cols-2" role="radiogroup">
          {spotTypeOptions.map((o) => {
            const selected = draft.spotType === o.value;
            return (
              <button
                key={o.value}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => update({ spotType: o.value })}
                className={`rounded-xl border-2 p-4 text-left transition-colors ${
                selected ? 'border-navy bg-navy/5' : 'border-line hover:border-ink/30'}`
                }>
                
                <span className="flex items-center justify-between font-semibold">
                  {o.value}
                  <span className={`h-4 w-4 rounded-full border-2 ${selected ? 'border-navy bg-accent' : 'border-line'}`} aria-hidden />
                </span>
                <span className="mt-1 block text-sm text-muted">{o.text}</span>
              </button>);

          })}
        </div>
        <FieldError message={errors.spotType} />
      </fieldset>

      <div>
        <label htmlFor="w-desc" className={labelClass}>
          Description
        </label>
        <textarea
          id="w-desc"
          rows={4}
          value={draft.description}
          onChange={(e) => update({ description: e.target.value })}
          placeholder="What’s nearby? Is it easy to get in and out? Any perks like EV charging?"
          className={textareaClass} />
        
        <FieldError message={errors.description} />
      </div>
    </div>);

}
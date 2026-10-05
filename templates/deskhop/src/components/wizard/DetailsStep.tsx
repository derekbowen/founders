import React from 'react';
import { Input } from '../Input';
import { cities } from '../../data/cities';
import type { StepProps } from '../../types/draft';

export function DetailsStep({ draft, update, errors }: StepProps) {
  return (
    <div className="space-y-5">
      <Input
        id="w-title"
        label="Listing title"
        value={draft.title}
        maxLength={60}
        showCharacterCount
        error={errors.title}
        onChange={(e) => update({ title: e.target.value })}
        placeholder="e.g. Sunny hot desks in Shoreditch" />
      
      <div>
        <label htmlFor="w-desc" className="field-label">Description</label>
        <textarea
          id="w-desc"
          rows={6}
          value={draft.description}
          onChange={(e) => update({ description: e.target.value })}
          placeholder="What makes your space great to work from? Mention light, noise level, coffee, community…"
          aria-invalid={!!errors.description}
          aria-describedby="w-desc-help"
          className={`field resize-none ${errors.description ? '!border-red-500' : ''}`} />
        
        <p id="w-desc-help" className={`mt-1.5 text-xs ${errors.description ? 'text-red-700' : 'text-ink-muted'}`}>
          {errors.description ?? `${draft.description.length} characters · at least 50 recommended`}
        </p>
      </div>
      <div>
        <label htmlFor="w-city" className="field-label">City</label>
        <select id="w-city" value={draft.city} onChange={(e) => update({ city: e.target.value })} className="field">
          {cities.map((c) =>
          <option key={c.name} value={c.name}>{c.name}, {c.country}</option>
          )}
        </select>
      </div>
    </div>);

}
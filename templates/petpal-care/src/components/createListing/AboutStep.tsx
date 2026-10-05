import React from 'react';
import { Input } from '../Input';
import type { StepProps } from '../../types/wizard';

export function AboutStep({ draft, update, errors }: StepProps) {
  return (
    <div className="space-y-5">
      <Input
        id="title"
        label="Listing title"
        placeholder="e.g. Cozy home with a big fenced yard"
        value={draft.title}
        maxLength={70}
        showCharacterCount
        error={errors.title}
        onChange={(e) => update({ title: e.target.value })} />
      
      <Input
        id="tagline"
        label="Short tagline (optional)"
        placeholder="e.g. Lab lover · Former shelter volunteer"
        value={draft.tagline}
        onChange={(e) => update({ tagline: e.target.value })} />
      
      <div>
        <label htmlFor="bio" className="field-label">
          About you
        </label>
        <textarea
          id="bio"
          rows={6}
          value={draft.bio}
          onChange={(e) => update({ bio: e.target.value })}
          placeholder="Share your experience with pets, your daily routine and what a typical stay looks like."
          className={`field resize-none ${errors.bio ? 'border-red-400' : ''}`}
          aria-invalid={!!errors.bio}
          aria-describedby="bio-help" />
        
        <p id="bio-help" className={`mt-1.5 text-xs ${errors.bio ? 'font-semibold text-red-700' : 'text-ink-600'}`}>
          {errors.bio ?? `${draft.bio.length} characters · Owners love details about your routine.`}
        </p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Input id="neighborhood" label="Neighborhood" placeholder="e.g. Richmond" value={draft.neighborhood} error={errors.neighborhood} onChange={(e) => update({ neighborhood: e.target.value })} />
        <div>
          <label htmlFor="experience" className="field-label">
            Years of pet care experience
          </label>
          <select id="experience" value={draft.experienceYears} onChange={(e) => update({ experienceYears: Number(e.target.value) })} className="field">
            {[1, 2, 3, 4, 5, 6, 8, 10, 15, 20].map((n) =>
            <option key={n} value={n}>
                {n}
                {n === 20 ? '+' : ''} {n === 1 ? 'year' : 'years'}
              </option>
            )}
          </select>
        </div>
      </div>
    </div>);

}
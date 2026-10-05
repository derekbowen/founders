import React from 'react';
import { EyeOffIcon } from 'lucide-react';
import { Field } from '../ui/Field';
import { brand } from '../../data/brand';
import { neighborhoods } from '../../data/neighborhoods';
import type { StepProps } from '../../types/postJob';
import { cn, inputClass, inputErrorClass, textareaClass } from '../../utils/styles';

export function StepLocation({ form, update, errors }: StepProps) {
  return (
    <div className="space-y-6">
      <Field label="Neighborhood" htmlFor="pj-area" error={errors.area} hint={`Currently serving ${brand.city}.`}>
        <select
          id="pj-area"
          value={form.area}
          onChange={(e) => update({ area: e.target.value })}
          aria-invalid={Boolean(errors.area)}
          className={cn(inputClass, errors.area && inputErrorClass)}>
          
          <option value="">Select a neighborhood…</option>
          {neighborhoods.map((n) =>
          <option key={n.name} value={n.name}>
              {n.name}
            </option>
          )}
        </select>
      </Field>
      <div className="flex gap-3 rounded-xl bg-ink-100 p-4 text-sm text-ink-700">
        <EyeOffIcon className="h-5 w-5 shrink-0 text-ink-500" aria-hidden="true" />
        <p>Pros only see your neighborhood. Your exact address is shared after you accept an offer and pay.</p>
      </div>
      <Field label="Access notes" htmlFor="pj-access" optional hint="Stairs, parking, pets, gate codes (shared later) — anything that affects the job.">
        <textarea
          id="pj-access"
          rows={3}
          value={form.accessNotes}
          onChange={(e) => update({ accessNotes: e.target.value })}
          placeholder="e.g. 2nd floor walk-up, street parking, friendly dog"
          className={cn(textareaClass, 'min-h-[88px]')} />
        
      </Field>
    </div>);

}
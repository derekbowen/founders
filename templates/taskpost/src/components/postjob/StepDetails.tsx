import React from 'react';
import { LightbulbIcon } from 'lucide-react';
import { Field } from '../ui/Field';
import type { StepProps } from '../../types/postJob';
import { cn, inputClass, inputErrorClass, textareaClass } from '../../utils/styles';

export function StepDetails({ form, update, errors }: StepProps) {
  return (
    <div className="space-y-6">
      <Field label="Job title" htmlFor="pj-title" error={errors.title} hint={'Keep it short and specific, e.g. “Mount 65" TV above fireplace”.'}>
        <input
          id="pj-title"
          value={form.title}
          maxLength={80}
          onChange={(e) => update({ title: e.target.value })}
          placeholder="What do you need done?"
          aria-invalid={Boolean(errors.title)}
          className={cn(inputClass, 'text-base', errors.title && inputErrorClass)} />
        
      </Field>
      <Field
        label="Describe the job"
        htmlFor="pj-desc"
        error={errors.description}
        hint={`${form.description.length}/1000 · Include sizes, quantities, materials and anything pros should bring.`}>
        
        <textarea
          id="pj-desc"
          rows={7}
          maxLength={1000}
          value={form.description}
          onChange={(e) => update({ description: e.target.value })}
          placeholder="e.g. Three fence panels are leaning after the storm. I have some replacement boards…"
          aria-invalid={Boolean(errors.description)}
          className={cn(textareaClass, errors.description && inputErrorClass)} />
        
      </Field>
      <div className="flex gap-3 rounded-xl bg-amber-50 p-4 text-sm text-amber-900 ring-1 ring-inset ring-amber-200">
        <LightbulbIcon className="h-5 w-5 shrink-0" aria-hidden="true" />
        <p>Jobs with clear details and photos get offers about 2× faster and closer to your budget.</p>
      </div>
    </div>);

}
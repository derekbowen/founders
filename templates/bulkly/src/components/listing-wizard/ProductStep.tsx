import React from 'react';
import type { WizardStepProps } from './WizardStepProps';
import { Input } from '../Input';
import { TextAreaField } from '../ui/TextAreaField';

export function ProductStep({ draft, errors, update }: WizardStepProps) {
  return (
    <div className="space-y-5">
      <Input
        id="wiz-title"
        label="Product name"
        placeholder="e.g. Maple Pecan Granola"
        value={draft.title}
        onChange={(e) => update({ title: e.target.value })}
        error={errors.title}
        maxLength={80}
        showCharacterCount />
      
      <div>
        <TextAreaField
          id="wiz-description"
          label="Description"
          rows={5}
          placeholder="What makes it sell? Ingredients, materials, shelf life, merchandising tips…"
          value={draft.description}
          onChange={(e) => update({ description: e.target.value })}
          helperText="Retailers read this to decide whether to stock you. Lead with sell-through and shelf appeal."
          aria-invalid={Boolean(errors.description)} />
        
        {errors.description && <p className="mt-1 text-xs text-red-600">{errors.description}</p>}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          id="wiz-unit"
          label="Unit description"
          placeholder="12 oz resealable pouch"
          value={draft.unitDescription}
          onChange={(e) => update({ unitDescription: e.target.value })}
          error={errors.unitDescription}
          helperText="What a single sellable unit is." />
        
        <Input
          id="wiz-sku"
          label="SKU (optional)"
          placeholder="FF-GRN-012"
          value={draft.sku}
          onChange={(e) => update({ sku: e.target.value.toUpperCase() })} />
        
      </div>
    </div>);

}
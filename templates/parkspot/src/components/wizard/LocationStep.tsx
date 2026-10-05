import React from 'react';
import { MapPinIcon } from 'lucide-react';
import { Input } from '../Input';
import { Toggle } from '../Toggle';
import { FieldError } from './FieldError';
import { labelClass, textareaClass } from '../../utils/styles';
import type { StepProps } from '../../types/listingDraft';

export function LocationStep({ draft, update, errors }: StepProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-[2fr_1fr]">
        <Input
          id="w-address"
          label="Street address"
          placeholder="1234 Sanchez St, San Francisco, CA"
          startAdornment={<MapPinIcon size={16} />}
          value={draft.address}
          onChange={(e) => update({ address: e.target.value })}
          error={errors.address}
          helperText="Only shown to drivers after a booking is confirmed." />
        
        <Input
          id="w-hood"
          label="Neighborhood"
          placeholder="Noe Valley"
          value={draft.neighborhood}
          onChange={(e) => update({ neighborhood: e.target.value })} />
        
      </div>

      <div className="divide-y divide-line rounded-xl border border-line">
        <div className="flex items-center justify-between gap-4 p-4">
          <div>
            <p className="font-medium">24/7 access</p>
            <p className="text-sm text-muted">Drivers can enter and leave at any time.</p>
          </div>
          <Toggle checked={draft.access247} onChange={(v) => update({ access247: v })} aria-label="24/7 access" />
        </div>
        <div className="flex items-center justify-between gap-4 p-4">
          <div>
            <p className="font-medium">Security camera</p>
            <p className="text-sm text-muted">The spot is covered by a camera.</p>
          </div>
          <Toggle checked={draft.securityCamera} onChange={(v) => update({ securityCamera: v })} aria-label="Security camera" />
        </div>
      </div>

      <div>
        <label htmlFor="w-access" className={labelClass}>
          Access instructions
        </label>
        <textarea
          id="w-access"
          rows={4}
          value={draft.accessInstructions}
          onChange={(e) => update({ accessInstructions: e.target.value })}
          placeholder="Enter from the alley, use the keypad on the left, park nose-in…"
          className={textareaClass} />
        
        <p className="mt-1.5 text-xs text-muted">The first sentence is shown publicly as a preview. The rest unlocks after confirmation.</p>
        <FieldError message={errors.accessInstructions} />
      </div>

      <Input
        id="w-code"
        label="Gate / door code (optional)"
        placeholder="4821#"
        value={draft.accessCode}
        onChange={(e) => update({ accessCode: e.target.value })}
        helperText="Revealed to drivers only once you confirm their booking." />
      
    </div>);

}
import React from 'react';
import { RulerIcon } from 'lucide-react';
import { Input } from '../Input';
import type { DraftUpdater, ListingDraft } from '../../types/draft';

const fields: {key: 'bust' | 'waist' | 'hips' | 'dressLength';label: string;hint: string;}[] = [
{ key: 'bust', label: 'Bust', hint: 'Armpit to armpit, doubled' },
{ key: 'waist', label: 'Waist', hint: 'Narrowest point, doubled' },
{ key: 'hips', label: 'Hips', hint: 'Widest point, doubled' },
{ key: 'dressLength', label: 'Length', hint: 'Shoulder to hem' }];


export function MeasurementsStep({ draft, set }: {draft: ListingDraft;set: DraftUpdater;}) {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-3 bg-cream p-4 text-sm text-ink/85">
        <RulerIcon size={18} className="mt-0.5 shrink-0 text-accent-dark" aria-hidden="true" />
        <p>
          Lay the dress flat and measure in inches. Accurate measurements are the #1 reason renters book with confidence.
        </p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        {fields.map((f) =>
        <Input
          key={f.key}
          label={`${f.label} (in)`}
          inputMode="decimal"
          value={draft[f.key]}
          onChange={(e) => set(f.key, e.target.value.replace(/[^\d.]/g, ''))}
          placeholder="0"
          helperText={f.hint}
          endAdornment={<span className="text-xs text-muted">in</span>} />

        )}
      </div>
    </div>);

}
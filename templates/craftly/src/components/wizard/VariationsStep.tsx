import React, { useState } from 'react';
import { PlusIcon, Trash2Icon, XIcon } from 'lucide-react';
import type { ListingDraft } from '../../types/marketplace';
import type { WizardErrors } from '../../hooks/useListingWizard';
import { Button } from '../ui/Button';
import { TextField } from '../ui/TextField';
import { ToggleRow } from './ToggleRow';

interface StepProps {
  draft: ListingDraft;
  update: (patch: Partial<ListingDraft>) => void;
  errors: WizardErrors;
}

export function VariationsStep({ draft, update, errors }: StepProps) {
  const [pending, setPending] = useState<Record<number, string>>({});

  const setVariation = (i: number, patch: Partial<{name: string;options: string[];}>) =>
  update({ variations: draft.variations.map((v, idx) => idx === i ? { ...v, ...patch } : v) });

  const addOption = (i: number) => {
    const value = (pending[i] ?? '').trim();
    if (!value || draft.variations[i].options.includes(value)) return;
    setVariation(i, { options: [...draft.variations[i].options, value] });
    setPending((p) => ({ ...p, [i]: '' }));
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <ToggleRow
          label="Made to order"
          description="You’ll make each piece after it’s purchased. Stock won’t be tracked."
          checked={draft.madeToOrder}
          onChange={(v) => update({ madeToOrder: v })} />
        
        {!draft.madeToOrder &&
        <TextField
          className="max-w-[200px]"
          label="Quantity in stock"
          type="number"
          min={1}
          value={draft.stock}
          onChange={(e) => update({ stock: e.target.value })}
          error={errors.stock}
          hint="We’ll mark it sold out at zero." />

        }
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h3 className="font-sans text-sm font-medium">Variations</h3>
            <p className="text-xs text-muted">Let buyers choose a size, glaze, finish and more.</p>
          </div>
          {draft.variations.length < 3 &&
          <Button variant="secondary" size="sm" leftIcon={<PlusIcon className="h-4 w-4" />} onClick={() => update({ variations: [...draft.variations, { name: '', options: [] }] })}>
              Add variation
            </Button>
          }
        </div>
        {draft.variations.length === 0 ?
        <p className="rounded-xl border border-dashed border-line p-6 text-center text-sm text-muted">No variations — this piece comes one way.</p> :

        <ul className="space-y-4">
            {draft.variations.map((v, i) =>
          <li key={i} className="rounded-xl border border-line bg-canvas p-4">
                <div className="flex items-end gap-3">
                  <TextField className="flex-1" label="Variation name" value={v.name} onChange={(e) => setVariation(i, { name: e.target.value })} placeholder="e.g. Size or Glaze" />
                  <button
                type="button"
                onClick={() => update({ variations: draft.variations.filter((_, idx) => idx !== i) })}
                className="mb-1 rounded-full p-2 text-muted hover:bg-danger/5 hover:text-danger"
                aria-label={`Remove variation ${v.name || i + 1}`}>
                
                    <Trash2Icon className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {v.options.map((o) =>
              <span key={o} className="inline-flex items-center gap-1 rounded-full bg-surface py-1 pl-3 pr-1.5 text-sm ring-1 ring-line">
                      {o}
                      <button type="button" onClick={() => setVariation(i, { options: v.options.filter((x) => x !== o) })} className="rounded-full p-0.5 text-muted hover:bg-subtle hover:text-ink" aria-label={`Remove option ${o}`}>
                        <XIcon className="h-3 w-3" />
                      </button>
                    </span>
              )}
                </div>
                <div className="mt-3 flex gap-2">
                  <label htmlFor={`opt-${i}`} className="sr-only">Add option</label>
                  <input
                id={`opt-${i}`}
                className="field-input !py-2"
                value={pending[i] ?? ''}
                onChange={(e) => setPending((p) => ({ ...p, [i]: e.target.value }))}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addOption(i);
                  }
                }}
                placeholder="Type an option and press Enter" />
              
                  <Button variant="secondary" size="sm" className="h-[38px]" onClick={() => addOption(i)}>Add</Button>
                </div>
              </li>
          )}
          </ul>
        }
        {errors.variations && <p className="mt-2 text-xs font-medium text-danger">{errors.variations}</p>}
      </div>
    </div>);

}
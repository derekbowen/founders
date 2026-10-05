import React, { useState } from 'react';
import { PlusIcon, Trash2Icon, PackageIcon } from 'lucide-react';
import { Button } from '../Button';
import { ui, cx } from '../../utils/styles';

const suggestions = ['Moving boxes', 'Bed frame', 'Mattress (bagged)', 'Sofa', 'Bike', 'Seasonal clothes', 'Tools', 'Kayak'];

interface Props {
  items: string[];
  onChange: (items: string[]) => void;
  error?: string;
}

export function InventoryList({ items, onChange, error }: Props) {
  const [draft, setDraft] = useState('');

  const add = (value: string) => {
    const v = value.trim();
    if (!v) return;
    onChange([...items, v]);
    setDraft('');
  };

  return (
    <div>
      <div className="flex gap-2">
        <div className="flex-1">
          <label htmlFor="inv-item" className="sr-only">Add an item</label>
          <input
            id="inv-item"
            value={draft}
            placeholder="e.g. 10 medium boxes, a dresser…"
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                add(draft);
              }
            }}
            className={cx(ui.field, error && '!border-red-500')} />
          
        </div>
        <Button type="button" variant="secondary" leftIcon={<PlusIcon className="h-4 w-4" />} onClick={() => add(draft)} className={ui.btnOutline}>
          Add
        </Button>
      </div>
      {error && <p className="mt-1 text-xs font-medium text-red-700">{error}</p>}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {suggestions.filter((s) => !items.includes(s)).slice(0, 6).map((s) =>
        <button key={s} type="button" onClick={() => add(s)} className="rounded-full border border-dashed border-stone-300 px-2.5 py-1 text-xs text-stone-600 hover:border-brand-500 hover:text-brand-700">
            + {s}
          </button>
        )}
      </div>
      {items.length > 0 ?
      <ul className="mt-4 divide-y divide-stone-100 rounded-xl border border-stone-200">
          {items.map((item, i) =>
        <li key={`${item}-${i}`} className="flex items-center gap-3 px-4 py-2.5">
              <PackageIcon className="h-4 w-4 text-sand-600" aria-hidden="true" />
              <span className="flex-1 text-sm text-stone-800">{item}</span>
              <button
            type="button"
            onClick={() => onChange(items.filter((_, idx) => idx !== i))}
            aria-label={`Remove ${item}`}
            className="grid h-8 w-8 place-items-center rounded-md text-stone-500 hover:bg-red-50 hover:text-red-600">
            
                <Trash2Icon className="h-4 w-4" />
              </button>
            </li>
        )}
        </ul> :

      <p className="mt-4 rounded-xl border border-dashed border-stone-300 bg-stone-50 px-4 py-6 text-center text-sm text-stone-500">
          No items yet. Hosts accept faster when they know what’s coming.
        </p>
      }
    </div>);

}
import React, { useState } from 'react';
import { MinusIcon, PlusIcon, Trash2Icon } from 'lucide-react';
import { equipmentPresets } from '../../data/catalog';
import type { EquipmentCategory } from '../../types/marketplace';
import type { WizardStepProps } from '../../types/wizard';
import { cn, focusRing, inputClass } from '../../utils/styles';
import { Button } from '../ui/Button';

export function EquipmentStep({ draft, update, errors }: WizardStepProps) {
  const [custom, setCustom] = useState<Record<string, string>>({});
  const total = draft.equipment.reduce((s, c) => s + c.items.length, 0);

  const setCategory = (category: string, fn: (c: EquipmentCategory) => EquipmentCategory) =>
  update({ equipment: draft.equipment.map((c) => c.category === category ? fn(c) : c) });

  const toggleItem = (category: string, name: string) =>
  setCategory(category, (c) => ({
    ...c,
    items: c.items.some((i) => i.name === name) ? c.items.filter((i) => i.name !== name) : [...c.items, { name, quantity: 1 }]
  }));

  const setQty = (category: string, name: string, qty: number) =>
  setCategory(category, (c) => ({ ...c, items: c.items.map((i) => i.name === name ? { ...i, quantity: Math.max(1, qty) } : i) }));

  const addCustom = (category: string) => {
    const name = (custom[category] ?? '').trim();
    if (!name) return;
    setCategory(category, (c) => c.items.some((i) => i.name === name) ? c : { ...c, items: [...c.items, { name, quantity: 1 }] });
    setCustom((s) => ({ ...s, [category]: '' }));
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between rounded-xl bg-steel-50 px-4 py-3 text-sm">
        <span className="text-steel-700">Tap to add equipment, then set quantities.</span>
        <span className="font-semibold text-steel-900">{total} items</span>
      </div>
      {errors.equipment && <p className="text-sm font-medium text-primary" role="alert">{errors.equipment}</p>}
      {draft.equipment.map((cat) => {
        const preset = equipmentPresets.find((p) => p.category === cat.category)?.items ?? [];
        return (
          <section key={cat.category} className="rounded-2xl border border-steel-200 p-5" aria-labelledby={`eq-${cat.category}`}>
            <h3 id={`eq-${cat.category}`} className="font-heading text-sm font-semibold uppercase tracking-widest text-steel-900">{cat.category}</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {preset.map((name) => {
                const active = cat.items.some((i) => i.name === name);
                return (
                  <button
                    key={name}
                    type="button"
                    aria-pressed={active}
                    onClick={() => toggleItem(cat.category, name)}
                    className={cn('inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-sm transition-colors', focusRing, active ? 'border-accent bg-accent-soft font-medium text-accent' : 'border-steel-300 text-steel-700 hover:border-steel-500')}>
                    
                    {!active && <PlusIcon className="h-3.5 w-3.5" aria-hidden="true" />}
                    {name}
                  </button>);

              })}
            </div>
            {cat.items.length > 0 &&
            <ul className="mt-4 divide-y divide-steel-100 rounded-xl border border-steel-200">
                {cat.items.map((item) =>
              <li key={item.name} className="flex items-center justify-between gap-3 px-3 py-2">
                    <span className="text-sm text-steel-800">{item.name}</span>
                    <span className="flex items-center gap-1">
                      <button type="button" aria-label={`Decrease ${item.name}`} onClick={() => setQty(cat.category, item.name, (item.quantity ?? 1) - 1)} className={cn('grid h-7 w-7 place-items-center rounded-md hover:bg-steel-100', focusRing)}>
                        <MinusIcon className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                      <span className="w-6 text-center text-sm font-semibold">{item.quantity ?? 1}</span>
                      <button type="button" aria-label={`Increase ${item.name}`} onClick={() => setQty(cat.category, item.name, (item.quantity ?? 1) + 1)} className={cn('grid h-7 w-7 place-items-center rounded-md hover:bg-steel-100', focusRing)}>
                        <PlusIcon className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                      <button type="button" aria-label={`Remove ${item.name}`} onClick={() => toggleItem(cat.category, item.name)} className={cn('ml-1 grid h-7 w-7 place-items-center rounded-md text-steel-500 hover:bg-primary-soft hover:text-primary', focusRing)}>
                        <Trash2Icon className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                    </span>
                  </li>
              )}
              </ul>
            }
            <div className="mt-3 flex gap-2">
              <label htmlFor={`custom-${cat.category}`} className="sr-only">Add custom {cat.category} item</label>
              <input
                id={`custom-${cat.category}`}
                value={custom[cat.category] ?? ''}
                onChange={(e) => setCustom((s) => ({ ...s, [cat.category]: e.target.value }))}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addCustom(cat.category);
                  }
                }}
                placeholder={`Add custom ${cat.category.toLowerCase()} item`}
                className={cn(inputClass, 'py-2')} />
              
              <Button variant="outline" size="sm" className="h-[38px]" onClick={() => addCustom(cat.category)}>Add</Button>
            </div>
          </section>);

      })}
    </div>);

}
import React from 'react';
import { CheckIcon } from 'lucide-react';
import type { EquipmentCategory } from '../../types/marketplace';

export function EquipmentSection({ equipment }: {equipment: EquipmentCategory[];}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {equipment.map((group) =>
      <div key={group.category} className="rounded-xl border border-steel-200 p-5">
          <h3 className="font-heading text-sm font-semibold uppercase tracking-widest text-steel-900">{group.category}</h3>
          <ul className="mt-3 space-y-2">
            {group.items.map((item) =>
          <li key={item.name} className="flex items-start justify-between gap-3 text-sm">
                <span className="flex items-start gap-2 text-steel-700">
                  <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  {item.name}
                </span>
                {item.quantity && item.quantity > 1 &&
            <span className="shrink-0 rounded-md bg-steel-100 px-1.5 py-0.5 text-xs font-semibold text-steel-700">×{item.quantity}</span>
            }
              </li>
          )}
          </ul>
        </div>
      )}
    </div>);

}
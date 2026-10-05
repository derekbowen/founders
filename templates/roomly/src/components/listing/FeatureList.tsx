import React from 'react';
import { CheckIcon } from 'lucide-react';

export function FeatureList({ items }: {items: string[];}) {
  if (!items.length) return <p className="text-sm text-navy-500">No features listed.</p>;
  return (
    <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
      {items.map((f) =>
      <li key={f} className="flex items-center gap-2.5 text-sm text-navy-700">
          <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary-100 text-primary-800">
            <CheckIcon size={12} strokeWidth={3} />
          </span>
          {f}
        </li>
      )}
    </ul>);

}
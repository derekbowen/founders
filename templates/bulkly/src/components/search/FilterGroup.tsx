import React, { useState } from 'react';
import { ChevronDownIcon } from 'lucide-react';

export function FilterGroup({ title, children, defaultOpen = true }: {title: string;children: React.ReactNode;defaultOpen?: boolean;}) {
  const [open, setOpen] = useState(defaultOpen);
  const id = `filter-${title.toLowerCase().replace(/\W+/g, '-')}`;
  return (
    <div className="border-b border-slate-200 py-4 first:pt-0 last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={id}
        className="flex w-full items-center justify-between text-left text-sm font-semibold text-slate-900">
        
        {title}
        <ChevronDownIcon className={`h-4 w-4 text-slate-500 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>
      {open &&
      <div id={id} className="mt-3">
          {children}
        </div>
      }
    </div>);

}
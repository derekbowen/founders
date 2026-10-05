import React, { useState } from 'react';
import { ChevronDownIcon } from 'lucide-react';
import { cx } from '../../utils/styles';

interface FilterSectionProps {
  title: string;
  count?: number;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

export function FilterSection({ title, count = 0, defaultOpen = true, children }: FilterSectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  const id = `filter-${title.toLowerCase().replace(/\s+/g, '-')}`;
  return (
    <div className="border-b border-line py-5">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={id}
        className="flex w-full items-center justify-between text-left">
        
        <span className="text-[11px] font-semibold uppercase tracking-eyebrow text-ink">
          {title}
          {count > 0 &&
          <span className="ml-2 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-accent-dark px-1 text-[9px] text-paper">
              {count}
            </span>
          }
        </span>
        <ChevronDownIcon
          size={16}
          className={cx('text-muted transition-transform', open && 'rotate-180')}
          aria-hidden="true" />
        
      </button>
      {open &&
      <div id={id} className="pt-4">
          {children}
        </div>
      }
    </div>);

}
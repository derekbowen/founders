import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDownIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

interface FilterPopoverProps {
  label: string;
  active?: boolean;
  children: React.ReactNode;
  onClear?: () => void;
}

export function FilterPopover({ label, active, children, onClear }: FilterPopoverProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className={cn(
          'flex h-10 items-center gap-1.5 whitespace-nowrap rounded-full border px-4 text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-200',
          active ? 'border-primary-500 bg-primary-50 text-primary-800' : 'border-stone-300 bg-white text-stone-700 hover:border-stone-400'
        )}>
        
        {label}
        <ChevronDownIcon className={cn('h-4 w-4 transition-transform', open && 'rotate-180')} aria-hidden="true" />
      </button>
      <AnimatePresence>
        {open &&
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.12 }}
          className="absolute left-0 z-30 mt-2 w-72 rounded-2xl border border-stone-100 bg-white p-5 shadow-lift">
          
            {children}
            <div className="mt-5 flex items-center justify-between border-t border-stone-100 pt-4">
              <button type="button" onClick={onClear} className="text-sm font-bold text-stone-600 underline-offset-2 hover:text-stone-900 hover:underline">
                Clear
              </button>
              <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full bg-stone-900 px-4 py-2 text-sm font-extrabold text-white hover:bg-stone-800">
              
                Done
              </button>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}
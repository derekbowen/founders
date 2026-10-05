import React, { useCallback, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDownIcon } from 'lucide-react';
import { useClickOutside } from '../../hooks/useClickOutside';
import { cn } from '../../utils/styles';

interface FilterPopoverProps {
  label: string;
  activeLabel?: string;
  onClear: () => void;
  children: React.ReactNode;
}

export function FilterPopover({ label, activeLabel, onClear, children }: FilterPopoverProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpen(false), []);
  useClickOutside(ref, close, open);
  const active = Boolean(activeLabel);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={cn(
          'inline-flex h-10 items-center gap-1.5 rounded-full border px-4 text-sm font-bold transition-colors',
          active ?
          'border-primary-600 bg-primary-50 text-primary-800' :
          'border-ink-300 bg-white text-ink-800 hover:border-ink-400',
          open && !active && 'border-ink-900'
        )}>
        
        {activeLabel ?? label}
        <ChevronDownIcon className={cn('h-4 w-4 transition-transform', open && 'rotate-180')} aria-hidden="true" />
      </button>
      <AnimatePresence>
        {open &&
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.12 }}
          className="absolute left-0 top-full z-30 mt-2 w-72 rounded-2xl border border-ink-200 bg-white p-3 shadow-lift"
          role="dialog"
          aria-label={`${label} filter`}>
          
            {children}
            <div className="mt-3 flex items-center justify-between border-t border-ink-100 pt-3">
              <button
              type="button"
              onClick={onClear}
              className="text-sm font-bold text-ink-600 underline-offset-2 hover:text-ink-900 hover:underline">
              
                Clear
              </button>
              <button
              type="button"
              onClick={close}
              className="rounded-lg bg-ink-900 px-4 py-2 text-sm font-bold text-white hover:bg-ink-800">
              
                Done
              </button>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}
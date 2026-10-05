import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { XIcon } from 'lucide-react';
import { FilterPanel } from './FilterPanel';
import { Button } from '../ui/Button';
import type { SearchFilters } from '../../utils/search';
import { pluralize } from '../../utils/format';

interface FilterDrawerProps {
  open: boolean;
  onClose: () => void;
  filters: SearchFilters;
  onChange: (patch: Partial<SearchFilters>) => void;
  onReset: () => void;
  resultCount: number;
}

export function FilterDrawer({ open, onClose, filters, onChange, onReset, resultCount }: FilterDrawerProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open &&
      <>
          <motion.div
          className="fixed inset-0 z-50 bg-slate-900/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          aria-hidden />
        
          <motion.aside
          role="dialog"
          aria-modal="true"
          aria-label="Filters"
          className="fixed inset-y-0 left-0 z-50 flex w-full max-w-md flex-col bg-white shadow-float"
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}>
          
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <h2 className="text-lg font-semibold text-slate-900">Filters</h2>
              <button type="button" onClick={onClose} className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-slate-100" aria-label="Close filters">
                <XIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6">
              <FilterPanel filters={filters} onChange={onChange} />
            </div>
            <div className="flex items-center justify-between gap-3 border-t border-slate-200 px-6 py-4">
              <button type="button" onClick={onReset} className="text-sm font-semibold text-slate-700 underline underline-offset-4 hover:text-slate-900">
                Clear all
              </button>
              <Button onClick={onClose}>Show {pluralize(resultCount, 'experience')}</Button>
            </div>
          </motion.aside>
        </>
      }
    </AnimatePresence>);

}
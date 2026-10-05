import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { XIcon } from 'lucide-react';
import { FilterField } from './FilterField';
import { Button } from '../ui/Button';
import type { FilterKey, SearchFilters } from '../../types/marketplace';

interface FilterDrawerProps {
  open: boolean;
  onClose: () => void;
  filters: SearchFilters;
  onChange: (patch: Partial<SearchFilters>) => void;
  onReset: () => void;
  resultCount: number;
}

const sections: {key: FilterKey;title: string;}[] = [
{ key: 'category', title: 'Category' },
{ key: 'budget', title: 'Budget' },
{ key: 'date', title: 'Date needed' },
{ key: 'distance', title: 'Distance' },
{ key: 'size', title: 'Job size' }];


export function FilterDrawer({ open, onClose, filters, onChange, onReset, resultCount }: FilterDrawerProps) {
  return (
    <AnimatePresence>
      {open &&
      <div className="fixed inset-0 z-[60] md:hidden" role="dialog" aria-modal="true" aria-label="Filters">
          <motion.div
          className="absolute inset-0 bg-ink-950/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose} />
        
          <motion.div
          className="absolute inset-x-0 bottom-0 flex max-h-[90vh] flex-col rounded-t-3xl bg-white"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', stiffness: 380, damping: 40 }}>
          
            <div className="flex items-center justify-between border-b border-ink-200 px-5 py-4">
              <h2 className="text-lg font-extrabold text-ink-900">Filters</h2>
              <button type="button" onClick={onClose} className="rounded-lg p-2 hover:bg-ink-100" aria-label="Close filters">
                <XIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 space-y-6 overflow-y-auto px-5 py-5">
              {sections.map((s) =>
            <section key={s.key}>
                  <h3 className="mb-2 text-sm font-extrabold text-ink-900">{s.title}</h3>
                  <FilterField type={s.key} filters={filters} onChange={onChange} idPrefix="drawer" />
                </section>
            )}
            </div>
            <div className="flex items-center gap-3 border-t border-ink-200 px-5 py-4">
              <Button variant="ghost" onClick={onReset}>
                Clear all
              </Button>
              <Button fullWidth onClick={onClose} className="flex-1">
                Show {resultCount} {resultCount === 1 ? 'job' : 'jobs'}
              </Button>
            </div>
          </motion.div>
        </div>
      }
    </AnimatePresence>);

}
import React, { useCallback, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDownIcon } from 'lucide-react';
import { useClickOutside } from '../../hooks/useClickOutside';
import { cn } from '../../utils/styles';

interface NavDropdownProps {
  label: string;
  items: {to: string;label: string;description?: string;}[];
}

export function NavDropdown({ label, items }: NavDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpen(false), []);
  useClickOutside(ref, close, open);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        className={cn(
          'inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-bold text-ink-700 transition-colors hover:bg-ink-100 hover:text-ink-900',
          open && 'bg-ink-100 text-ink-900'
        )}>
        
        {label}
        <ChevronDownIcon className={cn('h-4 w-4 transition-transform', open && 'rotate-180')} aria-hidden="true" />
      </button>
      <AnimatePresence>
        {open &&
        <motion.div
          role="menu"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.12 }}
          className="absolute left-0 top-full z-50 mt-2 w-64 rounded-xl border border-ink-200 bg-white p-1.5 shadow-lift">
          
            {items.map((item) =>
          <Link
            key={item.to}
            to={item.to}
            role="menuitem"
            onClick={close}
            className="block rounded-lg px-3 py-2.5 hover:bg-ink-50">
            
                <span className="block text-sm font-bold text-ink-900">{item.label}</span>
                {item.description && <span className="block text-xs text-ink-500">{item.description}</span>}
              </Link>
          )}
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}
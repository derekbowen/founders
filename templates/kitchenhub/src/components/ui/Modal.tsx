import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { XIcon } from 'lucide-react';
import { cn, focusRing } from '../../utils/styles';

type ModalPosition = 'center' | 'right' | 'full';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  position?: ModalPosition;
  footer?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

const panelClasses: Record<ModalPosition, string> = {
  center: 'relative mx-auto mt-[8vh] flex max-h-[84vh] w-[calc(100%-2rem)] max-w-lg flex-col rounded-2xl bg-white shadow-lift',
  right: 'absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-white shadow-lift',
  full: 'absolute inset-0 flex flex-col bg-steel-900 text-white'
};

const motionProps: Record<ModalPosition, {initial: object;animate: object;exit: object;}> = {
  center: { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 16 } },
  right: { initial: { x: '100%' }, animate: { x: 0 }, exit: { x: '100%' } },
  full: { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
};

export function Modal({ open, onClose, title, position = 'center', footer, className, children }: ModalProps) {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  const dark = position === 'full';

  return createPortal(
    <AnimatePresence>
      {open &&
      <div className="fixed inset-0 z-[1000]">
          <motion.div
          className="absolute inset-0 bg-steel-900/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose} />
        
          <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={title}
          className={cn(panelClasses[position], className)}
          transition={{ type: 'spring', damping: 30, stiffness: 320 }}
          {...motionProps[position]}>
          
            <div className={cn('flex items-center justify-between border-b px-5 py-4', dark ? 'border-white/10' : 'border-steel-200')}>
              <h2 className="text-base font-semibold">{title}</h2>
              <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className={cn('grid h-9 w-9 place-items-center rounded-full transition-colors', focusRing, dark ? 'hover:bg-white/10' : 'hover:bg-steel-100')}>
              
                <XIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
            {footer && <div className={cn('border-t px-5 py-4', dark ? 'border-white/10' : 'border-steel-200')}>{footer}</div>}
          </motion.div>
        </div>
      }
    </AnimatePresence>,
    document.body
  );
}
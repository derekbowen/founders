import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CircleCheckIcon } from 'lucide-react';

export function SaveNotice({ show, message }: {show: boolean;message: string;}) {
  return (
    <AnimatePresence>
      {show &&
      <motion.p
        role="status"
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-700">
        
          <CircleCheckIcon size={16} aria-hidden="true" /> {message}
        </motion.p>
      }
    </AnimatePresence>);

}
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon, XIcon } from 'lucide-react';

interface PhotoLightboxProps {
  images: string[];
  index: number;
  title: string;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}

export function PhotoLightbox({ images, index, title, onIndexChange, onClose }: PhotoLightboxProps) {
  const prev = () => onIndexChange((index - 1 + images.length) % images.length);
  const next = () => onIndexChange((index + 1) % images.length);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  });

  const navClass = 'absolute top-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent';

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`${title} photos`}
      className="fixed inset-0 z-50 flex flex-col bg-ink/95"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      
      <div className="flex items-center justify-between px-4 py-4 text-white sm:px-6">
        <p className="text-sm font-medium">
          {index + 1} / {images.length}
        </p>
        <button type="button" onClick={onClose} className="grid h-10 w-10 place-items-center rounded-full hover:bg-white/10" aria-label="Close photos">
          <XIcon size={22} />
        </button>
      </div>
      <div className="relative flex flex-1 items-center justify-center px-4 pb-8 sm:px-20">
        <motion.img
          key={images[index]}
          src={images[index]}
          alt={`${title} — photo ${index + 1}`}
          className="max-h-full max-w-full rounded-xl object-contain"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }} />
        
        <button type="button" onClick={prev} className={`${navClass} left-3 sm:left-6`} aria-label="Previous photo">
          <ChevronLeftIcon size={24} />
        </button>
        <button type="button" onClick={next} className={`${navClass} right-3 sm:right-6`} aria-label="Next photo">
          <ChevronRightIcon size={24} />
        </button>
      </div>
    </motion.div>);

}
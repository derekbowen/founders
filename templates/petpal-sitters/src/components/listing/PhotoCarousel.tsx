import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

interface PhotoCarouselProps {
  photos: string[];
  title: string;
}

export function PhotoCarousel({ photos, title }: PhotoCarouselProps) {
  const [[index, direction], setState] = useState<[number, number]>([0, 0]);
  const go = (delta: number) => setState(([i]) => [(i + delta + photos.length) % photos.length, delta]);

  const arrow =
  'absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-stone-800 shadow-md transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-200';

  return (
    <div
      className="space-y-3"
      role="region"
      aria-roledescription="carousel"
      aria-label={`Photos of ${title}`}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') go(-1);
        if (e.key === 'ArrowRight') go(1);
      }}>
      
      <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-stone-100 sm:aspect-[16/9]">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.img
            key={index}
            src={photos[index]}
            alt={`${title} — photo ${index + 1} of ${photos.length}`}
            custom={direction}
            initial={{ opacity: 0, x: direction >= 0 ? 40 : -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction >= 0 ? -40 : 40 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="absolute inset-0 h-full w-full object-cover" />
          
        </AnimatePresence>
        <button type="button" onClick={() => go(-1)} className={cn(arrow, 'left-4')} aria-label="Previous photo">
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
        <button type="button" onClick={() => go(1)} className={cn(arrow, 'right-4')} aria-label="Next photo">
          <ChevronRightIcon className="h-5 w-5" />
        </button>
        <span className="absolute bottom-4 right-4 rounded-full bg-stone-900/75 px-3 py-1 text-xs font-bold text-white" aria-live="polite">
          {index + 1} / {photos.length}
        </span>
      </div>
      <div className="flex gap-3">
        {photos.map((p, i) =>
        <button
          key={p + i}
          type="button"
          onClick={() => setState([i, i > index ? 1 : -1])}
          aria-label={`Show photo ${i + 1}`}
          aria-current={i === index}
          className={cn(
            'relative h-16 flex-1 overflow-hidden rounded-xl ring-2 ring-offset-2 ring-offset-canvas transition-all sm:h-20',
            i === index ? 'ring-primary-500' : 'opacity-70 ring-transparent hover:opacity-100'
          )}>
          
            <img src={p} alt="" className="h-full w-full object-cover" />
          </button>
        )}
      </div>
    </div>);

}
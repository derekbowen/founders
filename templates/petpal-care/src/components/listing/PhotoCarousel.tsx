import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

interface PhotoCarouselProps {
  photos: string[];
  altBase: string;
}

export function PhotoCarousel({ photos, altBase }: PhotoCarouselProps) {
  const [index, setIndex] = useState(0);
  const go = (dir: number) => setIndex((i) => (i + dir + photos.length) % photos.length);

  return (
    <div
      className="space-y-3"
      role="region"
      aria-roledescription="carousel"
      aria-label="Listing photos"
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') go(-1);
        if (e.key === 'ArrowRight') go(1);
      }}>
      
      <div className="group relative aspect-[16/10] overflow-hidden rounded-3xl bg-ink-100 sm:aspect-[16/9]">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.img
            key={photos[index]}
            src={photos[index]}
            alt={`${altBase} — photo ${index + 1} of ${photos.length}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 h-full w-full object-cover" />
          
        </AnimatePresence>
        <button type="button" onClick={() => go(-1)} className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-ink-900 shadow-soft transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500" aria-label="Previous photo">
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </button>
        <button type="button" onClick={() => go(1)} className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-ink-900 shadow-soft transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500" aria-label="Next photo">
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </button>
        <span className="absolute bottom-3 right-3 rounded-full bg-ink-900/75 px-3 py-1 text-xs font-bold text-white">
          {index + 1} / {photos.length}
        </span>
      </div>
      <div className="flex gap-2">
        {photos.map((p, i) =>
        <button
          key={p + i}
          type="button"
          onClick={() => setIndex(i)}
          aria-label={`Show photo ${i + 1}`}
          aria-current={i === index}
          className={`h-16 w-24 overflow-hidden rounded-xl ring-2 ring-offset-2 transition sm:h-20 sm:w-28 ${i === index ? 'ring-primary-500' : 'ring-transparent opacity-70 hover:opacity-100'}`}>
          
            <img src={p} alt="" className="h-full w-full object-cover" />
          </button>
        )}
      </div>
    </div>);

}
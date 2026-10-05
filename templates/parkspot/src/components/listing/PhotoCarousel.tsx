import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

export function PhotoCarousel({ photos, title, badge }: {photos: string[];title: string;badge?: React.ReactNode;}) {
  const [index, setIndex] = useState(0);
  const go = (delta: number) => setIndex((i) => (i + delta + photos.length) % photos.length);

  return (
    <div
      className="relative"
      role="region"
      aria-roledescription="carousel"
      aria-label={`${title} photos`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') go(1);
        if (e.key === 'ArrowLeft') go(-1);
      }}>
      
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-ink/5 sm:aspect-[16/9]">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.img
            key={index}
            src={photos[index]}
            alt={`${title} — photo ${index + 1} of ${photos.length}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 h-full w-full object-cover" />
          
        </AnimatePresence>
        {badge && <div className="absolute left-4 top-4 flex gap-2">{badge}</div>}
        <span className="absolute bottom-4 right-4 rounded-full bg-ink/75 px-3 py-1 text-xs font-semibold text-white">
          {index + 1} / {photos.length}
        </span>
        {photos.length > 1 &&
        <>
            <CarouselButton side="left" onClick={() => go(-1)} />
            <CarouselButton side="right" onClick={() => go(1)} />
          </>
        }
      </div>
      <div className="mt-3 flex gap-2" role="tablist" aria-label="Choose photo">
        {photos.map((p, i) =>
        <button
          key={p + i}
          type="button"
          role="tab"
          aria-selected={i === index}
          aria-label={`Show photo ${i + 1}`}
          onClick={() => setIndex(i)}
          className={`h-16 w-24 overflow-hidden rounded-lg border-2 transition-opacity ${
          i === index ? 'border-ink' : 'border-transparent opacity-60 hover:opacity-100'}`
          }>
          
            <img src={p} alt="" className="h-full w-full object-cover" />
          </button>
        )}
      </div>
    </div>);

}

function CarouselButton({ side, onClick }: {side: 'left' | 'right';onClick: () => void;}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === 'left' ? 'Previous photo' : 'Next photo'}
      className={`absolute top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-surface/95 text-ink shadow-card transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
      side === 'left' ? 'left-4' : 'right-4'}`
      }>
      
      {side === 'left' ? <ChevronLeftIcon size={18} aria-hidden /> : <ChevronRightIcon size={18} aria-hidden />}
    </button>);

}
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface ListingGalleryProps {
  images: string[];
  title: string;
}

export function ListingGallery({ images, title }: ListingGalleryProps) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-slate-100">
        <AnimatePresence mode="wait">
          <motion.img
            key={images[active]}
            src={images[active]}
            alt={`${title} — portfolio image ${active + 1} of ${images.length}`}
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }} />
          
        </AnimatePresence>
        <span className="absolute bottom-3 right-3 rounded-full bg-slate-950/70 px-2.5 py-1 text-xs font-semibold text-white">
          {active + 1} / {images.length}
        </span>
      </div>
      <div className="mt-3 grid grid-cols-4 gap-3" role="tablist" aria-label="Portfolio images">
        {images.map((src, i) =>
        <button
          key={src + i}
          type="button"
          role="tab"
          aria-selected={i === active}
          aria-label={`Show image ${i + 1}`}
          onClick={() => setActive(i)}
          className={`relative aspect-[4/3] overflow-hidden rounded-xl transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ${
          i === active ? 'ring-2 ring-primary-600 ring-offset-2' : 'opacity-70 hover:opacity-100'}`
          }>
          
            <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
          </button>
        )}
      </div>
    </div>);

}
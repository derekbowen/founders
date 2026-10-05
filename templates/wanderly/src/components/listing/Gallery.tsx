import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon, LayoutGridIcon, XIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

interface GalleryProps {
  images: string[];
  title: string;
}

export function Gallery({ images, title }: GalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenIndex(null);
      if (e.key === 'ArrowRight') setOpenIndex((i) => i === null ? i : (i + 1) % images.length);
      if (e.key === 'ArrowLeft') setOpenIndex((i) => i === null ? i : (i - 1 + images.length) % images.length);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [openIndex, images.length]);

  const tileCls = [
  'md:col-span-2 md:row-span-2',
  'md:col-span-1 md:row-span-1',
  'md:col-span-1 md:row-span-1',
  'md:col-span-2 md:row-span-1'];


  return (
    <div className="relative">
      <div className="-mx-4 flex snap-x snap-mandatory gap-2 overflow-x-auto scrollbar-none sm:mx-0 md:grid md:h-[460px] md:grid-cols-4 md:grid-rows-2 md:overflow-hidden md:rounded-3xl">
        {images.slice(0, 4).map((src, i) =>
        <button
          key={src + i}
          type="button"
          onClick={() => setOpenIndex(i)}
          className={twMerge(
            'group relative aspect-[4/3] w-[88%] shrink-0 snap-center overflow-hidden first:ml-4 last:mr-4 md:aspect-auto md:w-auto md:first:ml-0 md:last:mr-0',
            tileCls[i]
          )}
          aria-label={`Open photo ${i + 1} of ${images.length}`}>
          
            <img src={src} alt={i === 0 ? title : ''} className="h-full w-full rounded-2xl object-cover transition duration-300 group-hover:brightness-90 md:rounded-none" />
          </button>
        )}
      </div>
      <button
        type="button"
        onClick={() => setOpenIndex(0)}
        className="absolute bottom-4 right-4 hidden items-center gap-2 rounded-full border border-slate-900 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:bg-sand-100 md:flex">
        
        <LayoutGridIcon className="h-4 w-4" aria-hidden />
        Show all photos
      </button>

      <AnimatePresence>
        {openIndex !== null &&
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/95 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}>
          
            <button type="button" onClick={() => setOpenIndex(null)} className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20" aria-label="Close photo viewer">
              <XIcon className="h-5 w-5" />
            </button>
            <button type="button" onClick={() => setOpenIndex((openIndex - 1 + images.length) % images.length)} className="absolute left-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20" aria-label="Previous photo">
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <motion.img
            key={openIndex}
            src={images[openIndex]}
            alt={`${title} — photo ${openIndex + 1}`}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-h-[85vh] max-w-full rounded-2xl object-contain" />
          
            <button type="button" onClick={() => setOpenIndex((openIndex + 1) % images.length)} className="absolute right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20" aria-label="Next photo">
              <ChevronRightIcon className="h-5 w-5" />
            </button>
            <p className="absolute bottom-6 text-sm text-white/80">
              {openIndex + 1} / {images.length}
            </p>
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}
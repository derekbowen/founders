import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon, Grid3x3Icon, XIcon } from 'lucide-react';

export function Gallery({ images, title }: {images: string[];title: string;}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const tiles = [0, 1, 2, 3, 4].map((i) => images[i % images.length]);

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenIndex(null);
      if (e.key === 'ArrowRight') setOpenIndex((i) => i === null ? i : (i + 1) % images.length);
      if (e.key === 'ArrowLeft') setOpenIndex((i) => i === null ? i : (i - 1 + images.length) % images.length);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [openIndex, images.length]);

  return (
    <>
      <div className="relative grid h-[280px] grid-cols-4 grid-rows-2 gap-2 overflow-hidden rounded-2xl sm:h-[380px] lg:h-[460px]">
        {tiles.map((src, i) =>
        <button
          key={i}
          type="button"
          onClick={() => setOpenIndex(i % images.length)}
          className={`group relative overflow-hidden bg-sand-200 ${i === 0 ? 'col-span-4 row-span-2 md:col-span-2' : 'hidden md:block'}`}
          aria-label={`Open photo ${i % images.length + 1} of ${images.length}`}>
          
            <img src={src} alt={i === 0 ? title : ''} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
            <span className="absolute inset-0 bg-ink-900/0 transition group-hover:bg-ink-900/10" />
          </button>
        )}
        <button
          type="button"
          onClick={() => setOpenIndex(0)}
          className="btn absolute bottom-4 right-4 border border-ink-900 bg-white py-2 text-ink-900 shadow-sm hover:bg-sand-50">
          
          <Grid3x3Icon size={15} aria-hidden="true" />
          Show all {images.length} photos
        </button>
      </div>

      <AnimatePresence>
        {openIndex !== null &&
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`${title} photos`}
          className="fixed inset-0 z-50 flex flex-col bg-ink-900/95"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}>
          
            <div className="flex items-center justify-between px-4 py-4 text-white sm:px-8">
              <span className="text-sm">
                {openIndex + 1} / {images.length}
              </span>
              <button type="button" onClick={() => setOpenIndex(null)} className="grid h-10 w-10 place-items-center rounded-full hover:bg-white/10" aria-label="Close photos">
                <XIcon size={22} />
              </button>
            </div>
            <div className="relative flex flex-1 items-center justify-center px-4 pb-8 sm:px-20">
              <motion.img
              key={openIndex}
              src={images[openIndex]}
              alt={`${title} photo ${openIndex + 1}`}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className="max-h-full max-w-full rounded-xl object-contain" />
            
              <button
              type="button"
              onClick={() => setOpenIndex((openIndex - 1 + images.length) % images.length)}
              className="absolute left-2 grid h-11 w-11 place-items-center rounded-full bg-white text-ink-900 hover:bg-sand-100 sm:left-6"
              aria-label="Previous photo">
              
                <ChevronLeftIcon size={20} />
              </button>
              <button
              type="button"
              onClick={() => setOpenIndex((openIndex + 1) % images.length)}
              className="absolute right-2 grid h-11 w-11 place-items-center rounded-full bg-white text-ink-900 hover:bg-sand-100 sm:right-6"
              aria-label="Next photo">
              
                <ChevronRightIcon size={20} />
              </button>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </>);

}
import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon, LayoutGridIcon, XIcon } from 'lucide-react';

interface ListingGalleryProps {
  images: string[];
  title: string;
}

export function ListingGallery({ images, title }: ListingGalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const side = images.slice(1, 3);

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
      <div className="relative grid h-[280px] gap-2 overflow-hidden rounded-3xl sm:h-[380px] md:grid-cols-3 lg:h-[460px]">
        <button
          type="button"
          onClick={() => setOpenIndex(0)}
          className={`group relative overflow-hidden bg-navy-100 ${side.length ? 'md:col-span-2' : 'md:col-span-3'}`}
          aria-label="Open photo 1">
          
          <img src={images[0]} alt={title} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
        </button>
        {side.length > 0 &&
        <div className="hidden grid-rows-2 gap-2 md:grid">
            {side.map((src, i) =>
          <button
            key={src + i}
            type="button"
            onClick={() => setOpenIndex(i + 1)}
            className={`group relative overflow-hidden bg-navy-100 ${side.length === 1 ? 'row-span-2' : ''}`}
            aria-label={`Open photo ${i + 2}`}>
            
                <img src={src} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
              </button>
          )}
          </div>
        }
        <button
          type="button"
          onClick={() => setOpenIndex(0)}
          className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-xl border border-navy-200 bg-white px-3.5 py-2 text-sm font-semibold text-navy-900 shadow-card transition hover:bg-navy-50">
          
          <LayoutGridIcon size={16} aria-hidden /> Show all {images.length} photos
        </button>
      </div>

      <AnimatePresence>
        {openIndex !== null &&
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Photo gallery"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex flex-col bg-navy-900/95">
          
            <div className="flex items-center justify-between p-4 text-white">
              <span className="text-sm font-medium">
                {openIndex + 1} / {images.length}
              </span>
              <button
              type="button"
              onClick={() => setOpenIndex(null)}
              className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition hover:bg-white/20"
              aria-label="Close gallery">
              
                <XIcon size={20} />
              </button>
            </div>
            <div className="relative flex flex-1 items-center justify-center px-4 pb-8">
              <motion.img
              key={openIndex}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              src={images[openIndex]}
              alt={`${title} — photo ${openIndex + 1}`}
              className="max-h-[80vh] max-w-full rounded-2xl object-contain" />
            
              {images.length > 1 &&
            <>
                  <button
                type="button"
                onClick={() => setOpenIndex((openIndex - 1 + images.length) % images.length)}
                className="absolute left-4 grid h-11 w-11 place-items-center rounded-full bg-white text-navy-900 shadow-lift transition hover:scale-105"
                aria-label="Previous photo">
                
                    <ChevronLeftIcon size={20} />
                  </button>
                  <button
                type="button"
                onClick={() => setOpenIndex((openIndex + 1) % images.length)}
                className="absolute right-4 grid h-11 w-11 place-items-center rounded-full bg-white text-navy-900 shadow-lift transition hover:scale-105"
                aria-label="Next photo">
                
                    <ChevronRightIcon size={20} />
                  </button>
                </>
            }
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </>);

}
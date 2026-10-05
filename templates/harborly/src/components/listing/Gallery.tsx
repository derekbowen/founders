import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon, GridIcon, XIcon } from 'lucide-react';

export function Gallery({ images, title }: {images: string[];title: string;}) {
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null);
      if (e.key === 'ArrowRight') setOpen((i) => i === null ? i : (i + 1) % images.length);
      if (e.key === 'ArrowLeft') setOpen((i) => i === null ? i : (i - 1 + images.length) % images.length);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, images.length]);

  const [main, ...rest] = images;
  const side = rest.slice(0, 4);

  return (
    <>
      <div className="relative grid h-[280px] gap-2 overflow-hidden rounded-3xl sm:h-[420px] md:grid-cols-4 md:grid-rows-2">
        <button type="button" onClick={() => setOpen(0)} className={`group relative overflow-hidden md:row-span-2 ${side.length ? 'md:col-span-2' : 'md:col-span-4'}`} aria-label="Open photo 1">
          <img src={main} alt={title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
        </button>
        {side.map((src, i) =>
        <button
          key={src + i}
          type="button"
          onClick={() => setOpen(i + 1)}
          className={`group relative hidden overflow-hidden md:block ${side.length < 3 && i === side.length - 1 ? 'md:col-span-2' : ''} ${side.length === 1 ? 'md:row-span-2' : ''}`}
          aria-label={`Open photo ${i + 2}`}>
          
            <img src={src} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
          </button>
        )}
        <button type="button" onClick={() => setOpen(0)} className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-navy shadow-card hover:bg-sand-light">
          <GridIcon className="h-4 w-4" aria-hidden="true" />
          Show all {images.length} photos
        </button>
      </div>

      <AnimatePresence>
        {open !== null &&
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex flex-col bg-navy-deep">
          
            <div className="flex items-center justify-between px-4 py-4 text-white sm:px-6">
              <p className="text-sm">
                {open + 1} / {images.length}
              </p>
              <button type="button" autoFocus onClick={() => setOpen(null)} className="rounded-full p-2 hover:bg-white/10" aria-label="Close photo viewer">
                <XIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="relative flex flex-1 items-center justify-center px-4 pb-8 sm:px-16">
              <motion.img key={open} initial={{ opacity: 0.4 }} animate={{ opacity: 1 }} src={images[open]} alt={`${title} — photo ${open + 1}`} className="max-h-full max-w-full rounded-xl object-contain" />
              <button type="button" onClick={() => setOpen((open - 1 + images.length) % images.length)} className="absolute left-3 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 sm:left-6" aria-label="Previous photo">
                <ChevronLeftIcon className="h-5 w-5" />
              </button>
              <button type="button" onClick={() => setOpen((open + 1) % images.length)} className="absolute right-3 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 sm:right-6" aria-label="Next photo">
                <ChevronRightIcon className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </>);

}
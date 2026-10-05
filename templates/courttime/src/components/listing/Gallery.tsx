import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ImagesIcon } from 'lucide-react';
import { PhotoLightbox } from './PhotoLightbox';

export function Gallery({ images, title }: {images: string[];title: string;}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [main, ...rest] = images;

  return (
    <div className="relative">
      <div className="grid h-64 gap-2 overflow-hidden rounded-2xl sm:h-[420px] md:grid-cols-3 md:grid-rows-2">
        <button type="button" onClick={() => setOpenIndex(0)} className="group relative overflow-hidden bg-slate-200 md:col-span-2 md:row-span-2" aria-label="Open photo 1">
          <img src={main} alt={title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
        </button>
        {rest.slice(0, 2).map((src, i) =>
        <button key={src} type="button" onClick={() => setOpenIndex(i + 1)} className="group relative hidden overflow-hidden bg-slate-200 md:block" aria-label={`Open photo ${i + 2}`}>
            <img src={src} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
          </button>
        )}
      </div>
      <button type="button" onClick={() => setOpenIndex(0)} className="btn btn-sm absolute bottom-4 right-4 border border-slate-300 bg-white text-ink shadow hover:border-brand">
        <ImagesIcon size={16} aria-hidden="true" /> Show all {images.length} photos
      </button>
      <AnimatePresence>
        {openIndex !== null &&
        <PhotoLightbox images={images} index={openIndex} title={title} onIndexChange={setOpenIndex} onClose={() => setOpenIndex(null)} />
        }
      </AnimatePresence>
    </div>);

}
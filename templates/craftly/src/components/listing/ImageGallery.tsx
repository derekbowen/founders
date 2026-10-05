import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

interface ImageGalleryProps {
  image: string;
  title: string;
}

// Each listing ships one master photo; the gallery presents it as a set of detail views
// (full, glaze/texture detail, close-up). Swap for real multi-photo arrays when wiring a backend.
const views = [
{ label: 'Full view', scale: 1, origin: '50% 50%' },
{ label: 'Detail', scale: 1.7, origin: '45% 40%' },
{ label: 'Texture', scale: 2.1, origin: '60% 65%' },
{ label: 'Close-up', scale: 1.45, origin: '50% 60%' }];


export function ImageGallery({ image, title }: ImageGalleryProps) {
  const [index, setIndex] = useState(0);
  const go = (dir: 1 | -1) => setIndex((i) => (i + dir + views.length) % views.length);
  const current = views[index];

  return (
    <div className="flex flex-col-reverse gap-4 lg:flex-row">
      <div className="flex gap-3 overflow-x-auto scrollbar-none lg:flex-col" role="tablist" aria-label="Product images">
        {views.map((v, i) =>
        <button
          key={v.label}
          type="button"
          role="tab"
          aria-selected={i === index}
          aria-label={`${v.label} of ${title}`}
          onClick={() => setIndex(i)}
          className={`relative h-20 w-16 shrink-0 overflow-hidden rounded-xl bg-subtle transition lg:h-24 lg:w-20 ${
          i === index ? 'ring-2 ring-primary ring-offset-2 ring-offset-canvas' : 'opacity-70 hover:opacity-100'}`
          }>
          
            <img src={image} alt="" className="h-full w-full object-cover" style={{ transform: `scale(${v.scale})`, transformOrigin: v.origin }} />
          </button>
        )}
      </div>
      <div className="relative flex-1 overflow-hidden rounded-3xl bg-subtle">
        <div className="aspect-[4/5]">
          <AnimatePresence mode="wait">
            <motion.img
              key={index}
              src={image}
              alt={`${title} — ${current.label.toLowerCase()}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="h-full w-full object-cover"
              style={{ transform: `scale(${current.scale})`, transformOrigin: current.origin }} />
            
          </AnimatePresence>
        </div>
        <div className="absolute inset-x-4 bottom-4 flex items-center justify-between">
          <span className="rounded-full bg-surface/90 px-3 py-1 text-xs font-medium text-ink backdrop-blur">
            {index + 1} / {views.length} · {current.label}
          </span>
          <div className="flex gap-2">
            <button type="button" onClick={() => go(-1)} className="flex h-10 w-10 items-center justify-center rounded-full bg-surface/90 shadow-soft backdrop-blur hover:bg-surface" aria-label="Previous image">
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <button type="button" onClick={() => go(1)} className="flex h-10 w-10 items-center justify-center rounded-full bg-surface/90 shadow-soft backdrop-blur hover:bg-surface" aria-label="Next image">
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>);

}
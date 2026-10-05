import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import type { Listing } from '../../types/marketplace';
import { PreviewPage } from './PreviewPage';

export function PreviewCarousel({ listing }: {listing: Listing;}) {
  const slides = [{ type: 'cover' as const, label: 'Cover' }, ...listing.included.slice(0, 3).map((label) => ({ type: 'page' as const, label }))];
  const [index, setIndex] = useState(0);

  const go = (dir: number) => setIndex((i) => (i + dir + slides.length) % slides.length);

  return (
    <section aria-roledescription="carousel" aria-label="Product previews" className="space-y-3">
      <div
        className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-ink bg-paper"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') go(1);
          if (e.key === 'ArrowLeft') go(-1);
        }}>
        
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.18 }}
            className="absolute inset-0"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${slides.length}: ${slides[index].label}`}>
            
            {slides[index].type === 'cover' ?
            <img src={listing.cover} alt={`Cover of ${listing.title}`} className="h-full w-full object-cover" /> :

            <PreviewPage listing={listing} heading={slides[index].label} index={index} />
            }
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-x-3 top-1/2 flex -translate-y-1/2 justify-between">
          <button type="button" onClick={() => go(-1)} aria-label="Previous preview" className="btn btn-outline btn-sm w-9 rounded-full px-0 shadow-pop-sm">
            <ChevronLeftIcon className="h-4 w-4" />
          </button>
          <button type="button" onClick={() => go(1)} aria-label="Next preview" className="btn btn-outline btn-sm w-9 rounded-full px-0 shadow-pop-sm">
            <ChevronRightIcon className="h-4 w-4" />
          </button>
        </div>
        <span className="absolute bottom-3 right-3 rounded-full border border-ink bg-white px-2.5 py-0.5 text-xs font-semibold">
          {index === 0 ? 'Cover' : 'Preview'} · {index + 1}/{slides.length}
        </span>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {slides.map((s, i) =>
        <button
          key={s.label}
          type="button"
          onClick={() => setIndex(i)}
          aria-label={`Show ${s.label}`}
          aria-current={i === index}
          className={`relative aspect-[4/3] overflow-hidden rounded-lg border transition ${
          i === index ? 'border-ink ring-2 ring-brand ring-offset-1' : 'border-ink/20 opacity-70 hover:opacity-100'}`
          }>
          
            {s.type === 'cover' ?
          <img src={listing.cover} alt="" className="h-full w-full object-cover" /> :

          <div className="pointer-events-none h-full w-full origin-top-left scale-[0.25]" style={{ width: '400%', height: '400%' }}>
                <PreviewPage listing={listing} heading={s.label} index={i} />
              </div>
          }
          </button>
        )}
      </div>
    </section>);

}
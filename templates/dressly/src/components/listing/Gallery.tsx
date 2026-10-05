import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Listing } from '../../types/marketplace';
import { cx } from '../../utils/styles';

const views = [
{ label: 'Full look', className: 'object-center', scale: 1 },
{ label: 'Bodice detail', className: 'object-[50%_28%]', scale: 1.9 },
{ label: 'Fabric & hem', className: 'object-[50%_75%]', scale: 1.7 },
{ label: 'Silhouette', className: 'object-[50%_45%]', scale: 1.3 }];


export function Gallery({ listing }: {listing: Listing;}) {
  const [active, setActive] = useState(0);
  const view = views[active];
  return (
    <div className="flex flex-col-reverse gap-3 md:flex-row">
      <div className="no-scrollbar flex gap-3 overflow-x-auto md:w-20 md:flex-col" role="tablist" aria-label="Photos">
        {views.map((v, i) =>
        <button
          key={v.label}
          type="button"
          role="tab"
          aria-selected={i === active}
          aria-label={v.label}
          onClick={() => setActive(i)}
          className={cx(
            'aspect-[3/4] w-16 shrink-0 overflow-hidden bg-cream transition md:w-full',
            i === active ? 'ring-1 ring-ink ring-offset-2' : 'opacity-60 hover:opacity-100'
          )}>
          
            <img
            src={listing.image}
            alt=""
            className={cx('h-full w-full object-cover', v.className)}
            style={{ transform: `scale(${v.scale})` }} />
          
          </button>
        )}
      </div>
      <div className="relative aspect-[3/4] flex-1 overflow-hidden bg-cream">
        <AnimatePresence mode="wait">
          <motion.img
            key={active}
            src={listing.image}
            alt={`${listing.designer} ${listing.title} — ${view.label}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className={cx('h-full w-full object-cover', view.className)}
            style={{ transform: `scale(${view.scale})` }} />
          
        </AnimatePresence>
        <span className="absolute bottom-4 left-4 bg-paper/95 px-2.5 py-1 text-[11px] text-ink">
          {active + 1} / {views.length} · {view.label}
        </span>
      </div>
    </div>);

}
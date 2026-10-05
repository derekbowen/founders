import React, { useCallback, useEffect, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, LayoutGridIcon } from 'lucide-react';
import { cn, focusRing } from '../../utils/styles';
import { Modal } from '../ui/Modal';

interface GalleryProps {
  images: string[];
  title: string;
}

export function Gallery({ images, title }: GalleryProps) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const close = useCallback(() => setOpen(false), []);

  const openAt = (i: number) => {
    setIndex(i);
    setOpen(true);
  };
  const go = useCallback((dir: number) => setIndex((i) => (i + dir + images.length) % images.length), [images.length]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, go]);

  return (
    <>
      <div className="relative grid h-[260px] gap-2 overflow-hidden rounded-2xl sm:h-[360px] md:h-[440px] md:grid-cols-4 md:grid-rows-2">
        {images.slice(0, 5).map((src, i) =>
        <button
          key={`${src}-${i}`}
          type="button"
          onClick={() => openAt(i)}
          className={cn('group relative overflow-hidden bg-steel-100', focusRing, i === 0 ? 'md:col-span-2 md:row-span-2' : 'hidden md:block')}
          aria-label={`Open photo ${i + 1} of ${images.length}`}>
          
            <img src={src} alt={i === 0 ? `${title} main photo` : ''} className="h-full w-full object-cover transition duration-500 group-hover:scale-105 group-hover:brightness-90" />
          </button>
        )}
        <button
          type="button"
          onClick={() => openAt(0)}
          className={cn('absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-lg border border-steel-900 bg-white px-3 py-2 text-sm font-semibold text-steel-900 shadow-sm hover:bg-steel-50', focusRing)}>
          
          <LayoutGridIcon className="h-4 w-4" aria-hidden="true" />
          Show all {images.length} photos
        </button>
      </div>

      <Modal open={open} onClose={close} title={`${title} · ${index + 1} / ${images.length}`} position="full">
        <div className="flex h-full flex-col">
          <div className="relative flex min-h-0 flex-1 items-center justify-center p-4 sm:p-10">
            <img src={images[index]} alt={`${title} photo ${index + 1}`} className="max-h-full max-w-full rounded-lg object-contain" />
            <button type="button" onClick={() => go(-1)} aria-label="Previous photo" className={cn('absolute left-3 grid h-11 w-11 place-items-center rounded-full bg-white/10 hover:bg-white/20 sm:left-6', focusRing)}>
              <ChevronLeftIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Next photo" className={cn('absolute right-3 grid h-11 w-11 place-items-center rounded-full bg-white/10 hover:bg-white/20 sm:right-6', focusRing)}>
              <ChevronRightIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="flex justify-center gap-2 overflow-x-auto px-4 pb-6">
            {images.map((src, i) =>
            <button
              key={`thumb-${i}`}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show photo ${i + 1}`}
              aria-current={i === index}
              className={cn('h-14 w-20 shrink-0 overflow-hidden rounded-md opacity-60 ring-2 ring-transparent transition hover:opacity-100', i === index && 'opacity-100 ring-white', focusRing)}>
              
                <img src={src} alt="" className="h-full w-full object-cover" />
              </button>
            )}
          </div>
        </div>
      </Modal>
    </>);

}
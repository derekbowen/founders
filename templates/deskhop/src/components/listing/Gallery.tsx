import React, { useState } from 'react';
import { ImagesIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader } from '../Dialog';

interface GalleryProps {
  images: string[];
  title: string;
}

export function Gallery({ images, title }: GalleryProps) {
  const [open, setOpen] = useState(false);
  const [main, ...rest] = images;
  const side = rest.slice(0, 4);

  return (
    <div className="relative">
      <div className="grid h-64 gap-2 overflow-hidden rounded-2xl sm:h-80 md:h-[440px] md:grid-cols-4 md:grid-rows-2">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="focus-ring group relative overflow-hidden bg-mist md:col-span-2 md:row-span-2"
          aria-label={`Open photo gallery for ${title}`}>
          
          <img src={main} alt={title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
        </button>
        {side.map((src, i) =>
        <button
          key={src + i}
          type="button"
          onClick={() => setOpen(true)}
          className={`focus-ring group relative hidden overflow-hidden bg-mist md:block ${
          side.length < 4 && i === side.length - 1 ? 'md:col-span-2' : ''} ${
          side.length <= 2 ? 'md:row-span-2' : ''}`}
          aria-label={`Open photo ${i + 2}`}>
          
            <img src={src} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
          </button>
        )}
      </div>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="btn-secondary absolute bottom-4 right-4 !py-2 shadow-card">
        
        <ImagesIcon size={16} aria-hidden="true" /> Show all {images.length} photos
      </button>

      <Dialog isOpen={open} onClose={() => setOpen(false)} size="lg">
        <DialogHeader>
          <span className="font-display text-lg font-semibold">{title}</span>
        </DialogHeader>
        <DialogContent>
          <div className="max-h-[70vh] space-y-3 overflow-y-auto pr-1">
            {images.map((src, i) =>
            <img key={src + i} src={src} alt={`${title} — photo ${i + 1}`} className="w-full rounded-xl object-cover" />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>);

}
import React, { useState } from 'react';
import { CategoryIcon } from '../ui/CategoryIcon';
import type { CategoryId } from '../../types/marketplace';
import { cn } from '../../utils/styles';

interface PhotoGalleryProps {
  photos: string[];
  title: string;
  categoryId: CategoryId;
}

export function PhotoGallery({ photos, title, categoryId }: PhotoGalleryProps) {
  const [index, setIndex] = useState(0);

  if (photos.length === 0) {
    return (
      <div className="flex aspect-[16/9] items-center justify-center rounded-2xl border border-dashed border-ink-300 bg-ink-100 text-ink-400">
        <div className="text-center">
          <CategoryIcon id={categoryId} className="mx-auto h-10 w-10" />
          <p className="mt-2 text-sm font-semibold">No photos added</p>
        </div>
      </div>);

  }

  return (
    <div>
      <div className="overflow-hidden rounded-2xl bg-ink-100">
        <img
          src={photos[index]}
          alt={`${title} — photo ${index + 1} of ${photos.length}`}
          className="aspect-[16/9] w-full object-cover" />
        
      </div>
      {photos.length > 1 &&
      <div className="mt-3 flex gap-3" role="tablist" aria-label="Job photos">
          {photos.map((p, i) =>
        <button
          key={p + i}
          type="button"
          role="tab"
          aria-selected={i === index}
          aria-label={`Show photo ${i + 1}`}
          onClick={() => setIndex(i)}
          className={cn(
            'h-16 w-24 overflow-hidden rounded-lg border-2 transition-all',
            i === index ? 'border-primary-600' : 'border-transparent opacity-70 hover:opacity-100'
          )}>
          
              <img src={p} alt="" className="h-full w-full object-cover" />
            </button>
        )}
        </div>
      }
    </div>);

}
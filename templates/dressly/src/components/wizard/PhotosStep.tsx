import React, { useRef, useState } from 'react';
import { ImagePlusIcon, StarIcon, XIcon } from 'lucide-react';
import type { DraftUpdater, ListingDraft } from '../../types/draft';
import { cx } from '../../utils/styles';

const tips = ['Full-length front and back', 'Close-up of fabric & details', 'Natural light, plain background', 'At least 3 photos'];

export function PhotosStep({ draft, set }: {draft: ListingDraft;set: DraftUpdater;}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const add = (files: FileList | null) => {
    if (!files) return;
    const urls = Array.from(files).
    filter((f) => f.type.startsWith('image/')).
    map((f) => URL.createObjectURL(f));
    set('photos', [...draft.photos, ...urls].slice(0, 10));
  };

  return (
    <div className="space-y-6">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          add(e.dataTransfer.files);
        }}
        className={cx(
          'flex flex-col items-center justify-center border-2 border-dashed px-6 py-12 text-center transition',
          dragging ? 'border-accent-dark bg-accent-soft' : 'border-line bg-cream/50'
        )}>
        
        <ImagePlusIcon size={28} className="text-accent-dark" aria-hidden="true" />
        <p className="mt-3 font-display text-xl">Drag photos here</p>
        <p className="mt-1 text-xs text-muted">JPG or PNG, up to 10 photos</p>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="mt-4 border border-ink px-4 py-2 text-xs font-semibold uppercase tracking-wider transition hover:bg-ink hover:text-paper">
          
          Browse files
        </button>
        <input ref={inputRef} type="file" accept="image/*" multiple className="sr-only" onChange={(e) => add(e.target.files)} aria-label="Upload photos" />
      </div>

      {draft.photos.length > 0 &&
      <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4">
          {draft.photos.map((src, i) =>
        <li key={src} className="group relative aspect-[3/4] overflow-hidden bg-cream">
              <img src={src} alt={`Upload ${i + 1}`} className="h-full w-full object-cover" />
              {i === 0 &&
          <span className="absolute left-2 top-2 flex items-center gap-1 bg-paper px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider">
                  <StarIcon size={10} className="fill-ink" aria-hidden="true" /> Cover
                </span>
          }
              <button
            type="button"
            aria-label={`Remove photo ${i + 1}`}
            onClick={() => set('photos', draft.photos.filter((p) => p !== src))}
            className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-paper/95 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100">
            
                <XIcon size={14} aria-hidden="true" />
              </button>
            </li>
        )}
        </ul>
      }

      <div className="bg-cream p-5">
        <p className="text-[11px] font-semibold uppercase tracking-eyebrow text-muted">Photo tips</p>
        <ul className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
          {tips.map((t) =>
          <li key={t} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-dark" aria-hidden="true" /> {t}
            </li>
          )}
        </ul>
      </div>
    </div>);

}
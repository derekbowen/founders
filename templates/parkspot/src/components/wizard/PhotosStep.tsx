import React, { useRef, useState } from 'react';
import { ImagePlusIcon, StarIcon, Trash2Icon } from 'lucide-react';
import { FieldError } from './FieldError';
import { sampleListingPhotos } from '../../data/listings';
import { buttonClass } from '../../utils/styles';
import type { StepProps } from '../../types/listingDraft';

export function PhotosStep({ draft, update, errors }: StepProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const addFiles = (files: FileList | null) => {
    if (!files) return;
    const urls = Array.from(files).
    filter((f) => f.type.startsWith('image/')).
    map((f) => URL.createObjectURL(f));
    update({ photos: [...draft.photos, ...urls].slice(0, 10) });
  };

  const remove = (i: number) => update({ photos: draft.photos.filter((_, idx) => idx !== i) });
  const makeCover = (i: number) => update({ photos: [draft.photos[i], ...draft.photos.filter((_, idx) => idx !== i)] });

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
          addFiles(e.dataTransfer.files);
        }}
        className={`flex flex-col items-center rounded-2xl border-2 border-dashed px-6 py-10 text-center transition-colors ${
        dragging ? 'border-navy bg-accent/10' : 'border-line bg-canvas'}`
        }>
        
        <span className="grid h-12 w-12 place-items-center rounded-xl bg-navy text-accent">
          <ImagePlusIcon size={22} aria-hidden />
        </span>
        <p className="mt-3 font-semibold">Drag photos here</p>
        <p className="text-sm text-muted">JPG or PNG, up to 10 photos. Show the entrance, the spot, and any signage.</p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <button type="button" onClick={() => inputRef.current?.click()} className={buttonClass('primary', 'sm')}>
            Upload photos
          </button>
          <button type="button" onClick={() => update({ photos: [...draft.photos, ...sampleListingPhotos].slice(0, 10) })} className={buttonClass('secondary', 'sm')}>
            Use sample photos
          </button>
        </div>
        <input ref={inputRef} type="file" accept="image/*" multiple className="sr-only" onChange={(e) => addFiles(e.target.files)} aria-label="Upload photos" />
      </div>
      <FieldError message={errors.photos} />

      {draft.photos.length > 0 &&
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {draft.photos.map((p, i) =>
        <li key={p + i} className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-line">
              <img src={p} alt={`Listing photo ${i + 1}`} className="h-full w-full object-cover" />
              {i === 0 && <span className="absolute left-2 top-2 rounded-md bg-accent px-2 py-0.5 text-xs font-semibold text-ink">Cover</span>}
              <div className="absolute right-2 top-2 flex gap-1 opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100">
                {i !== 0 &&
            <button type="button" onClick={() => makeCover(i)} aria-label="Make cover photo" className="grid h-8 w-8 place-items-center rounded-full bg-surface text-ink shadow-card hover:bg-accent">
                    <StarIcon size={14} aria-hidden />
                  </button>
            }
                <button type="button" onClick={() => remove(i)} aria-label="Remove photo" className="grid h-8 w-8 place-items-center rounded-full bg-surface text-danger shadow-card hover:bg-danger hover:text-white">
                  <Trash2Icon size={14} aria-hidden />
                </button>
              </div>
            </li>
        )}
        </ul>
      }
    </div>);

}
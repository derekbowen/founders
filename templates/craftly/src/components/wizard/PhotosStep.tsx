import React, { useRef, useState } from 'react';
import { ImagePlusIcon, StarIcon, XIcon } from 'lucide-react';
import { samplePhotos } from '../../data/listingWizard';
import type { ListingDraft } from '../../types/marketplace';
import type { WizardErrors } from '../../hooks/useListingWizard';

interface StepProps {
  draft: ListingDraft;
  update: (patch: Partial<ListingDraft>) => void;
  errors: WizardErrors;
}

const MAX = 8;

export function PhotosStep({ draft, update, errors }: StepProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const addFiles = (files: FileList | null) => {
    if (!files) return;
    const urls = Array.from(files).
    filter((f) => f.type.startsWith('image/')).
    map((f) => URL.createObjectURL(f));
    update({ photos: [...draft.photos, ...urls].slice(0, MAX) });
  };

  const makeCover = (i: number) => {
    const next = [...draft.photos];
    const [p] = next.splice(i, 1);
    update({ photos: [p, ...next] });
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
          addFiles(e.dataTransfer.files);
        }}
        className={`flex flex-col items-center rounded-2xl border-2 border-dashed px-6 py-10 text-center transition-colors ${dragging ? 'border-primary bg-primary-soft/40' : errors.photos ? 'border-danger/50 bg-surface' : 'border-line bg-surface'}`}>
        
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-soft text-primary-ink">
          <ImagePlusIcon className="h-5 w-5" aria-hidden />
        </span>
        <p className="mt-3 text-sm font-medium">Drag photos here, or</p>
        <button type="button" onClick={() => inputRef.current?.click()} className="mt-1 text-sm font-semibold text-primary-ink underline-offset-2 hover:underline">
          browse your files
        </button>
        <p className="mt-2 text-xs text-muted">JPG or PNG, up to {MAX} photos. Natural light and a plain background work best.</p>
        <input ref={inputRef} type="file" accept="image/*" multiple className="sr-only" onChange={(e) => addFiles(e.target.files)} aria-label="Upload photos" />
      </div>
      {errors.photos && <p className="-mt-3 text-xs font-medium text-danger">{errors.photos}</p>}

      {draft.photos.length > 0 &&
      <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4">
          {draft.photos.map((p, i) =>
        <li key={p + i} className="group relative aspect-[4/5] overflow-hidden rounded-xl bg-subtle">
              <img src={p} alt={`Listing photo ${i + 1}`} className="h-full w-full object-cover" />
              {i === 0 ?
          <span className="absolute left-2 top-2 rounded-full bg-ink px-2 py-0.5 text-[10px] font-semibold text-canvas">Cover</span> :

          <button type="button" onClick={() => makeCover(i)} className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-surface/90 px-2 py-0.5 text-[10px] font-semibold opacity-0 transition group-hover:opacity-100 focus:opacity-100">
                  <StarIcon className="h-3 w-3" aria-hidden /> Make cover
                </button>
          }
              <button
            type="button"
            onClick={() => update({ photos: draft.photos.filter((_, idx) => idx !== i) })}
            className="absolute right-2 top-2 rounded-full bg-surface/90 p-1 text-ink hover:bg-surface"
            aria-label={`Remove photo ${i + 1}`}>
            
                <XIcon className="h-3.5 w-3.5" />
              </button>
            </li>
        )}
        </ul>
      }

      <div className="rounded-xl bg-subtle p-4">
        <p className="text-xs font-medium text-muted">No photos handy? Try a sample:</p>
        <div className="mt-3 flex gap-2">
          {samplePhotos.map((s) =>
          <button
            key={s}
            type="button"
            disabled={draft.photos.includes(s)}
            onClick={() => update({ photos: [...draft.photos, s].slice(0, MAX) })}
            className="h-14 w-14 overflow-hidden rounded-lg ring-1 ring-line transition hover:ring-2 hover:ring-primary disabled:opacity-40"
            aria-label="Add sample photo">
            
              <img src={s} alt="" className="h-full w-full object-cover" />
            </button>
          )}
        </div>
      </div>
    </div>);

}
import React, { useRef } from 'react';
import { ImagePlusIcon, SparklesIcon, Trash2Icon } from 'lucide-react';
import { samplePhotos } from '../../data/wizard';
import type { StepProps } from '../../types/wizard';

export function PhotosStep({ draft, update, errors }: StepProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const onFiles = (files: FileList | null) => {
    if (!files) return;
    const urls = Array.from(files).
    filter((f) => f.type.startsWith('image/')).
    map((f) => URL.createObjectURL(f));
    update({ photos: [...draft.photos, ...urls].slice(0, 12) });
  };

  return (
    <div className="space-y-5">
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          onFiles(e.dataTransfer.files);
        }}
        className={`flex flex-col items-center justify-center rounded-3xl border-2 border-dashed px-6 py-10 text-center ${errors.photos ? 'border-red-300 bg-red-50' : 'border-ink-300 bg-ink-50'}`}>
        
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-100 text-primary-700">
          <ImagePlusIcon className="h-7 w-7" aria-hidden="true" />
        </span>
        <p className="mt-3 font-extrabold text-ink-900">Drag photos here or browse</p>
        <p className="mt-1 text-sm text-ink-600">JPG or PNG, up to 12 photos. Bright photos of pets, your yard and sleeping spots work best.</p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <button type="button" onClick={() => inputRef.current?.click()} className="btn btn-md btn-primary">
            Upload photos
          </button>
          <button type="button" onClick={() => update({ photos: [...draft.photos, ...samplePhotos].slice(0, 12) })} className="btn btn-md btn-secondary">
            <SparklesIcon className="h-4 w-4" aria-hidden="true" />
            Use sample photos
          </button>
        </div>
        <input ref={inputRef} type="file" accept="image/*" multiple className="sr-only" onChange={(e) => onFiles(e.target.files)} aria-label="Upload photos" />
      </div>
      {errors.photos &&
      <p className="text-sm font-semibold text-red-700" role="alert">
          {errors.photos}
        </p>
      }
      {draft.photos.length > 0 &&
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {draft.photos.map((p, i) =>
        <li key={p + i} className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-ink-100">
              <img src={p} alt={`Listing photo ${i + 1}`} className="h-full w-full object-cover" />
              {i === 0 && <span className="absolute left-2 top-2 rounded-full bg-white px-2.5 py-1 text-xs font-extrabold text-ink-900 shadow-sm">Cover photo</span>}
              <button
            type="button"
            onClick={() => update({ photos: draft.photos.filter((_, j) => j !== i) })}
            className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-ink-800 shadow-sm transition hover:bg-red-50 hover:text-red-700"
            aria-label={`Remove photo ${i + 1}`}>
            
                <Trash2Icon className="h-4 w-4" aria-hidden="true" />
              </button>
            </li>
        )}
        </ul>
      }
    </div>);

}
import React, { useRef, useState } from 'react';
import { CloudUploadIcon, ImagePlusIcon, StarIcon, Trash2Icon } from 'lucide-react';
import { images } from '../../data/images';
import type { WizardStepProps } from '../../types/wizard';

const samplePhotos = [images.tentMeadow, images.campfire, images.coffee, images.stars];

export function PhotosStep({ draft, update }: WizardStepProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const addFiles = (files: FileList | null) => {
    if (!files) return;
    const urls = Array.from(files).
    filter((f) => f.type.startsWith('image/')).
    map((f) => URL.createObjectURL(f));
    update({ photos: [...draft.photos, ...urls] });
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
        className={`flex flex-col items-center rounded-2xl border-2 border-dashed px-6 py-12 text-center transition ${
        dragging ? 'border-primary-600 bg-primary-50' : 'border-sand-300 bg-white'}`
        }>
        
        <span className="grid h-14 w-14 place-items-center rounded-full bg-primary-50 text-primary-700">
          <CloudUploadIcon size={26} aria-hidden="true" />
        </span>
        <p className="mt-4 font-semibold text-ink-900">Drag photos here</p>
        <p className="mt-1 text-sm text-ink-500">JPG or PNG, at least 1200px wide. Landscape works best.</p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <button type="button" className="btn-primary" onClick={() => inputRef.current?.click()}>
            <ImagePlusIcon size={16} aria-hidden="true" /> Upload from device
          </button>
          <button type="button" className="btn-outline" onClick={() => update({ photos: [...draft.photos, ...samplePhotos] })}>
            Use sample photos
          </button>
        </div>
        <input ref={inputRef} type="file" accept="image/*" multiple className="sr-only" onChange={(e) => addFiles(e.target.files)} aria-label="Upload photos" />
      </div>

      {draft.photos.length > 0 &&
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {draft.photos.map((src, i) =>
        <li key={`${src}-${i}`} className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-sand-200">
              <img src={src} alt={`Upload ${i + 1}`} className="h-full w-full object-cover" />
              {i === 0 &&
          <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-ink-900 shadow-sm">
                  <StarIcon size={11} className="fill-accent-500 text-accent-500" aria-hidden="true" /> Cover
                </span>
          }
              <div className="absolute right-2 top-2 flex gap-1 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100">
                {i > 0 &&
            <button
              type="button"
              onClick={() => update({ photos: [src, ...draft.photos.filter((_, j) => j !== i)] })}
              className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-ink-900 shadow-sm hover:bg-sand-100">
              
                    Make cover
                  </button>
            }
                <button
              type="button"
              onClick={() => update({ photos: draft.photos.filter((_, j) => j !== i) })}
              className="grid h-7 w-7 place-items-center rounded-full bg-white text-ink-700 shadow-sm hover:text-red-700"
              aria-label={`Remove photo ${i + 1}`}>
              
                  <Trash2Icon size={14} />
                </button>
              </div>
            </li>
        )}
        </ul>
      }
    </div>);

}
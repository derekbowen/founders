import React, { useRef, useState } from 'react';
import { ImagePlusIcon, StarIcon, XIcon } from 'lucide-react';
import type { WizardStepProps } from './WizardStepProps';
import { products } from '../../data/products';

export function PhotosStep({ draft, errors, update }: WizardStepProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const addFiles = (files: FileList | null) => {
    if (!files) return;
    const added = Array.from(files).
    filter((f) => f.type.startsWith('image/')).
    map((f) => ({ id: `${f.name}-${f.lastModified}`, url: URL.createObjectURL(f), name: f.name }));
    update({ photos: [...draft.photos, ...added].slice(0, 8) });
  };

  const applySamplePhotos = () => {
    update({
      photos: products.slice(0, 3).map((p) => ({ id: `sample-${p.id}`, url: p.image, name: `${p.id}.jpg` }))
    });
  };

  return (
    <div className="space-y-5">
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
        className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-10 text-center transition-colors ${
        dragging ? 'border-primary-500 bg-primary-50' : errors.photos ? 'border-red-300 bg-red-50/40' : 'border-slate-300 bg-slate-50'}`
        }>
        
        <ImagePlusIcon className="h-8 w-8 text-primary-600" aria-hidden="true" />
        <p className="mt-3 text-sm font-semibold text-slate-900">Drag photos here, or</p>
        <div className="mt-2 flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="rounded-lg bg-white px-3 py-1.5 text-sm font-semibold text-primary-700 ring-1 ring-slate-300 hover:bg-slate-50">
            
            Browse files
          </button>
          <button type="button" onClick={applySamplePhotos} className="rounded-lg px-3 py-1.5 text-sm font-semibold text-slate-600 hover:bg-slate-100">
            Use sample photos
          </button>
        </div>
        <p className="mt-3 text-xs text-slate-500">JPG or PNG, at least 1200 × 1200px. Up to 8 photos. First photo is the cover.</p>
        <input ref={inputRef} type="file" accept="image/*" multiple className="sr-only" onChange={(e) => addFiles(e.target.files)} aria-label="Upload photos" />
      </div>
      {errors.photos && <p className="text-xs text-red-600">{errors.photos}</p>}

      {draft.photos.length > 0 &&
      <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4">
          {draft.photos.map((p, i) =>
        <li key={p.id} className="group relative aspect-square overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
              <img src={p.url} alt={p.name} className="h-full w-full object-cover" />
              {i === 0 &&
          <span className="absolute left-1.5 top-1.5 inline-flex items-center gap-1 rounded bg-primary-900/85 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                  <StarIcon className="h-3 w-3" aria-hidden="true" /> Cover
                </span>
          }
              <button
            type="button"
            onClick={() => update({ photos: draft.photos.filter((x) => x.id !== p.id) })}
            className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-slate-700 opacity-0 shadow transition-opacity hover:text-red-600 focus:opacity-100 group-hover:opacity-100"
            aria-label={`Remove ${p.name}`}>
            
                <XIcon className="h-3.5 w-3.5" />
              </button>
            </li>
        )}
        </ul>
      }
    </div>);

}
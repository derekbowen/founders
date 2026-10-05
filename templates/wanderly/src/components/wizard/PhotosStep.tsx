import React, { useRef } from 'react';
import { ImagePlusIcon, SparklesIcon, StarIcon, Trash2Icon } from 'lucide-react';
import { Button } from '../ui/Button';
import { images } from '../../data/images';
import type { WizardStepProps } from '../../types/listingDraft';

const samples = [images.alfamaFood, images.destLisbon, images.fadoNight, images.hero];

export function PhotosStep({ draft, update }: WizardStepProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const onFiles = (files: FileList | null) => {
    if (!files) return;
    const urls = Array.from(files).map((f) => URL.createObjectURL(f));
    update({ photos: [...draft.photos, ...urls].slice(0, 12) });
  };

  const makeCover = (i: number) => {
    const next = [...draft.photos];
    const [p] = next.splice(i, 1);
    update({ photos: [p, ...next] });
  };

  return (
    <div className="space-y-5">
      <input ref={inputRef} type="file" accept="image/*" multiple className="sr-only" onChange={(e) => onFiles(e.target.files)} aria-label="Upload photos" />
      {draft.photos.length === 0 ?
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {e.preventDefault();onFiles(e.dataTransfer.files);}}
        className="flex flex-col items-center rounded-2xl border-2 border-dashed border-slate-300 bg-sand-50 px-6 py-14 text-center">
        
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-50 text-primary-600"><ImagePlusIcon className="h-6 w-6" aria-hidden /></span>
          <p className="mt-4 font-semibold text-slate-900">Drag photos here or browse</p>
          <p className="mt-1 text-sm text-slate-600">Add at least 3 — landscape JPGs look best (min 1200px wide)</p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <Button onClick={() => inputRef.current?.click()} leftIcon={<ImagePlusIcon className="h-4 w-4" />}>Upload photos</Button>
            <Button variant="outline" onClick={() => update({ photos: samples })} leftIcon={<SparklesIcon className="h-4 w-4" />}>Use sample photos</Button>
          </div>
        </div> :

      <>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {draft.photos.map((src, i) =>
          <li key={src + i} className={`group relative overflow-hidden rounded-2xl bg-sand-200 ${i === 0 ? 'col-span-2 row-span-2 aspect-[4/3] sm:aspect-auto' : 'aspect-[4/3]'}`}>
                <img src={src} alt={`Listing photo ${i + 1}`} className="h-full w-full object-cover" />
                {i === 0 && <span className="absolute left-3 top-3 rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-slate-900 shadow">Cover photo</span>}
                <div className="absolute right-2 top-2 flex gap-1 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100">
                  {i !== 0 &&
              <button type="button" onClick={() => makeCover(i)} className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-700 shadow hover:text-primary-700" aria-label={`Make photo ${i + 1} the cover`}>
                      <StarIcon className="h-4 w-4" />
                    </button>
              }
                  <button type="button" onClick={() => update({ photos: draft.photos.filter((_, idx) => idx !== i) })} className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-red-600 shadow hover:bg-red-50" aria-label={`Remove photo ${i + 1}`}>
                    <Trash2Icon className="h-4 w-4" />
                  </button>
                </div>
              </li>
          )}
            <li className="aspect-[4/3]">
              <button type="button" onClick={() => inputRef.current?.click()} className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-300 text-sm font-semibold text-slate-700 hover:border-primary-400 hover:text-primary-700">
                <ImagePlusIcon className="h-6 w-6" aria-hidden />Add more
              </button>
            </li>
          </ul>
          <p className="text-sm text-slate-600">{draft.photos.length}/12 photos{draft.photos.length < 3 && ' · add at least 3 to publish'}</p>
        </>
      }
    </div>);

}
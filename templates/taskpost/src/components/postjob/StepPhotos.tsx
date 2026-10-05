import React, { useRef } from 'react';
import { CheckIcon, ImagePlusIcon, XIcon } from 'lucide-react';
import { samplePhotos } from '../../data/images';
import type { StepProps } from '../../types/postJob';
import { cn } from '../../utils/styles';

const MAX_PHOTOS = 6;

export function StepPhotos({ form, update }: StepProps) {
  const fileRef = useRef<HTMLInputElement>(null);

  function toggle(url: string) {
    if (form.photos.includes(url)) update({ photos: form.photos.filter((p) => p !== url) });else
    if (form.photos.length < MAX_PHOTOS) update({ photos: [...form.photos, url] });
  }

  function handleFiles(files: FileList | null) {
    if (!files) return;
    const urls = Array.from(files).
    filter((f) => f.type.startsWith('image/')).
    slice(0, MAX_PHOTOS - form.photos.length).
    map((f) => URL.createObjectURL(f));
    update({ photos: [...form.photos, ...urls] });
  }

  return (
    <div className="space-y-6">
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFiles(e.dataTransfer.files);
        }}
        className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-ink-300 bg-white px-6 py-10 text-center">
        
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
          <ImagePlusIcon className="h-6 w-6" aria-hidden="true" />
        </span>
        <p className="mt-3 text-sm font-bold text-ink-900">Drag photos here or</p>
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={form.photos.length >= MAX_PHOTOS}
          className="mt-2 rounded-lg border border-ink-300 px-4 py-2 text-sm font-bold text-ink-800 hover:bg-ink-50 disabled:opacity-50">
          
          Upload from device
        </button>
        <input ref={fileRef} type="file" accept="image/*" multiple className="sr-only" onChange={(e) => handleFiles(e.target.files)} aria-label="Upload photos" />
        <p className="mt-2 text-xs text-ink-500">
          {form.photos.length}/{MAX_PHOTOS} photos · JPG or PNG
        </p>
      </div>

      {form.photos.length > 0 &&
      <div>
          <p className="mb-2 text-sm font-bold text-ink-900">Your photos</p>
          <ul className="grid grid-cols-3 gap-3 sm:grid-cols-6">
            {form.photos.map((p, i) =>
          <li key={p} className="relative aspect-square overflow-hidden rounded-lg bg-ink-100">
                <img src={p} alt={`Job photo ${i + 1}`} className="h-full w-full object-cover" />
                {i === 0 &&
            <span className="absolute bottom-1 left-1 rounded bg-ink-900/80 px-1.5 py-0.5 text-[10px] font-bold text-white">Cover</span>
            }
                <button
              type="button"
              onClick={() => update({ photos: form.photos.filter((x) => x !== p) })}
              className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white/95 text-ink-800 shadow hover:bg-white"
              aria-label={`Remove photo ${i + 1}`}>
              
                  <XIcon className="h-3.5 w-3.5" />
                </button>
              </li>
          )}
          </ul>
        </div>
      }

      <div>
        <p className="text-sm font-bold text-ink-900">No photos handy? Try a sample</p>
        <p className="text-xs text-ink-500">For this demo, pick sample images to see how your job will look.</p>
        <ul className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-5">
          {samplePhotos.map((p, i) => {
            const selected = form.photos.includes(p);
            return (
              <li key={p}>
                <button
                  type="button"
                  onClick={() => toggle(p)}
                  aria-pressed={selected}
                  aria-label={`Sample photo ${i + 1}`}
                  className={cn(
                    'relative block aspect-square w-full overflow-hidden rounded-lg border-2 transition-all',
                    selected ? 'border-primary-600' : 'border-transparent hover:opacity-90'
                  )}>
                  
                  <img src={p} alt="" className="h-full w-full object-cover" />
                  {selected &&
                  <span className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary-600 text-white">
                      <CheckIcon className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                    </span>
                  }
                </button>
              </li>);

          })}
        </ul>
      </div>
    </div>);

}
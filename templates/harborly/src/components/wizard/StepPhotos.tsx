import React from 'react';
import { UploadIcon, CheckIcon, XIcon, StarIcon } from 'lucide-react';
import { photoLibrary } from '../../data/media';
import { cn } from '../../utils/ui';
import type { StepProps } from '../../types/listingDraft';

export function StepPhotos({ draft, update, errors }: StepProps) {
  const toggle = (src: string) => update({ photos: draft.photos.includes(src) ? draft.photos.filter((p) => p !== src) : [...draft.photos, src] });
  const makeCover = (src: string) => update({ photos: [src, ...draft.photos.filter((p) => p !== src)] });

  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    const urls = files.filter((f) => f.type.startsWith('image/')).map((f) => URL.createObjectURL(f));
    if (urls.length) update({ photos: [...draft.photos, ...urls] });
    e.target.value = '';
  };

  return (
    <div className="space-y-8">
      <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-line bg-sand-light/60 px-6 py-10 text-center transition-colors hover:border-navy/40 focus-within:ring-2 focus-within:ring-coral">
        <UploadIcon className="h-6 w-6 text-navy" aria-hidden="true" />
        <span className="mt-3 text-sm font-semibold text-ink">Upload photos</span>
        <span className="mt-1 text-xs text-muted">JPG or PNG · landscape works best · up to 20 MB each</span>
        <input type="file" accept="image/*" multiple onChange={onUpload} className="sr-only" />
      </label>

      {draft.photos.length > 0 &&
      <div>
          <p className="mb-3 text-sm font-medium text-ink">Your photos ({draft.photos.length}) · first photo is the cover</p>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {draft.photos.map((src, i) =>
          <li key={src} className="group relative aspect-[4/3] overflow-hidden rounded-xl">
                <img src={src} alt={`Photo ${i + 1}`} className="h-full w-full object-cover" />
                {i === 0 ?
            <span className="absolute left-2 top-2 rounded-full bg-white px-2 py-0.5 text-[11px] font-semibold text-navy">Cover</span> :

            <button type="button" onClick={() => makeCover(src)} className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-white/95 px-2 py-0.5 text-[11px] font-semibold text-navy opacity-0 transition-opacity focus:opacity-100 group-hover:opacity-100">
                    <StarIcon className="h-3 w-3" aria-hidden="true" /> Make cover
                  </button>
            }
                <button type="button" onClick={() => toggle(src)} aria-label={`Remove photo ${i + 1}`} className="absolute right-2 top-2 rounded-full bg-white/95 p-1 text-navy hover:bg-white">
                  <XIcon className="h-3.5 w-3.5" />
                </button>
              </li>
          )}
          </ul>
        </div>
      }

      <div>
        <p className="mb-3 text-sm font-medium text-ink">Or pick from our sample library</p>
        <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4">
          {photoLibrary.map((src, i) => {
            const selected = draft.photos.includes(src);
            return (
              <li key={src}>
                <button type="button" onClick={() => toggle(src)} aria-pressed={selected} aria-label={`Sample photo ${i + 1}`} className={cn('relative block aspect-[4/3] w-full overflow-hidden rounded-xl ring-2 transition', selected ? 'ring-navy' : 'ring-transparent hover:ring-line')}>
                  <img src={src} alt="" className="h-full w-full object-cover" />
                  {selected &&
                  <span className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-navy text-white">
                      <CheckIcon className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                  }
                </button>
              </li>);

          })}
        </ul>
      </div>
      {errors.photos &&
      <p role="alert" className="text-sm font-medium text-danger">
          {errors.photos}
        </p>
      }
    </div>);

}
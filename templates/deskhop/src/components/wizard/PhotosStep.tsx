import React from 'react';
import { ImagePlusIcon, StarIcon, Trash2Icon, UploadCloudIcon } from 'lucide-react';
import { photos } from '../../data/images';
import type { StepProps } from '../../types/draft';

const samples = [photos.hotdesk1, photos.office1, photos.meeting1, photos.lounge1, photos.booth1, photos.dedicated2];

export function PhotosStep({ draft, update, errors }: StepProps) {
  function onFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    const urls = files.filter((f) => f.type.startsWith('image/')).map((f) => URL.createObjectURL(f));
    update({ photos: [...draft.photos, ...urls] });
    e.target.value = '';
  }

  function makeCover(index: number) {
    const next = [...draft.photos];
    const [item] = next.splice(index, 1);
    update({ photos: [item, ...next] });
  }

  return (
    <div className="space-y-6">
      <label
        htmlFor="w-photos"
        className="flex cursor-pointer flex-col items-center rounded-2xl border-2 border-dashed border-line bg-mist/60 px-6 py-10 text-center transition-colors hover:border-brand-600 hover:bg-brand-50/50 focus-within:border-brand-600">
        
        <UploadCloudIcon size={28} className="text-brand-700" aria-hidden="true" />
        <span className="mt-3 text-sm font-semibold">Upload photos</span>
        <span className="mt-1 text-xs text-ink-muted">JPG or PNG, at least 1200px wide. Add 3 or more for best results.</span>
        <input id="w-photos" type="file" accept="image/*" multiple onChange={onFiles} className="sr-only" />
      </label>

      {errors.photos && <p role="alert" className="text-sm text-red-700">{errors.photos}</p>}

      {draft.photos.length > 0 &&
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {draft.photos.map((src, i) =>
        <li key={src + i} className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-mist">
              <img src={src} alt={`Listing photo ${i + 1}`} className="h-full w-full object-cover" />
              {i === 0 &&
          <span className="absolute left-2 top-2 rounded-full bg-white px-2 py-0.5 text-[11px] font-semibold shadow-card">Cover photo</span>
          }
              <div className="absolute inset-x-2 bottom-2 flex justify-end gap-1.5 opacity-100 transition-opacity sm:opacity-0 sm:group-focus-within:opacity-100 sm:group-hover:opacity-100">
                {i !== 0 &&
            <button type="button" onClick={() => makeCover(i)} className="focus-ring grid h-8 w-8 place-items-center rounded-full bg-white shadow-card" aria-label={`Make photo ${i + 1} the cover`}>
                    <StarIcon size={14} />
                  </button>
            }
                <button type="button" onClick={() => update({ photos: draft.photos.filter((_, j) => j !== i) })} className="focus-ring grid h-8 w-8 place-items-center rounded-full bg-white text-red-700 shadow-card" aria-label={`Remove photo ${i + 1}`}>
                  <Trash2Icon size={14} />
                </button>
              </div>
            </li>
        )}
        </ul>
      }

      <div>
        <p className="text-sm font-semibold">No photos handy? Try sample images</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {samples.map((src, i) => {
            const added = draft.photos.includes(src);
            return (
              <button
                key={src}
                type="button"
                disabled={added}
                onClick={() => update({ photos: [...draft.photos, src] })}
                className="focus-ring relative h-16 w-20 overflow-hidden rounded-lg ring-1 ring-line transition-opacity disabled:opacity-40"
                aria-label={added ? `Sample ${i + 1} added` : `Add sample photo ${i + 1}`}>
                
                <img src={src} alt="" className="h-full w-full object-cover" />
                {!added &&
                <span className="absolute inset-0 grid place-items-center bg-ink/30 text-white opacity-0 transition-opacity hover:opacity-100">
                    <ImagePlusIcon size={16} aria-hidden="true" />
                  </span>
                }
              </button>);

          })}
        </div>
      </div>
    </div>);

}
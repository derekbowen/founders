import React from 'react';
import { CheckIcon, ImagePlusIcon, StarIcon, Trash2Icon } from 'lucide-react';
import { samplePhotoLibrary } from '../../data/images';
import { fieldStyles } from '../../utils/styles';
import type { WizardStepProps } from '../../hooks/useListingWizard';

const MAX_PHOTOS = 8;

export function StepPhotos({ draft, update, errors }: WizardStepProps) {
  const toggle = (src: string) => {
    if (draft.images.includes(src)) update('images', draft.images.filter((i) => i !== src));else
    if (draft.images.length < MAX_PHOTOS) update('images', [...draft.images, src]);
  };

  const makeCover = (src: string) => update('images', [src, ...draft.images.filter((i) => i !== src)]);

  const addNext = () => {
    const nextPhoto = samplePhotoLibrary.find((p) => !draft.images.includes(p));
    if (nextPhoto && draft.images.length < MAX_PHOTOS) update('images', [...draft.images, nextPhoto]);
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-navy-800">
            Your photos ({draft.images.length}/{MAX_PHOTOS})
          </h3>
          {draft.images.length > 0 && <p className="text-xs text-navy-500">The first photo is your cover.</p>}
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {draft.images.map((src, i) =>
          <div key={src} className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-navy-100">
              <img src={src} alt={`Listing photo ${i + 1}`} className="h-full w-full object-cover" />
              {i === 0 &&
            <span className="absolute left-2 top-2 rounded-full bg-primary-400 px-2 py-0.5 text-[11px] font-bold text-navy-900">
                  Cover
                </span>
            }
              <div className="absolute inset-x-2 bottom-2 flex justify-end gap-1.5 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100">
                {i > 0 &&
              <button
                type="button"
                onClick={() => makeCover(src)}
                className="grid h-8 w-8 place-items-center rounded-lg bg-white text-navy-800 shadow-card hover:bg-primary-50"
                aria-label="Make cover photo">
                
                    <StarIcon size={15} />
                  </button>
              }
                <button
                type="button"
                onClick={() => toggle(src)}
                className="grid h-8 w-8 place-items-center rounded-lg bg-white text-coral-700 shadow-card hover:bg-coral-50"
                aria-label="Remove photo">
                
                  <Trash2Icon size={15} />
                </button>
              </div>
            </div>
          )}
          {draft.images.length < MAX_PHOTOS &&
          <button
            type="button"
            onClick={addNext}
            className="flex aspect-[4/3] flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-navy-200 text-navy-500 transition hover:border-primary-400 hover:bg-primary-50 hover:text-navy-900">
            
              <ImagePlusIcon size={22} />
              <span className="text-xs font-semibold">Add photo</span>
            </button>
          }
        </div>
        {errors.images && <p className={fieldStyles.error}>{errors.images}</p>}
      </div>

      <div>
        <h3 className="text-sm font-medium text-navy-800">Sample photo library</h3>
        <p className={fieldStyles.help}>This template uses sample images — connect your own upload service in production.</p>
        <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5">
          {samplePhotoLibrary.map((src) => {
            const selected = draft.images.includes(src);
            return (
              <button
                key={src}
                type="button"
                aria-pressed={selected}
                onClick={() => toggle(src)}
                className={`relative aspect-square overflow-hidden rounded-xl ring-offset-2 transition focus:outline-none focus-visible:ring-4 focus-visible:ring-primary-200 ${
                selected ? 'ring-2 ring-primary-500' : 'hover:opacity-90'}`
                }>
                
                <img src={src} alt="" className="h-full w-full object-cover" />
                {selected &&
                <span className="absolute right-1.5 top-1.5 grid h-6 w-6 place-items-center rounded-full bg-primary-400 text-navy-900">
                    <CheckIcon size={14} strokeWidth={3} />
                  </span>
                }
              </button>);

          })}
        </div>
      </div>
    </div>);

}
import React, { useRef } from 'react';
import { ImagePlusIcon, StarIcon, Trash2Icon } from 'lucide-react';
import { images } from '../../data/images';
import type { WizardStepProps } from '../../types/wizard';
import { cn, focusRing } from '../../utils/styles';
import { Button } from '../ui/Button';

const samples = [images.kitchens.island, images.kitchens.walkIn, images.kitchens.dryStore, images.kitchens.commissary];

export function PhotosStep({ draft, update, errors }: WizardStepProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = (files: FileList | null) => {
    if (!files) return;
    const urls = Array.from(files).map((f) => URL.createObjectURL(f));
    update({ photos: [...draft.photos, ...urls] });
  };

  const remove = (i: number) => update({ photos: draft.photos.filter((_, idx) => idx !== i) });
  const makeCover = (i: number) => update({ photos: [draft.photos[i], ...draft.photos.filter((_, idx) => idx !== i)] });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-steel-600">Add at least 3 photos. Show the line, the walk-in and storage — bright, wide shots work best.</p>
        <Button variant="outline" size="sm" onClick={() => update({ photos: [...draft.photos, ...samples] })}>Add sample photos</Button>
      </div>
      {errors.photos && <p className="text-sm font-medium text-primary" role="alert">{errors.photos}</p>}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {draft.photos.map((src, i) =>
        <div key={`${src}-${i}`} className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-steel-100">
            <img src={src} alt={`Kitchen photo ${i + 1}`} className="h-full w-full object-cover" />
            {i === 0 && <span className="absolute left-2 top-2 rounded-full bg-steel-900 px-2 py-0.5 text-xs font-semibold text-white">Cover</span>}
            <div className="absolute inset-x-2 bottom-2 flex justify-end gap-1.5 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100">
              {i !== 0 &&
            <button type="button" onClick={() => makeCover(i)} aria-label={`Make photo ${i + 1} the cover`} className={cn('grid h-8 w-8 place-items-center rounded-full bg-white text-steel-800 shadow', focusRing)}>
                  <StarIcon className="h-4 w-4" aria-hidden="true" />
                </button>
            }
              <button type="button" onClick={() => remove(i)} aria-label={`Remove photo ${i + 1}`} className={cn('grid h-8 w-8 place-items-center rounded-full bg-white text-primary shadow', focusRing)}>
                <Trash2Icon className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className={cn('flex aspect-[4/3] flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-steel-300 bg-steel-50 text-sm font-medium text-steel-600 transition-colors hover:border-steel-500 hover:text-steel-900', focusRing)}>
          
          <ImagePlusIcon className="h-6 w-6" aria-hidden="true" />
          Upload photos
        </button>
      </div>
      <input ref={inputRef} type="file" accept="image/*" multiple className="sr-only" tabIndex={-1} onChange={(e) => addFiles(e.target.files)} />
    </div>);

}
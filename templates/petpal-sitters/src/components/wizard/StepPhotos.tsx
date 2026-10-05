import React from 'react';
import { ArrowLeftIcon, ImagePlusIcon, Trash2Icon } from 'lucide-react';
import { images } from '../../data/images';
import type { ListingWizard } from '../../hooks/useListingWizard';

const samplePool = [images.gallery.yard, images.gallery.bedroom, images.gallery.fetch, images.gallery.feeding, images.gallery.brush, images.gallery.trail];

export function StepPhotos({ wizard }: {wizard: ListingWizard;}) {
  const { state, update, errors } = wizard;
  const remaining = samplePool.filter((p) => !state.photos.includes(p));

  const addPhoto = () => {
    if (remaining.length === 0) return;
    update({ photos: [...state.photos, remaining[0]] });
  };

  const move = (index: number) => {
    if (index === 0) return;
    const next = [...state.photos];
    [next[index - 1], next[index]] = [next[index], next[index - 1]];
    update({ photos: next });
  };

  return (
    <div>
      <button
        type="button"
        onClick={addPhoto}
        disabled={remaining.length === 0}
        className="flex w-full flex-col items-center gap-2 rounded-3xl border-2 border-dashed border-stone-300 bg-white px-6 py-10 text-center transition-colors hover:border-primary-400 hover:bg-primary-50 disabled:cursor-not-allowed disabled:opacity-60">
        
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-100 text-primary-700">
          <ImagePlusIcon className="h-6 w-6" aria-hidden="true" />
        </span>
        <span className="font-extrabold text-stone-900">{remaining.length ? 'Add a photo' : 'Photo limit reached'}</span>
        <span className="text-sm text-stone-500">JPG or PNG, at least 1200px wide. Bright, natural light works best.</span>
      </button>
      {errors.photos && <p className="mt-3 text-sm font-semibold text-red-600">{errors.photos}</p>}

      {state.photos.length > 0 &&
      <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {state.photos.map((p, i) =>
        <li key={p} className="group relative overflow-hidden rounded-2xl bg-stone-100 ring-1 ring-stone-200">
              <img src={p} alt={`Listing photo ${i + 1}`} className="aspect-[4/3] w-full object-cover" />
              {i === 0 && <span className="absolute left-2 top-2 rounded-full bg-primary-500 px-2.5 py-1 text-xs font-black text-stone-900">Cover photo</span>}
              <div className="absolute right-2 top-2 flex gap-1.5 opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100">
                {i > 0 &&
            <button type="button" onClick={() => move(i)} aria-label={`Move photo ${i + 1} earlier`} className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-stone-700 shadow hover:bg-stone-50">
                    <ArrowLeftIcon className="h-4 w-4" />
                  </button>
            }
                <button
              type="button"
              onClick={() => update({ photos: state.photos.filter((x) => x !== p) })}
              aria-label={`Remove photo ${i + 1}`}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-red-600 shadow hover:bg-red-50">
              
                  <Trash2Icon className="h-4 w-4" />
                </button>
              </div>
            </li>
        )}
        </ul>
      }
    </div>);

}
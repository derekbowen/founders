import React from 'react';
import { ImagePlusIcon, PlusIcon, XIcon } from 'lucide-react';
import { samplePhotos } from '../../data/listingDraft';
import { StepProps } from '../../types/listingDraft';

export function PhotosStep({ draft, update }: StepProps) {
  const add = (urls: string[]) => update({ photos: [...draft.photos, ...urls.filter((u) => !draft.photos.includes(u))].slice(0, 10) });
  const remove = (url: string) => update({ photos: draft.photos.filter((p) => p !== url) });

  const onFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []).filter((f) => f.type.startsWith('image/'));
    add(files.map((f) => URL.createObjectURL(f)));
    e.target.value = '';
  };

  return (
    <div className="space-y-6">
      <label className="flex cursor-pointer flex-col items-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center transition-colors hover:border-brand hover:bg-brand-soft focus-within:border-brand">
        <ImagePlusIcon size={32} className="text-brand" aria-hidden="true" />
        <span className="mt-3 font-semibold">Upload photos</span>
        <span className="text-sm text-slate-500">JPG or PNG, landscape works best · up to 10</span>
        <input type="file" accept="image/*" multiple onChange={onFiles} className="sr-only" />
      </label>

      {draft.photos.length > 0 &&
      <div>
          <p className="field-label">Your photos · first one is the cover</p>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {draft.photos.map((url, i) =>
          <li key={url} className="relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-100">
                <img src={url} alt={`Listing photo ${i + 1}`} className="h-full w-full object-cover" />
                {i === 0 && <span className="absolute left-2 top-2 rounded-full bg-accent px-2 py-0.5 text-xs font-bold text-ink">Cover</span>}
                <button type="button" onClick={() => remove(url)} className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-white/95 text-ink shadow hover:bg-white" aria-label={`Remove photo ${i + 1}`}>
                  <XIcon size={16} />
                </button>
              </li>
          )}
          </ul>
        </div>
      }

      <div>
        <p className="field-label">Or start with a sample photo</p>
        <ul className="grid grid-cols-3 gap-2 sm:grid-cols-6">
          {samplePhotos.map((url, i) => {
            const added = draft.photos.includes(url);
            return (
              <li key={url}>
                <button type="button" disabled={added} onClick={() => add([url])} className="group relative block aspect-square w-full overflow-hidden rounded-lg disabled:opacity-40" aria-label={`Add sample photo ${i + 1}`}>
                  <img src={url} alt="" className="h-full w-full object-cover" />
                  {!added &&
                  <span className="absolute inset-0 grid place-items-center bg-ink/0 text-white opacity-0 transition group-hover:bg-ink/40 group-hover:opacity-100">
                      <PlusIcon size={20} />
                    </span>
                  }
                </button>
              </li>);

          })}
        </ul>
      </div>
    </div>);

}
import React from 'react';
import { CheckIcon, ImagePlusIcon } from 'lucide-react';
import type { DraftErrors, ListingDraft } from '../../hooks/useListingDraft';

interface StepProps {
  draft: ListingDraft;
  errors: DraftErrors;
  update: (patch: Partial<ListingDraft>) => void;
}

const sampleCovers = ["/b8c767db-ed68-454a-b807-8d69acf01d2f.jpg", "/36e3e31d-d970-4d55-aabb-d0b8bbae79f7.jpg", "/c781bda5-3ca6-4153-8da0-41d7da01d40b.jpg", "/ac342a14-9a61-4859-b956-d53a5aff2245.jpg"];






export function StepCover({ draft, errors, update }: StepProps) {
  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) update({ cover: URL.createObjectURL(file) });
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-5 md:grid-cols-[1.2fr_1fr]">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-ink bg-paper">
          {draft.cover ?
          <img src={draft.cover} alt="Selected cover preview" className="h-full w-full object-cover" /> :

          <div className="flex h-full flex-col items-center justify-center p-6 text-center text-muted">
              <ImagePlusIcon className="h-8 w-8" aria-hidden="true" />
              <p className="mt-2 text-sm">Your cover preview appears here</p>
            </div>
          }
          {draft.cover &&
          <span className="absolute left-3 top-3 rounded-md border border-ink bg-white px-2 py-0.5 text-[11px] font-bold">Cover · 1/4</span>
          }
        </div>
        <div className="space-y-3">
          <label
            htmlFor="cover-upload"
            className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-4 py-8 text-center transition hover:border-ink ${
            errors.cover ? 'border-danger bg-danger/5' : 'border-ink/25 bg-paper'}`
            }>
            
            <ImagePlusIcon className="h-6 w-6" aria-hidden="true" />
            <span className="mt-2 font-semibold">Upload cover image</span>
            <span className="text-xs text-muted">JPG or PNG · 1600×1200 recommended</span>
            <input id="cover-upload" type="file" accept="image/*" className="sr-only" onChange={onUpload} />
          </label>
          {errors.cover && <p className="text-sm text-danger">{errors.cover}</p>}
          <p className="text-sm font-semibold">Or pick a placeholder</p>
          <div className="grid grid-cols-4 gap-2">
            {sampleCovers.map((src) =>
            <button
              key={src}
              type="button"
              onClick={() => update({ cover: src })}
              aria-label="Use this placeholder cover"
              aria-pressed={draft.cover === src}
              className={`relative aspect-square overflow-hidden rounded-lg border transition ${
              draft.cover === src ? 'border-ink ring-2 ring-brand ring-offset-1' : 'border-ink/20 hover:border-ink'}`
              }>
              
                <img src={src} alt="" className="h-full w-full object-cover" />
                {draft.cover === src &&
              <span className="absolute right-1 top-1 grid h-4 w-4 place-items-center rounded-full bg-ink text-white">
                    <CheckIcon className="h-2.5 w-2.5" strokeWidth={3} aria-hidden="true" />
                  </span>
              }
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-ink/15 p-4">
        <p className="font-semibold">Preview pages</p>
        <p className="mt-0.5 text-sm text-muted">
          We generate 3 preview slides from your “What’s included” list. Upload custom preview images after publishing from your listing page.
        </p>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {[1, 2, 3].map((n) =>
          <div key={n} className="flex aspect-[4/3] items-center justify-center rounded-lg border border-dashed border-ink/25 bg-paper text-xs font-semibold text-muted">
              Preview {n}
            </div>
          )}
        </div>
      </div>
    </div>);

}
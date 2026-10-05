import React, { useRef } from "react";
import { ImagePlusIcon, StarIcon, XIcon } from "lucide-react";
import { images as library } from "../../data/images";
import { DraftErrors, ListingDraft } from "../../hooks/useListingWizard";

const samples = [library.tomatoes, library.carrots, library.eggs, library.honey, library.sourdough, library.farmVeg];

interface Props {
  draft: ListingDraft;
  errors: DraftErrors;
  patch: (p: Partial<ListingDraft>) => void;
}

export function PhotosStep({ draft, errors, patch }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  function onFiles(files: FileList | null) {
    if (!files) return;
    const urls = Array.from(files).
    filter((f) => f.type.startsWith("image/")).
    map((f) => URL.createObjectURL(f));
    patch({ images: [...draft.images, ...urls].slice(0, 6) });
  }

  function remove(src: string) {
    patch({ images: draft.images.filter((s) => s !== src) });
  }

  return (
    <div className="space-y-6">
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          onFiles(e.dataTransfer.files);
        }}
        className={`flex flex-col items-center rounded-2xl border-2 border-dashed px-6 py-10 text-center ${
        errors.images ? "border-danger/50 bg-danger/5" : "border-line bg-paper"}`
        }>
        
        <ImagePlusIcon className="h-8 w-8 text-primary" aria-hidden="true" />
        <p className="mt-3 font-semibold text-ink">Drag photos here or</p>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="mt-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark">
          
          Upload from device
        </button>
        <input ref={inputRef} type="file" accept="image/*" multiple className="sr-only" onChange={(e) => onFiles(e.target.files)} aria-label="Upload photos" />
        <p className="mt-3 text-xs text-muted">JPG or PNG, up to 6 photos. Natural light works best.</p>
        {errors.images && <p className="mt-2 text-xs font-medium text-danger">{errors.images}</p>}
      </div>

      {draft.images.length > 0 &&
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {draft.images.map((src, i) =>
        <li key={src} className="group relative overflow-hidden rounded-xl border border-line">
              <img src={src} alt={`Listing photo ${i + 1}`} className="aspect-[4/3] w-full object-cover" />
              {i === 0 &&
          <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-paper px-2 py-0.5 text-xs font-semibold text-ink">
                  <StarIcon className="h-3 w-3 fill-accent text-accent" aria-hidden="true" /> Cover
                </span>
          }
              <button
            type="button"
            onClick={() => remove(src)}
            aria-label={`Remove photo ${i + 1}`}
            className="absolute right-2 top-2 rounded-full bg-ink/70 p-1.5 text-white transition hover:bg-ink">
            
                <XIcon className="h-3.5 w-3.5" />
              </button>
            </li>
        )}
        </ul>
      }

      <div>
        <p className="mb-2 text-sm font-semibold text-ink">No photos handy? Try a sample</p>
        <div className="flex flex-wrap gap-2">
          {samples.map((src) => {
            const added = draft.images.includes(src);
            return (
              <button
                key={src}
                type="button"
                disabled={added || draft.images.length >= 6}
                onClick={() => patch({ images: [...draft.images, src] })}
                className="h-16 w-20 overflow-hidden rounded-lg border-2 border-transparent transition hover:border-primary disabled:opacity-40"
                aria-label="Add sample photo">
                
                <img src={src} alt="" className="h-full w-full object-cover" />
              </button>);

          })}
        </div>
      </div>
    </div>);

}
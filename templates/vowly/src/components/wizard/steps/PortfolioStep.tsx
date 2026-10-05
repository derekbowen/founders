import React, { DragEvent, useState } from "react";
import { ImagePlusIcon, SparklesIcon, StarIcon, XIcon } from "lucide-react";
import { MIN_PHOTOS } from "../../../data/wizardSteps";
import { Button } from "../../ui/Button";
import type { ListingWizard } from "../useListingDraft";

export function PortfolioStep({ wizard }: {wizard: ListingWizard;}) {
  const { draft, addFiles, addSamples, removePhoto, makeCover, errors } = wizard;
  const [dragging, setDragging] = useState(false);

  const onDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(false);
    addFiles(e.dataTransfer.files);
  };

  return (
    <div className="space-y-6">
      <label
        htmlFor="lw-photos"
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed px-6 py-12 text-center transition-colors focus-within:ring-2 focus-within:ring-primary ${
        dragging ? "border-primary bg-primary/5" : errors.photos ? "border-danger/60 bg-danger/5" : "border-line bg-canvas hover:border-ink/30 hover:bg-blush/30"}`
        }>
        
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-blush text-primary">
          <ImagePlusIcon aria-hidden="true" className="h-6 w-6" />
        </span>
        <span className="mt-4 font-display text-2xl font-semibold text-ink">Drop photos here or browse</span>
        <span className="mt-1 text-sm text-muted">JPG or PNG, up to 12 photos. Landscape images look best.</span>
        <input id="lw-photos" type="file" accept="image/*" multiple className="sr-only" onChange={(e) => addFiles(e.target.files)} />
      </label>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className={`text-sm ${errors.photos ? "text-danger" : "text-muted"}`} aria-live="polite">
          {errors.photos || `${draft.photos.length} added · minimum ${MIN_PHOTOS}`}
        </p>
        <Button variant="secondary" size="sm" onClick={addSamples}>
          <SparklesIcon aria-hidden="true" className="h-4 w-4" />
          Use sample photos
        </Button>
      </div>

      {draft.photos.length > 0 &&
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {draft.photos.map((src, i) =>
        <li key={`${src}-${i}`} className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-blush">
              <img src={src} alt={`Portfolio photo ${i + 1}`} className="h-full w-full object-cover" />
              {i === 0 &&
          <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-surface px-2 py-0.5 text-[11px] font-semibold text-gold-dark shadow-sm">
                  <StarIcon aria-hidden="true" className="h-3 w-3 fill-gold text-gold" />
                  Cover
                </span>
          }
              <div className="absolute inset-x-2 bottom-2 flex justify-between gap-2 opacity-100 transition-opacity sm:opacity-0 sm:group-focus-within:opacity-100 sm:group-hover:opacity-100">
                {i !== 0 ?
            <button type="button" onClick={() => makeCover(i)} className="rounded-full bg-surface/95 px-2.5 py-1 text-xs font-medium text-ink shadow-sm hover:bg-surface">
                    Make cover
                  </button> :
            <span />}
                <button type="button" onClick={() => removePhoto(i)} aria-label={`Remove photo ${i + 1}`} className="flex h-7 w-7 items-center justify-center rounded-full bg-surface/95 text-ink shadow-sm hover:text-danger">
                  <XIcon aria-hidden="true" className="h-3.5 w-3.5" />
                </button>
              </div>
            </li>
        )}
        </ul>
      }
    </div>);

}
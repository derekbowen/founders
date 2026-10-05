import React, { useRef } from 'react';
import { CheckIcon, ImagePlusIcon, StarIcon, XIcon } from 'lucide-react';
import { covers } from '../../data/images';
import { StepProps } from '../../types/listingWizard';

const samples = Object.values(covers);

export function PortfolioStep({ draft, update, errors }: StepProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const toggle = (src: string) =>
  update({ portfolio: draft.portfolio.includes(src) ? draft.portfolio.filter((s) => s !== src) : [...draft.portfolio, src].slice(0, 8) });

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-slate-800">Your portfolio <span className="font-normal text-slate-500">({draft.portfolio.length}/8)</span></p>
        <p className="mt-0.5 text-xs text-slate-500">The first image becomes your cover. Use 4:3 images at least 1200px wide.</p>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {draft.portfolio.map((src, i) =>
          <div key={src} className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-100">
              <img src={src} alt={`Portfolio image ${i + 1}`} className="h-full w-full object-cover" />
              {i === 0 &&
            <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-[11px] font-bold text-slate-800">
                  <StarIcon className="h-3 w-3 fill-amber-400 text-amber-400" aria-hidden="true" /> Cover
                </span>
            }
              <button type="button" onClick={() => toggle(src)} className="absolute right-2 top-2 rounded-full bg-slate-950/70 p-1 text-white opacity-90 hover:opacity-100" aria-label={`Remove image ${i + 1}`}>
                <XIcon className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className={`flex aspect-[4/3] flex-col items-center justify-center gap-1 rounded-xl border border-dashed text-center transition-colors hover:border-primary-400 hover:bg-primary-50 ${errors.portfolio ? 'border-rose-400 bg-rose-50' : 'border-slate-300 bg-slate-50'}`}>
            
            <ImagePlusIcon className="h-5 w-5 text-slate-400" aria-hidden="true" />
            <span className="text-xs font-semibold text-slate-700">Upload image</span>
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="sr-only"
            aria-label="Upload portfolio image"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) update({ portfolio: [...draft.portfolio, URL.createObjectURL(file)].slice(0, 8) });
              e.target.value = '';
            }} />
          
        </div>
        {errors.portfolio && <p className="mt-2 text-xs font-medium text-rose-600">{errors.portfolio}</p>}
      </div>

      <div>
        <p className="text-sm font-medium text-slate-800">Or pick from sample work</p>
        <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">
          {samples.map((src, i) => {
            const on = draft.portfolio.includes(src);
            return (
              <button
                key={src}
                type="button"
                aria-pressed={on}
                aria-label={`Sample image ${i + 1}`}
                onClick={() => toggle(src)}
                className={`relative aspect-square overflow-hidden rounded-lg transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${on ? 'ring-2 ring-primary-600 ring-offset-2' : 'opacity-80 hover:opacity-100'}`}>
                
                <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
                {on &&
                <span className="absolute inset-0 flex items-center justify-center bg-primary-600/40">
                    <CheckIcon className="h-5 w-5 text-white" strokeWidth={3} aria-hidden="true" />
                  </span>
                }
              </button>);

          })}
        </div>
      </div>
    </div>);

}
import React, { useRef, useState } from 'react';
import { CheckIcon, ImagePlusIcon, RefreshCwIcon } from 'lucide-react';
import { StepProps } from '../../hooks/useListingDraft';

const tips = ['Face the camera and smile', 'Natural light, no sunglasses or filters', 'Just you — no kids or friends in frame'];

export function PhotoStep({ draft, update, errors }: StepProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleFile = (file?: File) => {
    if (!file || !file.type.startsWith('image/')) return;
    update({ photoUrl: URL.createObjectURL(file) });
  };

  return (
    <div className="grid gap-8 md:grid-cols-[240px_1fr]">
      <div>
        <input ref={inputRef} id="photoUrl" type="file" accept="image/*" className="sr-only" onChange={(e) => handleFile(e.target.files?.[0])} />
        {draft.photoUrl ?
        <div className="relative">
            <img src={draft.photoUrl} alt="Your profile preview" className="aspect-square w-full rounded-[2rem] object-cover" />
            <button type="button" onClick={() => inputRef.current?.click()} className="absolute bottom-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink-800 shadow-lift hover:bg-ink-50">
              <RefreshCwIcon className="h-4 w-4" aria-hidden /> Replace
            </button>
          </div> :

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {e.preventDefault();setDragging(true);}}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {e.preventDefault();setDragging(false);handleFile(e.dataTransfer.files?.[0]);}}
          className={`flex aspect-square w-full flex-col items-center justify-center gap-2 rounded-[2rem] border-2 border-dashed text-center transition ${
          errors.photoUrl ? 'border-red-300 bg-red-50' : dragging ? 'border-primary-500 bg-primary-50' : 'border-ink-300 bg-white hover:border-primary-400 hover:bg-primary-50'}`
          }>
          
            <ImagePlusIcon className="h-8 w-8 text-primary-600" aria-hidden />
            <span className="text-sm font-semibold text-ink-900">Upload a photo</span>
            <span className="text-xs text-ink-600">or drag and drop · JPG, PNG</span>
          </button>
        }
        {errors.photoUrl && <p role="alert" className="mt-2 text-xs font-medium text-red-600">{errors.photoUrl}</p>}
      </div>
      <div>
        <h3 className="font-heading text-lg font-bold text-ink-900">Tips for a great photo</h3>
        <ul className="mt-3 space-y-2.5">
          {tips.map((t) =>
          <li key={t} className="flex items-center gap-2.5 text-sm text-ink-700">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700"><CheckIcon className="h-3.5 w-3.5" aria-hidden /></span>
              {t}
            </li>
          )}
        </ul>
        <p className="mt-5 text-sm text-ink-600">Sitters with a clear, smiling photo get 3× more requests.</p>
      </div>
    </div>);

}
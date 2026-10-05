import React, { useRef } from 'react';
import { CameraIcon, UploadCloudIcon, VideoIcon, Trash2Icon } from 'lucide-react';
import { Input } from '../Input';
import type { ListingDraft } from '../../hooks/useListingWizard';

interface StepProps {
  draft: ListingDraft;
  update: (patch: Partial<ListingDraft>) => void;
  showErrors: boolean;
}

export function MediaStep({ draft, update, showErrors }: StepProps) {
  const photoRef = useRef<HTMLInputElement>(null);
  const isValidVideo = !draft.videoUrl || /(youtube\.com|youtu\.be|vimeo\.com|loom\.com)/.test(draft.videoUrl);

  const onPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) update({ photoUrl: URL.createObjectURL(file) });
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold text-ink-900">Profile photo</p>
        <p className="mt-0.5 text-sm text-ink-600">A friendly, well-lit headshot. Face clearly visible, no sunglasses.</p>
        <div className="mt-3 flex flex-wrap items-center gap-5">
          {draft.photoUrl ?
          <img src={draft.photoUrl} alt="Your profile photo preview" className="h-28 w-28 rounded-3xl object-cover" /> :

          <div className={`flex h-28 w-28 items-center justify-center rounded-3xl border-2 border-dashed ${showErrors ? 'border-red-400 bg-red-50' : 'border-ink-300 bg-ink-50'}`}>
              <CameraIcon size={28} className="text-ink-400" aria-hidden="true" />
            </div>
          }
          <div className="flex flex-col gap-2">
            <input ref={photoRef} type="file" accept="image/*" onChange={onPhoto} className="sr-only" id="photo-upload" />
            <label
              htmlFor="photo-upload"
              className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-sm font-medium text-ink-900 hover:bg-ink-50 focus-within:ring-2 focus-within:ring-primary-300">
              
              <UploadCloudIcon size={16} aria-hidden="true" /> {draft.photoUrl ? 'Replace photo' : 'Upload photo'}
            </label>
            {draft.photoUrl &&
            <button type="button" onClick={() => update({ photoUrl: null })} className="inline-flex items-center gap-1 text-sm text-red-700 hover:underline">
                <Trash2Icon size={14} aria-hidden="true" /> Remove
              </button>
            }
            <p className="text-xs text-ink-500">JPG or PNG, at least 400×400px</p>
          </div>
        </div>
        {showErrors && !draft.photoUrl && <p className="mt-2 text-sm text-red-600">A profile photo is required to publish.</p>}
      </div>

      <div className="rounded-2xl border border-ink-200 p-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-300 text-ink-900">
            <VideoIcon size={20} aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-semibold text-ink-900">Intro video <span className="font-normal text-ink-500">(recommended)</span></p>
            <p className="text-sm text-ink-600">60–120 seconds: who you are, how you teach, what a first lesson looks like.</p>
          </div>
        </div>
        <div className="mt-4">
          <Input
            id="video-url"
            label="Video link"
            placeholder="https://youtube.com/watch?v=…"
            value={draft.videoUrl}
            onChange={(e) => update({ videoUrl: e.target.value })}
            helperText="YouTube, Vimeo or Loom links work best."
            error={!isValidVideo ? 'Paste a YouTube, Vimeo or Loom link' : undefined} />
          
        </div>
      </div>
    </div>);

}
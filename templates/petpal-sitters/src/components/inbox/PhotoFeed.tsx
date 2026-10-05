import React, { useState } from 'react';
import { CameraIcon, ImagePlusIcon } from 'lucide-react';
import { Button } from '../ui/Button';
import { EmptyState } from '../ui/EmptyState';
import type { PhotoUpdate } from '../../types/marketplace';

interface PhotoFeedProps {
  updates: PhotoUpdate[];
  canPost: boolean;
  onPost: (caption: string) => void;
  emptyText: string;
}

export function PhotoFeed({ updates, canPost, onPost, emptyText }: PhotoFeedProps) {
  const [caption, setCaption] = useState('');

  return (
    <div className="p-5">
      {canPost &&
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!caption.trim()) return;
          onPost(caption.trim());
          setCaption('');
        }}
        className="mb-6 flex flex-col gap-3 rounded-2xl border-2 border-dashed border-accent-200 bg-accent-50/60 p-4 sm:flex-row sm:items-center">
        
          <span className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-100 text-accent-700 sm:flex">
            <ImagePlusIcon className="h-5 w-5" aria-hidden="true" />
          </span>
          <label htmlFor="photo-caption" className="sr-only">
            Photo caption
          </label>
          <input
          id="photo-caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Add a caption for your photo update…"
          className="h-11 flex-1 rounded-xl border border-stone-300 bg-white px-4 text-[15px] focus:border-accent-500 focus:outline-none focus:ring-4 focus:ring-accent-100" />
        
          <Button type="submit" variant="accent" disabled={!caption.trim()} leftIcon={<CameraIcon className="h-4 w-4" />}>
            Post update
          </Button>
        </form>
      }
      {updates.length === 0 ?
      <EmptyState icon={<CameraIcon className="h-7 w-7" />} title="No photo updates yet" text={emptyText} className="border-stone-100" /> :

      <ul className="grid gap-4 sm:grid-cols-2">
          {updates.map((u) =>
        <li key={u.id} className="overflow-hidden rounded-2xl bg-white ring-1 ring-stone-100">
              <img src={u.image} alt={u.caption} className="aspect-[4/3] w-full object-cover" loading="lazy" />
              <div className="p-4">
                <p className="text-[15px] font-semibold text-stone-800">{u.caption}</p>
                <p className="mt-1 text-xs font-semibold text-stone-400">{u.time}</p>
              </div>
            </li>
        )}
        </ul>
      }
    </div>);

}
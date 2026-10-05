import React, { useState } from 'react';
import { CameraIcon } from 'lucide-react';
import { EmptyState } from '../common/EmptyState';
import { formatRelativeTime } from '../../utils/format';
import type { PhotoUpdate } from '../../types/transaction';

interface PhotoFeedProps {
  updates: PhotoUpdate[];
  canPost: boolean;
  onPost: (caption: string) => void;
  emptyText: string;
}

export function PhotoFeed({ updates, canPost, onPost, emptyText }: PhotoFeedProps) {
  const [caption, setCaption] = useState('');
  const sorted = [...updates].reverse();

  return (
    <div className="space-y-5">
      {canPost &&
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!caption.trim()) return;
          onPost(caption.trim());
          setCaption('');
        }}
        className="flex flex-col gap-2 rounded-3xl border border-dashed border-accent-300 bg-accent-50 p-4 sm:flex-row">
        
          <label htmlFor="update-caption" className="sr-only">
            Photo caption
          </label>
          <input id="update-caption" value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Add a caption, e.g. “Afternoon nap after the park”" className="field flex-1" />
          <button type="submit" disabled={!caption.trim()} className="btn btn-md btn-accent">
            <CameraIcon className="h-4 w-4" aria-hidden="true" />
            Share photo update
          </button>
        </form>
      }
      {sorted.length === 0 ?
      <EmptyState icon={<CameraIcon className="h-7 w-7" aria-hidden="true" />} title="No photo updates yet" description={emptyText} /> :

      <ul className="grid gap-4 sm:grid-cols-2">
          {sorted.map((u) =>
        <li key={u.id} className="overflow-hidden rounded-3xl border border-ink-200/70 bg-white">
              <img src={u.image} alt={u.caption} className="aspect-square w-full object-cover" loading="lazy" />
              <div className="p-4">
                <p className="text-sm font-bold text-ink-900">{u.caption}</p>
                <p className="mt-0.5 text-xs text-ink-600">{formatRelativeTime(u.time)}</p>
              </div>
            </li>
        )}
        </ul>
      }
    </div>);

}
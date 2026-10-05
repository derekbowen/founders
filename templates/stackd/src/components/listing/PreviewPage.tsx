import React from 'react';
import type { Listing } from '../../types/marketplace';

type PreviewKind = 'doc' | 'sheet' | 'audio' | 'photos';

function kindFor(listing: Listing): PreviewKind {
  if (listing.category === 'photo-packs') return 'photos';
  if (listing.category === 'audio') return 'audio';
  if (listing.fileType === 'XLSX') return 'sheet';
  return 'doc';
}

const bars = [38, 62, 80, 54, 90, 70, 44, 66, 85, 58, 30, 72, 92, 60, 48, 76, 88, 52, 40, 68, 82, 56, 36, 64];

/** A stylised "page" preview rendered from listing data, used inside the preview carousel. */
export function PreviewPage({ listing, heading, index }: {listing: Listing;heading: string;index: number;}) {
  const kind = kindFor(listing);

  if (kind === 'photos') {
    const positions = ['0% 0%', '100% 0%', '50% 50%', '0% 100%', '100% 100%', '30% 70%'];
    return (
      <div className="grid h-full w-full grid-cols-3 gap-2 bg-ink p-3">
        {positions.map((pos, i) =>
        <div key={i} className="overflow-hidden rounded-md">
            <img
            src={listing.cover}
            alt=""
            className="h-full w-full object-cover"
            style={{ objectPosition: pos, transform: `scale(${1.6 + (i + index) % 3 * 0.3})` }} />
          
          </div>
        )}
      </div>);

  }

  if (kind === 'audio') {
    return (
      <div className="flex h-full w-full flex-col justify-center gap-5 bg-ink p-8 text-white">
        <p className="font-display text-lg font-semibold">{heading}</p>
        <div className="flex h-28 items-end gap-1.5" aria-hidden="true">
          {bars.map((h, i) =>
          <span
            key={i}
            className={`flex-1 rounded-sm ${i < 9 + index * 3 ? 'bg-brand' : 'bg-white/25'}`}
            style={{ height: `${(h + index * 7) % 100 || 40}%` }} />

          )}
        </div>
        <div className="flex justify-between font-mono text-xs text-white/70">
          <span>0:{(12 + index * 9).toString().padStart(2, '0')}</span>
          <span>{80 + index * 5} BPM · Key {['Am', 'C', 'F#m', 'Eb'][index % 4]}</span>
        </div>
      </div>);

  }

  return (
    <div className="flex h-full w-full items-center justify-center bg-paper p-6">
      <div className="flex h-full max-h-full aspect-[3/4] flex-col rounded-md border border-ink bg-white p-5 shadow-pop">
        <p className="eyebrow text-[10px]">Page {index * 12 + 4}</p>
        <p className="mt-1 font-display text-sm font-bold leading-tight">{heading}</p>
        {kind === 'sheet' ?
        <div className="mt-4 grid flex-1 grid-cols-4 gap-px overflow-hidden rounded border border-ink/20 bg-ink/15" aria-hidden="true">
            {Array.from({ length: 32 }).map((_, i) =>
          <span
            key={i}
            className={i < 4 ? 'bg-ink' : i % 7 === 0 ? 'bg-brand/70' : i % 5 === 0 ? 'bg-brand-soft' : 'bg-white'} />

          )}
          </div> :

        <div className="mt-4 flex flex-1 flex-col gap-2" aria-hidden="true">
            {Array.from({ length: 9 }).map((_, i) =>
          <div key={i} className="flex items-center gap-2">
                {i % 3 === 0 && <span className="h-2.5 w-2.5 shrink-0 rounded-sm border border-ink" />}
                <span className="h-1.5 rounded-full bg-ink/15" style={{ width: `${55 + (i * 17 + index * 11) % 45}%` }} />
              </div>
          )}
            <div className="mt-auto h-10 rounded border border-dashed border-ink/25 bg-brand-soft" />
          </div>
        }
      </div>
    </div>);

}
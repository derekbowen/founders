import React from 'react';
import { CheckCircle2Icon, AlertCircleIcon } from 'lucide-react';
import type { Listing } from '../../types/marketplace';
import { sizes } from '../../data/taxonomy';

interface SizeCheckProps {
  listing: Listing;
  usualSize: string;
  onChange: (v: string) => void;
}

function verdict(listing: Listing, usual: number) {
  const effective =
  listing.fit === 'Runs small' ? listing.size - 2 : listing.fit === 'Runs large' ? listing.size + 2 : listing.size;
  const diff = effective - usual;
  const stretchy = listing.stretch !== 'No stretch';
  if (diff === 0) return { ok: true, text: `Great match — this US ${listing.size} ${listing.fit.toLowerCase()}.` };
  if (Math.abs(diff) >= 4)
  return { ok: false, text: 'Likely won’t fit. Compare the measurements before booking.' };
  if (diff < 0)
  return {
    ok: stretchy,
    text: stretchy ?
    'May be snug, but the stretch fabric gives some room.' :
    'Likely snug — check bust and waist measurements.'
  };
  return { ok: stretchy, text: 'May be a little loose. Adjustable details or tailoring tape can help.' };
}

export function SizeCheck({ listing, usualSize, onChange }: SizeCheckProps) {
  const result = usualSize ? verdict(listing, Number(usualSize)) : null;
  return (
    <div>
      <label htmlFor="size-check" className="text-[11px] font-semibold uppercase tracking-eyebrow text-muted">
        Size check
      </label>
      <select
        id="size-check"
        value={usualSize}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 h-11 w-full border border-line bg-paper px-3 text-sm text-ink focus:border-ink focus:outline-none">
        
        <option value="">What’s your usual size?</option>
        {sizes.map((s) =>
        <option key={s} value={s}>
            I usually wear US {s}
          </option>
        )}
      </select>
      {result &&
      <p
        className={`mt-2 flex items-start gap-2 text-xs ${result.ok ? 'text-[#2f5a3f]' : 'text-[#8a4b12]'}`}
        role="status">
        
          {result.ok ?
        <CheckCircle2Icon size={14} className="mt-px shrink-0" aria-hidden="true" /> :

        <AlertCircleIcon size={14} className="mt-px shrink-0" aria-hidden="true" />
        }
          {result.text}
        </p>
      }
    </div>);

}
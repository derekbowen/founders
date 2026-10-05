import React, { useState } from 'react';
import { CheckIcon, CopyIcon, KeyRoundIcon, LockIcon, WifiIcon } from 'lucide-react';
import type { Listing } from '../../types/listing';
import type { Transaction } from '../../types/transaction';

interface DoorAccessCardProps {
  tx: Transaction;
  listing: Listing;
  viewer: 'customer' | 'provider';
}

export function DoorAccessCard({ tx, listing, viewer }: DoorAccessCardProps) {
  const [copied, setCopied] = useState<string | null>(null);
  const unlocked = tx.status === 'confirmed' || tx.status === 'checked-in';

  function copy(label: string, value: string) {
    navigator.clipboard?.writeText(value);
    setCopied(label);
    window.setTimeout(() => setCopied(null), 1500);
  }

  if (!unlocked) {
    const text =
    tx.status === 'requested' ?
    viewer === 'customer' ?
    'Your door code, wifi and directions unlock as soon as the host confirms.' :
    'Access details are sent to the guest automatically when you accept.' :
    'Access for this booking has expired.';
    return (
      <div className="rounded-2xl border border-dashed border-line bg-mist/60 p-5">
        <p className="flex items-center gap-2 text-sm font-semibold">
          <LockIcon size={16} className="text-ink-subtle" aria-hidden="true" /> Door access
        </p>
        <p className="mt-1 text-sm text-ink-muted">{text}</p>
      </div>);

  }

  return (
    <div className="rounded-2xl border border-brand-200 bg-brand-50/60 p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold text-brand-900">
            <KeyRoundIcon size={16} aria-hidden="true" /> Door access
          </p>
          <p className="mt-0.5 text-xs text-brand-800">
            {viewer === 'provider' ? 'Shared with the guest' : `Valid on your booking date only`}
          </p>
        </div>
        <button
          type="button"
          onClick={() => copy('code', tx.doorCode)}
          className="focus-ring group rounded-xl bg-white px-4 py-2 text-right shadow-card"
          aria-label={`Copy door code ${tx.doorCode.split('').join(' ')}`}>
          
          <span className="block text-[10px] font-semibold uppercase tracking-wider text-ink-muted">
            {copied === 'code' ? 'Copied' : 'Code'}
          </span>
          <span className="font-mono text-2xl font-bold tracking-[0.3em] text-ink">{tx.doorCode}</span>
        </button>
      </div>

      <ol className="mt-4 space-y-2 text-sm text-ink">
        {listing.access.instructions.map((step, i) =>
        <li key={step} className="flex gap-3">
            <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-white text-[11px] font-bold text-brand-800 ring-1 ring-brand-200">
              {i + 1}
            </span>
            {step}
          </li>
        )}
      </ol>

      <div className="mt-4 flex flex-wrap items-center gap-2 rounded-xl bg-white p-3 text-sm">
        <WifiIcon size={16} className="text-brand-700" aria-hidden="true" />
        <span className="font-medium">{listing.access.wifiNetwork}</span>
        <span className="text-ink-subtle">·</span>
        <span className="font-mono">{listing.access.wifiPassword}</span>
        <button
          type="button"
          onClick={() => copy('wifi', listing.access.wifiPassword)}
          className="focus-ring ml-auto inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold text-brand-700 hover:bg-brand-50">
          
          {copied === 'wifi' ? <CheckIcon size={13} aria-hidden="true" /> : <CopyIcon size={13} aria-hidden="true" />}
          {copied === 'wifi' ? 'Copied' : 'Copy password'}
        </button>
      </div>
    </div>);

}
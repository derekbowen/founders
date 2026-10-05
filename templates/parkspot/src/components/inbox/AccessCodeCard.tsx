import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CopyIcon, EyeIcon, KeyRoundIcon, LockIcon, XCircleIcon } from 'lucide-react';
import type { Listing } from '../../types/listing';
import type { TransactionStatus } from '../../types/transaction';

interface AccessCodeCardProps {
  listing: Listing;
  status: TransactionStatus;
  role: 'customer' | 'provider';
}

export function AccessCodeCard({ listing, status, role }: AccessCodeCardProps) {
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);
  const unlocked = status === 'Confirmed' || status === 'Active' || status === 'Completed';

  if (status === 'Cancelled') {
    return (
      <div className="flex items-start gap-3 rounded-2xl border border-line bg-surface p-5 text-sm text-muted">
        <XCircleIcon size={18} className="mt-0.5 shrink-0" aria-hidden />
        This booking was cancelled, so access details are no longer available.
      </div>);

  }

  if (!unlocked) {
    return (
      <div className="rounded-2xl bg-navy p-5 text-white">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <LockIcon size={16} className="text-accent" aria-hidden /> Access code locked
        </div>
        <p className="mt-2 text-sm text-white/70">
          {role === 'customer' ?
          'Directions and the gate code unlock as soon as the host confirms your reservation.' :
          'Accept this request to share the access code with the driver.'}
        </p>
        <div className="mt-4 flex gap-1.5" aria-hidden>
          {[0, 1, 2, 3].map((i) =>
          <span key={i} className="grid h-10 w-9 place-items-center rounded-lg bg-white/10 text-lg font-bold text-white/40">
              •
            </span>
          )}
        </div>
      </div>);

  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(listing.accessCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="rounded-2xl border-2 border-accent bg-surface p-5">
      <div className="flex items-center gap-2 text-sm font-semibold">
        <KeyRoundIcon size={16} className="text-warning" aria-hidden />
        {role === 'customer' ? 'Your access details' : 'Access details shared with driver'}
      </div>
      <AnimatePresence mode="wait" initial={false}>
        {revealed ?
        <motion.div key="shown" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div className="mt-3 flex items-center justify-between gap-3 rounded-xl bg-navy px-4 py-3">
              <span className="font-mono text-xl font-bold tracking-widest text-accent">{listing.accessCode}</span>
              <button
              type="button"
              onClick={copy}
              className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-semibold text-white hover:bg-white/10">
              
                <CopyIcon size={12} aria-hidden /> {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
            <p className="mt-3 text-sm leading-relaxed">{listing.accessInstructions}</p>
            <p className="mt-2 text-xs text-muted">Near {listing.addressHint}, {listing.neighborhood}</p>
          </motion.div> :

        <motion.div key="hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <p className="mt-2 text-sm text-muted">Confirmed — your gate code and full directions are ready.</p>
            <button
            type="button"
            onClick={() => setRevealed(true)}
            className="mt-3 inline-flex h-10 items-center gap-2 rounded-lg bg-accent px-4 text-sm font-semibold text-ink hover:bg-accent-strong">
            
              <EyeIcon size={16} aria-hidden /> Reveal access code
            </button>
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}
import React from 'react';
import { CopyIcon, UserPlusIcon } from 'lucide-react';
import { useToast } from '../ToastProvider';
import { brand } from '../../data/brand';

export function InvitePlayers({ txId }: {txId: string;}) {
  const { addToast } = useToast();
  const link = `${brand.inviteBaseUrl}/${txId}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      addToast({ type: 'success', message: 'Invite link copied' });
    } catch {
      addToast({ type: 'error', message: 'Couldn’t copy — select the link and copy it manually.' });
    }
  };

  return (
    <div className="rounded-xl bg-accent/40 p-4 ring-1 ring-accent-dark/40">
      <p className="flex items-center gap-2 text-sm font-semibold">
        <UserPlusIcon size={16} aria-hidden="true" /> Invite players
      </p>
      <p className="mt-1 text-xs text-slate-700">Share this link — friends can see the game details and add their names.</p>
      <div className="mt-3 flex gap-2">
        <label htmlFor={`invite-${txId}`} className="sr-only">Invite link</label>
        <input id={`invite-${txId}`} readOnly value={link} onFocus={(e) => e.target.select()} className="field bg-white py-2 text-xs" />
        <button type="button" onClick={copy} className="btn btn-sm shrink-0 bg-ink text-white hover:bg-ink/90">
          <CopyIcon size={14} aria-hidden="true" /> Copy
        </button>
      </div>
    </div>);

}
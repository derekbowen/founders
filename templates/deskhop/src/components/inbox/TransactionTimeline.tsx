import React from 'react';
import { CheckIcon, XIcon } from 'lucide-react';
import type { Transaction, TxStatus } from '../../types/transaction';
import { formatDateTime } from '../../utils/time';
import { statusMeta } from './StatusBadge';

const flow: TxStatus[] = ['requested', 'confirmed', 'checked-in', 'completed'];

export function TransactionTimeline({ tx }: {tx: Transaction;}) {
  const reached = new Map(tx.history.map((h) => [h.status, h.at]));
  const cancelled = tx.status === 'cancelled';
  const steps: TxStatus[] = cancelled ?
  [...flow.filter((s) => reached.has(s)), 'cancelled'] :
  flow;

  return (
    <ol className="relative space-y-5">
      {steps.map((s, i) => {
        const at = reached.get(s);
        const done = !!at;
        const isCancel = s === 'cancelled';
        const isLast = i === steps.length - 1;
        return (
          <li key={s} className="relative flex gap-3">
            {!isLast &&
            <span
              aria-hidden="true"
              className={`absolute left-[11px] top-6 h-[calc(100%+4px)] w-0.5 ${done && reached.has(steps[i + 1]) ? 'bg-brand-600' : 'bg-line'}`} />

            }
            <span
              className={`relative z-10 grid h-6 w-6 shrink-0 place-items-center rounded-full ${
              isCancel ?
              'bg-red-600 text-white' :
              done ?
              'bg-brand-700 text-white' :
              'border-2 border-line bg-white'}`
              }
              aria-hidden="true">
              
              {isCancel ? <XIcon size={13} /> : done ? <CheckIcon size={13} /> : null}
            </span>
            <div className="-mt-0.5">
              <p className={`text-sm font-semibold ${done ? 'text-ink' : 'text-ink-subtle'}`}>{statusMeta[s].label}</p>
              <p className="text-xs text-ink-muted">{at ? formatDateTime(at) : 'Pending'}</p>
            </div>
          </li>);

      })}
    </ol>);

}
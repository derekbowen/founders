import React from 'react';
import { CheckIcon } from 'lucide-react';
import type { Transaction, TxStatus } from '../../types/marketplace';
import { shortDate, fromToday } from '../../utils/format';
import { rentalWindow } from '../../utils/pricing';
import { cx } from '../../utils/styles';

const order: TxStatus[] = ['requested', 'confirmed', 'shipped', 'worn', 'returned', 'completed'];

export function TransactionTimeline({ tx }: {tx: Transaction;}) {
  const event = fromToday(tx.startOffset + 1);
  const { start, end } = rentalWindow(event, tx.days);
  const current = order.indexOf(tx.status);
  const steps = [
  { key: 'requested', label: 'Requested', sub: 'Rental request sent' },
  { key: 'confirmed', label: 'Confirmed', sub: 'Lender accepted · card charged' },
  { key: 'shipped', label: tx.delivery === 'ship' ? 'Shipped' : 'Picked up', sub: `Arrives ${shortDate(start)}` },
  { key: 'worn', label: 'Worn', sub: `Event on ${shortDate(event)}` },
  { key: 'returned', label: 'Returned', sub: `Due back ${shortDate(end)}` },
  { key: 'completed', label: 'Completed', sub: 'Cleaned & reviews open' }];


  if (tx.status === 'declined') {
    return (
      <p className="border border-line bg-cream p-4 text-sm text-muted">
        This request was declined or cancelled. No payment was taken.
      </p>);

  }

  return (
    <ol className="relative space-y-5" aria-label="Rental progress">
      {steps.map((s, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={s.key} className="relative flex gap-3">
            {i < steps.length - 1 &&
            <span
              aria-hidden="true"
              className={cx('absolute left-[11px] top-6 h-[calc(100%-4px)] w-px', done ? 'bg-ink' : 'bg-line')} />

            }
            <span
              className={cx(
                'relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[10px]',
                done && 'border-ink bg-ink text-paper',
                active && 'border-accent-dark bg-accent-soft text-accent-dark',
                !done && !active && 'border-line bg-paper text-muted'
              )}>
              
              {done ? <CheckIcon size={12} aria-hidden="true" /> : i + 1}
            </span>
            <div>
              <p className={cx('text-sm', active ? 'font-semibold text-ink' : done ? 'text-ink' : 'text-muted')}>
                {s.label}
                {active && <span className="sr-only"> (current)</span>}
              </p>
              <p className="text-xs text-muted">{s.sub}</p>
            </div>
          </li>);

      })}
    </ol>);

}
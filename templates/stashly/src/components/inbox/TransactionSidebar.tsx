import React from 'react';
import { format, parseISO } from 'date-fns';
import { CheckIcon, KeyRoundIcon, LockIcon, LogInIcon, LogOutIcon, MapPinIcon, PackageIcon, CarIcon, ClipboardListIcon } from 'lucide-react';
import type { Listing, Transaction, TransactionStatus } from '../../types/marketplace';
import { cx } from '../../utils/styles';

const order: TransactionStatus[] = ['requested', 'accepted', 'active', 'ending', 'completed'];

export function TransactionSidebar({ tx, listing }: {tx: Transaction;listing?: Listing;}) {
  const reached = order.indexOf(tx.status);
  const fmt = (d: string | null) => d ? format(parseISO(d), 'MMM d, yyyy') : '—';
  const steps = [
  { label: 'Requested', date: fmt(tx.messages[0]?.time ?? null) },
  { label: 'Accepted by host', date: reached >= 1 ? 'Confirmed' : 'Pending' },
  { label: 'Moved in', date: fmt(tx.moveIn) },
  { label: 'Move-out scheduled', date: tx.moveOut ? fmt(tx.moveOut) : 'Ongoing monthly' },
  { label: 'Completed', date: tx.status === 'completed' ? fmt(tx.moveOut) : 'Deposit refunded after' }];

  const instructionsUnlocked = reached >= 1 && tx.status !== 'declined';

  return (
    <div className="space-y-5">
      <Card title="Timeline" icon={<ClipboardListIcon className="h-4 w-4" />}>
        {tx.status === 'declined' ?
        <p className="text-sm text-stone-600">This request was declined or withdrawn. No charge was made.</p> :

        <ol className="relative space-y-4">
            {steps.map((s, i) => {
            const done = i <= reached;
            const current = i === reached;
            return (
              <li key={s.label} className="relative flex gap-3">
                  {i < steps.length - 1 &&
                <span className={cx('absolute left-[11px] top-6 h-[calc(100%-4px)] w-0.5', i < reached ? 'bg-brand-500' : 'bg-stone-200')} aria-hidden="true" />
                }
                  <span
                  className={cx(
                    'relative z-10 grid h-6 w-6 shrink-0 place-items-center rounded-full border-2',
                    done ? 'border-brand-600 bg-brand-600 text-white' : 'border-stone-300 bg-white',
                    current && 'ring-4 ring-brand-100'
                  )}>
                  
                    {done && <CheckIcon className="h-3 w-3" aria-hidden="true" />}
                  </span>
                  <div>
                    <p className={cx('text-sm', done ? 'font-semibold text-stone-900' : 'text-stone-500')}>{s.label}</p>
                    <p className="text-xs text-stone-500">{s.date}</p>
                  </div>
                </li>);

          })}
          </ol>
        }
      </Card>

      <Card title="Move-in instructions" icon={<KeyRoundIcon className="h-4 w-4" />}>
        {instructionsUnlocked && listing ?
        <div className="space-y-3 text-sm text-stone-700">
            <p className="flex gap-2"><MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" />
              {1200 + listing.title.length * 37 % 6000} SE {listing.neighborhood} St, {listing.city}
            </p>
            <p className="flex gap-2"><KeyRoundIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" />
              {listing.access247 ? <>Access code <span className="rounded bg-sand-100 px-1.5 font-mono font-semibold text-stone-900">4{tx.id.replace(/\D/g, '').slice(-3)}#</span> — active from move-in day</> : 'Host meets you at the door for each visit'}
            </p>
            <p className="flex gap-2"><CarIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" />{listing.accessNotes}</p>
            <p className="rounded-lg bg-brand-50 px-3 py-2 text-xs text-brand-800">Hours: {listing.accessHours}</p>
          </div> :

        <p className="flex items-start gap-2 text-sm text-stone-600">
            <LockIcon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" /> The exact address and access details are shared once the host accepts.
          </p>
        }
      </Card>

      <Card title="Access log" icon={<LogInIcon className="h-4 w-4" />}>
        {tx.accessLog.length ?
        <ul className="space-y-3">
            {[...tx.accessLog].reverse().map((a) =>
          <li key={a.id} className="flex items-start gap-3 text-sm">
                <span className={cx('grid h-7 w-7 shrink-0 place-items-center rounded-full', a.action === 'Entry' ? 'bg-brand-50 text-brand-700' : 'bg-sand-100 text-sand-700')}>
                  {a.action === 'Entry' ? <LogInIcon className="h-3.5 w-3.5" aria-hidden="true" /> : <LogOutIcon className="h-3.5 w-3.5" aria-hidden="true" />}
                </span>
                <div>
                  <p className="font-medium text-stone-900">{a.action}{a.note ? ` · ${a.note}` : ''}</p>
                  <p className="text-xs text-stone-500">{format(parseISO(a.time), 'MMM d, h:mm a')}</p>
                </div>
              </li>
          )}
          </ul> :

        <p className="text-sm text-stone-600">No visits yet. Entries are logged automatically by smart locks or when you check in.</p>
        }
      </Card>

      <Card title="Inventory" icon={<PackageIcon className="h-4 w-4" />}>
        <ul className="space-y-1.5 text-sm text-stone-700">
          {tx.inventory.map((i) =>
          <li key={i} className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-sand-500" aria-hidden="true" />{i}</li>
          )}
        </ul>
      </Card>
    </div>);

}

function Card({ title, icon, children }: {title: string;icon: React.ReactNode;children: React.ReactNode;}) {
  return (
    <section className="rounded-2xl border border-stone-200 bg-white p-5">
      <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-stone-900">
        <span className="text-brand-700" aria-hidden="true">{icon}</span>
        {title}
      </h3>
      {children}
    </section>);

}
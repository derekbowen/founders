import React, { useState } from 'react';
import { BanknoteIcon, BadgeCheckIcon, CircleCheckIcon } from 'lucide-react';
import { payoutHistory, upcomingPayout } from '../../data/payouts';
import { formatDate, formatMoney } from '../../utils/format';
import { cn, focusRing, inputClass } from '../../utils/styles';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Field } from '../ui/Field';

type Schedule = 'weekly' | 'daily' | 'monthly';

export function PayoutsPanel() {
  const [editing, setEditing] = useState(false);
  const [bank, setBank] = useState({ holder: 'Southside Kitchens Co.', routing: '', account: '' });
  const [last4, setLast4] = useState('6789');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [schedule, setSchedule] = useState<Schedule>('weekly');
  const [saved, setSaved] = useState(false);

  const saveBank = (e: React.FormEvent) => {
    e.preventDefault();
    const found: Record<string, string> = {};
    if (!bank.holder.trim()) found.holder = 'Required';
    if (!/^\d{9}$/.test(bank.routing)) found.routing = 'Routing numbers are 9 digits';
    if (!/^\d{4,17}$/.test(bank.account)) found.account = 'Enter a valid account number';
    setErrors(found);
    if (Object.keys(found).length) return;
    setLast4(bank.account.slice(-4));
    setEditing(false);
    setSaved(true);
    setBank({ ...bank, routing: '', account: '' });
  };

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-steel-900 p-5 text-white">
          <p className="text-sm text-steel-300">Next payout · {formatDate(upcomingPayout.date, 'EEE, MMM d')}</p>
          <p className="mt-1 font-heading text-3xl font-bold">{formatMoney(upcomingPayout.amount)}</p>
          <p className="text-xs text-steel-400">From {upcomingPayout.bookings} completed sessions</p>
        </div>
        <div className="rounded-2xl border border-steel-200 p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-steel-900">Stripe account</p>
            <Badge tone="accent" icon={<BadgeCheckIcon className="h-3.5 w-3.5" aria-hidden="true" />}>Verified</Badge>
          </div>
          <p className="mt-3 flex items-center gap-2 text-sm text-steel-700">
            <BanknoteIcon className="h-4 w-4 text-steel-500" aria-hidden="true" />
            Bank account •••• {last4}
          </p>
          {!editing &&
          <Button variant="outline" size="sm" className="mt-4" onClick={() => {setEditing(true);setSaved(false);}}>
              Change bank account
            </Button>
          }
          {saved &&
          <p className="mt-3 flex items-center gap-1.5 text-xs font-medium text-accent" role="status">
              <CircleCheckIcon className="h-3.5 w-3.5" aria-hidden="true" />
              Bank account updated
            </p>
          }
        </div>
      </div>

      {editing &&
      <form onSubmit={saveBank} noValidate className="space-y-4 rounded-2xl border border-steel-200 p-5">
          <h3 className="text-sm font-semibold text-steel-900">New bank account</h3>
          <Field label="Account holder" htmlFor="po-holder" error={errors.holder}>
            <input id="po-holder" value={bank.holder} onChange={(e) => setBank({ ...bank, holder: e.target.value })} className={cn(inputClass, errors.holder && 'border-primary')} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Routing number" htmlFor="po-routing" error={errors.routing}>
              <input id="po-routing" inputMode="numeric" value={bank.routing} onChange={(e) => setBank({ ...bank, routing: e.target.value.replace(/\D/g, '').slice(0, 9) })} className={cn(inputClass, errors.routing && 'border-primary')} placeholder="110000000" />
            </Field>
            <Field label="Account number" htmlFor="po-account" error={errors.account}>
              <input id="po-account" inputMode="numeric" value={bank.account} onChange={(e) => setBank({ ...bank, account: e.target.value.replace(/\D/g, '').slice(0, 17) })} className={cn(inputClass, errors.account && 'border-primary')} placeholder="000123456789" />
            </Field>
          </div>
          <div className="flex gap-3">
            <Button type="submit">Save bank account</Button>
            <Button variant="ghost" onClick={() => setEditing(false)}>Cancel</Button>
          </div>
        </form>
      }

      <fieldset>
        <legend className="mb-3 text-sm font-semibold text-steel-900">Payout schedule</legend>
        <div className="grid gap-3 sm:grid-cols-3">
          {(['daily', 'weekly', 'monthly'] as Schedule[]).map((s) =>
          <label key={s} className={cn('flex cursor-pointer items-center gap-3 rounded-xl border p-4 text-sm transition-colors focus-within:ring-2 focus-within:ring-primary/30', schedule === s ? 'border-steel-900 bg-steel-50' : 'border-steel-200 hover:border-steel-400')}>
              <input type="radio" name="schedule" value={s} checked={schedule === s} onChange={() => setSchedule(s)} className="h-4 w-4 accent-primary" />
              <span>
                <span className="block font-semibold capitalize text-steel-900">{s}</span>
                <span className="block text-xs text-steel-500">{s === 'daily' ? '2 business days' : s === 'weekly' ? 'Every Friday' : '1st of the month'}</span>
              </span>
            </label>
          )}
        </div>
      </fieldset>

      <section aria-labelledby="history-heading">
        <h3 id="history-heading" className="mb-3 text-sm font-semibold text-steel-900">Payout history</h3>
        <div className="overflow-x-auto rounded-2xl border border-steel-200">
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead className="bg-steel-50 text-xs uppercase tracking-wider text-steel-500">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold">Date</th>
                <th scope="col" className="px-4 py-3 font-semibold">Sessions</th>
                <th scope="col" className="px-4 py-3 font-semibold">Status</th>
                <th scope="col" className="px-4 py-3 text-right font-semibold">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-steel-200">
              {payoutHistory.map((p) =>
              <tr key={p.id} className="hover:bg-steel-50">
                  <td className="px-4 py-3 text-steel-900">{formatDate(p.date, 'MMM d, yyyy')}</td>
                  <td className="px-4 py-3 text-steel-600">{p.bookings}</td>
                  <td className="px-4 py-3"><Badge tone="accent">{p.status}</Badge></td>
                  <td className="px-4 py-3 text-right font-semibold text-steel-900">{formatMoney(p.amount)}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <button type="button" className={cn('mt-3 rounded text-sm font-medium text-steel-600 hover:text-steel-900 hover:underline', focusRing)}>Download 1099-K (2025)</button>
      </section>
    </div>);

}
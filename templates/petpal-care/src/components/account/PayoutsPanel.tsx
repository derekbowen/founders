import React, { useState } from 'react';
import { BuildingIcon, CheckCircle2Icon } from 'lucide-react';
import { useToast } from '../ToastProvider';
import { bankAccount, payoutSummary, recentPayouts } from '../../data/payouts';
import { brand } from '../../data/brand';
import { formatLongDate, formatMoney } from '../../utils/format';

export function PayoutsPanel() {
  const { addToast } = useToast();
  const [schedule, setSchedule] = useState('weekly');
  const stats = [
  { label: 'Pending', value: formatMoney(payoutSummary.pending, true), hint: 'Released 48h after stays begin' },
  { label: 'Last payout', value: formatMoney(payoutSummary.lastPayout, true), hint: formatLongDate(payoutSummary.lastPayoutDate) },
  { label: 'Lifetime earnings', value: formatMoney(payoutSummary.lifetime, true), hint: 'Since you joined' }];


  return (
    <div className="space-y-6">
      <div className="flex items-start gap-3 rounded-2xl bg-accent-50 p-4">
        <CheckCircle2Icon className="mt-0.5 h-5 w-5 shrink-0 text-accent-700" aria-hidden="true" />
        <div>
          <p className="font-extrabold text-accent-900">Payouts enabled</p>
          <p className="text-sm text-accent-800">
            Your account is verified with Stripe. {brand.name} keeps a {Math.round(brand.marketplace.providerFeeRate * 100)}% service fee from each booking.
          </p>
        </div>
      </div>

      <dl className="grid gap-3 sm:grid-cols-3">
        {stats.map((s) =>
        <div key={s.label} className="rounded-2xl border border-ink-200 p-4">
            <dt className="text-xs font-bold uppercase tracking-wide text-ink-500">{s.label}</dt>
            <dd className="mt-1 text-xl font-black text-ink-900">{s.value}</dd>
            <dd className="text-xs text-ink-600">{s.hint}</dd>
          </div>
        )}
      </dl>

      <section aria-labelledby="bank-heading">
        <h3 id="bank-heading" className="font-extrabold text-ink-900">
          Payout method
        </h3>
        <div className="mt-3 flex items-center gap-4 rounded-2xl border border-ink-200 p-4">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink-100 text-ink-700">
            <BuildingIcon className="h-5 w-5" aria-hidden="true" />
          </span>
          <div className="flex-1">
            <p className="font-bold text-ink-900">
              {bankAccount.bank} ···· {bankAccount.last4}
            </p>
            <p className="text-sm text-ink-600">
              {bankAccount.holder} · Routing {bankAccount.routing} · {bankAccount.country}
            </p>
          </div>
          <button type="button" onClick={() => addToast({ type: 'info', message: 'Opening secure Stripe onboarding…' })} className="btn btn-sm btn-secondary">
            Update
          </button>
        </div>
      </section>

      <section aria-labelledby="schedule-heading">
        <label id="schedule-heading" htmlFor="schedule" className="field-label">
          Payout schedule
        </label>
        <select
          id="schedule"
          value={schedule}
          onChange={(e) => {
            setSchedule(e.target.value);
            addToast({ type: 'success', message: 'Payout schedule updated' });
          }}
          className="field max-w-xs">
          
          <option value="daily">Daily</option>
          <option value="weekly">Weekly (Fridays)</option>
          <option value="monthly">Monthly (1st of the month)</option>
        </select>
      </section>

      <section aria-labelledby="history-heading">
        <h3 id="history-heading" className="font-extrabold text-ink-900">
          Recent payouts
        </h3>
        <div className="mt-3 overflow-x-auto rounded-2xl border border-ink-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-ink-50 text-xs uppercase tracking-wide text-ink-600">
              <tr>
                <th scope="col" className="px-4 py-3 font-bold">Date</th>
                <th scope="col" className="px-4 py-3 font-bold">Bookings</th>
                <th scope="col" className="px-4 py-3 font-bold">Status</th>
                <th scope="col" className="px-4 py-3 text-right font-bold">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {recentPayouts.map((p) =>
              <tr key={p.id} className="transition hover:bg-ink-50">
                  <td className="px-4 py-3 font-semibold text-ink-900">{formatLongDate(p.date)}</td>
                  <td className="px-4 py-3 text-ink-700">{p.bookings}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-accent-100 px-2.5 py-0.5 text-xs font-bold text-accent-800">{p.status}</span>
                  </td>
                  <td className="px-4 py-3 text-right font-black text-ink-900">{formatMoney(p.amount, true)}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>);

}
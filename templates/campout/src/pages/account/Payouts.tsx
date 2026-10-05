import React, { useState } from 'react';
import { BanknoteIcon, LandmarkIcon, ShieldCheckIcon } from 'lucide-react';
import { SaveNotice } from '../../components/SaveNotice';
import { brand } from '../../data/brand';
import { formatMoney } from '../../utils/currency';

const payoutHistory = [
{ id: 'po-311', date: 'Sep 8, 2026', guest: 'Owen F.', amount: 77, status: 'Paid' },
{ id: 'po-298', date: 'Aug 24, 2026', guest: 'Ava T.', amount: 412, status: 'Paid' },
{ id: 'po-287', date: 'Aug 10, 2026', guest: 'Hannah L.', amount: 106, status: 'Paid' }];


export function Payouts() {
  const [form, setForm] = useState({ holder: 'Jordan Reyes', type: 'individual', routing: '', account: '' });
  const [errors, setErrors] = useState<{routing?: string;account?: string;}>({});
  const [connected, setConnected] = useState(false);
  const [saved, setSaved] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!/^\d{9}$/.test(form.routing)) next.routing = 'Routing numbers are 9 digits.';
    if (!/^\d{6,17}$/.test(form.account)) next.account = 'Enter a valid account number.';
    setErrors(next);
    if (Object.keys(next).length) return;
    setConnected(true);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        {[
        ['Upcoming', formatMoney(1091), 'Next payout Oct 3'],
        ['Paid this year', formatMoney(6240), '28 stays'],
        ['Host fee', `${Math.round(brand.hostCommissionRate * 100)}%`, 'Per booking']].
        map(([label, value, sub]) =>
        <div key={label} className="card p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-500">{label}</p>
            <p className="mt-2 font-serif text-2xl font-bold text-ink-900">{value}</p>
            <p className="text-xs text-ink-500">{sub}</p>
          </div>
        )}
      </div>

      <form onSubmit={submit} className="card p-6 md:p-8" noValidate>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-ink-900">Payout method</h2>
            <p className="mt-1 text-sm text-ink-500">Earnings are sent 24 hours after each guest checks in.</p>
          </div>
          <span
            className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${connected ? 'bg-primary-50 text-primary-700' : 'bg-accent-50 text-accent-700'}`}>
            
            {connected ? 'Connected' : 'Action needed'}
          </span>
        </div>

        {connected ?
        <div className="mt-6 flex items-center gap-4 rounded-2xl border border-sand-200 bg-sand-50 p-4">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-white text-primary-700">
              <LandmarkIcon size={20} aria-hidden="true" />
            </span>
            <div className="flex-1">
              <p className="text-sm font-semibold text-ink-900">Checking ···· {form.account.slice(-4)}</p>
              <p className="text-xs text-ink-500">{form.holder} · USD</p>
            </div>
            <button type="button" className="btn-ghost" onClick={() => setConnected(false)}>
              Change
            </button>
          </div> :

        <div className="mt-6 space-y-5">
            <fieldset>
              <legend className="label">Account type</legend>
              <div className="flex gap-2">
                {['individual', 'company'].map((t) =>
              <button key={t} type="button" aria-pressed={form.type === t} onClick={() => setForm((f) => ({ ...f, type: t }))} className={`chip capitalize ${form.type === t ? 'chip-active' : ''}`}>
                    {t}
                  </button>
              )}
              </div>
            </fieldset>
            <label className="block">
              <span className="label">Account holder name</span>
              <input className="input" value={form.holder} onChange={(e) => setForm((f) => ({ ...f, holder: e.target.value }))} />
            </label>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="label">Routing number</span>
                <input inputMode="numeric" className={`input ${errors.routing ? 'input-error' : ''}`} value={form.routing} onChange={(e) => setForm((f) => ({ ...f, routing: e.target.value.replace(/\D/g, '').slice(0, 9) }))} placeholder="110000000" />
                {errors.routing && <span className="mt-1.5 block text-sm text-red-700">{errors.routing}</span>}
              </label>
              <label className="block">
                <span className="label">Account number</span>
                <input inputMode="numeric" className={`input ${errors.account ? 'input-error' : ''}`} value={form.account} onChange={(e) => setForm((f) => ({ ...f, account: e.target.value.replace(/\D/g, '').slice(0, 17) }))} placeholder="000123456789" />
                {errors.account && <span className="mt-1.5 block text-sm text-red-700">{errors.account}</span>}
              </label>
            </div>
            <p className="flex items-center gap-1.5 text-xs text-ink-500">
              <ShieldCheckIcon size={13} aria-hidden="true" /> Bank details are encrypted and verified by our payments partner.
            </p>
          </div>
        }
        <div className="mt-8 flex items-center gap-4">
          {!connected &&
          <button type="submit" className="btn-primary">
              <BanknoteIcon size={16} aria-hidden="true" /> Save payout method
            </button>
          }
          <SaveNotice show={saved} message="Payout method connected" />
        </div>
      </form>

      <section className="card overflow-hidden">
        <h2 className="px-6 pt-6 text-xl font-bold text-ink-900">Recent payouts</h2>
        <table className="mt-4 w-full text-left text-sm">
          <thead className="border-y border-sand-200 bg-sand-50 text-xs uppercase tracking-wider text-ink-500">
            <tr>
              <th scope="col" className="px-6 py-3 font-semibold">Date</th>
              <th scope="col" className="px-6 py-3 font-semibold">Guest</th>
              <th scope="col" className="px-6 py-3 text-right font-semibold">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sand-200">
            {payoutHistory.map((p) =>
            <tr key={p.id} className="hover:bg-sand-50">
                <td className="px-6 py-3 text-ink-700">{p.date}</td>
                <td className="px-6 py-3 text-ink-700">{p.guest}</td>
                <td className="px-6 py-3 text-right font-semibold tabular-nums text-ink-900">{formatMoney(p.amount)}</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>);

}
import React, { useState } from 'react';
import { BanknoteIcon, CheckCircle2Icon, LandmarkIcon } from 'lucide-react';
import { Input } from '../Input';
import { payoutAccount, payoutHistory } from '../../data/payouts';
import { formatDate, formatMoney } from '../../utils/format';
import { buttonClass } from '../../utils/styles';

export function PayoutsSection() {
  const [editing, setEditing] = useState(false);
  const [account, setAccount] = useState(payoutAccount);
  const [form, setForm] = useState({ holder: payoutAccount.holder, routing: '', number: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!form.holder.trim()) errs.holder = 'Required';
    if (!/^\d{9}$/.test(form.routing)) errs.routing = 'Routing numbers are 9 digits';
    if (!/^\d{6,17}$/.test(form.number)) errs.number = 'Enter a valid account number';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setAccount({ ...account, holder: form.holder, last4: form.number.slice(-4), bankName: 'Bank account' });
    setEditing(false);
  };

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-navy p-5 text-white">
          <p className="text-sm text-white/70">Next payout</p>
          <p className="mt-1 text-3xl font-bold text-accent">{formatMoney(account.nextPayout.amount)}</p>
          <p className="mt-1 text-sm text-white/70">Arrives {formatDate(account.nextPayout.date)}</p>
        </div>
        <div className="rounded-2xl border border-line p-5">
          <p className="flex items-center gap-1.5 text-sm font-semibold text-success">
            <CheckCircle2Icon size={16} aria-hidden /> Payouts enabled
          </p>
          <p className="mt-2 text-sm text-muted">Schedule: {account.schedule}</p>
          <p className="text-sm text-muted">Identity verified via Stripe Connect</p>
        </div>
      </div>

      <section aria-labelledby="bank-heading">
        <h3 id="bank-heading" className="font-semibold">Bank account</h3>
        {!editing ?
        <div className="mt-3 flex items-center justify-between gap-4 rounded-xl border border-line p-4">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-canvas" aria-hidden>
                <LandmarkIcon size={18} />
              </span>
              <div>
                <p className="text-sm font-semibold">
                  {account.bankName} •••• {account.last4}
                </p>
                <p className="text-xs text-muted">{account.holder}</p>
              </div>
            </div>
            <button type="button" onClick={() => setEditing(true)} className={buttonClass('secondary', 'sm')}>
              Change
            </button>
          </div> :

        <form onSubmit={save} noValidate className="mt-3 space-y-4 rounded-xl border border-line p-4">
            <Input id="po-holder" label="Account holder name" value={form.holder} onChange={(e) => setForm({ ...form, holder: e.target.value })} error={errors.holder} />
            <div className="grid gap-4 sm:grid-cols-2">
              <Input id="po-routing" label="Routing number" inputMode="numeric" placeholder="110000000" value={form.routing} onChange={(e) => setForm({ ...form, routing: e.target.value.replace(/\D/g, '') })} error={errors.routing} />
              <Input id="po-number" label="Account number" inputMode="numeric" placeholder="000123456789" value={form.number} onChange={(e) => setForm({ ...form, number: e.target.value.replace(/\D/g, '') })} error={errors.number} />
            </div>
            <div className="flex gap-2">
              <button type="submit" className={buttonClass('primary', 'sm')}>
                Save bank account
              </button>
              <button type="button" onClick={() => setEditing(false)} className={buttonClass('ghost', 'sm')}>
                Cancel
              </button>
            </div>
          </form>
        }
      </section>

      <section aria-labelledby="history-heading">
        <h3 id="history-heading" className="font-semibold">Payout history</h3>
        <div className="mt-3 overflow-x-auto rounded-xl border border-line">
          <table className="w-full text-sm">
            <thead className="bg-canvas text-left text-xs uppercase tracking-wide text-muted">
              <tr>
                <th scope="col" className="px-4 py-2.5 font-semibold">Date</th>
                <th scope="col" className="px-4 py-2.5 font-semibold">Bookings</th>
                <th scope="col" className="px-4 py-2.5 font-semibold">Status</th>
                <th scope="col" className="px-4 py-2.5 text-right font-semibold">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {payoutHistory.map((p) =>
              <tr key={p.id} className="hover:bg-canvas">
                  <td className="px-4 py-3">{formatDate(p.date)}</td>
                  <td className="px-4 py-3">{p.bookings}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 text-success">
                      <BanknoteIcon size={14} aria-hidden /> {p.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-semibold">{formatMoney(p.amount)}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>);

}
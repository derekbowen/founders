import React, { useState } from 'react';
import { BanknoteIcon, CheckCircle2Icon, LandmarkIcon } from 'lucide-react';
import { Input } from '../Input';
import { useToast } from '../ToastProvider';
import { BrandButton } from '../ui/BrandButton';
import { SelectField } from '../ui/SelectField';
import { recentPayouts } from '../../data/currentUser';
import { formatCurrency, formatDate } from '../../utils/format';

export function PayoutsPanel() {
  const { addToast } = useToast();
  const [connected, setConnected] = useState(false);
  const [routing, setRouting] = useState('');
  const [account, setAccount] = useState('');
  const [schedule, setSchedule] = useState('2-days');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const err: Record<string, string> = {};
    if (routing.length !== 9) err.routing = 'Routing numbers are 9 digits';
    if (account.length < 6) err.account = 'Enter your full account number';
    setErrors(err);
    if (Object.keys(err).length) return;
    setSaving(true);
    window.setTimeout(() => {
      setSaving(false);
      setConnected(true);
      addToast({ type: 'success', message: 'Bank account connected' });
    }, 900);
  };

  return (
    <div className="space-y-8">
      <div className="grid gap-3 sm:grid-cols-3">
        {[
        ['Available', formatCurrency(126)],
        ['Pending', formatCurrency(60)],
        ['Paid this month', formatCurrency(453.6)]].
        map(([l, v]) =>
        <div key={l} className="rounded-2xl bg-ink-50 p-4 ring-1 ring-ink-200">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-600">{l}</p>
            <p className="mt-1 font-heading text-2xl font-bold text-ink-900">{v}</p>
          </div>
        )}
      </div>

      {connected ?
      <div className="flex items-center gap-4 rounded-2xl bg-emerald-50 p-4 ring-1 ring-emerald-200">
          <CheckCircle2Icon className="h-6 w-6 text-emerald-700" aria-hidden />
          <div className="flex-1">
            <p className="font-semibold text-emerald-900">Checking account ••••{account.slice(-4)}</p>
            <p className="text-sm text-emerald-800">Payouts {schedule === 'weekly' ? 'every Monday' : 'within 2 days of each sit'}</p>
          </div>
          <BrandButton tone="outline" size="sm" onClick={() => setConnected(false)}>Change</BrandButton>
        </div> :

      <form onSubmit={submit} noValidate className="space-y-5 rounded-3xl border border-ink-200 p-5">
          <div className="flex items-center gap-2">
            <LandmarkIcon className="h-5 w-5 text-primary-600" aria-hidden />
            <h3 className="font-heading text-lg font-bold text-ink-900">Bank account for payouts</h3>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input id="routing" label="Routing number" inputMode="numeric" value={routing} error={errors.routing} placeholder="110000000" onChange={(e) => setRouting(e.target.value.replace(/\D/g, '').slice(0, 9))} />
            <Input id="account" label="Account number" inputMode="numeric" value={account} error={errors.account} placeholder="000123456789" onChange={(e) => setAccount(e.target.value.replace(/\D/g, '').slice(0, 17))} />
          </div>
          <SelectField label="Payout schedule" value={schedule} onChange={(e) => setSchedule(e.target.value)} options={[{ value: '2-days', label: 'Automatic — 2 days after each sit' }, { value: 'weekly', label: 'Weekly — every Monday' }]} />
          <BrandButton type="submit" loading={saving}>Connect bank account</BrandButton>
          <p className="text-xs text-ink-600">Payouts are processed securely by Stripe Connect. We never store your full account number.</p>
        </form>
      }

      <section aria-labelledby="payout-history">
        <h3 id="payout-history" className="font-heading text-lg font-bold text-ink-900">Recent payouts</h3>
        <ul className="mt-3 divide-y divide-ink-200 rounded-2xl border border-ink-200">
          {recentPayouts.map((p) =>
          <li key={p.id} className="flex items-center justify-between px-4 py-3 text-sm">
              <span className="flex items-center gap-3 text-ink-700"><BanknoteIcon className="h-4 w-4 text-ink-500" aria-hidden />{formatDate(p.date, 'MMM d, yyyy')}</span>
              <span className="flex items-center gap-3">
                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-800">{p.status}</span>
                <span className="font-semibold text-ink-900">{formatCurrency(p.amount)}</span>
              </span>
            </li>
          )}
        </ul>
      </section>
    </div>);

}
import React, { useState } from 'react';
import { LandmarkIcon, CheckCircle2Icon, ArrowUpRightIcon } from 'lucide-react';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { useToast } from '../../components/ToastProvider';
import { useMarketplace } from '../../contexts/MarketplaceContext';
import { formatMoney, hostPayout } from '../../utils/pricing';
import { ui } from '../../utils/styles';

export function PayoutSettings() {
  const { addToast } = useToast();
  const { transactions } = useMarketplace();
  const [connected, setConnected] = useState(false);
  const [form, setForm] = useState({ holder: '', routing: '', account: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const earning = transactions.filter((t) => t.role === 'hosting' && (t.status === 'active' || t.status === 'ending'));
  const monthly = earning.reduce((s, t) => s + hostPayout(t.monthlyPrice), 0);

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!form.holder.trim()) errs.holder = 'Required';
    if (form.routing.length !== 9) errs.routing = 'Routing numbers have 9 digits';
    if (form.account.length < 6) errs.account = 'Enter a valid account number';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setConnected(true);
      addToast({ type: 'success', message: 'Payout account connected' });
    }, 700);
  };

  return (
    <div className="max-w-xl space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-stone-900">Payouts</h2>
        <p className="mt-1 text-sm text-stone-600">Hosting income is paid out 24 hours after each billing period starts.</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl bg-brand-50 p-4">
          <p className="text-xs font-medium text-brand-800">Expected this month</p>
          <p className="mt-1 text-2xl font-bold text-brand-900">{formatMoney(monthly)}</p>
          <p className="text-xs text-brand-800">{earning.length} active booking{earning.length === 1 ? '' : 's'}</p>
        </div>
        <div className="rounded-xl bg-sand-50 p-4">
          <p className="text-xs font-medium text-sand-800">Next payout</p>
          <p className="mt-1 text-2xl font-bold text-stone-900">Oct 2</p>
          <p className="text-xs text-stone-600">{connected ? 'To account ending ' + form.account.slice(-4) : 'Connect an account to receive it'}</p>
        </div>
      </div>

      {connected ?
      <div className="flex items-start gap-3 rounded-xl border border-brand-200 bg-white p-4">
          <CheckCircle2Icon className="h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" />
          <div className="flex-1">
            <p className="font-semibold text-stone-900">Bank account connected</p>
            <p className="text-sm text-stone-600">{form.holder} · ••••{form.account.slice(-4)}</p>
          </div>
          <Button variant="tertiary" onClick={() => setConnected(false)}>Change</Button>
        </div> :

      <form onSubmit={save} noValidate className="space-y-4 rounded-xl border border-stone-200 p-5">
          <div className="flex items-center gap-2 text-sm font-semibold text-stone-900">
            <LandmarkIcon className="h-4 w-4 text-brand-700" aria-hidden="true" /> Bank account (US)
          </div>
          <Input id="b-holder" label="Account holder name" value={form.holder} onChange={(e) => setForm({ ...form, holder: e.target.value })} error={errors.holder} />
          <div className="grid gap-4 sm:grid-cols-2">
            <Input id="b-routing" label="Routing number" inputMode="numeric" value={form.routing} onChange={(e) => setForm({ ...form, routing: e.target.value.replace(/\D/g, '').slice(0, 9) })} error={errors.routing} />
            <Input id="b-account" label="Account number" inputMode="numeric" value={form.account} onChange={(e) => setForm({ ...form, account: e.target.value.replace(/\D/g, '').slice(0, 17) })} error={errors.account} />
          </div>
          <Button type="submit" loading={saving} className={ui.btnBrand}>Connect account</Button>
          <p className="flex items-center gap-1 text-xs text-stone-500">
            Payouts are processed securely by Stripe Connect <ArrowUpRightIcon className="h-3 w-3" aria-hidden="true" />
          </p>
        </form>
      }
    </div>);

}
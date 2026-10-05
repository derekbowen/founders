import React, { useState } from 'react';
import { toast } from 'sonner';
import { BanknoteIcon, CheckCircle2Icon } from 'lucide-react';
import { TextField } from '../../components/ui/TextField';
import { SelectField } from '../../components/ui/SelectField';
import { Button } from '../../components/ui/Button';
import { payoutCountries } from '../../data/options';
import { brand } from '../../data/brand';

export function Payouts() {
  const [connected, setConnected] = useState(false);
  const [form, setForm] = useState({ country: 'US', holder: '', routing: '', account: '' });
  const [errors, setErrors] = useState<Partial<Record<keyof typeof form, string>>>({});
  const [saving, setSaving] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!form.holder.trim()) next.holder = 'Enter the account holder name';
    if (form.routing.replace(/\D/g, '').length < 6) next.routing = 'Enter a valid routing / sort code';
    if (form.account.replace(/\D/g, '').length < 6) next.account = 'Enter a valid account number';
    setErrors(next);
    if (Object.keys(next).length) return;
    setSaving(true);
    window.setTimeout(() => {
      setSaving(false);
      setConnected(true);
      toast.success('Payout method added');
    }, 900);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-slate-900">Payouts</h2>
      <p className="mt-1 text-sm text-slate-600">
        Hosts receive earnings 24 hours after each experience starts. {brand.name} keeps a {Math.round(brand.hostCommissionRate * 100)}% commission.
      </p>

      {connected ?
      <div className="mt-6 flex items-start gap-4 rounded-2xl border border-accent-200 bg-accent-50 p-5">
          <CheckCircle2Icon className="h-6 w-6 shrink-0 text-accent-700" aria-hidden />
          <div className="flex-1">
            <p className="font-semibold text-slate-900">Bank account connected</p>
            <p className="text-sm text-slate-700">{form.holder} · ••••{form.account.slice(-4)} · {payoutCountries.find((c) => c.value === form.country)?.label}</p>
          </div>
          <Button size="sm" variant="outline" onClick={() => setConnected(false)}>Edit</Button>
        </div> :

      <form onSubmit={submit} noValidate className="mt-6 max-w-lg space-y-5">
          <div className="flex items-center gap-3 rounded-2xl bg-sand-100 p-4 text-sm text-slate-700">
            <BanknoteIcon className="h-5 w-5 shrink-0 text-primary-600" aria-hidden />
            No payout method yet. Add a bank account to start receiving earnings.
          </div>
          <SelectField label="Bank country" value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} options={payoutCountries} />
          <TextField label="Account holder name" value={form.holder} onChange={(e) => setForm({ ...form, holder: e.target.value })} error={errors.holder} />
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField label="Routing / sort code" inputMode="numeric" value={form.routing} onChange={(e) => setForm({ ...form, routing: e.target.value })} error={errors.routing} />
            <TextField label="Account number / IBAN" value={form.account} onChange={(e) => setForm({ ...form, account: e.target.value })} error={errors.account} />
          </div>
          <div className="border-t border-slate-100 pt-6">
            <Button type="submit" loading={saving}>Save payout details</Button>
          </div>
        </form>
      }

      <div className="mt-10">
        <h3 className="text-sm font-semibold text-slate-900">Recent payouts</h3>
        <table className="mt-3 w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
              <th className="py-2 font-medium">Date</th>
              <th className="py-2 font-medium">Experience</th>
              <th className="py-2 text-right font-medium">Amount</th>
            </tr>
          </thead>
          <tbody className="text-slate-700">
            <tr className="border-b border-slate-100"><td className="py-3">Sep 19, 2026</td><td>Murals & Mezcal · Elena R.</td><td className="text-right font-semibold text-slate-900">$285.12</td></tr>
            <tr className="border-b border-slate-100"><td className="py-3">Sep 3, 2026</td><td>Murals & Mezcal · 4 guests</td><td className="text-right font-semibold text-slate-900">$137.28</td></tr>
          </tbody>
        </table>
      </div>
    </div>);

}
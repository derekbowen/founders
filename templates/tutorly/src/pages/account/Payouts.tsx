import React, { useState } from 'react';
import { LandmarkIcon, CheckCircle2Icon, LockIcon } from 'lucide-react';
import { Input } from '../../components/Input';
import { Select } from '../../components/Select';
import { Button } from '../../components/Button';
import { useToast } from '../../components/ToastProvider';
import { SettingsCard } from '../../components/account/SettingsCard';
import { useAuth } from '../../contexts/AuthContext';
import { formatMoney } from '../../utils/format';
import { brandButton } from '../../utils/buttonStyles';

const payoutHistory = [
{ id: 'po_1', date: 'Sep 29, 2026', lessons: 4, amount: 140.8, status: 'Paid' },
{ id: 'po_2', date: 'Sep 22, 2026', lessons: 3, amount: 105.6, status: 'Paid' },
{ id: 'po_3', date: 'Sep 15, 2026', lessons: 5, amount: 176.0, status: 'Paid' }];


export function PayoutsPage() {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [connected, setConnected] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    country: 'US',
    accountType: 'individual',
    legalName: `${user.firstName} ${user.lastName}`,
    dob: '',
    address: '',
    routing: '',
    account: ''
  });
  const [errors, setErrors] = useState<Partial<Record<keyof typeof form, string>>>({});
  const set = (k: keyof typeof form, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: typeof errors = {};
    if (!form.legalName.trim()) errs.legalName = 'Required';
    if (!form.dob) errs.dob = 'Required';
    if (form.address.trim().length < 5) errs.address = 'Enter your full address';
    if (!/^\d{9}$/.test(form.routing)) errs.routing = 'Routing number is 9 digits';
    if (!/^\d{6,17}$/.test(form.account)) errs.account = 'Enter a valid account number';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSaving(true);
    window.setTimeout(() => {
      setSaving(false);
      setConnected(true);
      addToast({ type: 'success', message: 'Payout account connected' });
    }, 900);
  };

  if (connected) {
    return (
      <div className="space-y-6">
        <SettingsCard title="Payout account">
          <div className="flex flex-wrap items-center gap-4 rounded-2xl bg-green-50 p-4">
            <CheckCircle2Icon size={24} className="text-green-700" aria-hidden="true" />
            <div className="flex-1">
              <p className="font-medium text-ink-900">Bank account ••••{form.account.slice(-4)}</p>
              <p className="text-sm text-ink-600">{form.legalName} · Payouts every Monday</p>
            </div>
            <Button className={brandButton.secondary} onClick={() => setConnected(false)}>Update</Button>
          </div>
          <dl className="mt-5 grid gap-4 sm:grid-cols-3">
            {[
            { label: 'Next payout', value: formatMoney(211.2) },
            { label: 'Scheduled for', value: 'Mon, Oct 5' },
            { label: 'Earned this month', value: formatMoney(422.4) }].
            map((s) =>
            <div key={s.label} className="rounded-2xl border border-ink-200 p-4">
                <dt className="text-sm text-ink-500">{s.label}</dt>
                <dd className="mt-1 text-xl font-semibold text-ink-900">{s.value}</dd>
              </div>
            )}
          </dl>
        </SettingsCard>
        <SettingsCard title="Payout history">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs uppercase tracking-wide text-ink-500">
                <tr><th className="pb-2 font-medium">Date</th><th className="pb-2 font-medium">Lessons</th><th className="pb-2 font-medium">Amount</th><th className="pb-2 font-medium">Status</th></tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                {payoutHistory.map((p) =>
                <tr key={p.id}>
                    <td className="py-3 text-ink-800">{p.date}</td>
                    <td className="py-3 text-ink-700">{p.lessons}</td>
                    <td className="py-3 font-medium text-ink-900">{formatMoney(p.amount)}</td>
                    <td className="py-3"><span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-900">{p.status}</span></td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </SettingsCard>
      </div>);

  }

  return (
    <form onSubmit={submit} noValidate>
      <SettingsCard
        title="Payout details"
        description="Add a bank account to receive earnings from lessons. Payouts are sent weekly via Stripe."
        footer={<Button type="submit" className={brandButton.primary} loading={saving}>Save payout details</Button>}>
        
        <div className="mb-5 flex items-center gap-3 rounded-2xl bg-accent-50 p-4">
          <LandmarkIcon size={20} className="text-accent-800" aria-hidden="true" />
          <p className="text-sm text-ink-800">You need payout details before your listing can accept bookings.</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <Select
            label="Country"
            value={form.country}
            options={[{ value: 'US', label: 'United States' }, { value: 'CA', label: 'Canada' }, { value: 'GB', label: 'United Kingdom' }, { value: 'AU', label: 'Australia' }]}
            onChange={(v) => set('country', v as string)} />
          
          <fieldset>
            <legend className="mb-1.5 text-sm font-medium text-ink-800">Account type</legend>
            <div className="flex gap-2">
              {[{ v: 'individual', l: 'Individual' }, { v: 'company', l: 'Company' }].map((o) =>
              <label key={o.v} className={`flex flex-1 cursor-pointer items-center gap-2 rounded-xl border px-3 py-2.5 text-sm ${form.accountType === o.v ? 'border-primary-600 bg-primary-50' : 'border-ink-200'}`}>
                  <input type="radio" name="accountType" checked={form.accountType === o.v} onChange={() => set('accountType', o.v)} className="accent-[rgb(var(--color-primary-600))]" />
                  {o.l}
                </label>
              )}
            </div>
          </fieldset>
          <Input id="po-name" label="Legal name" value={form.legalName} onChange={(e) => set('legalName', e.target.value)} error={errors.legalName} />
          <Input id="po-dob" type="date" label="Date of birth" value={form.dob} onChange={(e) => set('dob', e.target.value)} error={errors.dob} />
          <div className="sm:col-span-2">
            <Input id="po-address" label="Street address" autoComplete="street-address" placeholder="123 Market St, San Francisco, CA 94103" value={form.address} onChange={(e) => set('address', e.target.value)} error={errors.address} />
          </div>
          <Input id="po-routing" label="Routing number" inputMode="numeric" placeholder="110000000" value={form.routing} onChange={(e) => set('routing', e.target.value.replace(/\D/g, '').slice(0, 9))} error={errors.routing} />
          <Input id="po-account" label="Account number" inputMode="numeric" placeholder="000123456789" value={form.account} onChange={(e) => set('account', e.target.value.replace(/\D/g, '').slice(0, 17))} error={errors.account} />
        </div>
        <p className="mt-5 flex items-center gap-1.5 text-xs text-ink-500">
          <LockIcon size={12} aria-hidden="true" /> Bank details are encrypted and stored by Stripe, never on our servers.
        </p>
      </SettingsCard>
    </form>);

}
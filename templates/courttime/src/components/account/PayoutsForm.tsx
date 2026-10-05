import React, { useState } from 'react';
import { BanknoteIcon, CheckCircle2Icon, LockIcon } from 'lucide-react';
import { Input } from '../Input';
import { Select } from '../Select';
import { useToast } from '../ToastProvider';

const countries = [
{ value: 'US', label: 'United States' },
{ value: 'CA', label: 'Canada' },
{ value: 'GB', label: 'United Kingdom' },
{ value: 'AU', label: 'Australia' }];

const schedules = [
{ value: 'weekly', label: 'Weekly (every Monday)' },
{ value: 'daily', label: 'Daily' },
{ value: 'monthly', label: 'Monthly (1st of month)' }];


export function PayoutsForm() {
  const { addToast } = useToast();
  const [accountType, setAccountType] = useState<'individual' | 'company'>('individual');
  const [routing, setRouting] = useState('');
  const [account, setAccount] = useState('');
  const [errors, setErrors] = useState<{routing?: string;account?: string;}>({});

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: typeof errors = {};
    if (!/^\d{9}$/.test(routing)) errs.routing = 'Routing numbers are 9 digits.';
    if (!/^\d{6,17}$/.test(account)) errs.account = 'Enter 6–17 digits.';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    addToast({ type: 'success', message: 'Bank account updated' });
    setRouting('');
    setAccount('');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-3 rounded-xl bg-brand-soft p-4">
        <CheckCircle2Icon size={20} className="mt-0.5 shrink-0 text-brand" aria-hidden="true" />
        <div className="text-sm">
          <p className="font-semibold text-brand-dark">Payouts enabled</p>
          <p className="text-slate-700">Paying out to Chase ••••6789. Next payout: <strong>$184.00</strong> on Monday.</p>
        </div>
      </div>
      <form onSubmit={onSubmit} noValidate className="space-y-5">
        <fieldset>
          <legend className="field-label">Account type</legend>
          <div className="grid max-w-sm grid-cols-2 gap-1 rounded-xl bg-slate-100 p-1">
            {(['individual', 'company'] as const).map((t) =>
            <button key={t} type="button" aria-pressed={accountType === t} onClick={() => setAccountType(t)} className={`rounded-lg py-2 text-sm font-semibold capitalize ${accountType === t ? 'bg-white shadow-sm' : 'text-slate-600 hover:text-ink'}`}>
                {t}
              </button>
            )}
          </div>
        </fieldset>
        <div className="grid gap-5 sm:grid-cols-2">
          <Select label="Bank country" options={countries} value="US" />
          <Select label="Payout schedule" options={schedules} value="weekly" />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <Input id="po-routing" label="Routing number" inputMode="numeric" placeholder="110000000" value={routing} onChange={(e) => setRouting(e.target.value.replace(/\D/g, '').slice(0, 9))} error={errors.routing} />
          <Input id="po-account" label="Account number" inputMode="numeric" placeholder="000123456789" value={account} onChange={(e) => setAccount(e.target.value.replace(/\D/g, '').slice(0, 17))} error={errors.account} />
        </div>
        <p className="flex items-center gap-1.5 text-xs text-slate-500"><LockIcon size={12} aria-hidden="true" /> Bank details are sent directly to Stripe and never stored on our servers.</p>
        <button type="submit" className="btn btn-primary btn-md"><BanknoteIcon size={16} aria-hidden="true" /> Update bank account</button>
      </form>
    </div>);

}
import React, { useState } from 'react';
import { BuildingIcon, CircleCheckIcon, LandmarkIcon, UserIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../ui/Button';
import { SelectField } from '../ui/SelectField';
import { TextField } from '../ui/TextField';
import { marketplaceFees } from '../../data/services';
import { cn } from '../../utils/cn';

export function PayoutSettings() {
  const [accountType, setAccountType] = useState<'individual' | 'company'>('individual');
  const [country, setCountry] = useState('US');
  const [holder, setHolder] = useState('');
  const [routing, setRouting] = useState('');
  const [account, setAccount] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [connected, setConnected] = useState<null | {last4: string;holder: string;}>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!holder.trim()) next.holder = 'Enter the account holder name.';
    if (routing.length !== 9) next.routing = 'Routing numbers are 9 digits.';
    if (account.length < 6) next.account = 'Enter a valid account number.';
    setErrors(next);
    if (Object.keys(next).length) return;
    setSaving(true);
    window.setTimeout(() => {
      setSaving(false);
      setConnected({ last4: account.slice(-4), holder: holder.trim() });
      toast.success('Payout details saved');
    }, 900);
  };

  if (connected) {
    return (
      <div className="space-y-5">
        <div className="flex items-start gap-4 rounded-2xl bg-accent-50 p-5">
          <CircleCheckIcon className="h-6 w-6 shrink-0 text-accent-700" aria-hidden="true" />
          <div>
            <p className="font-extrabold text-accent-900">Payouts enabled</p>
            <p className="mt-0.5 text-sm text-accent-800">Earnings are deposited 2 business days after each booking starts.</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-2xl border border-stone-200 bg-white p-5">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-stone-100 text-stone-600">
            <LandmarkIcon className="h-5 w-5" aria-hidden="true" />
          </span>
          <div className="flex-1">
            <p className="font-extrabold text-stone-900">Bank account •••• {connected.last4}</p>
            <p className="text-sm text-stone-500">{connected.holder}</p>
          </div>
          <Button variant="secondary" size="sm" onClick={() => setConnected(null)}>
            Replace
          </Button>
        </div>
      </div>);

  }

  return (
    <form onSubmit={submit} className="space-y-6" noValidate>
      <p className="rounded-2xl bg-primary-50 p-4 text-sm text-stone-700">
        Add a bank account to receive earnings from your bookings. A {marketplaceFees.providerCommissionPercent}% marketplace commission is deducted from each payout.
      </p>
      <fieldset>
        <legend className="mb-2 text-sm font-bold text-stone-800">Account type</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {[
          { value: 'individual' as const, label: 'Individual', icon: UserIcon },
          { value: 'company' as const, label: 'Company', icon: BuildingIcon }].
          map((o) =>
          <label
            key={o.value}
            className={cn(
              'flex cursor-pointer items-center gap-3 rounded-2xl border-2 px-4 py-3 font-extrabold transition-colors',
              accountType === o.value ? 'border-primary-500 bg-primary-50 text-stone-900' : 'border-stone-200 bg-white text-stone-600 hover:border-stone-300'
            )}>
            
              <input type="radio" name="account-type" className="sr-only" checked={accountType === o.value} onChange={() => setAccountType(o.value)} />
              <o.icon className="h-5 w-5" aria-hidden="true" />
              {o.label}
            </label>
          )}
        </div>
      </fieldset>
      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField
          id="payout-country"
          label="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          options={[
          { value: 'US', label: 'United States' },
          { value: 'CA', label: 'Canada' }]
          } />
        
        <TextField
          id="payout-holder"
          label={accountType === 'company' ? 'Company name' : 'Account holder name'}
          value={holder}
          onChange={(e) => setHolder(e.target.value)}
          error={errors.holder} />
        
        <TextField
          id="payout-routing"
          label="Routing number"
          inputMode="numeric"
          value={routing}
          onChange={(e) => setRouting(e.target.value.replace(/\D/g, '').slice(0, 9))}
          error={errors.routing}
          placeholder="110000000" />
        
        <TextField
          id="payout-account"
          label="Account number"
          inputMode="numeric"
          value={account}
          onChange={(e) => setAccount(e.target.value.replace(/\D/g, '').slice(0, 17))}
          error={errors.account}
          placeholder="000123456789" />
        
      </div>
      <Button type="submit" loading={saving}>
        Save payout details
      </Button>
    </form>);

}
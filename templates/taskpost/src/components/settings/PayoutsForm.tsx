import React, { useState } from 'react';
import { toast } from 'sonner';
import { BriefcaseIcon, CheckCircle2Icon, LandmarkIcon } from 'lucide-react';
import { Button } from '../ui/Button';
import { ChoiceCard } from '../ui/ChoiceCard';
import { EmptyState } from '../ui/EmptyState';
import { Field } from '../ui/Field';
import { brand } from '../../data/brand';
import { useApp } from '../../hooks/useApp';
import type { CurrentUser, PayoutDetails } from '../../types/marketplace';
import { cn, inputClass, inputErrorClass } from '../../utils/styles';

interface Errors {
  holder?: string;
  bankName?: string;
  routing?: string;
  account?: string;
}

export function PayoutsForm({ user }: {user: CurrentUser;}) {
  const { updatePayout, enableRole } = useApp();
  const [editing, setEditing] = useState(!user.payout);
  const [holder, setHolder] = useState(user.payout?.holder ?? user.name);
  const [bankName, setBankName] = useState(user.payout?.bankName ?? '');
  const [routing, setRouting] = useState('');
  const [account, setAccount] = useState('');
  const [schedule, setSchedule] = useState<PayoutDetails['schedule']>(user.payout?.schedule ?? 'weekly');
  const [errors, setErrors] = useState<Errors>({});
  const [saving, setSaving] = useState(false);

  if (!user.roles.includes('pro')) {
    return (
      <EmptyState
        icon={<BriefcaseIcon className="h-5 w-5" />}
        title="Payouts are for pros"
        description={`Add a pro profile to send offers on jobs and get paid through ${brand.name}.`}
        action={<Button onClick={() => enableRole('pro')}>Add pro profile</Button>} />);


  }

  if (!editing && user.payout) {
    return (
      <div className="space-y-5">
        <div className="flex items-start gap-4 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5">
          <CheckCircle2Icon className="h-6 w-6 shrink-0 text-emerald-600" aria-hidden="true" />
          <div className="flex-1">
            <p className="font-extrabold text-ink-900">Payouts enabled</p>
            <p className="mt-0.5 text-sm text-ink-700">
              {user.payout.bankName} ••••{user.payout.last4} · {user.payout.holder}
            </p>
            <p className="mt-0.5 text-sm text-ink-600">
              Paid out {user.payout.schedule === 'daily' ? 'daily' : 'every Monday'} · usually arrives in 1–2 business days
            </p>
          </div>
        </div>
        <Button variant="secondary" onClick={() => setEditing(true)}>
          Update bank account
        </Button>
      </div>);

  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const v: Errors = {};
    if (holder.trim().length < 2) v.holder = 'Enter the account holder’s name.';
    if (bankName.trim().length < 2) v.bankName = 'Enter your bank’s name.';
    if (!/^\d{9}$/.test(routing)) v.routing = 'Routing numbers are 9 digits.';
    if (!/^\d{4,17}$/.test(account)) v.account = 'Enter a valid account number.';
    setErrors(v);
    if (Object.keys(v).length) return;
    setSaving(true);
    setTimeout(() => {
      updatePayout({ holder: holder.trim(), bankName: bankName.trim(), last4: account.slice(-4), schedule });
      setSaving(false);
      setEditing(false);
      setRouting('');
      setAccount('');
      toast.success('Payout details saved.');
    }, 700);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="flex items-start gap-3 rounded-xl bg-ink-100 p-4 text-sm text-ink-700">
        <LandmarkIcon className="h-5 w-5 shrink-0 text-ink-500" aria-hidden="true" />
        <p>Payouts are sent to a US bank account after the customer confirms a job is complete. Bank details are encrypted and never shown to customers.</p>
      </div>
      <Field label="Account holder name" htmlFor="po-holder" error={errors.holder}>
        <input id="po-holder" value={holder} onChange={(e) => setHolder(e.target.value)} className={cn(inputClass, errors.holder && inputErrorClass)} />
      </Field>
      <Field label="Bank name" htmlFor="po-bank" error={errors.bankName}>
        <input id="po-bank" value={bankName} onChange={(e) => setBankName(e.target.value)} placeholder="e.g. Umpqua Bank" className={cn(inputClass, errors.bankName && inputErrorClass)} />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Routing number" htmlFor="po-routing" error={errors.routing}>
          <input id="po-routing" inputMode="numeric" value={routing} onChange={(e) => setRouting(e.target.value.replace(/\D/g, '').slice(0, 9))} placeholder="110000000" className={cn(inputClass, errors.routing && inputErrorClass)} />
        </Field>
        <Field label="Account number" htmlFor="po-account" error={errors.account}>
          <input id="po-account" inputMode="numeric" value={account} onChange={(e) => setAccount(e.target.value.replace(/\D/g, '').slice(0, 17))} placeholder="000123456789" className={cn(inputClass, errors.account && inputErrorClass)} />
        </Field>
      </div>
      <fieldset>
        <legend className="mb-2 text-sm font-bold text-ink-900">Payout schedule</legend>
        <div role="radiogroup" className="grid gap-3 sm:grid-cols-2">
          <ChoiceCard selected={schedule === 'weekly'} onSelect={() => setSchedule('weekly')} title="Weekly" description="Every Monday, all completed jobs" />
          <ChoiceCard selected={schedule === 'daily'} onSelect={() => setSchedule('daily')} title="Daily" description="Each business day" />
        </div>
      </fieldset>
      <div className="flex gap-3">
        <Button type="submit" loading={saving}>
          Save payout details
        </Button>
        {user.payout &&
        <Button variant="ghost" onClick={() => setEditing(false)}>
            Cancel
          </Button>
        }
      </div>
    </form>);

}
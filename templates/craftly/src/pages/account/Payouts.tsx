import React, { useState } from 'react';
import { toast } from 'sonner';
import { BanknoteIcon, CalendarClockIcon, LandmarkIcon } from 'lucide-react';
import { payouts } from '../../data/payouts';
import { useAuth } from '../../contexts/AuthContext';
import { SettingsHeader } from '../../components/account/SettingsHeader';
import { Button } from '../../components/ui/Button';
import { TextField } from '../../components/ui/TextField';
import { formatDate, formatPrice } from '../../utils/format';

export function Payouts() {
  const { user, updateUser } = useAuth();
  const payout = user?.payout;
  const [editing, setEditing] = useState(!payout?.connected);
  const [holder, setHolder] = useState(payout?.accountHolder ?? '');
  const [routing, setRouting] = useState('');
  const [account, setAccount] = useState('');
  const [errors, setErrors] = useState<{holder?: string;routing?: string;account?: string;}>({});
  const [saving, setSaving] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: typeof errors = {};
    if (!holder.trim()) errs.holder = 'Enter the account holder’s name';
    if (!/^\d{9}$/.test(routing)) errs.routing = 'Routing numbers are 9 digits';
    if (!/^\d{6,17}$/.test(account)) errs.account = 'Enter a valid account number';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    updateUser({ payout: { accountHolder: holder.trim(), bankLast4: account.slice(-4), connected: true } });
    setSaving(false);
    setEditing(false);
    setRouting('');
    setAccount('');
    toast.success('Bank account connected');
  };

  return (
    <div>
      <SettingsHeader title="Payouts" description="Where we send your earnings. Payouts go out every Monday for orders marked received." />

      {!editing && payout?.connected ?
      <div className="flex flex-col gap-4 rounded-2xl border border-line p-5 sm:flex-row sm:items-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft text-accent-ink">
            <LandmarkIcon className="h-5 w-5" aria-hidden />
          </span>
          <div className="flex-1">
            <p className="font-medium">Checking •••• {payout.bankLast4}</p>
            <p className="text-sm text-muted">{payout.accountHolder}</p>
          </div>
          <span className="w-fit rounded-full bg-success/10 px-2.5 py-1 text-xs font-semibold text-success">Connected</span>
          <Button variant="secondary" size="sm" onClick={() => setEditing(true)}>Change</Button>
        </div> :

      <form onSubmit={submit} noValidate className="max-w-md space-y-5">
          <TextField label="Account holder name" value={holder} onChange={(e) => setHolder(e.target.value)} error={errors.holder} />
          <TextField label="Routing number" inputMode="numeric" value={routing} onChange={(e) => setRouting(e.target.value.replace(/\D/g, '').slice(0, 9))} error={errors.routing} placeholder="110000000" />
          <TextField label="Account number" inputMode="numeric" value={account} onChange={(e) => setAccount(e.target.value.replace(/\D/g, '').slice(0, 17))} error={errors.account} placeholder="000123456789" hint="Bank details are encrypted and stored by our payments partner, Stripe." />
          <div className="flex gap-3">
            {payout?.connected && <Button variant="secondary" onClick={() => setEditing(false)}>Cancel</Button>}
            <Button type="submit" loading={saving}>Save bank account</Button>
          </div>
        </form>
      }

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-subtle p-5">
          <BanknoteIcon className="h-5 w-5 text-accent-ink" aria-hidden />
          <p className="mt-3 text-xs text-muted">Pending balance</p>
          <p className="text-2xl font-semibold">{formatPrice(164.2)}</p>
        </div>
        <div className="rounded-2xl bg-subtle p-5">
          <CalendarClockIcon className="h-5 w-5 text-accent-ink" aria-hidden />
          <p className="mt-3 text-xs text-muted">Next payout</p>
          <p className="text-2xl font-semibold">Mon, Oct 5</p>
        </div>
      </div>

      <h3 className="mt-10 font-sans text-sm font-semibold">Recent payouts</h3>
      <div className="mt-3 overflow-x-auto rounded-2xl border border-line">
        <table className="w-full min-w-[420px] text-left text-sm">
          <thead className="bg-subtle text-xs text-muted">
            <tr>
              <th scope="col" className="px-4 py-3 font-medium">Date</th>
              <th scope="col" className="px-4 py-3 font-medium">Orders</th>
              <th scope="col" className="px-4 py-3 font-medium">Status</th>
              <th scope="col" className="px-4 py-3 text-right font-medium">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {payouts.map((p) =>
            <tr key={p.id} className="hover:bg-subtle/50">
                <td className="px-4 py-3">{formatDate(p.date)}</td>
                <td className="px-4 py-3 text-muted">{p.orders}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${p.status === 'Paid' ? 'bg-success/10 text-success' : 'bg-info/10 text-info'}`}>{p.status}</span>
                </td>
                <td className="px-4 py-3 text-right font-medium">{formatPrice(p.amount)}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>);

}
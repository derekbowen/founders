import React, { useState } from 'react';
import { BanknoteIcon, CheckCircle2Icon } from 'lucide-react';
import { Button } from '../ui/Button';
import { TextField } from '../ui/TextField';
import { SelectField } from '../ui/SelectField';
import { useToast } from '../ToastProvider';
import { formatMoney } from '../../utils/format';

const payoutHistory = [
{ id: 'po-1', date: 'Sep 26, 2026', amount: 1235, status: 'Paid' },
{ id: 'po-2', date: 'Sep 12, 2026', amount: 855, status: 'Paid' },
{ id: 'po-3', date: 'Aug 29, 2026', amount: 2470, status: 'Paid' }];


const schedules = [
{ value: 'weekly', label: 'Weekly', text: 'Every Friday' },
{ value: 'biweekly', label: 'Every two weeks', text: 'Every other Friday' },
{ value: 'monthly', label: 'Monthly', text: 'Last business day' }];


export function PayoutsForm() {
  const { addToast } = useToast();
  const [editing, setEditing] = useState(false);
  const [holder, setHolder] = useState('Jordan Lee');
  const [country, setCountry] = useState('US');
  const [routing, setRouting] = useState('');
  const [account, setAccount] = useState('');
  const [schedule, setSchedule] = useState('weekly');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [last4, setLast4] = useState('6789');

  const saveBank = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!holder.trim()) next.holder = 'Enter the account holder name.';
    if (!/^\d{9}$/.test(routing)) next.routing = 'Routing number must be 9 digits.';
    if (!/^\d{6,17}$/.test(account)) next.account = 'Account number must be 6–17 digits.';
    setErrors(next);
    if (Object.keys(next).length) return;
    setSaving(true);
    window.setTimeout(() => {
      setSaving(false);
      setEditing(false);
      setLast4(account.slice(-4));
      setRouting('');
      setAccount('');
      addToast({ type: 'success', message: 'Bank account updated' });
    }, 800);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-start gap-3 rounded-xl border border-accent-200 bg-accent-50 p-4">
        <CheckCircle2Icon className="mt-0.5 h-5 w-5 shrink-0 text-accent-700" aria-hidden="true" />
        <div>
          <p className="text-sm font-semibold text-accent-900">Payouts are enabled</p>
          <p className="text-sm text-accent-800">Earnings are released to your bank after clients approve deliveries.</p>
        </div>
      </div>

      <section aria-labelledby="bank-heading">
        <h3 id="bank-heading" className="text-sm font-bold text-slate-900">Bank account</h3>
        {!editing ?
        <div className="mt-3 flex items-center gap-4 rounded-xl border border-slate-200 p-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
              <BanknoteIcon className="h-5 w-5" aria-hidden="true" />
            </span>
            <div className="flex-1">
              <p className="text-sm font-semibold text-slate-900">Chase Bank •••• {last4}</p>
              <p className="text-xs text-slate-500">{holder} · USD · Checking</p>
            </div>
            <Button variant="secondary" size="sm" onClick={() => setEditing(true)}>Replace</Button>
          </div> :

        <form onSubmit={saveBank} noValidate className="mt-3 space-y-4 rounded-xl border border-slate-200 p-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField label="Account holder" value={holder} onChange={(e) => setHolder(e.target.value)} error={errors.holder} />
              <SelectField label="Country" value={country} onChange={(e) => setCountry(e.target.value)} options={[{ value: 'US', label: 'United States' }, { value: 'CA', label: 'Canada' }, { value: 'GB', label: 'United Kingdom' }]} />
              <TextField label="Routing number" inputMode="numeric" placeholder="110000000" value={routing} onChange={(e) => setRouting(e.target.value.replace(/\D/g, '').slice(0, 9))} error={errors.routing} />
              <TextField label="Account number" inputMode="numeric" placeholder="000123456789" value={account} onChange={(e) => setAccount(e.target.value.replace(/\D/g, '').slice(0, 17))} error={errors.account} />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={() => {setEditing(false);setErrors({});}}>Cancel</Button>
              <Button type="submit" loading={saving}>Save bank account</Button>
            </div>
          </form>
        }
      </section>

      <fieldset>
        <legend className="text-sm font-bold text-slate-900">Payout schedule</legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {schedules.map((s) =>
          <label key={s.value} className={`cursor-pointer rounded-xl border p-3 transition-colors focus-within:ring-2 focus-within:ring-primary-500 ${schedule === s.value ? 'border-primary-500 bg-primary-50' : 'border-slate-200 hover:border-slate-300'}`}>
              <input
              type="radio"
              name="schedule"
              className="sr-only"
              checked={schedule === s.value}
              onChange={() => {
                setSchedule(s.value);
                addToast({ type: 'success', message: `Payout schedule set to ${s.label.toLowerCase()}` });
              }} />
            
              <span className="block text-sm font-semibold text-slate-900">{s.label}</span>
              <span className="block text-xs text-slate-500">{s.text}</span>
            </label>
          )}
        </div>
      </fieldset>

      <section aria-labelledby="history-heading">
        <h3 id="history-heading" className="text-sm font-bold text-slate-900">Recent payouts</h3>
        <div className="mt-3 overflow-hidden rounded-xl border border-slate-200">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              <tr>
                <th scope="col" className="px-4 py-2.5">Date</th>
                <th scope="col" className="px-4 py-2.5">Status</th>
                <th scope="col" className="px-4 py-2.5 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {payoutHistory.map((p) =>
              <tr key={p.id}>
                  <td className="px-4 py-3 text-slate-700">{p.date}</td>
                  <td className="px-4 py-3"><span className="rounded-full bg-accent-50 px-2 py-0.5 text-xs font-semibold text-accent-800">{p.status}</span></td>
                  <td className="px-4 py-3 text-right font-semibold text-slate-900">{formatMoney(p.amount)}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>);

}
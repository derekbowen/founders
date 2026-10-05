import React, { useState } from 'react';
import { BanknoteIcon, CheckCircle2Icon } from 'lucide-react';
import { Input } from '../Input';
import { Button } from '../Button';
import { useToast } from '../ToastProvider';
import { useStore } from '../../contexts/StoreContext';
import { brand } from '../../data/brand';
import { formatDate, formatMoneyExact } from '../../utils/format';

const payoutHistory = [
{ id: 'po_31', date: '2026-09-28', amount: 412.2, status: 'Paid' },
{ id: 'po_30', date: '2026-09-21', amount: 386.4, status: 'Paid' },
{ id: 'po_29', date: '2026-09-14', amount: 501.3, status: 'Paid' }];


export function PayoutsPanel() {
  const { orders } = useStore();
  const { addToast } = useToast();
  const [holder, setHolder] = useState('Mara Okafor');
  const [iban, setIban] = useState('GB29 NWBK 6016 1331 9268 19');
  const [schedule, setSchedule] = useState<'weekly' | 'monthly'>('weekly');
  const [saving, setSaving] = useState(false);

  const pending = orders.
  filter((o) => o.role === 'seller' && o.status !== 'refunded').
  reduce((sum, o) => sum + o.amount * (1 - brand.commissionRate), 0);

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    window.setTimeout(() => {
      setSaving(false);
      addToast({ type: 'success', message: 'Payout details saved' });
    }, 700);
  };

  return (
    <div className="space-y-8">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-ink bg-brand p-5">
          <p className="text-xs font-semibold uppercase tracking-wider">Available for next payout</p>
          <p className="mt-1 font-display text-3xl font-bold">{formatMoneyExact(pending)}</p>
          <p className="mt-1 text-sm">Scheduled for Monday, Oct 5</p>
        </div>
        <div className="flex items-start gap-3 rounded-xl border border-ink p-5">
          <CheckCircle2Icon className="mt-0.5 h-5 w-5 text-success" aria-hidden="true" />
          <div>
            <p className="font-semibold">Payouts enabled</p>
            <p className="text-sm text-muted">Identity verified. Funds arrive 2–3 business days after payout.</p>
          </div>
        </div>
      </div>

      <form onSubmit={save} className="space-y-5">
        <h3 className="flex items-center gap-2 font-display text-lg font-bold">
          <BanknoteIcon className="h-5 w-5" aria-hidden="true" />
          Bank account
        </h3>
        <Input id="po-holder" label="Account holder" value={holder} onChange={(e) => setHolder(e.target.value)} />
        <Input id="po-iban" label="IBAN / account number" value={iban} onChange={(e) => setIban(e.target.value)} helperText="Stored securely by our payment partner." />
        <fieldset>
          <legend className="label">Payout schedule</legend>
          <div className="grid grid-cols-2 gap-2">
            {(['weekly', 'monthly'] as const).map((opt) =>
            <label key={opt} className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2.5 text-sm font-semibold capitalize transition ${schedule === opt ? 'border-ink bg-brand-soft' : 'border-ink/20 hover:border-ink'}`}>
                <input type="radio" name="schedule" checked={schedule === opt} onChange={() => setSchedule(opt)} className="accent-ink" />
                {opt}
              </label>
            )}
          </div>
        </fieldset>
        <div className="flex justify-end border-t border-line pt-5">
          <Button type="submit" loading={saving}>
            Save payout details
          </Button>
        </div>
      </form>

      <div>
        <h3 className="mb-3 font-display text-lg font-bold">Recent payouts</h3>
        <div className="overflow-hidden rounded-xl border border-ink">
          <table className="w-full text-sm">
            <thead className="bg-paper text-left">
              <tr>
                <th scope="col" className="px-4 py-2.5 font-semibold">Date</th>
                <th scope="col" className="px-4 py-2.5 font-semibold">Reference</th>
                <th scope="col" className="px-4 py-2.5 text-right font-semibold">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {payoutHistory.map((p) =>
              <tr key={p.id}>
                  <td className="px-4 py-3">{formatDate(p.date)}</td>
                  <td className="px-4 py-3 text-muted">{p.id}</td>
                  <td className="px-4 py-3 text-right font-semibold">{formatMoneyExact(p.amount)}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>);

}
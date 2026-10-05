import React, { useState } from 'react';
import { BadgeCheckIcon, LandmarkIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Input } from '../Input';
import { BrandButton } from '../ui/BrandButton';
import { SelectField } from '../ui/SelectField';
import { brand } from '../../data/brand';

const recentPayouts = [
{ id: 'po_1', date: 'Sep 29, 2026', orders: 3, amount: '$1,284.60', status: 'Paid' },
{ id: 'po_2', date: 'Sep 22, 2026', orders: 5, amount: '$2,016.35', status: 'Paid' },
{ id: 'po_3', date: 'Sep 15, 2026', orders: 2, amount: '$642.90', status: 'Paid' }];


export function PayoutSettings() {
  const [editing, setEditing] = useState(false);
  const [schedule, setSchedule] = useState('weekly');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">Payouts</h2>
        <p className="mt-1 text-sm text-slate-600">
          Where we send money from your sales. Payouts release 2 days after delivery, less the {brand.sellerCommission} commission.
        </p>
      </div>

      <div className="flex items-center gap-3 rounded-lg border border-accent-300 bg-accent-50 p-4">
        <BadgeCheckIcon className="h-5 w-5 shrink-0 text-accent-800" aria-hidden="true" />
        <div className="text-sm">
          <p className="font-semibold text-slate-900">Payouts enabled</p>
          <p className="text-slate-600">Identity and business verified for Fern & Field Provisions LLC.</p>
        </div>
      </div>

      <section className="rounded-xl border border-slate-200 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-700">
              <LandmarkIcon className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-semibold text-slate-900">Chase Business Checking</p>
              <p className="font-mono text-xs text-slate-500">•••• •••• 4821 · Routing ••••0021</p>
            </div>
          </div>
          <BrandButton variant="secondary" size="sm" onClick={() => setEditing((e) => !e)}>
            {editing ? 'Cancel' : 'Change account'}
          </BrandButton>
        </div>
        {editing &&
        <form
          className="mt-4 grid gap-4 border-t border-slate-100 pt-4 sm:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            setEditing(false);
            toast.success('Bank account updated', { description: 'We’ll send two micro-deposits to verify it.' });
          }}>
          
            <Input id="acct-holder" label="Account holder" defaultValue="Fern & Field Provisions LLC" />
            <SelectField id="acct-type" label="Account type" options={[{ value: 'checking', label: 'Business checking' }, { value: 'savings', label: 'Business savings' }]} />
            <Input id="acct-routing" label="Routing number" inputMode="numeric" placeholder="9 digits" />
            <Input id="acct-number" label="Account number" inputMode="numeric" placeholder="Account number" />
            <div className="sm:col-span-2 flex justify-end">
              <BrandButton type="submit">Save bank account</BrandButton>
            </div>
          </form>
        }
      </section>

      <div className="max-w-xs">
        <SelectField
          id="payout-schedule"
          label="Payout schedule"
          value={schedule}
          onChange={(e) => {
            setSchedule(e.target.value);
            toast.success('Payout schedule updated');
          }}
          options={[
          { value: 'daily', label: 'Daily (as orders release)' },
          { value: 'weekly', label: 'Weekly on Mondays' },
          { value: 'monthly', label: 'Monthly on the 1st' }]
          } />
        
      </div>

      <section>
        <h3 className="mb-2 text-sm font-semibold text-slate-900">Recent payouts</h3>
        <div className="overflow-hidden rounded-lg border border-slate-200">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th scope="col" className="px-3 py-2 text-left font-semibold">Date</th>
                <th scope="col" className="px-3 py-2 text-left font-semibold">Orders</th>
                <th scope="col" className="px-3 py-2 text-right font-semibold">Amount</th>
                <th scope="col" className="px-3 py-2 text-right font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentPayouts.map((p) =>
              <tr key={p.id}>
                  <td className="px-3 py-2.5 text-slate-800">{p.date}</td>
                  <td className="px-3 py-2.5 tabular-nums text-slate-600">{p.orders}</td>
                  <td className="px-3 py-2.5 text-right font-semibold tabular-nums text-slate-900">{p.amount}</td>
                  <td className="px-3 py-2.5 text-right">
                    <span className="rounded-full bg-accent-100 px-2 py-0.5 text-xs font-semibold text-accent-900">{p.status}</span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>);

}
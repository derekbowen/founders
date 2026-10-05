import React, { useState } from 'react';
import { BanknoteIcon, CheckCircle2Icon } from 'lucide-react';
import { Input } from '../Input';
import { brand } from '../../data/brand';
import { formatMoney } from '../../utils/format';
import { SaveBar, useSaveState } from './SaveBar';

const payouts = [
{ id: 'po-31', date: 'Sep 28, 2026', amount: 118, listing: 'Feather-Trim Cocktail Mini' },
{ id: 'po-30', date: 'Sep 14, 2026', amount: 50, listing: 'Guipure Lace Bow Mini' },
{ id: 'po-29', date: 'Aug 30, 2026', amount: 72, listing: 'Ruched One-Sleeve Mini' }];


export function PayoutSettings() {
  const [form, setForm] = useState({ holder: 'Olivia Hart', routing: '021000021', account: '' });
  const { saving, saved, save } = useSaveState();
  const connected = form.account.length >= 4;

  return (
    <div className="space-y-10">
      <div className="grid gap-4 sm:grid-cols-3">
        {[
        ['Available', formatMoney(118)],
        ['Pending', formatMoney(92)],
        ['Earned in 2026', formatMoney(2840)]].
        map(([k, v]) =>
        <div key={k} className="border border-line p-5">
            <p className="text-[11px] uppercase tracking-eyebrow text-muted">{k}</p>
            <p className="mt-2 font-display text-3xl">{v}</p>
          </div>
        )}
      </div>

      <form
        className="space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          save();
        }}>
        
        <div className="flex items-center gap-3">
          <BanknoteIcon size={18} className="text-accent-dark" aria-hidden="true" />
          <h3 className="font-display text-2xl">Bank account</h3>
          {connected &&
          <span className="ml-auto flex items-center gap-1 text-xs text-[#2f5a3f]">
              <CheckCircle2Icon size={14} aria-hidden="true" /> Ready for payouts
            </span>
          }
        </div>
        <Input id="po-holder" label="Account holder name" value={form.holder} onChange={(e) => setForm({ ...form, holder: e.target.value })} />
        <div className="grid gap-5 sm:grid-cols-2">
          <Input id="po-routing" label="Routing number" inputMode="numeric" value={form.routing} onChange={(e) => setForm({ ...form, routing: e.target.value.replace(/\D/g, '').slice(0, 9) })} />
          <Input id="po-account" label="Account number" inputMode="numeric" placeholder="••••••••" value={form.account} onChange={(e) => setForm({ ...form, account: e.target.value.replace(/\D/g, '').slice(0, 17) })} />
        </div>
        <p className="text-xs text-muted">
          Payouts are sent 2 days after a rental is completed, minus the {Math.round(brand.fees.lenderCommissionRate * 100)}% {brand.name} commission. Processed by Stripe Connect.
        </p>
        <SaveBar saving={saving} saved={saved} label="Save payout details" />
      </form>

      <section>
        <h3 className="font-display text-2xl">Recent payouts</h3>
        <ul className="mt-4 divide-y divide-line border-y border-line">
          {payouts.map((p) =>
          <li key={p.id} className="flex items-center justify-between py-4 text-sm">
              <div>
                <p className="text-ink">{p.listing}</p>
                <p className="text-xs text-muted">{p.date}</p>
              </div>
              <p className="font-medium">{formatMoney(p.amount)}</p>
            </li>
          )}
        </ul>
      </section>
    </div>);

}
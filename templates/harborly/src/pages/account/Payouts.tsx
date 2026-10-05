import React, { useState } from 'react';
import { LandmarkIcon, CheckCircle2Icon } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../../components/ui/Button';
import { Field } from '../../components/ui/Field';
import { useMarketplace } from '../../contexts/MarketplaceContext';
import { formatMoney, getPriceBreakdown } from '../../utils/pricing';
import { formatDate } from '../../utils/format';
import { cn, inputClass } from '../../utils/ui';

export function Payouts() {
  const { transactions, currentUser, getListing } = useMarketplace();
  const [account, setAccount] = useState<{holder: string;last4: string;} | null>({ holder: 'Jordan Ellis', last4: '6789' });
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ holder: '', routing: '', number: '' });
  const [errors, setErrors] = useState<Partial<Record<keyof typeof form, string>>>({});

  const payouts = transactions.
  filter((t) => t.providerId === currentUser.id && t.status === 'completed').
  map((t) => {
    const l = getListing(t.listingId);
    return { id: t.id, date: t.tripDate, title: l?.title ?? '', amount: l ? Math.round(getPriceBreakdown(l, t.pkg, t.withCaptain).subtotal * 0.92) : 0 };
  });
  const upcoming = transactions.
  filter((t) => t.providerId === currentUser.id && (t.status === 'confirmed' || t.status === 'on-the-water')).
  reduce((sum, t) => {
    const l = getListing(t.listingId);
    return sum + (l ? Math.round(getPriceBreakdown(l, t.pkg, t.withCaptain).subtotal * 0.92) : 0);
  }, 0);

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: typeof errors = {};
    if (!form.holder.trim()) errs.holder = 'Required.';
    if (!/^\d{9}$/.test(form.routing)) errs.routing = 'Routing numbers are 9 digits.';
    if (!/^\d{6,17}$/.test(form.number)) errs.number = 'Enter 6–17 digits.';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setAccount({ holder: form.holder, last4: form.number.slice(-4) });
    setEditing(false);
    setForm({ holder: '', routing: '', number: '' });
    toast.success('Payout account saved');
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-heading text-2xl text-navy">Payouts</h2>
        <p className="mt-1 text-sm text-muted">Earnings from your listings are deposited 24 hours after each completed trip.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-navy p-5 text-white">
          <p className="text-xs uppercase tracking-[0.14em] text-sand">Upcoming payouts</p>
          <p className="mt-2 font-heading text-3xl">{formatMoney(upcoming)}</p>
        </div>
        <div className="rounded-2xl border border-line p-5">
          <p className="text-xs uppercase tracking-[0.14em] text-muted">Paid out this year</p>
          <p className="mt-2 font-heading text-3xl text-navy">{formatMoney(payouts.reduce((s, p) => s + p.amount, 0))}</p>
        </div>
      </div>

      <section className="rounded-2xl border border-line p-5 sm:p-6" aria-labelledby="bank-heading">
        <h3 id="bank-heading" className="font-semibold text-ink">
          Bank account
        </h3>
        {account && !editing ?
        <div className="mt-4 flex flex-wrap items-center gap-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sand-light text-navy">
              <LandmarkIcon className="h-5 w-5" aria-hidden="true" />
            </span>
            <div className="text-sm">
              <p className="font-medium text-ink">Checking •••• {account.last4}</p>
              <p className="flex items-center gap-1 text-success">
                <CheckCircle2Icon className="h-3.5 w-3.5" aria-hidden="true" /> Verified · {account.holder}
              </p>
            </div>
            <Button variant="outline" size="sm" className="ml-auto" onClick={() => setEditing(true)}>
              Replace
            </Button>
          </div> :

        <form onSubmit={save} noValidate className="mt-4 space-y-4">
            <Field label="Account holder name" htmlFor="b-holder" error={errors.holder}>
              <input id="b-holder" value={form.holder} onChange={(e) => setForm({ ...form, holder: e.target.value })} className={cn(inputClass, errors.holder && 'border-danger')} />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Routing number" htmlFor="b-routing" error={errors.routing}>
                <input id="b-routing" inputMode="numeric" value={form.routing} onChange={(e) => setForm({ ...form, routing: e.target.value.replace(/\D/g, '') })} className={cn(inputClass, errors.routing && 'border-danger')} />
              </Field>
              <Field label="Account number" htmlFor="b-number" error={errors.number}>
                <input id="b-number" inputMode="numeric" value={form.number} onChange={(e) => setForm({ ...form, number: e.target.value.replace(/\D/g, '') })} className={cn(inputClass, errors.number && 'border-danger')} />
              </Field>
            </div>
            <div className="flex justify-end gap-2">
              {account &&
            <Button variant="ghost" onClick={() => setEditing(false)}>
                  Cancel
                </Button>
            }
              <Button type="submit">Save bank account</Button>
            </div>
          </form>
        }
      </section>

      <section aria-labelledby="history-heading">
        <h3 id="history-heading" className="font-semibold text-ink">
          Payout history
        </h3>
        {payouts.length === 0 ?
        <p className="mt-3 rounded-2xl border border-dashed border-line p-6 text-center text-sm text-muted">No payouts yet. They’ll appear here after your first completed trip.</p> :

        <ul className="mt-3 divide-y divide-line rounded-2xl border border-line">
            {payouts.map((p) =>
          <li key={p.id} className="flex items-center justify-between gap-4 px-5 py-4 text-sm">
                <div>
                  <p className="font-medium text-ink">{p.title}</p>
                  <p className="text-muted">{formatDate(p.date)}</p>
                </div>
                <span className="font-semibold text-success">+{formatMoney(p.amount)}</span>
              </li>
          )}
          </ul>
        }
      </section>
    </div>);

}
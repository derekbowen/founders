import React, { useState } from 'react';
import { BanknoteIcon, CheckCircle2Icon, LandmarkIcon } from 'lucide-react';
import { Input } from '../../components/Input';
import { SettingsCard } from '../../components/account/SettingsCard';
import { BrandButton } from '../../components/ui/BrandButton';
import { SegmentedControl } from '../../components/ui/SegmentedControl';
import { formatMoney } from '../../utils/format';

const recent = [
{ id: 'po-311', date: '29 Sep 2026', amount: 412.2, status: 'Paid' },
{ id: 'po-298', date: '22 Sep 2026', amount: 286.5, status: 'Paid' },
{ id: 'po-284', date: '15 Sep 2026', amount: 344.0, status: 'Paid' }];


export function AccountPayouts() {
  const [accountType, setAccountType] = useState<'individual' | 'company'>('company');
  const [country, setCountry] = useState('GB');
  const [holder, setHolder] = useState('Lindqvist Studio Ltd');
  const [iban, setIban] = useState('');
  const [connected, setConnected] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!holder.trim()) errs.holder = 'Required.';
    if (iban.replace(/\s/g, '').length < 15) errs.iban = 'Enter a valid IBAN, e.g. GB33 BUKB 2020 1555 5555 55.';
    setErrors(errs);
    setSaved(false);
    if (Object.keys(errs).length) return;
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      setConnected(true);
      setSaved(true);
      setIban('');
    }, 800);
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-line bg-white p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-700">
              <BanknoteIcon size={20} aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm text-ink-muted">Available for payout</p>
              <p className="font-display text-2xl font-semibold">{formatMoney(298.8)}</p>
            </div>
          </div>
          <p className="text-sm text-ink-muted">Next payout <strong className="text-ink">Mon 6 Oct</strong> · weekly</p>
        </div>
        {connected ?
        <p className="mt-5 flex items-center gap-2 rounded-lg bg-brand-50 px-3 py-2.5 text-sm text-brand-800">
            <CheckCircle2Icon size={16} aria-hidden="true" /> Payouts active to bank account ending •••• 5555
          </p> :

        <p className="mt-5 rounded-lg bg-amber-50 px-3 py-2.5 text-sm text-amber-800">Add a bank account to receive payouts.</p>
        }
        <table className="mt-6 w-full text-sm">
          <caption className="mb-2 text-left text-sm font-semibold">Recent payouts</caption>
          <thead className="sr-only">
            <tr><th>Date</th><th>Reference</th><th>Amount</th><th>Status</th></tr>
          </thead>
          <tbody className="divide-y divide-line">
            {recent.map((p) =>
            <tr key={p.id}>
                <td className="py-2.5 text-ink-muted">{p.date}</td>
                <td className="py-2.5 text-ink-subtle">{p.id}</td>
                <td className="py-2.5 text-right font-semibold tabular-nums">{formatMoney(p.amount)}</td>
                <td className="py-2.5 pl-4 text-right text-brand-700">{p.status}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <SettingsCard
        title="Payout details"
        description="Payments are processed by Stripe. Earnings are sent weekly, minus the 10% host commission."
        onSubmit={onSubmit}
        saved={saved}
        footer={
        <BrandButton type="submit" loading={loading} leftIcon={<LandmarkIcon size={16} aria-hidden="true" />}>
            {connected ? 'Update bank account' : 'Connect bank account'}
          </BrandButton>
        }>
        
        <div>
          <p className="field-label">Account type</p>
          <SegmentedControl
            label="Account type"
            value={accountType}
            onChange={setAccountType}
            options={[
            { value: 'individual', label: 'Individual' },
            { value: 'company', label: 'Company' }]
            } />
          
        </div>
        <div>
          <label htmlFor="payout-country" className="field-label">Country</label>
          <select id="payout-country" value={country} onChange={(e) => setCountry(e.target.value)} className="field">
            <option value="GB">United Kingdom</option>
            <option value="DE">Germany</option>
            <option value="NL">Netherlands</option>
            <option value="PT">Portugal</option>
            <option value="US">United States</option>
          </select>
        </div>
        <Input id="payout-holder" label={accountType === 'company' ? 'Registered company name' : 'Account holder name'} value={holder} error={errors.holder} onChange={(e) => setHolder(e.target.value)} />
        <Input id="payout-iban" label="IBAN" value={iban} error={errors.iban} onChange={(e) => setIban(e.target.value.toUpperCase())} placeholder="GB33 BUKB 2020 1555 5555 55" helperText="Your bank details are stored securely by Stripe." />
      </SettingsCard>
    </div>);

}
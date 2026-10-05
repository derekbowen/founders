import React, { useState } from 'react';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Toggle } from '../../components/Toggle';
import { useToast } from '../../components/ToastProvider';
import { useMarketplace } from '../../contexts/MarketplaceContext';
import { ui } from '../../utils/styles';

export function ContactSettings() {
  const { user, updateUser } = useMarketplace();
  const { addToast } = useToast();
  const [form, setForm] = useState({ name: user?.name ?? '', email: user?.email ?? '', phone: user?.phone ?? '' });
  const [notify, setNotify] = useState({ email: true, sms: true, marketing: false });
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const dirty = form.name !== user?.name || form.email !== user?.email || form.phone !== user?.phone;

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return setError('Enter a valid email');
    setError('');
    setSaving(true);
    setTimeout(() => {
      updateUser(form);
      setSaving(false);
      addToast({ type: 'success', message: 'Contact details saved' });
    }, 500);
  };

  return (
    <form onSubmit={save} className="max-w-xl space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-stone-900">Contact details</h2>
        <p className="mt-1 text-sm text-stone-600">Hosts and storers see your phone number only after a booking is accepted.</p>
      </div>
      <Input id="c-name" label="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <Input id="c-email" label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} error={error} helperText="Verified" />
      <Input id="c-phone" label="Phone number" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
      <fieldset>
        <legend className="mb-3 text-sm font-semibold text-stone-900">Notifications</legend>
        <div className="divide-y divide-stone-100 rounded-xl border border-stone-200">
          {(
          [
          ['email', 'Booking updates by email'],
          ['sms', 'Access reminders by SMS'],
          ['marketing', 'Tips and offers']] as
          const).
          map(([k, label]) =>
          <div key={k} className="flex items-center justify-between px-4 py-3">
              <span className="text-sm text-stone-800">{label}</span>
              <Toggle size="small" checked={notify[k]} onChange={(c) => setNotify({ ...notify, [k]: c })} aria-label={label} />
            </div>
          )}
        </div>
      </fieldset>
      <Button type="submit" loading={saving} disabled={!dirty} className={ui.btnBrand}>Save changes</Button>
    </form>);

}
import React, { useState } from 'react';
import { Input } from '../Input';
import { Toggle } from '../Toggle';
import { useToast } from '../ToastProvider';
import { currentUser } from '../../data/currentUser';

export function ContactForm() {
  const { addToast } = useToast();
  const [email, setEmail] = useState(currentUser.email);
  const [phone, setPhone] = useState(currentUser.phone);
  const [sms, setSms] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const dirty = email !== currentUser.email || phone !== currentUser.phone;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Enter a valid email address.');
      return;
    }
    setError('');
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      addToast({ type: 'success', message: 'Contact details saved' });
    }, 700);
  };

  return (
    <form onSubmit={submit} noValidate className="space-y-5">
      <Input id="acc-email" type="email" label="Email address" value={email} error={error} helperText="We’ll send booking updates and receipts here." onChange={(e) => setEmail(e.target.value)} />
      <Input id="acc-phone" type="tel" label="Phone number" value={phone} helperText="Only shared with your sitter or owner after a booking is confirmed." onChange={(e) => setPhone(e.target.value)} />
      <div className="flex items-center justify-between gap-4 rounded-2xl border border-ink-200 px-4 py-3">
        <div>
          <p className="text-sm font-bold text-ink-900">Text me booking updates</p>
          <p className="text-xs text-ink-600">New requests, confirmations and photo updates</p>
        </div>
        <Toggle checked={sms} onChange={setSms} aria-label="SMS updates" />
      </div>
      <button type="submit" disabled={saving || !dirty && !error} className="btn btn-md btn-primary">
        {saving ? 'Saving…' : 'Save changes'}
      </button>
    </form>);

}
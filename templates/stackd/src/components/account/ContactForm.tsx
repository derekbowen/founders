import React, { useState } from 'react';
import { Input } from '../Input';
import { Button } from '../Button';
import { Avatar } from '../Avatar';
import { useToast } from '../ToastProvider';
import { useStore } from '../../contexts/StoreContext';

export function ContactForm() {
  const { user, updateUser } = useStore();
  const { addToast } = useToast();
  const [name, setName] = useState(user?.name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [phone, setPhone] = useState('+44 20 7946 0958');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string>();

  if (!user) return null;
  const dirty = name !== user.name || email !== user.email;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Enter a valid email address.');
      return;
    }
    setError(undefined);
    setSaving(true);
    window.setTimeout(() => {
      updateUser({ name, email });
      setSaving(false);
      addToast({ type: 'success', message: 'Contact details saved' });
    }, 600);
  };

  return (
    <form onSubmit={submit} noValidate className="space-y-6">
      <div className="flex items-center gap-4">
        <Avatar name={user.name} alt={user.name} src={user.avatar} size="xl" hasBorder />
        <div>
          <p className="font-semibold">Profile photo</p>
          <p className="text-sm text-muted">Shown on your shop and in messages.</p>
          <button type="button" className="mt-2 text-sm font-semibold text-brand-ink hover:underline">
            Change photo
          </button>
        </div>
      </div>
      <Input id="acc-name" label="Display name" value={name} onChange={(e) => setName(e.target.value)} />
      <Input id="acc-email" type="email" label="Email address" helperText="Receipts and sale notifications are sent here." value={email} error={error} onChange={(e) => setEmail(e.target.value)} />
      <Input id="acc-phone" type="tel" label="Phone number (optional)" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <div className="flex justify-end border-t border-line pt-5">
        <Button type="submit" loading={saving} disabled={!dirty && !saving}>
          Save changes
        </Button>
      </div>
    </form>);

}
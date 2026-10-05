import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { TextField } from '../ui/TextField';
import { useToast } from '../ToastProvider';
import { useAuth } from '../../contexts/AuthContext';

export function ContactForm() {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [name, setName] = useState(user?.name ?? '');
  const [email, setEmail] = useState('jordan@studiolee.co');
  const [phone, setPhone] = useState('+1 512 555 0148');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (name.trim().length < 2) next.name = 'Enter your full name.';
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = 'Enter a valid email address.';
    setErrors(next);
    if (Object.keys(next).length) return;
    setSaving(true);
    window.setTimeout(() => {
      setSaving(false);
      setDirty(false);
      addToast({ type: 'success', message: 'Contact details saved' });
    }, 600);
  };

  const change = (fn: (v: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    fn(e.target.value);
    setDirty(true);
  };

  return (
    <form onSubmit={submit} noValidate className="space-y-5">
      <TextField label="Full name" value={name} onChange={change(setName)} error={errors.name} autoComplete="name" />
      <TextField label="Email address" type="email" value={email} onChange={change(setEmail)} error={errors.email} hint="Used for login and transaction notifications." autoComplete="email" />
      <TextField label="Phone number" type="tel" value={phone} onChange={change(setPhone)} hint="Only shared with clients after an offer is accepted." autoComplete="tel" />
      <div className="flex justify-end border-t border-slate-100 pt-5">
        <Button type="submit" loading={saving} disabled={!dirty}>Save changes</Button>
      </div>
    </form>);

}
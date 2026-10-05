import React, { useState } from 'react';
import { toast } from 'sonner';
import { TextField } from '../../components/ui/TextField';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../contexts/AuthContext';

export function ContactDetails() {
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState({
    firstName: user?.firstName ?? '',
    lastName: user?.lastName ?? '',
    email: user?.email ?? '',
    phone: user?.phone ?? ''
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const dirty =
  form.firstName !== user?.firstName || form.lastName !== user?.lastName || form.email !== user?.email || form.phone !== user?.phone;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      setError('Enter a valid email address');
      return;
    }
    setError('');
    setSaving(true);
    window.setTimeout(() => {
      updateUser(form);
      setSaving(false);
      toast.success('Contact details saved');
    }, 600);
  };

  return (
    <form onSubmit={submit} noValidate>
      <h2 className="text-xl font-semibold text-slate-900">Contact details</h2>
      <p className="mt-1 text-sm text-slate-600">Used for booking confirmations and messages from hosts. Never shown publicly.</p>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <TextField label="First name" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
        <TextField label="Last name" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
        <TextField label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} error={error} hint="We'll send a verification link if you change it" />
        <TextField label="Phone number" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+1 555 000 0000" hint="Shared with hosts after booking" />
      </div>
      <div className="mt-8 flex justify-end border-t border-slate-100 pt-6">
        <Button type="submit" loading={saving} disabled={!dirty}>Save changes</Button>
      </div>
    </form>);

}
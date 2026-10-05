import React, { useState } from 'react';
import { toast } from 'sonner';
import { BadgeCheckIcon } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { SettingsHeader } from '../../components/account/SettingsHeader';
import { Button } from '../../components/ui/Button';
import { TextField } from '../../components/ui/TextField';

export function ContactDetails() {
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState({
    firstName: user?.firstName ?? '',
    lastName: user?.lastName ?? '',
    email: user?.email ?? '',
    phone: user?.phone ?? ''
  });
  const [errors, setErrors] = useState<Partial<Record<keyof typeof form, string>>>({});
  const [saving, setSaving] = useState(false);

  const dirty =
  form.firstName !== user?.firstName || form.lastName !== user?.lastName || form.email !== user?.email || form.phone !== user?.phone;

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: typeof errors = {};
    if (!form.firstName.trim()) errs.firstName = 'Required';
    if (!form.lastName.trim()) errs.lastName = 'Required';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = 'Enter a valid email address';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSaving(true);
    await new Promise((r) => setTimeout(r, 600));
    updateUser(form);
    setSaving(false);
    toast.success('Contact details saved');
  };

  return (
    <form onSubmit={submit} noValidate>
      <SettingsHeader title="Contact details" description="Makers and buyers see your first name. Your email and phone stay private." />
      <div className="grid max-w-xl gap-5 sm:grid-cols-2">
        <TextField label="First name" value={form.firstName} onChange={set('firstName')} error={errors.firstName} />
        <TextField label="Last name" value={form.lastName} onChange={set('lastName')} error={errors.lastName} />
        <TextField
          className="sm:col-span-2"
          label="Email address"
          type="email"
          value={form.email}
          onChange={set('email')}
          error={errors.email}
          trailing={<BadgeCheckIcon className="h-4 w-4 text-success" aria-label="Verified" />}
          hint="Verified — order updates are sent here." />
        
        <TextField className="sm:col-span-2" label="Phone number (optional)" type="tel" value={form.phone} onChange={set('phone')} hint="Used only for delivery questions." />
      </div>
      <div className="mt-8 flex justify-end border-t border-line pt-6">
        <Button type="submit" loading={saving} disabled={!dirty}>
          Save changes
        </Button>
      </div>
    </form>);

}
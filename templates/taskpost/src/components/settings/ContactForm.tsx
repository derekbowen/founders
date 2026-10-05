import React, { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '../ui/Button';
import { Field } from '../ui/Field';
import { useApp } from '../../hooks/useApp';
import type { CurrentUser } from '../../types/marketplace';
import { cn, inputClass, inputErrorClass } from '../../utils/styles';

export function ContactForm({ user }: {user: CurrentUser;}) {
  const { updateContact } = useApp();
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [errors, setErrors] = useState<{email?: string;phone?: string;}>({});
  const [saving, setSaving] = useState(false);
  const dirty = email !== user.email || phone !== user.phone;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const v: typeof errors = {};
    if (!/^\S+@\S+\.\S+$/.test(email)) v.email = 'Enter a valid email address.';
    if (phone && phone.replace(/\D/g, '').length < 10) v.phone = 'Enter a 10-digit phone number.';
    setErrors(v);
    if (Object.keys(v).length) return;
    setSaving(true);
    setTimeout(() => {
      updateContact({ email, phone });
      setSaving(false);
      toast.success('Contact details saved.');
    }, 500);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <Field label="Email address" htmlFor="set-email" error={errors.email} hint="Used for login and job notifications.">
        <input
          id="set-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={Boolean(errors.email)}
          className={cn(inputClass, errors.email && inputErrorClass)} />
        
      </Field>
      <Field label="Phone number" htmlFor="set-phone" error={errors.phone} hint="Shared with the other party only after a job is booked.">
        <input
          id="set-phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          aria-invalid={Boolean(errors.phone)}
          className={cn(inputClass, errors.phone && inputErrorClass)} />
        
      </Field>
      <Button type="submit" disabled={!dirty} loading={saving}>
        Save changes
      </Button>
    </form>);

}
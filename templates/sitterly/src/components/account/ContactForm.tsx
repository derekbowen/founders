import React, { useState } from 'react';
import { Input } from '../Input';
import { useToast } from '../ToastProvider';
import { BrandButton } from '../ui/BrandButton';
import { useSession } from '../../contexts/SessionContext';
import { demoUser } from '../../data/currentUser';

export function ContactForm() {
  const { user, updateUser } = useSession();
  const { addToast } = useToast();
  const base = user ?? demoUser;
  const [email, setEmail] = useState(base.email);
  const [phone, setPhone] = useState(base.phone);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const dirty = email !== base.email || phone !== base.phone;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const err: Record<string, string> = {};
    if (!/^\S+@\S+\.\S+$/.test(email)) err.email = 'Enter a valid email';
    if (phone.replace(/\D/g, '').length < 10) err.phone = 'Enter a 10-digit phone number';
    setErrors(err);
    if (Object.keys(err).length) return;
    setSaving(true);
    window.setTimeout(() => {
      setSaving(false);
      updateUser({ email, phone });
      addToast({ type: 'success', message: 'Contact details saved' });
    }, 700);
  };

  return (
    <form onSubmit={submit} noValidate className="space-y-5">
      <Input id="contact-email" label="Email address" type="email" value={email} error={errors.email} helperText="Booking confirmations and receipts are sent here." onChange={(e) => setEmail(e.target.value)} />
      <Input id="contact-phone" label="Phone number" type="tel" value={phone} error={errors.phone} helperText="Shared with sitters only after a booking is confirmed." onChange={(e) => setPhone(e.target.value)} />
      <BrandButton type="submit" loading={saving} disabled={!dirty}>Save changes</BrandButton>
    </form>);

}
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '../ui/Button';
import { TextArea } from '../ui/TextArea';
import { TextField } from '../ui/TextField';
import { useAuth } from '../../contexts/AuthContext';

export function ContactSettings() {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user?.name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [phone, setPhone] = useState(user?.phone ?? '');
  const [location, setLocation] = useState(user?.location ?? '');
  const [bio, setBio] = useState(user?.bio ?? '');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const dirty = name !== user?.name || email !== user?.email || phone !== user?.phone || location !== user?.location || bio !== user?.bio;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = 'Name is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = 'Enter a valid email address.';
    if (phone && phone.replace(/\D/g, '').length < 10) next.phone = 'Enter a 10-digit phone number.';
    setErrors(next);
    if (Object.keys(next).length) return;
    setSaving(true);
    window.setTimeout(() => {
      updateUser({ name: name.trim(), firstName: name.trim().split(' ')[0], email, phone, location, bio });
      setSaving(false);
      toast.success('Contact details saved');
    }, 600);
  };

  return (
    <form onSubmit={submit} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField id="acc-name" label="Full name" value={name} onChange={(e) => setName(e.target.value)} error={errors.name} />
        <TextField id="acc-location" label="Neighborhood" value={location} onChange={(e) => setLocation(e.target.value)} />
        <TextField id="acc-email" label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} hint="Booking confirmations are sent here." />
        <TextField id="acc-phone" label="Phone number" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} error={errors.phone} hint="Shared with sitters once a booking is confirmed." />
      </div>
      <TextArea id="acc-bio" label="Bio" rows={4} value={bio} onChange={(e) => setBio(e.target.value)} />
      <Button type="submit" loading={saving} disabled={!dirty}>
        Save changes
      </Button>
    </form>);

}
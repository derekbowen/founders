import React, { useState } from 'react';
import { CheckCircle2Icon } from 'lucide-react';
import { Input } from '../Input';
import { Avatar } from '../Avatar';
import { useAuth } from '../../contexts/AuthContext';
import { buttonClass, labelClass, textareaClass } from '../../utils/styles';

export function ContactSection() {
  const { currentUser, updateUser } = useAuth();
  const [form, setForm] = useState({
    name: currentUser?.name ?? '',
    email: currentUser?.email ?? '',
    phone: currentUser?.phone ?? '',
    bio: currentUser?.bio ?? ''
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const dirty =
  form.name !== currentUser?.name || form.email !== currentUser?.email || form.phone !== currentUser?.phone || form.bio !== currentUser?.bio;

  const save = (e: React.FormEvent) => {
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
      setSaved(true);
      window.setTimeout(() => setSaved(false), 2500);
    }, 600);
  };

  return (
    <form onSubmit={save} className="space-y-5">
      <div className="flex items-center gap-4">
        <Avatar name={form.name || 'You'} alt={form.name} src={currentUser?.avatar} size="xl" />
        <div>
          <p className="font-semibold">Profile photo</p>
          <p className="text-sm text-muted">Hosts are 40% more likely to accept drivers with a photo.</p>
        </div>
      </div>
      <Input id="acc-name" label="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Input id="acc-email" label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} error={error} helperText="Booking confirmations are sent here." />
        <Input id="acc-phone" label="Phone number" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} helperText="Shared with your host after confirmation." />
      </div>
      <div>
        <label htmlFor="acc-bio" className={labelClass}>
          Bio
        </label>
        <textarea id="acc-bio" rows={3} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} className={textareaClass} />
      </div>
      <div className="flex items-center gap-3">
        <button type="submit" disabled={!dirty || saving} className={buttonClass('primary')}>
          {saving ? 'Saving…' : 'Save changes'}
        </button>
        {saved &&
        <span role="status" className="inline-flex items-center gap-1.5 text-sm font-medium text-success">
            <CheckCircle2Icon size={16} aria-hidden /> Saved
          </span>
        }
      </div>
    </form>);

}
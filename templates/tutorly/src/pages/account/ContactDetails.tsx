import React, { useState } from 'react';
import { BadgeCheckIcon } from 'lucide-react';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Toggle } from '../../components/Toggle';
import { useToast } from '../../components/ToastProvider';
import { SettingsCard } from '../../components/account/SettingsCard';
import { useAuth } from '../../contexts/AuthContext';
import { brandButton } from '../../utils/buttonStyles';

const notificationPrefs = [
{ id: 'requests', label: 'Booking requests & confirmations', defaultOn: true },
{ id: 'reminders', label: 'Lesson reminders (24h and 1h before)', defaultOn: true },
{ id: 'messages', label: 'New messages', defaultOn: true },
{ id: 'marketing', label: 'Tips, offers and product news', defaultOn: false }];


export function ContactDetailsPage() {
  const { user, updateUser } = useAuth();
  const { addToast } = useToast();
  const [form, setForm] = useState({ firstName: user.firstName, lastName: user.lastName, email: user.email, phone: user.phone });
  const [saving, setSaving] = useState(false);
  const dirty =
  form.firstName !== user.firstName || form.lastName !== user.lastName || form.email !== user.email || form.phone !== user.phone;
  const emailError = /^\S+@\S+\.\S+$/.test(form.email) ? undefined : 'Enter a valid email address';

  const save = () => {
    if (emailError || !form.firstName.trim()) return;
    setSaving(true);
    window.setTimeout(() => {
      updateUser(form);
      setSaving(false);
      addToast({ type: 'success', message: 'Contact details saved' });
    }, 600);
  };

  return (
    <div className="space-y-6">
      <SettingsCard
        title="Contact details"
        description="Your email and phone are never shown publicly. Tutors only see your first name."
        footer={
        <Button className={brandButton.primary} disabled={!dirty || !!emailError} loading={saving} onClick={save}>
            Save changes
          </Button>
        }>
        
        <div className="grid gap-5 sm:grid-cols-2">
          <Input id="first-name" label="First name" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} error={!form.firstName.trim() ? 'Required' : undefined} />
          <Input id="last-name" label="Last name" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
          <Input
            id="email"
            type="email"
            label="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            error={emailError}
            endAdornment={form.email === user.email ? <BadgeCheckIcon size={16} className="text-green-700" aria-label="Verified" /> : undefined}
            helperText={form.email === user.email ? 'Verified' : "We'll send a verification link"} />
          
          <Input id="phone" type="tel" label="Phone number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} helperText="Used for lesson reminders by SMS" />
        </div>
      </SettingsCard>

      <SettingsCard title="Notifications" description="Choose what we email you about.">
        <ul className="divide-y divide-ink-100">
          {notificationPrefs.map((p) =>
          <li key={p.id} className="flex items-center justify-between gap-4 py-3">
              <span className="text-sm text-ink-800">{p.label}</span>
              <Toggle defaultChecked={p.defaultOn} aria-label={p.label} onChange={() => addToast({ type: 'success', message: 'Preference updated' })} />
            </li>
          )}
        </ul>
      </SettingsCard>
    </div>);

}
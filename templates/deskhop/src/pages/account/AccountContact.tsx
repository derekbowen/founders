import React, { useState } from 'react';
import { Input } from '../../components/Input';
import { Toggle } from '../../components/Toggle';
import { SettingsCard } from '../../components/account/SettingsCard';
import { BrandButton } from '../../components/ui/BrandButton';
import { useAuth } from '../../contexts/AuthContext';

export function AccountContact() {
  const { user, updateUser } = useAuth();
  const [email, setEmail] = useState(user?.email ?? '');
  const [phone, setPhone] = useState('+44 7700 900128');
  const [company, setCompany] = useState(user?.company ?? '');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = 'Enter a valid email address.';
    if (phone && !/^\+?[\d\s()-]{7,}$/.test(phone)) next.phone = 'Enter a valid phone number.';
    setErrors(next);
    setSaved(false);
    if (Object.keys(next).length) return;
    setLoading(true);
    window.setTimeout(() => {
      updateUser({ email, company: company || undefined });
      setLoading(false);
      setSaved(true);
    }, 600);
  }

  return (
    <div className="space-y-6">
      <SettingsCard
        title="Contact details"
        description="Used for booking confirmations, receipts and messages from hosts."
        onSubmit={onSubmit}
        saved={saved}
        footer={<BrandButton type="submit" loading={loading}>Save changes</BrandButton>}>
        
        <Input id="acc-email" label="Email address" type="email" value={email} error={errors.email} onChange={(e) => setEmail(e.target.value)} helperText="We’ll send a confirmation link if you change it." />
        <Input id="acc-phone" label="Phone number" type="tel" value={phone} error={errors.phone} onChange={(e) => setPhone(e.target.value)} helperText="Shared with hosts only after a booking is confirmed." />
        <Input id="acc-company" label="Default company for invoices" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Optional" />
      </SettingsCard>

      <SettingsCard title="Notifications" description="Choose what we email you about.">
        <Toggle label="Booking updates and messages" defaultChecked disabled />
        <Toggle label="Reminders the day before a booking" defaultChecked />
        <Toggle label="New spaces in my cities" />
      </SettingsCard>
    </div>);

}
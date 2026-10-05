import React, { useState } from 'react';
import { toast } from 'sonner';
import { Input } from '../Input';
import { BrandButton } from '../ui/BrandButton';
import { currentUser } from '../../data/currentUser';

export function ContactSettings() {
  const [email, setEmail] = useState(currentUser.email);
  const [phone, setPhone] = useState(currentUser.phone);
  const [saving, setSaving] = useState(false);
  const dirty = email !== currentUser.email || phone !== currentUser.phone;

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    window.setTimeout(() => {
      setSaving(false);
      toast.success('Contact details saved');
    }, 600);
  };

  return (
    <form onSubmit={save} className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">Contact details</h2>
        <p className="mt-1 text-sm text-slate-600">Used for order notifications and by brands or retailers to reach you.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input id="contact-email" type="email" label="Email address" value={email} onChange={(e) => setEmail(e.target.value)} helperText="Verified ✓" />
        <Input id="contact-phone" type="tel" label="Phone number" value={phone} onChange={(e) => setPhone(e.target.value)} helperText="Only shared with confirmed order partners." />
        <Input id="contact-business" label="Business name" defaultValue={currentUser.businessName} readOnly helperText="Contact support to change your verified business name." />
        <Input id="contact-location" label="Location" defaultValue={currentUser.location} />
      </div>
      <div className="flex justify-end border-t border-slate-100 pt-5">
        <BrandButton type="submit" loading={saving} disabled={!dirty}>
          Save changes
        </BrandButton>
      </div>
    </form>);

}
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '../../components/ui/Button';
import { Field } from '../../components/ui/Field';
import { Avatar } from '../../components/ui/Avatar';
import { useMarketplace } from '../../contexts/MarketplaceContext';
import { cn, inputClass } from '../../utils/ui';

export function ContactDetails() {
  const { currentUser, updateProfile } = useMarketplace();
  const [form, setForm] = useState({
    name: currentUser.name,
    email: currentUser.email ?? '',
    phone: currentUser.phone ?? '',
    location: currentUser.location,
    bio: currentUser.bio
  });
  const [errors, setErrors] = useState<Partial<Record<keyof typeof form, string>>>({});
  const [saving, setSaving] = useState(false);

  const dirty =
  form.name !== currentUser.name || form.email !== (currentUser.email ?? '') || form.phone !== (currentUser.phone ?? '') || form.location !== currentUser.location || form.bio !== currentUser.bio;

  const set = (k: keyof typeof form, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: typeof errors = {};
    if (!form.name.trim()) errs.name = 'Required.';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = 'Enter a valid email.';
    if (form.phone && form.phone.replace(/\D/g, '').length < 10) errs.phone = 'Enter a valid phone number.';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSaving(true);
    window.setTimeout(() => {
      const initials = form.name.
      split(' ').
      map((p) => p[0]).
      join('').
      slice(0, 2).
      toUpperCase();
      updateProfile({ ...form, initials });
      setSaving(false);
      toast.success('Contact details saved');
    }, 600);
  };

  return (
    <form onSubmit={submit} noValidate className="space-y-6">
      <div>
        <h2 className="font-heading text-2xl text-navy">Contact details</h2>
        <p className="mt-1 text-sm text-muted">Owners see your name and phone once a booking is confirmed.</p>
      </div>
      <div className="flex items-center gap-4 rounded-2xl bg-sand-light p-4">
        <Avatar initials={currentUser.initials} seed={currentUser.id} size="md" />
        <div className="text-sm">
          <p className="font-semibold text-ink">Profile photo</p>
          <p className="text-muted">Initials are shown until you upload a photo.</p>
        </div>
        <Button variant="outline" size="sm" className="ml-auto" onClick={() => toast('Photo upload is disabled in this demo.')}>
          Upload
        </Button>
      </div>
      <Field label="Full name" htmlFor="c-name" error={errors.name}>
        <input id="c-name" value={form.name} onChange={(e) => set('name', e.target.value)} className={cn(inputClass, errors.name && 'border-danger')} />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Email" htmlFor="c-email" error={errors.email}>
          <input id="c-email" type="email" value={form.email} onChange={(e) => set('email', e.target.value)} className={cn(inputClass, errors.email && 'border-danger')} />
        </Field>
        <Field label="Phone" htmlFor="c-phone" error={errors.phone} optional>
          <input id="c-phone" type="tel" value={form.phone} onChange={(e) => set('phone', e.target.value)} className={cn(inputClass, errors.phone && 'border-danger')} />
        </Field>
      </div>
      <Field label="Home port" htmlFor="c-loc">
        <input id="c-loc" value={form.location} onChange={(e) => set('location', e.target.value)} className={inputClass} />
      </Field>
      <Field label="Bio" htmlFor="c-bio" hint="Shown on your public profile.">
        <textarea id="c-bio" rows={4} value={form.bio} onChange={(e) => set('bio', e.target.value)} className={inputClass + ' resize-y'} />
      </Field>
      <div className="flex justify-end border-t border-line pt-6">
        <Button type="submit" loading={saving} disabled={!dirty}>
          Save changes
        </Button>
      </div>
    </form>);

}
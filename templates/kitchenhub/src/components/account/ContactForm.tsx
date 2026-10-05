import React, { useState } from 'react';
import { CircleCheckIcon } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { cn, inputClass } from '../../utils/styles';
import { Button } from '../ui/Button';
import { Field } from '../ui/Field';
import { Toggle } from '../ui/Toggle';

export function ContactForm() {
  const { user } = useAuth();
  const [values, setValues] = useState({ email: user?.email ?? 'maya@southsidekitchens.co', phone: '(312) 555-0142', business: user?.business ?? 'Southside Kitchens Co.' });
  const [notify, setNotify] = useState({ bookings: true, messages: true, marketing: false });
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(values.email)) {
      setError('Enter a valid email address');
      return;
    }
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  };

  return (
    <form onSubmit={save} noValidate className="space-y-8">
      <div className="space-y-4">
        <Field label="Email address" htmlFor="ac-email" error={error} hint="Booking confirmations and receipts go here">
          <input id="ac-email" type="email" value={values.email} onChange={(e) => {setValues({ ...values, email: e.target.value });setError('');}} className={cn(inputClass, error && 'border-primary')} />
        </Field>
        <Field label="Phone number" htmlFor="ac-phone" hint="Shared with hosts and renters after a booking is approved">
          <input id="ac-phone" type="tel" value={values.phone} onChange={(e) => setValues({ ...values, phone: e.target.value })} className={inputClass} />
        </Field>
        <Field label="Business name" htmlFor="ac-business">
          <input id="ac-business" value={values.business} onChange={(e) => setValues({ ...values, business: e.target.value })} className={inputClass} />
        </Field>
      </div>
      <fieldset className="space-y-4 rounded-2xl border border-steel-200 p-5">
        <legend className="px-1 text-sm font-semibold text-steel-900">Email notifications</legend>
        <Toggle checked={notify.bookings} onChange={(v) => setNotify({ ...notify, bookings: v })} label="Booking updates" description="Requests, approvals and reminders" />
        <Toggle checked={notify.messages} onChange={(v) => setNotify({ ...notify, messages: v })} label="New messages" />
        <Toggle checked={notify.marketing} onChange={(v) => setNotify({ ...notify, marketing: v })} label="Tips & product news" />
      </fieldset>
      <div className="flex items-center gap-3">
        <Button type="submit">Save changes</Button>
        {saved &&
        <span className="flex items-center gap-1.5 text-sm font-medium text-accent" role="status">
            <CircleCheckIcon className="h-4 w-4" aria-hidden="true" />
            Saved
          </span>
        }
      </div>
    </form>);

}
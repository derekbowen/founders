import React, { useState } from 'react';
import { Input } from '../Input';
import { Toggle } from '../Toggle';
import { useToast } from '../ToastProvider';

export function ContactForm() {
  const { addToast } = useToast();
  const [email, setEmail] = useState('jordan.lee@example.com');
  const [phone, setPhone] = useState('(512) 555-0142');
  const [error, setError] = useState<string | undefined>();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError('Enter a valid email address.');
    setError(undefined);
    addToast({ type: 'success', message: 'Contact details saved' });
  };

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <Input id="acc-email" type="email" label="Email address" value={email} onChange={(e) => setEmail(e.target.value)} error={error} helperText="Booking confirmations are sent here." />
      <Input id="acc-phone" type="tel" label="Phone number" value={phone} onChange={(e) => setPhone(e.target.value)} helperText="Shared with hosts only after a booking is confirmed." />
      <fieldset className="space-y-3 border-t border-slate-100 pt-5">
        <legend className="field-label">Notifications</legend>
        <Toggle label="Email me booking updates" defaultChecked />
        <Toggle label="SMS reminders 2 hours before games" defaultChecked />
        <Toggle label="Open-play suggestions near me" />
      </fieldset>
      <button type="submit" className="btn btn-primary btn-md">Save changes</button>
    </form>);

}
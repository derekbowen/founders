import React, { useState } from 'react';
import { Input } from '../Input';
import { SaveBar, useSaveState } from './SaveBar';

export function ContactSettings() {
  const [form, setForm] = useState({
    email: 'olivia@example.com',
    phone: '(212) 555-0148',
    name: 'Olivia Hart',
    city: 'New York, NY'
  });
  const { saving, saved, save } = useSaveState();
  const emailError = form.email.includes('@') ? undefined : 'Enter a valid email';

  return (
    <form
      className="space-y-5"
      onSubmit={(e) => {
        e.preventDefault();
        save(!emailError);
      }}>
      
      <div className="grid gap-5 sm:grid-cols-2">
        <Input id="acc-name" label="Display name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <Input id="acc-city" label="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
      </div>
      <Input id="acc-email" label="Email address" type="email" value={form.email} error={emailError} helperText="Rental updates and receipts are sent here." onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <Input id="acc-phone" label="Phone number" type="tel" value={form.phone} helperText="Shared with your lender or renter only after a booking is confirmed." onChange={(e) => setForm({ ...form, phone: e.target.value })} />
      <SaveBar saving={saving} saved={saved} />
    </form>);

}
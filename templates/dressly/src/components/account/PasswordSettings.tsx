import React, { useState } from 'react';
import { Input } from '../Input';
import { SaveBar, useSaveState } from './SaveBar';

export function PasswordSettings() {
  const [form, setForm] = useState({ current: '', next: '', confirm: '' });
  const [touched, setTouched] = useState(false);
  const { saving, saved, save } = useSaveState();
  const errors = {
    current: form.current ? undefined : 'Enter your current password',
    next: form.next.length >= 8 ? undefined : 'Use at least 8 characters',
    confirm: form.confirm === form.next && form.confirm ? undefined : 'Passwords don’t match'
  };
  const valid = !errors.current && !errors.next && !errors.confirm;

  return (
    <form
      className="max-w-md space-y-5"
      onSubmit={(e) => {
        e.preventDefault();
        setTouched(true);
        if (valid) {
          save();
          setForm({ current: '', next: '', confirm: '' });
          setTouched(false);
        }
      }}>
      
      <Input id="pw-current" label="Current password" type="password" autoComplete="current-password" value={form.current} error={touched ? errors.current : undefined} onChange={(e) => setForm({ ...form, current: e.target.value })} />
      <Input id="pw-new" label="New password" type="password" autoComplete="new-password" value={form.next} error={touched ? errors.next : undefined} helperText="At least 8 characters" onChange={(e) => setForm({ ...form, next: e.target.value })} />
      <Input id="pw-confirm" label="Confirm new password" type="password" autoComplete="new-password" value={form.confirm} error={touched ? errors.confirm : undefined} onChange={(e) => setForm({ ...form, confirm: e.target.value })} />
      <SaveBar saving={saving} saved={saved} label="Update password" />
    </form>);

}
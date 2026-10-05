import React, { useState } from 'react';
import { SaveNotice } from '../../components/SaveNotice';
import { useAuth } from '../../contexts/AuthContext';

export function ContactDetails() {
  const { user } = useAuth();
  const [email, setEmail] = useState(user.email ?? '');
  const [phone, setPhone] = useState(user.phone ?? '');
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Enter a valid email address.');
      return;
    }
    setError('');
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <form onSubmit={submit} className="card p-6 md:p-8" noValidate>
      <h2 className="text-xl font-bold text-ink-900">Contact details</h2>
      <p className="mt-1 text-sm text-ink-500">Hosts and campers only see these after a booking is confirmed.</p>
      <div className="mt-6 space-y-5">
        <label className="block">
          <span className="label">Email address</span>
          <input type="email" className={`input ${error ? 'input-error' : ''}`} value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={Boolean(error)} />
          {error ?
          <span className="mt-1.5 block text-sm text-red-700">{error}</span> :

          <span className="mt-1.5 block text-xs text-primary-700">✓ Verified</span>
          }
        </label>
        <label className="block">
          <span className="label">Phone number</span>
          <input type="tel" className="input" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(555) 555-0100" />
          <span className="mt-1.5 block text-xs text-ink-500">Used for booking alerts and emergencies at the site.</span>
        </label>
      </div>
      <div className="mt-8 flex items-center gap-4">
        <button type="submit" className="btn-primary">
          Save changes
        </button>
        <SaveNotice show={saved} message="Contact details saved" />
      </div>
    </form>);

}
import React, { useState } from 'react';
import { Link, NavLink, Navigate, useParams } from 'react-router-dom';
import { KeyRoundIcon, MailIcon, UserIcon } from 'lucide-react';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useToast } from '../components/ToastProvider';
import { LoginRequired } from '../components/LoginRequired';
import { useApp } from '../contexts/AppContext';
import { buttonStyles, cardStyles } from '../utils/styles';

const sections = [
{ id: 'contact', label: 'Contact details', icon: <MailIcon size={16} /> },
{ id: 'password', label: 'Password', icon: <KeyRoundIcon size={16} /> }];


export function AccountSettings() {
  const { section } = useParams();
  const { currentUser } = useApp();

  if (!currentUser) {
    return <LoginRequired title="Log in to manage your account" text="Update your contact details and password." />;
  }
  if (!sections.some((s) => s.id === section)) return <Navigate to="/account/contact" replace />;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <h1 className="text-3xl font-bold tracking-tight text-navy-900">Account settings</h1>
      <p className="mt-1 text-navy-600">
        Signed in as {currentUser.email} ·{' '}
        <Link to={`/u/${currentUser.id}`} className="font-semibold text-primary-700 hover:text-primary-800">
          View public profile
        </Link>
      </p>

      <div className="mt-8 grid gap-8 md:grid-cols-[220px_minmax(0,1fr)]">
        <nav aria-label="Account sections">
          <ul className="flex gap-2 md:flex-col">
            {sections.map((s) =>
            <li key={s.id}>
                <NavLink
                to={`/account/${s.id}`}
                className={({ isActive }) =>
                `flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-medium transition ${
                isActive ? 'bg-navy-900 text-white' : 'text-navy-700 hover:bg-navy-50'}`

                }>
                
                  {s.icon}
                  {s.label}
                </NavLink>
              </li>
            )}
            <li>
              <Link
                to={`/u/${currentUser.id}`}
                className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-medium text-navy-700 transition hover:bg-navy-50">
                
                <UserIcon size={16} />
                Profile
              </Link>
            </li>
          </ul>
        </nav>
        <div className={`${cardStyles} p-6 sm:p-8`}>{section === 'password' ? <PasswordForm /> : <ContactForm />}</div>
      </div>
    </div>);

}

function ContactForm() {
  const { currentUser, updateCurrentUser } = useApp();
  const { addToast } = useToast();
  const [email, setEmail] = useState(currentUser?.email ?? '');
  const [phone, setPhone] = useState(currentUser?.phone ?? '');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const dirty = email !== currentUser?.email || phone !== (currentUser?.phone ?? '');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Enter a valid email address.');
      return;
    }
    setError('');
    setSaving(true);
    window.setTimeout(() => {
      updateCurrentUser({ email: email.trim(), phone: phone.trim() });
      setSaving(false);
      addToast({ type: 'success', message: 'Contact details saved' });
    }, 600);
  };

  return (
    <form onSubmit={submit} className="space-y-5" noValidate>
      <div>
        <h2 className="text-lg font-semibold text-navy-900">Contact details</h2>
        <p className="mt-1 text-sm text-navy-500">
          Your email and phone are only shared with people you connect with after an inquiry.
        </p>
      </div>
      <Input id="contact-email" label="Email address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} error={error} />
      <Input
        id="contact-phone"
        label="Phone number"
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="+49 151 0000 0000"
        helperText="Optional. Helps landlords reach you about viewings." />
      
      <div className="flex justify-end border-t border-navy-100 pt-5">
        <Button type="submit" loading={saving} disabled={!dirty} className={`${buttonStyles.primary} disabled:!opacity-50`}>
          Save changes
        </Button>
      </div>
    </form>);

}

function PasswordForm() {
  const { addToast } = useToast();
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');
  const [errors, setErrors] = useState<{current?: string;next?: string;confirm?: string;}>({});
  const [saving, setSaving] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: typeof errors = {};
    if (!current) errs.current = 'Enter your current password.';
    if (next.length < 8) errs.next = 'New password must be at least 8 characters.';else
    if (next === current) errs.next = 'New password must differ from the current one.';
    if (confirm !== next) errs.confirm = 'Passwords do not match.';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSaving(true);
    window.setTimeout(() => {
      setSaving(false);
      setCurrent('');
      setNext('');
      setConfirm('');
      addToast({ type: 'success', message: 'Password updated' });
    }, 600);
  };

  return (
    <form onSubmit={submit} className="space-y-5" noValidate>
      <div>
        <h2 className="text-lg font-semibold text-navy-900">Change password</h2>
        <p className="mt-1 text-sm text-navy-500">Use at least 8 characters with a mix of letters and numbers.</p>
      </div>
      <Input id="pw-current" label="Current password" type="password" value={current} onChange={(e) => setCurrent(e.target.value)} error={errors.current} autoComplete="current-password" />
      <Input id="pw-new" label="New password" type="password" value={next} onChange={(e) => setNext(e.target.value)} error={errors.next} autoComplete="new-password" />
      <Input id="pw-confirm" label="Confirm new password" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} error={errors.confirm} autoComplete="new-password" />
      <div className="flex justify-end border-t border-navy-100 pt-5">
        <Button type="submit" loading={saving} className={buttonStyles.primary}>
          Update password
        </Button>
      </div>
    </form>);

}
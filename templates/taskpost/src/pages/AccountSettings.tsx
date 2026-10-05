import React from 'react';
import { NavLink, Navigate, useParams } from 'react-router-dom';
import { KeyRoundIcon, LandmarkIcon, MailIcon } from 'lucide-react';
import { ContactForm } from '../components/settings/ContactForm';
import { PasswordForm } from '../components/settings/PasswordForm';
import { PayoutsForm } from '../components/settings/PayoutsForm';
import { AuthPrompt } from '../components/ui/AuthPrompt';
import { useApp } from '../hooks/useApp';
import { cn } from '../utils/styles';

const sections = [
{ id: 'contact', label: 'Contact details', icon: MailIcon, description: 'Your email and phone number.' },
{ id: 'password', label: 'Password', icon: KeyRoundIcon, description: 'Change your login password.' },
{ id: 'payouts', label: 'Payouts', icon: LandmarkIcon, description: 'Where we send your earnings as a pro.' }] as
const;

export function AccountSettings() {
  const { section } = useParams();
  const { user } = useApp();

  if (!user) return <AuthPrompt title="Log in to manage your account" description="Update contact details, password and payouts." />;

  const current = sections.find((s) => s.id === section);
  if (!current) return <Navigate to="/account/contact" replace />;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <h1 className="text-3xl font-extrabold tracking-tight text-ink-900">Account settings</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)]">
        <nav aria-label="Account settings">
          <ul className="flex gap-2 overflow-x-auto lg:flex-col lg:gap-1">
            {sections.map(({ id, label, icon: Icon }) =>
            <li key={id} className="shrink-0">
                <NavLink
                to={`/account/${id}`}
                className={({ isActive }) =>
                cn(
                  'flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-bold transition-colors',
                  isActive ? 'bg-white text-ink-900 shadow-card ring-1 ring-ink-200' : 'text-ink-600 hover:bg-white/70 hover:text-ink-900'
                )
                }>
                
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {label}
                  {id === 'payouts' && !user.roles.includes('pro') &&
                <span className="rounded bg-ink-200 px-1.5 py-0.5 text-[10px] font-bold text-ink-600">Pros</span>
                }
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
        <section aria-labelledby="settings-heading" className="rounded-2xl border border-ink-200 bg-white p-6 shadow-card sm:p-8">
          <h2 id="settings-heading" className="text-xl font-extrabold text-ink-900">
            {current.label}
          </h2>
          <p className="mb-6 mt-1 text-sm text-ink-600">{current.description}</p>
          <div className="max-w-lg">
            {current.id === 'contact' && <ContactForm user={user} />}
            {current.id === 'password' && <PasswordForm />}
            {current.id === 'payouts' && <PayoutsForm user={user} />}
          </div>
        </section>
      </div>
    </div>);

}
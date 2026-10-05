import React from 'react';
import { NavLink, Navigate, useParams } from 'react-router-dom';
import { KeyRoundIcon, MailIcon, WalletIcon } from 'lucide-react';
import { ContactForm } from '../components/account/ContactForm';
import { PasswordForm } from '../components/account/PasswordForm';
import { PayoutsPanel } from '../components/account/PayoutsPanel';

const sections = [
{ id: 'contact', label: 'Contact details', description: 'How we and your sitters reach you', icon: MailIcon },
{ id: 'password', label: 'Password', description: 'Keep your account secure', icon: KeyRoundIcon },
{ id: 'payouts', label: 'Payouts', description: 'Where your sitting earnings are sent', icon: WalletIcon }];


export function AccountSettings() {
  const { section } = useParams();
  const current = sections.find((s) => s.id === section);
  if (!current) return <Navigate to="/account/contact" replace />;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <h1 className="font-heading text-3xl font-bold text-ink-900 sm:text-4xl">Account settings</h1>
      <div className="mt-8 grid gap-8 md:grid-cols-[220px_minmax(0,1fr)]">
        <nav aria-label="Account sections" className="flex gap-1 overflow-x-auto md:flex-col">
          {sections.map((s) =>
          <NavLink
            key={s.id}
            to={`/account/${s.id}`}
            className={({ isActive }) => `flex shrink-0 items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${isActive ? 'bg-white text-primary-700 shadow-soft ring-1 ring-ink-200' : 'text-ink-700 hover:bg-white/70'}`}>
            
              <s.icon className="h-4 w-4" aria-hidden />
              {s.label}
            </NavLink>
          )}
        </nav>
        <section aria-labelledby="settings-heading" className="rounded-[2rem] border border-ink-200 bg-white p-6 sm:p-8">
          <h2 id="settings-heading" className="font-heading text-2xl font-bold text-ink-900">{current.label}</h2>
          <p className="mt-1 text-sm text-ink-600">{current.description}</p>
          <div className="mt-6 max-w-2xl">
            {current.id === 'contact' && <ContactForm />}
            {current.id === 'password' && <PasswordForm />}
            {current.id === 'payouts' && <PayoutsPanel />}
          </div>
        </section>
      </div>
    </div>);

}
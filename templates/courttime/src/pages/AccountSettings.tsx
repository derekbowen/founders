import React from 'react';
import { Navigate, NavLink, useParams } from 'react-router-dom';
import { BanknoteIcon, KeyRoundIcon, MailIcon } from 'lucide-react';
import { ContactForm } from '../components/account/ContactForm';
import { PasswordForm } from '../components/account/PasswordForm';
import { PayoutsForm } from '../components/account/PayoutsForm';

const sections = [
{ id: 'contact', label: 'Contact details', icon: MailIcon, description: 'How players, hosts and we can reach you.' },
{ id: 'password', label: 'Password', icon: KeyRoundIcon, description: 'Keep your account secure.' },
{ id: 'payouts', label: 'Payouts', icon: BanknoteIcon, description: 'Where your hosting earnings are sent.' }] as
const;

export function AccountSettings() {
  const { section } = useParams();
  const current = sections.find((s) => s.id === section);
  if (!current) return <Navigate to="/account/contact" replace />;

  return (
    <div className="container-page py-8 lg:py-12">
      <h1 className="heading-lg">Account settings</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)]">
        <nav aria-label="Account sections">
          <ul className="-mx-4 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:flex-col lg:gap-1 lg:px-0">
            {sections.map((s) =>
            <li key={s.id} className="shrink-0">
                <NavLink
                to={`/account/${s.id}`}
                className={({ isActive }) =>
                `flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm transition-colors ${isActive ? 'bg-white font-semibold text-brand-dark shadow-sm ring-1 ring-slate-200' : 'text-slate-600 hover:bg-white'}`
                }>
                
                  <s.icon size={16} aria-hidden="true" /> {s.label}
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
        <section className="card p-6 sm:p-8" aria-labelledby="account-section-heading">
          <h2 id="account-section-heading" className="heading-md">{current.label}</h2>
          <p className="mt-1 text-sm text-slate-600">{current.description}</p>
          <div className="mt-6">
            {current.id === 'contact' && <ContactForm />}
            {current.id === 'password' && <PasswordForm />}
            {current.id === 'payouts' && <PayoutsForm />}
          </div>
        </section>
      </div>
    </div>);

}
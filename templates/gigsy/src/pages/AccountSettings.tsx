import React from 'react';
import { Navigate, NavLink, useParams } from 'react-router-dom';
import { KeyRoundIcon, LandmarkIcon, UserRoundIcon } from 'lucide-react';
import { ContactForm } from '../components/account/ContactForm';
import { PasswordForm } from '../components/account/PasswordForm';
import { PayoutsForm } from '../components/account/PayoutsForm';

const tabs = [
{ id: 'contact', label: 'Contact details', description: 'Name, email and phone', icon: UserRoundIcon },
{ id: 'password', label: 'Password', description: 'Keep your account secure', icon: KeyRoundIcon },
{ id: 'payouts', label: 'Payouts', description: 'Bank account and schedule', icon: LandmarkIcon }] as
const;

export function AccountSettings() {
  const { tab = 'contact' } = useParams();
  const current = tabs.find((t) => t.id === tab);
  if (!current) return <Navigate to="/account/contact" replace />;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Account settings</h1>
      <div className="mt-8 grid gap-8 md:grid-cols-[240px_minmax(0,1fr)]">
        <nav aria-label="Account settings">
          <ul className="flex gap-2 overflow-x-auto scrollbar-none md:flex-col md:gap-1">
            {tabs.map(({ id, label, icon: Icon }) =>
            <li key={id} className="shrink-0">
                <NavLink
                to={`/account/${id}`}
                className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${isActive ? 'bg-white text-primary-700 shadow-sm ring-1 ring-slate-200' : 'text-slate-600 hover:bg-white hover:text-slate-900'}`
                }>
                
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {label}
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
        <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8" aria-labelledby="settings-heading">
          <h2 id="settings-heading" className="text-lg font-bold text-slate-900">{current.label}</h2>
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
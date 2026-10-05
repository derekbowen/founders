import React from 'react';
import { Link, Navigate, NavLink, useParams } from 'react-router-dom';
import { KeyRoundIcon, LockIcon, UserRoundIcon, WalletIcon } from 'lucide-react';
import { ContactForm } from '../components/account/ContactForm';
import { PasswordForm } from '../components/account/PasswordForm';
import { PayoutsPanel } from '../components/account/PayoutsPanel';
import { EmptyState } from '../components/common/EmptyState';
import { useStore } from '../contexts/StoreContext';

const sections = [
{ id: 'contact', label: 'Contact details', icon: UserRoundIcon, description: 'Your name, email and phone.' },
{ id: 'password', label: 'Password', icon: KeyRoundIcon, description: 'Keep your account secure.' },
{ id: 'payouts', label: 'Payouts', icon: WalletIcon, description: 'Where your earnings are sent.' }];


export function AccountSettings() {
  const { section = 'contact' } = useParams();
  const { user } = useStore();
  const current = sections.find((s) => s.id === section);

  if (!current) return <Navigate to="/account/contact" replace />;

  if (!user) {
    return (
      <div className="container-page py-20">
        <EmptyState icon={LockIcon} title="Log in to manage your account" body="Account settings are only available when you’re signed in." action={<Link to="/login" className="btn btn-ink">Log in</Link>} />
      </div>);

  }

  return (
    <div className="bg-paper py-8 md:py-12">
      <div className="container-page">
        <p className="eyebrow mb-1">Account</p>
        <h1 className="mb-8 text-3xl font-bold tracking-tight md:text-4xl">Settings</h1>
        <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
          <nav aria-label="Account settings">
            <ul className="no-scrollbar flex gap-2 overflow-x-auto lg:flex-col lg:gap-1">
              {sections.map(({ id, label, icon: Icon }) =>
              <li key={id} className="shrink-0">
                  <NavLink
                  to={`/account/${id}`}
                  className={({ isActive }) =>
                  `flex items-center gap-2.5 rounded-xl border px-3 py-2.5 text-sm font-semibold transition ${
                  isActive ? 'border-ink bg-white shadow-pop-sm' : 'border-transparent hover:bg-white'}`

                  }>
                  
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    {label}
                  </NavLink>
                </li>
              )}
            </ul>
          </nav>
          <section className="card p-6 md:p-8" aria-labelledby="section-title">
            <h2 id="section-title" className="text-2xl font-bold">
              {current.label}
            </h2>
            <p className="mb-6 mt-1 text-sm text-muted">{current.description}</p>
            {section === 'contact' && <ContactForm />}
            {section === 'password' && <PasswordForm />}
            {section === 'payouts' && <PayoutsPanel />}
          </section>
        </div>
      </div>
    </div>);

}
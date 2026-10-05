import React from 'react';
import { NavLink, Navigate, useParams } from 'react-router-dom';
import { KeyRoundIcon, MailIcon, WalletIcon } from 'lucide-react';
import { ContactForm } from '../components/account/ContactForm';
import { PasswordForm } from '../components/account/PasswordForm';
import { PayoutsPanel } from '../components/account/PayoutsPanel';

const sections = [
{ id: 'contact', label: 'Contact details', description: 'Email, phone and notifications', icon: MailIcon, Component: ContactForm },
{ id: 'password', label: 'Password', description: 'Keep your account secure', icon: KeyRoundIcon, Component: PasswordForm },
{ id: 'payouts', label: 'Payouts', description: 'Bank account and earnings', icon: WalletIcon, Component: PayoutsPanel }];


export function AccountSettings() {
  const { section = 'contact' } = useParams();
  const current = sections.find((s) => s.id === section);
  if (!current) return <Navigate to="/account/contact" replace />;
  const { Component } = current;

  return (
    <div className="container-page py-10 lg:py-14">
      <h1 className="text-3xl font-black tracking-tight text-ink-900">Account settings</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]">
        <nav aria-label="Account sections" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:block lg:space-y-1 lg:px-0">
          {sections.map((s) =>
          <NavLink
            key={s.id}
            to={`/account/${s.id}`}
            className={({ isActive }) =>
            `flex shrink-0 items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition ${isActive ? 'bg-white text-ink-900 shadow-soft' : 'text-ink-600 hover:bg-white/70 hover:text-ink-900'}`
            }>
            
              <s.icon className="h-4 w-4" aria-hidden="true" />
              {s.label}
            </NavLink>
          )}
        </nav>
        <section className="card p-6 sm:p-8" aria-labelledby="section-title">
          <h2 id="section-title" className="text-xl font-black text-ink-900">
            {current.label}
          </h2>
          <p className="mt-1 text-sm text-ink-600">{current.description}</p>
          <div className="mt-6 max-w-2xl">
            <Component />
          </div>
        </section>
      </div>
    </div>);

}
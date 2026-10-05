import React from 'react';
import { NavLink, Navigate, useParams } from 'react-router-dom';
import { KeyRoundIcon, LandmarkIcon, MailIcon } from 'lucide-react';
import { ContactSettings } from '../components/account/ContactSettings';
import { PasswordSettings } from '../components/account/PasswordSettings';
import { PayoutSettings } from '../components/account/PayoutSettings';
import { cn } from '../utils/cn';

const sections = [
{ id: 'contact', label: 'Contact details', icon: MailIcon, title: 'Contact details', text: 'Keep your email and phone up to date so sitters can reach you.', Component: ContactSettings },
{ id: 'password', label: 'Password', icon: KeyRoundIcon, title: 'Password', text: 'Use a strong password you don’t use anywhere else.', Component: PasswordSettings },
{ id: 'payouts', label: 'Payouts', icon: LandmarkIcon, title: 'Payout details', text: 'Where we send your earnings from sitting.', Component: PayoutSettings }];


export function AccountSettings() {
  const { section } = useParams();
  const current = sections.find((s) => s.id === section);
  if (!current) return <Navigate to="/account/contact" replace />;
  const { Component } = current;

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-black tracking-tight text-stone-900 sm:text-4xl">Account settings</h1>
      <div className="mt-8 grid gap-8 md:grid-cols-[220px_1fr]">
        <nav aria-label="Account settings">
          <ul className="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4 md:mx-0 md:flex-col md:gap-1 md:px-0">
            {sections.map((s) =>
            <li key={s.id} className="shrink-0">
                <NavLink
                to={`/account/${s.id}`}
                className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 whitespace-nowrap rounded-2xl px-4 py-3 text-[15px] font-extrabold transition-colors',
                  isActive ? 'bg-white text-stone-900 shadow-card ring-1 ring-stone-100' : 'text-stone-600 hover:bg-white/70 hover:text-stone-900'
                )
                }>
                
                  <s.icon className="h-4 w-4" aria-hidden="true" />
                  {s.label}
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
        <section className="rounded-3xl bg-white p-6 shadow-card ring-1 ring-stone-100 sm:p-8" aria-labelledby="settings-heading">
          <h2 id="settings-heading" className="text-2xl font-black text-stone-900">
            {current.title}
          </h2>
          <p className="mb-8 mt-1 text-[15px] text-stone-600">{current.text}</p>
          <Component key={current.id} />
        </section>
      </div>
    </div>);

}
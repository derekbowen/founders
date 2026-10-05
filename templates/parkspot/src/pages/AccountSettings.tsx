import React from 'react';
import { Navigate, NavLink, useParams } from 'react-router-dom';
import { KeyRoundIcon, UserIcon, WalletIcon } from 'lucide-react';
import { RequireAuth } from '../components/common/RequireAuth';
import { ContactSection } from '../components/account/ContactSection';
import { PasswordSection } from '../components/account/PasswordSection';
import { PayoutsSection } from '../components/account/PayoutsSection';

const sections = [
{ id: 'contact', label: 'Contact details', icon: <UserIcon size={16} aria-hidden />, description: 'Your name, email and phone number.', Component: ContactSection },
{ id: 'password', label: 'Password', icon: <KeyRoundIcon size={16} aria-hidden />, description: 'Keep your account secure.', Component: PasswordSection },
{ id: 'payouts', label: 'Payouts', icon: <WalletIcon size={16} aria-hidden />, description: 'Where we send your hosting earnings.', Component: PayoutsSection }];


export function AccountSettings() {
  return (
    <RequireAuth title="Log in to manage your account">
      <AccountContent />
    </RequireAuth>);

}

function AccountContent() {
  const { section } = useParams();
  const current = sections.find((s) => s.id === section);
  if (!current) return <Navigate to="/account/contact" replace />;
  const { Component } = current;

  return (
    <div className="w-full bg-canvas pb-16">
      <div className="mx-auto max-w-5xl px-4 pt-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight">Account settings</h1>
        <div className="mt-8 grid gap-8 md:grid-cols-[220px_minmax(0,1fr)]">
          <nav aria-label="Account sections" className="no-scrollbar -mx-4 flex gap-1 overflow-x-auto px-4 md:mx-0 md:flex-col md:px-0">
            {sections.map((s) =>
            <NavLink
              key={s.id}
              to={`/account/${s.id}`}
              className={({ isActive }) =>
              `flex shrink-0 items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
              isActive ? 'bg-navy text-white' : 'hover:bg-surface'}`

              }>
              
                {s.icon}
                {s.label}
              </NavLink>
            )}
          </nav>
          <section className="rounded-2xl border border-line bg-surface p-5 sm:p-8" aria-labelledby="section-title">
            <h2 id="section-title" className="text-xl font-bold">
              {current.label}
            </h2>
            <p className="mt-1 text-sm text-muted">{current.description}</p>
            <div className="mt-6">
              <Component />
            </div>
          </section>
        </div>
      </div>
    </div>);

}
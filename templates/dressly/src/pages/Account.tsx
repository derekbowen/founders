import React from 'react';
import { NavLink, Navigate, useParams } from 'react-router-dom';
import { CreditCardIcon, LockIcon, RulerIcon, UserIcon } from 'lucide-react';
import { ContactSettings } from '../components/account/ContactSettings';
import { PasswordSettings } from '../components/account/PasswordSettings';
import { PayoutSettings } from '../components/account/PayoutSettings';
import { SizeSettings } from '../components/account/SizeSettings';
import { cx, eyebrow } from '../utils/styles';

const sections = [
{ id: 'contact', label: 'Contact details', icon: UserIcon, blurb: 'Your name, email and phone.', Component: ContactSettings },
{ id: 'password', label: 'Password', icon: LockIcon, blurb: 'Keep your account secure.', Component: PasswordSettings },
{ id: 'payouts', label: 'Payouts', icon: CreditCardIcon, blurb: 'Where your lending earnings go.', Component: PayoutSettings },
{ id: 'sizes', label: 'My sizes', icon: RulerIcon, blurb: 'Your fit profile for smarter search.', Component: SizeSettings }];


export function Account() {
  const { section } = useParams();
  const active = sections.find((s) => s.id === section);
  if (!active) return <Navigate to="/account/contact" replace />;
  const { Component } = active;

  return (
    <div className="mx-auto max-w-[1200px] px-4 pb-20 pt-8 md:px-8 md:pt-12">
      <p className={eyebrow}>Account settings</p>
      <h1 className="mt-2 font-display text-4xl md:text-5xl">Settings</h1>
      <div className="mt-10 grid gap-10 lg:grid-cols-[240px_1fr]">
        <nav aria-label="Account sections">
          <ul className="no-scrollbar flex gap-2 overflow-x-auto lg:flex-col lg:gap-1">
            {sections.map(({ id, label, icon: Icon }) =>
            <li key={id} className="shrink-0">
                <NavLink
                to={`/account/${id}`}
                className={({ isActive }) =>
                cx(
                  'flex items-center gap-3 whitespace-nowrap px-4 py-3 text-sm transition',
                  isActive ? 'bg-ink text-paper' : 'text-ink hover:bg-cream'
                )
                }>
                
                  <Icon size={16} aria-hidden="true" /> {label}
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
        <section aria-labelledby="section-heading" className="min-w-0">
          <div className="mb-8 border-b border-line pb-5">
            <h2 id="section-heading" className="font-display text-3xl">{active.label}</h2>
            <p className="mt-1 text-sm text-muted">{active.blurb}</p>
          </div>
          <Component />
        </section>
      </div>
    </div>);

}
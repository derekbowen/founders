import React from 'react';
import { KeyRoundIcon, LandmarkIcon, UserIcon } from 'lucide-react';
import { NavLink, Navigate, useParams } from 'react-router-dom';
import { ContactSettings } from '../components/settings/ContactSettings';
import { PasswordSettings } from '../components/settings/PasswordSettings';
import { PayoutSettings } from '../components/settings/PayoutSettings';

const sections = [
{ id: 'contact', label: 'Contact details', icon: UserIcon, component: ContactSettings },
{ id: 'password', label: 'Password', icon: KeyRoundIcon, component: PasswordSettings },
{ id: 'payouts', label: 'Payouts', icon: LandmarkIcon, component: PayoutSettings }];


export function AccountSettings() {
  const { section } = useParams();
  const active = sections.find((s) => s.id === section);
  if (!active) return <Navigate to="/account/contact" replace />;
  const Section = active.component;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Account settings</h1>
      <p className="mt-1 text-sm text-slate-600">Manage how you sign in, how we reach you, and how you get paid.</p>
      <div className="mt-6 grid gap-6 md:grid-cols-[220px_1fr]">
        <nav aria-label="Settings sections">
          <ul className="scrollbar-none flex gap-1 overflow-x-auto md:flex-col">
            {sections.map((s) =>
            <li key={s.id} className="shrink-0">
                <NavLink
                to={`/account/${s.id}`}
                className={({ isActive }) =>
                `flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive ? 'bg-primary-50 text-primary-800' : 'text-slate-700 hover:bg-slate-100'}`

                }>
                
                  <s.icon className="h-4 w-4" aria-hidden="true" />
                  {s.label}
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
        <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
          <Section />
        </div>
      </div>
    </div>);

}
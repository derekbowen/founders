import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { UserIcon, KeyRoundIcon, LandmarkIcon } from 'lucide-react';

const links = [
{ to: '/account/contact', label: 'Contact details', icon: UserIcon },
{ to: '/account/password', label: 'Password', icon: KeyRoundIcon },
{ to: '/account/payouts', label: 'Payouts', icon: LandmarkIcon }];


export function AccountLayout() {
  return (
    <div className="bg-ink-50">
      <div className="mx-auto max-w-page px-4 py-8 sm:px-6 md:py-12">
        <h1 className="text-3xl font-semibold tracking-tight text-ink-900">Account settings</h1>
        <div className="mt-8 grid gap-8 lg:grid-cols-[240px_1fr]">
          <nav aria-label="Account settings">
            <ul className="flex gap-2 overflow-x-auto scrollbar-none lg:flex-col lg:gap-1">
              {links.map((l) =>
              <li key={l.to} className="shrink-0">
                  <NavLink
                  to={l.to}
                  className={({ isActive }) =>
                  `flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                  isActive ? 'bg-white text-primary-700 shadow-card' : 'text-ink-700 hover:bg-white/70'}`

                  }>
                  
                    <l.icon size={16} aria-hidden="true" /> {l.label}
                  </NavLink>
                </li>
              )}
            </ul>
          </nav>
          <div className="min-w-0">
            <Outlet />
          </div>
        </div>
      </div>
    </div>);

}
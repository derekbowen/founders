import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { KeyRoundIcon, LandmarkIcon, MailIcon } from 'lucide-react';

const links = [
{ to: '/account/contact', label: 'Contact details', icon: MailIcon },
{ to: '/account/password', label: 'Password', icon: KeyRoundIcon },
{ to: '/account/payouts', label: 'Payouts', icon: LandmarkIcon }];


export function AccountLayout() {
  return (
    <div className="container-page py-10 lg:py-14">
      <h1 className="text-3xl font-semibold">Account settings</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)]">
        <nav aria-label="Account settings">
          <ul className="-mx-4 flex gap-1 overflow-x-auto px-4 lg:mx-0 lg:flex-col lg:px-0">
            {links.map((l) =>
            <li key={l.to} className="shrink-0">
                <NavLink
                to={l.to}
                className={({ isActive }) =>
                `focus-ring flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive ? 'bg-brand-50 text-brand-800' : 'text-ink-muted hover:bg-mist hover:text-ink'}`

                }>
                
                  <l.icon size={17} aria-hidden="true" /> {l.label}
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
        <div className="max-w-2xl">
          <Outlet />
        </div>
      </div>
    </div>);

}
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { BanknoteIcon, KeyRoundIcon, MapPinIcon, UserIcon } from 'lucide-react';

const nav = [
{ to: '/account/contact', label: 'Contact details', icon: UserIcon },
{ to: '/account/password', label: 'Password', icon: KeyRoundIcon },
{ to: '/account/payouts', label: 'Payouts', icon: BanknoteIcon },
{ to: '/account/shipping', label: 'Shipping address', icon: MapPinIcon }];


export function AccountLayout() {
  return (
    <div className="container-page py-8 lg:py-12">
      <h1 className="text-4xl font-medium tracking-tight">Account settings</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-[240px_1fr]">
        <nav aria-label="Account settings" className="-mx-4 flex gap-1 overflow-x-auto px-4 scrollbar-none lg:mx-0 lg:flex-col lg:px-0">
          {nav.map(({ to, label, icon: Icon }) =>
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
            `flex shrink-0 items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
            isActive ? 'bg-surface text-ink shadow-soft ring-1 ring-line' : 'text-muted hover:bg-subtle hover:text-ink'}`

            }>
            
              <Icon className="h-4 w-4" aria-hidden />
              {label}
            </NavLink>
          )}
        </nav>
        <div className="card p-6 sm:p-8">
          <Outlet />
        </div>
      </div>
    </div>);

}
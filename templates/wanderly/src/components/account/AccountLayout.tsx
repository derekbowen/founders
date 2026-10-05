import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { KeyRoundIcon, LandmarkIcon, UserIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

const links = [
{ to: '/account/contact', label: 'Contact details', icon: UserIcon },
{ to: '/account/password', label: 'Password', icon: KeyRoundIcon },
{ to: '/account/payouts', label: 'Payouts', icon: LandmarkIcon }];


export function AccountLayout() {
  return (
    <div className="bg-sand-50">
      <div className="mx-auto max-w-page px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Account settings</h1>
        <div className="mt-8 grid gap-8 lg:grid-cols-[240px_1fr]">
          <nav aria-label="Account settings" className="flex gap-2 overflow-x-auto scrollbar-none lg:flex-col">
            {links.map(({ to, label, icon: Icon }) =>
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
              twMerge(
                'flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-colors',
                isActive ? 'bg-white text-primary-700 shadow-card' : 'text-slate-700 hover:bg-white/70'
              )
              }>
              
                <Icon className="h-4 w-4" aria-hidden />
                {label}
              </NavLink>
            )}
          </nav>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
            <Outlet />
          </div>
        </div>
      </div>
    </div>);

}
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { UserIcon, KeyRoundIcon, LandmarkIcon } from 'lucide-react';
import { cn } from '../../utils/ui';

const tabs = [
{ to: '/account/contact', label: 'Contact details', icon: UserIcon },
{ to: '/account/password', label: 'Password', icon: KeyRoundIcon },
{ to: '/account/payouts', label: 'Payouts', icon: LandmarkIcon }];


export function AccountLayout() {
  return (
    <div className="w-full bg-white">
      <div className="mx-auto grid max-w-content gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[240px_1fr] lg:px-8 lg:py-14">
        <aside>
          <h1 className="font-heading text-3xl text-navy">Account</h1>
          <nav aria-label="Account settings" className="no-scrollbar mt-6 flex gap-2 overflow-x-auto lg:flex-col lg:gap-1">
            {tabs.map(({ to, label, icon: Icon }) =>
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
              cn('flex shrink-0 items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors', isActive ? 'bg-navy text-white' : 'text-ink hover:bg-sand-light')
              }>
              
                <Icon className="h-4 w-4" aria-hidden="true" />
                {label}
              </NavLink>
            )}
          </nav>
        </aside>
        <div className="max-w-2xl">
          <Outlet />
        </div>
      </div>
    </div>);

}
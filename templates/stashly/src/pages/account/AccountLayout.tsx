import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { UserIcon, KeyRoundIcon, LandmarkIcon } from 'lucide-react';
import { AuthGate } from '../../components/AuthGate';
import { ui, cx } from '../../utils/styles';

const tabs = [
{ to: '/account/contact', label: 'Contact details', icon: UserIcon },
{ to: '/account/password', label: 'Password', icon: KeyRoundIcon },
{ to: '/account/payouts', label: 'Payouts', icon: LandmarkIcon }];


export function AccountLayout() {
  return (
    <AuthGate title="account settings">
      <div className="bg-stone-50 pb-16">
        <div className={cx(ui.container, 'pt-8')}>
          <h1 className="text-3xl font-bold tracking-tight text-stone-900">Account settings</h1>
          <div className="mt-8 grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)]">
            <nav aria-label="Account" className="flex gap-1 overflow-x-auto scrollbar-none lg:flex-col">
              {tabs.map((t) =>
              <NavLink
                key={t.to}
                to={t.to}
                className={({ isActive }) =>
                cx(
                  'flex shrink-0 items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive ? 'bg-white text-brand-800 shadow-soft' : 'text-stone-700 hover:bg-white'
                )
                }>
                
                  <t.icon className="h-4 w-4" aria-hidden="true" />
                  {t.label}
                </NavLink>
              )}
            </nav>
            <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </AuthGate>);

}
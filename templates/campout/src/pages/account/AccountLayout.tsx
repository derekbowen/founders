import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { accountLinks } from '../../data/navigation';

export function AccountLayout() {
  return (
    <div className="container-page py-10 md:py-14">
      <h1 className="text-3xl font-extrabold text-ink-900">Account settings</h1>
      <div className="mt-8 grid gap-8 md:grid-cols-[220px_1fr]">
        <nav aria-label="Account" className="no-scrollbar -mx-4 flex gap-1 overflow-x-auto px-4 md:mx-0 md:flex-col md:px-0">
          {accountLinks.map((l) =>
          <NavLink
            key={l.to}
            to={l.to}
            className={({ isActive }) =>
            `shrink-0 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
            isActive ? 'bg-primary-700 text-white' : 'text-ink-700 hover:bg-sand-100'}`

            }>
            
              {l.label}
            </NavLink>
          )}
        </nav>
        <div className="min-w-0 max-w-2xl">
          <Outlet />
        </div>
      </div>
    </div>);

}
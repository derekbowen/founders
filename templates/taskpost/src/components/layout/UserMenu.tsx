import React, { useCallback, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { InboxIcon, LogOutIcon, SettingsIcon, UserIcon } from 'lucide-react';
import { Avatar } from '../Avatar';
import { useApp } from '../../hooks/useApp';
import { useClickOutside } from '../../hooks/useClickOutside';
import type { CurrentUser } from '../../types/marketplace';

export function UserMenu({ user }: {user: CurrentUser;}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpen(false), []);
  const { logout } = useApp();
  const navigate = useNavigate();
  useClickOutside(ref, close, open);

  const items = [
  { to: `/profile/${user.id}`, label: 'Your profile', icon: UserIcon },
  { to: '/inbox', label: 'Inbox', icon: InboxIcon },
  { to: '/account/contact', label: 'Account settings', icon: SettingsIcon }];


  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="Open account menu"
        className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2">
        
        <Avatar name={user.name} alt={user.name} size="sm" />
      </button>
      <AnimatePresence>
        {open &&
        <motion.div
          role="menu"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.12 }}
          className="absolute right-0 top-full z-50 mt-2 w-60 rounded-xl border border-ink-200 bg-white p-1.5 shadow-lift">
          
            <div className="border-b border-ink-100 px-3 pb-3 pt-2">
              <p className="truncate text-sm font-extrabold text-ink-900">{user.name}</p>
              <p className="truncate text-xs text-ink-500">{user.email}</p>
              <p className="mt-1.5 text-xs font-bold text-primary-700">
                {user.roles.map((r) => r === 'pro' ? 'Pro' : 'Customer').join(' · ')}
              </p>
            </div>
            <div className="py-1">
              {items.map(({ to, label, icon: Icon }) =>
            <Link
              key={to}
              to={to}
              role="menuitem"
              onClick={close}
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-semibold text-ink-700 hover:bg-ink-50 hover:text-ink-900">
              
                  <Icon className="h-4 w-4 text-ink-500" aria-hidden="true" />
                  {label}
                </Link>
            )}
            </div>
            <button
            type="button"
            role="menuitem"
            onClick={() => {
              close();
              logout();
              navigate('/');
            }}
            className="flex w-full items-center gap-2.5 rounded-lg border-t border-ink-100 px-3 py-2 text-sm font-semibold text-ink-700 hover:bg-ink-50">
            
              <LogOutIcon className="h-4 w-4 text-ink-500" aria-hidden="true" />
              Log out
            </button>
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}
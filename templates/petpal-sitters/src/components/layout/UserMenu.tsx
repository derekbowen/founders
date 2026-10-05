import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  FileTextIcon,
  InboxIcon,
  InfoIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  PlusCircleIcon,
  SettingsIcon,
  ShieldIcon,
  UserIcon,
  UserPlusIcon } from
'lucide-react';
import { Avatar } from '../Avatar';
import { useAuth } from '../../contexts/AuthContext';
import { brand } from '../../data/brand';

interface MenuItem {
  label: string;
  to: string;
  icon: React.ElementType;
}

export function UserMenu() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => setOpen(false), [location.pathname, location.search]);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const primary: MenuItem[] = user ?
  [
  { label: 'Profile', to: '/profile', icon: UserIcon },
  { label: 'Inbox', to: '/inbox', icon: InboxIcon },
  { label: 'Create a listing', to: '/listings/new', icon: PlusCircleIcon },
  { label: 'Account settings', to: '/account/contact', icon: SettingsIcon }] :

  [
  { label: 'Sign up', to: '/signup', icon: UserPlusIcon },
  { label: 'Log in', to: '/login', icon: LogInIcon },
  { label: 'Become a sitter', to: '/listings/new', icon: PlusCircleIcon }];


  const secondary: MenuItem[] = [
  { label: `About ${brand.name}`, to: '/about', icon: InfoIcon },
  { label: 'Terms of service', to: '/terms', icon: FileTextIcon },
  { label: 'Privacy policy', to: '/privacy', icon: ShieldIcon }];


  const itemClass =
  'flex items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] font-semibold text-stone-700 hover:bg-primary-50 hover:text-stone-900 focus-visible:bg-primary-50 focus-visible:outline-none';

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="Open menu"
        className="flex h-11 items-center gap-2 rounded-full border border-stone-200 bg-white pl-3 pr-1.5 transition-shadow hover:shadow-card focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-200">
        
        <MenuIcon className="h-4 w-4 text-stone-700" aria-hidden="true" />
        {user ?
        <Avatar name={user.name} alt={user.name} src={user.avatar} size="sm" /> :

        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-100 text-stone-600">
            <UserIcon className="h-4 w-4" aria-hidden="true" />
          </span>
        }
      </button>
      <AnimatePresence>
        {open &&
        <motion.div
          initial={{ opacity: 0, y: -6, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6, scale: 0.98 }}
          transition={{ duration: 0.14 }}
          role="menu"
          className="absolute right-0 z-50 mt-2 w-64 origin-top-right rounded-2xl border border-stone-100 bg-white p-2 shadow-lift">
          
            {user &&
          <div className="mb-1 border-b border-stone-100 px-3 pb-3 pt-2">
                <p className="font-extrabold text-stone-900">{user.name}</p>
                <p className="truncate text-sm text-stone-500">{user.email}</p>
              </div>
          }
            {primary.map((item) =>
          <Link key={item.label} to={item.to} role="menuitem" className={itemClass}>
                <item.icon className="h-4 w-4 text-stone-500" aria-hidden="true" />
                {item.label}
              </Link>
          )}
            <div className="my-1 border-t border-stone-100" />
            {secondary.map((item) =>
          <Link key={item.label} to={item.to} role="menuitem" className={itemClass}>
                <item.icon className="h-4 w-4 text-stone-500" aria-hidden="true" />
                {item.label}
              </Link>
          )}
            {user &&
          <>
                <div className="my-1 border-t border-stone-100" />
                <button
              type="button"
              role="menuitem"
              className={`${itemClass} w-full`}
              onClick={() => {
                logout();
                navigate('/');
              }}>
              
                  <LogOutIcon className="h-4 w-4 text-stone-500" aria-hidden="true" />
                  Log out
                </button>
              </>
          }
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}
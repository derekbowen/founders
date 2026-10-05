import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  CompassIcon,
  FileTextIcon,
  InfoIcon,
  LogInIcon,
  LogOutIcon,
  MailIcon,
  MenuIcon,
  PlusCircleIcon,
  SettingsIcon,
  ShieldIcon,
  UserIcon,
  UserPlusIcon } from
'lucide-react';
import { Avatar } from '../Avatar';
import { useAuth } from '../../contexts/AuthContext';
import { useTransactions } from '../../contexts/TransactionsContext';

interface MenuLink {
  to: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
}

export function NavMenu() {
  const { user, isSignedIn, logout } = useAuth();
  const { unreadCount } = useTransactions();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const primary: MenuLink[] = [
  { to: '/s', label: 'Browse services', icon: <CompassIcon className="h-4 w-4" /> },
  { to: '/create-listing', label: 'Offer your services', icon: <PlusCircleIcon className="h-4 w-4" /> },
  { to: '/inbox', label: 'Inbox', icon: <MailIcon className="h-4 w-4" />, badge: isSignedIn ? unreadCount : 0 }];

  const account: MenuLink[] = isSignedIn ?
  [
  { to: `/u/${user?.id}`, label: 'Your profile', icon: <UserIcon className="h-4 w-4" /> },
  { to: '/account/contact', label: 'Account settings', icon: <SettingsIcon className="h-4 w-4" /> }] :

  [
  { to: '/login', label: 'Log in', icon: <LogInIcon className="h-4 w-4" /> },
  { to: '/signup', label: 'Sign up', icon: <UserPlusIcon className="h-4 w-4" /> }];

  const company: MenuLink[] = [
  { to: '/about', label: 'About', icon: <InfoIcon className="h-4 w-4" /> },
  { to: '/terms', label: 'Terms of service', icon: <FileTextIcon className="h-4 w-4" /> },
  { to: '/privacy', label: 'Privacy policy', icon: <ShieldIcon className="h-4 w-4" /> }];


  const renderGroup = (items: MenuLink[]) =>
  <ul className="py-1.5">
      {items.map((item) =>
    <li key={item.to}>
          <Link
        to={item.to}
        role="menuitem"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:bg-slate-100 focus-visible:outline-none">
        
            <span className="text-slate-400" aria-hidden="true">{item.icon}</span>
            <span className="flex-1">{item.label}</span>
            {!!item.badge &&
        <span className="rounded-full bg-primary-600 px-1.5 py-0.5 text-[11px] font-bold leading-none text-white">{item.badge}</span>
        }
          </Link>
        </li>
    )}
    </ul>;


  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={isSignedIn ? 'Open account menu' : 'Open menu'}
        className="flex h-10 items-center gap-2 rounded-full border border-slate-200 bg-white pl-3 pr-1 transition-colors hover:border-slate-300 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500">
        
        <MenuIcon className="h-4 w-4 text-slate-600" aria-hidden="true" />
        {isSignedIn && user ?
        <Avatar name={user.name} alt="" src={user.avatar} size="sm" /> :

        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500">
            <UserIcon className="h-4 w-4" aria-hidden="true" />
          </span>
        }
      </button>
      <AnimatePresence>
        {open &&
        <motion.div
          role="menu"
          initial={{ opacity: 0, y: -6, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6, scale: 0.98 }}
          transition={{ duration: 0.14 }}
          className="absolute right-0 z-50 mt-2 w-64 origin-top-right divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-pop">
          
            {isSignedIn && user &&
          <div className="px-3 py-2.5">
                <p className="text-sm font-semibold text-slate-900">{user.name}</p>
                <p className="text-xs text-slate-500">jordan@studiolee.co</p>
              </div>
          }
            {renderGroup(primary)}
            {renderGroup(account)}
            {renderGroup(company)}
            {isSignedIn &&
          <div className="py-1.5">
                <button
              type="button"
              role="menuitem"
              onClick={() => {
                logout();
                navigate('/');
              }}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-rose-700 transition-colors hover:bg-rose-50 focus-visible:bg-rose-50 focus-visible:outline-none">
              
                  <LogOutIcon className="h-4 w-4" aria-hidden="true" />
                  Log out
                </button>
              </div>
          }
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}
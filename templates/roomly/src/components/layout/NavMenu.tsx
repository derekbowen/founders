import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  FileTextIcon,
  InfoIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  MessageSquareIcon,
  PlusIcon,
  SearchIcon,
  SettingsIcon,
  ShieldIcon,
  UserIcon,
  UserPlusIcon } from
'lucide-react';
import { Avatar } from '../Avatar';
import { useApp } from '../../contexts/AppContext';

interface MenuItem {
  to: string;
  label: string;
  icon: React.ReactNode;
}

export function NavMenu() {
  const { currentUser, logout, unreadCount } = useApp();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => setOpen(false), [location.pathname]);

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

  const primary: MenuItem[] = currentUser ?
  [
  { to: '/profile', label: 'My profile', icon: <UserIcon size={16} /> },
  { to: '/inbox', label: unreadCount ? `Inbox (${unreadCount})` : 'Inbox', icon: <MessageSquareIcon size={16} /> },
  { to: '/listings/new', label: 'List a room', icon: <PlusIcon size={16} /> },
  { to: '/account/contact', label: 'Account settings', icon: <SettingsIcon size={16} /> }] :

  [
  { to: '/login', label: 'Log in', icon: <LogInIcon size={16} /> },
  { to: '/signup', label: 'Sign up', icon: <UserPlusIcon size={16} /> },
  { to: '/listings/new', label: 'List a room', icon: <PlusIcon size={16} /> }];


  const secondary: MenuItem[] = [
  { to: '/s', label: 'Browse rooms', icon: <SearchIcon size={16} /> },
  { to: '/about', label: 'About us', icon: <InfoIcon size={16} /> },
  { to: '/terms', label: 'Terms of service', icon: <FileTextIcon size={16} /> },
  { to: '/privacy', label: 'Privacy policy', icon: <ShieldIcon size={16} /> }];


  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Open menu"
        className="flex items-center gap-2 rounded-full border border-navy-200 bg-white py-1 pl-3 pr-1 transition hover:shadow-card focus:outline-none focus-visible:ring-4 focus-visible:ring-primary-100">
        
        <MenuIcon size={16} className="text-navy-700" />
        {currentUser ?
        <Avatar name={currentUser.name} alt={currentUser.name} size="sm" src={currentUser.avatar} /> :

        <span className="grid h-8 w-8 place-items-center rounded-full bg-navy-100 text-navy-600">
            <UserIcon size={16} />
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
          transition={{ duration: 0.15 }}
          className="absolute right-0 top-full z-50 mt-2 w-[min(18rem,calc(100vw-2rem))] origin-top-right overflow-hidden rounded-2xl border border-navy-100 bg-white py-2 shadow-lift">
          
            {currentUser &&
          <div className="border-b border-navy-100 px-4 pb-3 pt-1">
                <p className="font-semibold text-navy-900">{currentUser.name}</p>
                <p className="text-xs capitalize text-navy-500">{currentUser.type} account</p>
              </div>
          }
            <ul className="py-1">
              {primary.map((item) =>
            <MenuLink key={item.to + item.label} item={item} bold />
            )}
            </ul>
            <div className="my-1 border-t border-navy-100" />
            <ul className="py-1">
              {secondary.map((item) =>
            <MenuLink key={item.to} item={item} />
            )}
            </ul>
            {currentUser &&
          <>
                <div className="my-1 border-t border-navy-100" />
                <button
              role="menuitem"
              onClick={() => {
                logout();
                navigate('/');
              }}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-coral-700 transition hover:bg-coral-50">
              
                  <LogOutIcon size={16} />
                  Log out
                </button>
              </>
          }
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}

function MenuLink({ item, bold = false }: {item: MenuItem;bold?: boolean;}) {
  return (
    <li>
      <Link
        role="menuitem"
        to={item.to}
        className={`flex items-center gap-3 px-4 py-2.5 text-sm transition hover:bg-navy-50 focus:bg-navy-50 focus:outline-none ${
        bold ? 'font-medium text-navy-900' : 'text-navy-600'}`
        }>
        
        <span className="text-navy-400">{item.icon}</span>
        {item.label}
      </Link>
    </li>);

}
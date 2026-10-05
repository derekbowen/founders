import React from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { XIcon } from 'lucide-react';
import { Logo } from './Logo';
import { TopbarSearch } from './TopbarSearch';
import { Button } from '../ui/Button';
import { useAuth } from '../../contexts/AuthContext';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const { user, signOut } = useAuth();

  const links = [
  { to: '/s', label: 'Explore experiences' },
  { to: '/host/new/details', label: 'Host an experience' },
  ...(user ?
  [
  { to: '/inbox/trips', label: 'Inbox' },
  { to: '/u/me', label: 'Profile' },
  { to: '/account/contact', label: 'Account settings' }] :

  []),
  { to: '/about', label: 'About' },
  { to: '/terms', label: 'Terms of service' },
  { to: '/privacy', label: 'Privacy policy' }];


  return (
    <AnimatePresence>
      {open &&
      <>
          <motion.div
          className="fixed inset-0 z-50 bg-slate-900/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          aria-hidden />
        
          <motion.nav
          aria-label="Mobile"
          className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-white shadow-float"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}>
          
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <Logo />
              <button
              type="button"
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-slate-100"
              aria-label="Close menu">
              
                <XIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="px-5 py-4" onSubmit={onClose}>
              <TopbarSearch />
            </div>
            <ul className="flex-1 overflow-y-auto px-3">
              {links.map((l) =>
            <li key={l.to}>
                  <Link
                to={l.to}
                onClick={onClose}
                className="block rounded-xl px-3 py-3 text-base font-medium text-slate-800 hover:bg-sand-100">
                
                    {l.label}
                  </Link>
                </li>
            )}
            </ul>
            <div className="grid gap-2 border-t border-slate-100 p-5">
              {user ?
            <Button
              variant="outline"
              fullWidth
              onClick={() => {
                signOut();
                onClose();
              }}>
              
                  Log out
                </Button> :

            <>
                  <Button to="/signup" fullWidth onClick={onClose}>
                    Sign up
                  </Button>
                  <Button to="/login" variant="outline" fullWidth onClick={onClose}>
                    Log in
                  </Button>
                </>
            }
            </div>
          </motion.nav>
        </>
      }
    </AnimatePresence>);

}
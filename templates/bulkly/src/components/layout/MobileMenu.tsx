import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { XIcon } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { BrandLogo } from './BrandLogo';
import { ButtonLink } from '../ui/ButtonLink';
import { useAuth } from '../../contexts/AuthContext';
import { categories } from '../../data/categories';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const { user, signOut } = useAuth();

  const primaryLinks = [
  { to: '/search', label: 'Browse all products' },
  { to: '/sell/new', label: 'Sell wholesale' },
  { to: '/inbox/purchases', label: 'Inbox & orders' },
  { to: '/checkout', label: 'Cart & checkout' },
  { to: `/brands/${user?.ownedBrandId ?? 'fern-field'}`, label: 'Brand profile' },
  { to: '/account/contact', label: 'Account settings' }];

  const companyLinks = [
  { to: '/about', label: 'About' },
  { to: '/terms', label: 'Terms' },
  { to: '/privacy', label: 'Privacy' }];


  const linkClass = ({ isActive }: {isActive: boolean;}) =>
  `block rounded-lg px-3 py-2.5 text-sm font-medium ${isActive ? 'bg-primary-50 text-primary-800' : 'text-slate-800 hover:bg-slate-50'}`;

  return (
    <AnimatePresence>
      {open &&
      <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Main menu">
          <motion.div
          className="absolute inset-0 bg-slate-900/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose} />
        
          <motion.nav
          className="absolute inset-y-0 right-0 flex w-full max-w-xs flex-col overflow-y-auto bg-white shadow-xl"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}>
          
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
              <BrandLogo />
              <button type="button" onClick={onClose} className="rounded-lg p-2 text-slate-600 hover:bg-slate-100" aria-label="Close menu">
                <XIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 space-y-6 p-4">
              {!user &&
            <div className="grid grid-cols-2 gap-2">
                  <ButtonLink to="/login" variant="secondary" onClick={onClose}>
                    Log in
                  </ButtonLink>
                  <ButtonLink to="/signup" onClick={onClose}>
                    Sign up
                  </ButtonLink>
                </div>
            }
              <ul className="space-y-0.5">
                {primaryLinks.map((l) =>
              <li key={l.to}>
                    <NavLink to={l.to} className={linkClass} onClick={onClose}>
                      {l.label}
                    </NavLink>
                  </li>
              )}
              </ul>
              <div>
                <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Categories</p>
                <ul className="space-y-0.5">
                  {categories.map((c) =>
                <li key={c.id}>
                      <NavLink to={`/search?category=${c.id}`} className={linkClass({ isActive: false })} onClick={onClose}>
                        {c.name}
                      </NavLink>
                    </li>
                )}
                </ul>
              </div>
              <div>
                <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Company</p>
                <ul className="space-y-0.5">
                  {companyLinks.map((l) =>
                <li key={l.to}>
                      <NavLink to={l.to} className={linkClass} onClick={onClose}>
                        {l.label}
                      </NavLink>
                    </li>
                )}
                </ul>
              </div>
            </div>
            {user &&
          <div className="border-t border-slate-200 p-4">
                <button
              type="button"
              onClick={() => {
                signOut();
                onClose();
              }}
              className="w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-700 hover:bg-slate-50">
              
                  Log out
                </button>
              </div>
          }
          </motion.nav>
        </div>
      }
    </AnimatePresence>);

}
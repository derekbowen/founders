import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { XIcon } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { ButtonLink } from '../ui/ButtonLink';
import { useApp } from '../../hooks/useApp';
import { cn } from '../../utils/styles';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  inboxCount: number;
}

const sections = [
{
  title: 'Marketplace',
  links: [
  { to: '/search', label: 'Find work' },
  { to: '/post-job', label: 'Post a job' },
  { to: '/inbox', label: 'Inbox' }]

},
{
  title: 'Company',
  links: [
  { to: '/about', label: 'About & how it works' },
  { to: '/terms', label: 'Terms of Service' },
  { to: '/privacy', label: 'Privacy Policy' }]

}];


export function MobileMenu({ open, onClose, inboxCount }: MobileMenuProps) {
  const { user, logout } = useApp();
  return (
    <AnimatePresence>
      {open &&
      <div className="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <motion.div
          className="absolute inset-0 bg-ink-950/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose} />
        
          <motion.nav
          className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-white shadow-lift"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', stiffness: 380, damping: 38 }}>
          
            <div className="flex h-16 items-center justify-between border-b border-ink-200 px-4">
              <Logo />
              <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-2 text-ink-700 hover:bg-ink-100"
              aria-label="Close menu">
              
                <XIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-6">
              {sections.map((section) =>
            <div key={section.title} className="mb-6">
                  <p className="px-3 text-xs font-bold uppercase tracking-wider text-ink-500">{section.title}</p>
                  <ul className="mt-2 space-y-1">
                    {section.links.map((link) =>
                <li key={link.to}>
                        <NavLink
                    to={link.to}
                    onClick={onClose}
                    className={({ isActive }) =>
                    cn(
                      'flex items-center justify-between rounded-lg px-3 py-2.5 text-base font-bold',
                      isActive ? 'bg-primary-50 text-primary-700' : 'text-ink-800 hover:bg-ink-50'
                    )
                    }>
                    
                          {link.label}
                          {link.to === '/inbox' && inboxCount > 0 &&
                    <span className="rounded-full bg-primary-600 px-2 py-0.5 text-xs font-bold text-white">
                              {inboxCount}
                            </span>
                    }
                        </NavLink>
                      </li>
                )}
                  </ul>
                </div>
            )}
              {user &&
            <div className="mb-6">
                  <p className="px-3 text-xs font-bold uppercase tracking-wider text-ink-500">Account</p>
                  <ul className="mt-2 space-y-1">
                    <li>
                      <Link to={`/profile/${user.id}`} onClick={onClose} className="block rounded-lg px-3 py-2.5 text-base font-bold text-ink-800 hover:bg-ink-50">
                        Your profile
                      </Link>
                    </li>
                    <li>
                      <Link to="/account/contact" onClick={onClose} className="block rounded-lg px-3 py-2.5 text-base font-bold text-ink-800 hover:bg-ink-50">
                        Account settings
                      </Link>
                    </li>
                  </ul>
                </div>
            }
            </div>
            <div className="border-t border-ink-200 p-4">
              {user ?
            <button
              type="button"
              onClick={() => {
                logout();
                onClose();
              }}
              className="w-full rounded-lg border border-ink-300 py-2.5 text-sm font-bold text-ink-800 hover:bg-ink-50">
              
                  Log out
                </button> :

            <div className="grid grid-cols-2 gap-3">
                  <ButtonLink to="/login" variant="secondary" onClick={onClose}>
                    Log in
                  </ButtonLink>
                  <ButtonLink to="/signup" onClick={onClose}>
                    Sign up
                  </ButtonLink>
                </div>
            }
            </div>
          </motion.nav>
        </div>
      }
    </AnimatePresence>);

}
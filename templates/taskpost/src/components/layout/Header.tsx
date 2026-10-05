import React, { useMemo, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { MenuIcon, PlusIcon } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { ButtonLink } from '../ui/ButtonLink';
import { NavDropdown } from './NavDropdown';
import { UserMenu } from './UserMenu';
import { MobileMenu } from './MobileMenu';
import { useApp } from '../../hooks/useApp';
import { cn } from '../../utils/styles';
import { needsAction } from '../../utils/transactions';

const navLinkClass = ({ isActive }: {isActive: boolean;}) =>
cn(
  'relative inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-bold transition-colors',
  isActive ? 'text-primary-700' : 'text-ink-700 hover:bg-ink-100 hover:text-ink-900'
);

export function Header() {
  const { user, transactions } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);

  const inboxCount = useMemo(
    () => user ? transactions.filter((t) => needsAction(t, user.id)).length : 0,
    [user, transactions]
  );

  return (
    <header className="sticky top-0 z-40 border-b border-ink-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <Logo />
          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            <NavLink to="/search" className={navLinkClass}>
              Find work
            </NavLink>
            <NavLink to="/post-job" className={navLinkClass}>
              Post a job
            </NavLink>
            <NavLink to="/inbox" className={navLinkClass}>
              Inbox
              {inboxCount > 0 &&
              <span className="rounded-full bg-primary-600 px-1.5 py-0.5 text-[11px] font-bold leading-none text-white">
                  {inboxCount}
                  <span className="sr-only"> items need your attention</span>
                </span>
              }
            </NavLink>
            <NavDropdown
              label="Company"
              items={[
              { to: '/about', label: 'About', description: 'How the reverse marketplace works' },
              { to: '/terms', label: 'Terms of Service', description: 'The rules for customers and pros' },
              { to: '/privacy', label: 'Privacy Policy', description: 'How we handle your data' }]
              } />
            
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <ButtonLink to="/post-job" size="sm" leftIcon={<PlusIcon className="h-4 w-4" />} className="hidden sm:inline-flex">
            Post a job
          </ButtonLink>
          {user ?
          <div className="hidden lg:block">
              <UserMenu user={user} />
            </div> :

          <div className="hidden items-center gap-1 lg:flex">
              <Link to="/login" className="rounded-lg px-3 py-2 text-sm font-bold text-ink-700 hover:bg-ink-100">
                Log in
              </Link>
              <ButtonLink to="/signup" variant="secondary" size="sm">
                Sign up
              </ButtonLink>
            </div>
          }
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="relative rounded-lg p-2 text-ink-800 hover:bg-ink-100 lg:hidden"
            aria-label="Open menu">
            
            <MenuIcon className="h-6 w-6" />
            {inboxCount > 0 &&
            <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-primary-600 ring-2 ring-white" aria-hidden="true" />
            }
          </button>
        </div>
      </div>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} inboxCount={inboxCount} />
    </header>);

}
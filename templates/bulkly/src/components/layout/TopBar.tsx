import React, { useState } from 'react';
import { InboxIcon, MenuIcon, ShoppingCartIcon } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { BrandLogo } from './BrandLogo';
import { HeaderSearch } from './HeaderSearch';
import { MobileMenu } from './MobileMenu';
import { UserMenu } from './UserMenu';
import { ButtonLink } from '../ui/ButtonLink';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { categories } from '../../data/categories';
import { orders } from '../../data/orders';
import { needsAction } from '../../hooks/useInbox';

function CountBadge({ count, label }: {count: number;label: string;}) {
  if (count <= 0) return null;
  return (
    <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-accent-400 px-1 text-[10px] font-bold text-primary-950 ring-2 ring-white">
      {count > 99 ? '99+' : count}
      <span className="sr-only"> {label}</span>
    </span>);

}

export function TopBar() {
  const { user } = useAuth();
  const { totalCases } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const iconLink =
  'relative flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500';

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <BrandLogo />
        <HeaderSearch className="hidden max-w-xl flex-1 md:block" />
        <nav className="ml-auto flex items-center gap-1" aria-label="Primary">
          <NavLink
            to="/search"
            className={({ isActive }) =>
            `hidden rounded-lg px-3 py-2 text-sm font-medium lg:block ${isActive ? 'text-primary-800' : 'text-slate-700 hover:bg-slate-100'}`
            }>
            
            Browse
          </NavLink>
          <NavLink
            to="/sell/new"
            className={({ isActive }) =>
            `hidden rounded-lg px-3 py-2 text-sm font-medium lg:block ${isActive ? 'text-primary-800' : 'text-slate-700 hover:bg-slate-100'}`
            }>
            
            Sell wholesale
          </NavLink>
          <Link to="/inbox/purchases" className={`${iconLink} hidden sm:flex`} aria-label="Inbox">
            <InboxIcon className="h-5 w-5" aria-hidden="true" />
            {user && <CountBadge count={orders.filter(needsAction).length} label="orders need action" />}
          </Link>
          <Link to="/checkout" className={iconLink} aria-label={`Cart, ${totalCases} cases`}>
            <ShoppingCartIcon className="h-5 w-5" aria-hidden="true" />
            <CountBadge count={totalCases} label="cases in cart" />
          </Link>
          {user ?
          <div className="ml-1 hidden lg:block">
              <UserMenu />
            </div> :

          <div className="ml-2 hidden items-center gap-2 lg:flex">
              <ButtonLink to="/signup" variant="secondary" size="sm">
                Sign up
              </ButtonLink>
              <ButtonLink to="/login" size="sm">
                Log in
              </ButtonLink>
            </div>
          }
          <button type="button" onClick={() => setMenuOpen(true)} className={`${iconLink} lg:hidden`} aria-label="Open menu">
            <MenuIcon className="h-5 w-5" />
          </button>
        </nav>
      </div>
      <div className="border-t border-slate-100 px-4 pb-3 pt-2 md:hidden">
        <HeaderSearch />
      </div>
      <nav className="hidden border-t border-slate-100 lg:block" aria-label="Categories">
        <ul className="mx-auto flex h-10 max-w-7xl items-center gap-6 px-8 text-sm">
          {categories.map((c) =>
          <li key={c.id}>
              <Link to={`/search?category=${c.id}`} className="text-slate-600 transition-colors hover:text-primary-700">
                {c.name}
              </Link>
            </li>
          )}
          <li className="ml-auto">
            <Link to="/about" className="text-slate-600 transition-colors hover:text-primary-700">
              How it works
            </Link>
          </li>
        </ul>
      </nav>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>);

}
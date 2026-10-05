import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { InboxIcon, MenuIcon, ShoppingBagIcon, StoreIcon } from 'lucide-react';
import { brand } from '../../data/brand';
import { categories } from '../../data/categories';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { useOrders } from '../../contexts/OrdersContext';
import { Logo } from '../ui/Logo';
import { ButtonLink } from '../ui/ButtonLink';
import { SearchBar } from './SearchBar';
import { UserMenu } from './UserMenu';
import { MobileMenu } from './MobileMenu';

export function TopBar() {
  const { user } = useAuth();
  const { count } = useCart();
  const { orders } = useOrders();
  const [menuOpen, setMenuOpen] = useState(false);
  const pendingSales = orders.filter((o) => o.role === 'sale' && o.status === 'purchased').length;

  const iconBtn = 'relative flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-subtle';

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas/95 backdrop-blur supports-[backdrop-filter]:bg-canvas/85">
      <div className="container-page flex h-16 items-center gap-3 lg:gap-6">
        <button type="button" className={`${iconBtn} -ml-2 lg:hidden`} onClick={() => setMenuOpen(true)} aria-label="Open menu">
          <MenuIcon className="h-5 w-5" />
        </button>
        <Logo />
        <SearchBar className="hidden max-w-xl flex-1 md:block" />
        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <Link
            to={user ? '/listings/new' : '/signup'}
            className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-ink transition-colors hover:bg-subtle hover:text-primary-ink lg:flex">
            
            <StoreIcon className="h-4 w-4" aria-hidden />
            Open a shop
          </Link>
          {user &&
          <Link to="/inbox/purchases" className={iconBtn} aria-label={`Inbox${pendingSales ? `, ${pendingSales} sales need action` : ''}`}>
              <InboxIcon className="h-5 w-5" />
              {pendingSales > 0 && <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary ring-2 ring-canvas" />}
            </Link>
          }
          <Link to="/cart" className={iconBtn} aria-label={`Cart, ${count} items`}>
            <ShoppingBagIcon className="h-5 w-5" />
            {count > 0 &&
            <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-primary px-1 text-[11px] font-semibold text-white ring-2 ring-canvas">
                {count}
              </span>
            }
          </Link>
          {user ?
          <UserMenu /> :

          <div className="hidden items-center gap-1 sm:flex">
              <ButtonLink to="/signup" variant="ghost" size="sm">
                Sign up
              </ButtonLink>
              <ButtonLink to="/login" variant="secondary" size="sm">
                Log in
              </ButtonLink>
            </div>
          }
        </div>
      </div>
      <div className="container-page pb-3 md:hidden">
        <SearchBar />
      </div>
      <nav aria-label="Categories" className="hidden border-t border-line/70 lg:block">
        <div className="container-page flex h-11 items-center gap-1 text-sm">
          {categories.map((c) =>
          <Link key={c.id} to={`/s?category=${c.id}`} className="rounded-full px-3 py-1.5 text-muted transition-colors hover:bg-subtle hover:text-ink">
              {c.name}
            </Link>
          )}
          <Link to="/s?maxPrice=50" className="rounded-full px-3 py-1.5 font-medium text-primary-ink transition-colors hover:bg-primary-soft">
            Gifts under $50
          </Link>
          <NavLink
            to="/about"
            className={({ isActive }) =>
            `ml-auto rounded-full px-3 py-1.5 transition-colors hover:bg-subtle hover:text-ink ${isActive ? 'text-ink' : 'text-muted'}`
            }>
            
            About {brand.name}
          </NavLink>
        </div>
      </nav>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>);

}
import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { InboxIcon, MenuIcon, SearchIcon, ShoppingBasketIcon } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";
import { brand } from "../../data/brand";
import { Button } from "../ui/Button";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { UserMenu } from "./UserMenu";

export function TopBar() {
  const { user } = useAuth();
  const { count } = useCart();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  function onSearch(e: React.FormEvent) {
    e.preventDefault();
    navigate(`/search${query ? `?q=${encodeURIComponent(query)}` : ""}`);
  }

  const navClass = ({ isActive }: {isActive: boolean;}) =>
  `rounded-full px-3 py-2 text-sm font-medium transition ${
  isActive ? "bg-primary-soft text-primary-dark" : "text-ink hover:bg-ink/5"}`;


  return (
    <header className="sticky top-0 z-40 border-b border-line bg-kraft/95 backdrop-blur">
      <div className="container-site flex h-16 items-center gap-3 lg:h-[72px] lg:gap-5">
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          className="-ml-2 rounded-full p-2 text-ink hover:bg-ink/5 lg:hidden">
          
          <MenuIcon className="h-5 w-5" />
        </button>
        <Logo />

        <form onSubmit={onSearch} role="search" className="ml-2 hidden max-w-md flex-1 md:block">
          <label htmlFor="topbar-search" className="sr-only">
            Search products and farms
          </label>
          <div className="relative">
            <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              id="topbar-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tomatoes, eggs, honey…"
              className="h-11 w-full rounded-full border border-line bg-white pl-10 pr-4 text-sm text-ink placeholder:text-muted/80 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
            
          </div>
        </form>

        <nav aria-label="Main" className="ml-auto hidden items-center gap-1 lg:flex">
          <NavLink to="/search" className={navClass}>
            Browse
          </NavLink>
          <NavLink to="/about" className={navClass}>
            About
          </NavLink>
          <NavLink to="/listings/new" className={navClass}>
            {brand.sellerCta}
          </NavLink>
        </nav>

        <div className="ml-auto flex items-center gap-1 lg:ml-0">
          <Link
            to="/search"
            aria-label="Search"
            className="rounded-full p-2.5 text-ink hover:bg-ink/5 md:hidden">
            
            <SearchIcon className="h-5 w-5" />
          </Link>
          {user &&
          <Link
            to="/inbox/orders"
            aria-label="Inbox"
            className="hidden rounded-full p-2.5 text-ink hover:bg-ink/5 sm:inline-flex">
            
              <InboxIcon className="h-5 w-5" />
            </Link>
          }
          <Link
            to="/cart"
            aria-label={`Your order, ${count} items`}
            className="relative rounded-full p-2.5 text-ink hover:bg-ink/5">
            
            <ShoppingBasketIcon className="h-5 w-5" />
            {count > 0 &&
            <span className="absolute right-0.5 top-0.5 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-accent px-1 text-[11px] font-bold text-white">
                {count}
              </span>
            }
          </Link>
          {user ?
          <UserMenu /> :

          <div className="hidden items-center gap-1 sm:flex">
              <Button to="/signup" variant="ghost" size="sm">
                Sign up
              </Button>
              <Button to="/login" size="sm">
                Log in
              </Button>
            </div>
          }
        </div>
      </div>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>);

}
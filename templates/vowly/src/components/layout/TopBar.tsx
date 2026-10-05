import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { MailIcon, MenuIcon } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useInbox } from "../../contexts/InboxContext";
import { ButtonLink } from "../ui/ButtonLink";
import { Logo } from "./Logo";
import { TopBarSearch } from "./TopBarSearch";
import { UserMenu } from "./UserMenu";
import { MobileMenu } from "./MobileMenu";

const navLinkClass = ({ isActive }: {isActive: boolean;}) =>
`rounded-full px-3 py-2 text-sm font-medium transition-colors hover:bg-blush/60 ${
isActive ? "text-primary" : "text-ink"}`;


export function TopBar() {
  const { user } = useAuth();
  const { unreadCount } = useInbox();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas/95 backdrop-blur supports-[backdrop-filter]:bg-canvas/85">
      <div className="mx-auto flex h-16 max-w-content items-center gap-3 px-4 sm:px-6 lg:h-[72px] lg:gap-5 lg:px-8">
        <Logo />
        <TopBarSearch className="hidden max-w-sm flex-1 md:flex" />

        <nav aria-label="Primary" className="ml-auto hidden items-center gap-1 lg:flex">
          <NavLink to="/search" className={navLinkClass}>
            Browse vendors
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            About
          </NavLink>
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <ButtonLink to="/listings/new" variant="secondary" size="sm" className="hidden md:inline-flex">
            List your business
          </ButtonLink>

          {user ?
          <>
              <Link
              to="/inbox"
              className="relative hidden h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-blush/60 md:inline-flex"
              aria-label={`Inbox${unreadCount ? `, ${unreadCount} unread` : ""}`}>
              
                <MailIcon aria-hidden="true" className="h-5 w-5" />
                {unreadCount > 0 &&
              <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-white">
                    {unreadCount}
                  </span>
              }
              </Link>
              <div className="hidden md:block">
                <UserMenu />
              </div>
            </> :

          <div className="hidden items-center gap-1 md:flex">
              <Link
              to="/signup"
              className="rounded-full px-3 py-2 text-sm font-medium text-ink transition-colors hover:bg-blush/60">
              
                Sign up
              </Link>
              <ButtonLink to="/login" size="sm">
                Log in
              </ButtonLink>
            </div>
          }

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-blush/60 md:hidden"
            aria-label="Open menu"
            aria-expanded={menuOpen}>
            
            <MenuIcon aria-hidden="true" className="h-5 w-5" />
            {user && unreadCount > 0 &&
            <span aria-hidden="true" className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary" />
            }
          </button>
        </div>
      </div>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>);

}
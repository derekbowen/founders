import React from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { XIcon } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { brand } from "../../data/brand";
import { Logo } from "./Logo";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const { user, logout } = useAuth();

  const groups = [
  {
    title: "Shop",
    links: [
    { to: "/search", label: "Browse all products" },
    { to: "/search?fulfillment=pickup", label: "Farm pickup" },
    { to: "/search?fulfillment=delivery", label: "Local delivery" },
    { to: "/cart", label: "Your order" }]

  },
  {
    title: "Account",
    links: user ?
    [
    { to: "/inbox/orders", label: "Inbox" },
    ...(user.farmId ? [{ to: `/farms/${user.farmId}`, label: "My farm profile" }] : []),
    { to: "/listings/new", label: brand.sellerCta },
    { to: "/account/contact", label: "Account settings" }] :

    [
    { to: "/signup", label: "Sign up" },
    { to: "/login", label: "Log in" },
    { to: "/listings/new", label: brand.sellerCta }]

  },
  {
    title: brand.name,
    links: [
    { to: "/about", label: "About" },
    { to: "/terms", label: "Terms of service" },
    { to: "/privacy", label: "Privacy policy" }]

  }];


  return (
    <AnimatePresence>
      {open &&
      <>
          <motion.div
          className="fixed inset-0 z-50 bg-ink/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose} />
        
          <motion.nav
          aria-label="Mobile"
          className="fixed inset-y-0 left-0 z-50 flex w-[85%] max-w-sm flex-col overflow-y-auto bg-kraft p-5"
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ type: "spring", stiffness: 380, damping: 38 }}>
          
            <div className="mb-6 flex items-center justify-between">
              <Logo />
              <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="rounded-full p-2 text-ink hover:bg-ink/5">
              
                <XIcon className="h-5 w-5" />
              </button>
            </div>
            {groups.map((g) =>
          <div key={g.title} className="mb-6">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">{g.title}</p>
                <ul className="space-y-1">
                  {g.links.map((l) =>
              <li key={l.to + l.label}>
                      <Link
                  to={l.to}
                  onClick={onClose}
                  className="block rounded-xl px-3 py-2.5 text-base font-medium text-ink hover:bg-paper">
                  
                        {l.label}
                      </Link>
                    </li>
              )}
                </ul>
              </div>
          )}
            {user &&
          <button
            type="button"
            onClick={() => {
              logout();
              onClose();
            }}
            className="mt-auto rounded-xl border border-line px-3 py-2.5 text-left text-base font-medium text-ink hover:bg-paper">
            
                Log out
              </button>
          }
          </motion.nav>
        </>
      }
    </AnimatePresence>);

}
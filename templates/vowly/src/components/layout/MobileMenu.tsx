import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { XIcon } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useInbox } from "../../contexts/InboxContext";
import { ButtonLink } from "../ui/ButtonLink";
import { Logo } from "./Logo";
import { TopBarSearch } from "./TopBarSearch";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const { user, logout } = useAuth();
  const { unreadCount } = useInbox();
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const linkClass = "flex items-center justify-between rounded-xl px-3 py-3 text-base text-ink hover:bg-blush/50";

  return (
    <AnimatePresence>
      {open &&
      <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <motion.div
          className="absolute inset-0 bg-ink/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose} />
        
          <motion.nav
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className="absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col overflow-y-auto bg-canvas px-4 pb-8 pt-4">
          
            <div className="mb-4 flex items-center justify-between">
              <Logo onClick={onClose} />
              <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-blush/60">
              
                <XIcon aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>
            <TopBarSearch className="mb-4 flex" onSubmitted={onClose} />

            <div className="flex flex-col">
              <Link to="/search" className={linkClass} onClick={onClose}>Browse vendors</Link>
              <Link to="/listings/new" className={linkClass} onClick={onClose}>List your business</Link>
              {user &&
            <>
                  <Link to="/inbox" className={linkClass} onClick={onClose}>
                    Inbox
                    {unreadCount > 0 &&
                <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-semibold text-white">
                        {unreadCount}
                      </span>
                }
                  </Link>
                  {user.ownerId &&
              <Link to={`/profile/${user.ownerId}`} className={linkClass} onClick={onClose}>Your vendor profile</Link>
              }
                  <Link to="/account/contact" className={linkClass} onClick={onClose}>Account settings</Link>
                </>
            }
              <div className="my-3 border-t border-line" />
              <Link to="/about" className={linkClass} onClick={onClose}>About</Link>
              <Link to="/terms" className={linkClass} onClick={onClose}>Terms of service</Link>
              <Link to="/privacy" className={linkClass} onClick={onClose}>Privacy policy</Link>
            </div>

            <div className="mt-auto pt-6">
              {user ?
            <button
              type="button"
              onClick={() => {
                logout();
                onClose();
                navigate("/");
              }}
              className="w-full rounded-full border border-line bg-surface py-3 text-sm font-medium text-ink hover:bg-blush/40">
              
                  Log out
                </button> :

            <div className="grid grid-cols-2 gap-3">
                  <ButtonLink to="/signup" variant="secondary" onClick={onClose}>Sign up</ButtonLink>
                  <ButtonLink to="/login" onClick={onClose}>Log in</ButtonLink>
                </div>
            }
            </div>
          </motion.nav>
        </div>
      }
    </AnimatePresence>);

}
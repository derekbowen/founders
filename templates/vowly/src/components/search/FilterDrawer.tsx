import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { XIcon } from "lucide-react";
import { Button } from "../ui/Button";
import { SearchFilters } from "./SearchFilters";
import type { VendorSearch } from "../../hooks/useVendorSearch";

interface FilterDrawerProps {
  open: boolean;
  onClose: () => void;
  search: VendorSearch;
}

export function FilterDrawer({ open, onClose, search }: FilterDrawerProps) {
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

  return (
    <AnimatePresence>
      {open &&
      <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Filters">
          <motion.div className="absolute inset-0 bg-ink/40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
          <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 32, stiffness: 320 }}
          className="absolute inset-x-0 bottom-0 flex max-h-[92vh] flex-col rounded-t-3xl bg-canvas">
          
            <div className="flex items-center justify-end px-4 pt-3">
              <button type="button" onClick={onClose} aria-label="Close filters" className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-blush/60">
                <XIcon aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 pb-6">
              <SearchFilters search={search} />
            </div>
            <div className="border-t border-line bg-surface p-4">
              <Button fullWidth size="lg" onClick={onClose}>
                Show {search.results.length} {search.results.length === 1 ? "vendor" : "vendors"}
              </Button>
            </div>
          </motion.div>
        </div>
      }
    </AnimatePresence>);

}
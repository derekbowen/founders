import React, { useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon, XIcon } from "lucide-react";

interface LightboxProps {
  images: string[];
  index: number | null;
  title: string;
  onClose: () => void;
  onChange: (index: number) => void;
}

export function Lightbox({ images, index, title, onClose, onChange }: LightboxProps) {
  const open = index !== null;
  const prev = useCallback(() => index !== null && onChange((index - 1 + images.length) % images.length), [index, images.length, onChange]);
  const next = useCallback(() => index !== null && onChange((index + 1) % images.length), [index, images.length, onChange]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose, prev, next]);

  const navBtn = "flex h-12 w-12 items-center justify-center rounded-full bg-canvas/10 text-canvas transition-colors hover:bg-canvas/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold";

  return (
    <AnimatePresence>
      {open && index !== null &&
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`${title} photos`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[1000] flex flex-col bg-ink/95">
        
          <div className="flex items-center justify-between p-4 text-canvas">
            <p className="text-sm">
              {index + 1} / {images.length}
            </p>
            <button type="button" onClick={onClose} aria-label="Close gallery" className={navBtn}>
              <XIcon aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>
          <div className="relative flex flex-1 items-center justify-center gap-4 px-4 pb-8">
            <button type="button" onClick={prev} aria-label="Previous photo" className={`${navBtn} absolute left-4 z-10 sm:static`}>
              <ChevronLeftIcon aria-hidden="true" className="h-6 w-6" />
            </button>
            <motion.img
            key={index}
            src={images[index]}
            alt={`${title} portfolio photo ${index + 1}`}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="max-h-[80vh] max-w-full rounded-xl object-contain sm:max-w-[80vw]" />
          
            <button type="button" onClick={next} aria-label="Next photo" className={`${navBtn} absolute right-4 z-10 sm:static`}>
              <ChevronRightIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
        </motion.div>
      }
    </AnimatePresence>);

}
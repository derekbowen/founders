import React, { useState } from "react";
import { GripIcon } from "lucide-react";
import { Lightbox } from "./Lightbox";

interface PortfolioGalleryProps {
  images: string[];
  title: string;
}

export function PortfolioGallery({ images, title }: PortfolioGalleryProps) {
  const [index, setIndex] = useState<number | null>(null);
  const shown = images.slice(0, 5);

  return (
    <div className="relative">
      <div className="grid gap-2 overflow-hidden rounded-3xl md:h-[480px] md:grid-cols-4 md:grid-rows-2">
        {shown.map((src, i) =>
        <button
          key={`${src}-${i}`}
          type="button"
          onClick={() => setIndex(i)}
          className={`group relative overflow-hidden bg-blush focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary ${
          i === 0 ? "aspect-[4/3] md:col-span-2 md:row-span-2 md:aspect-auto" : "hidden md:block"}`
          }
          aria-label={`Open photo ${i + 1} of ${images.length}`}>
          
            <img
            src={src}
            alt={i === 0 ? `${title} featured portfolio photo` : ""}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
          
            <span className="absolute inset-0 bg-ink/0 transition-colors group-hover:bg-ink/10" />
          </button>
        )}
      </div>
      <button
        type="button"
        onClick={() => setIndex(0)}
        className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium text-ink shadow-soft transition-colors hover:bg-blush/50">
        
        <GripIcon aria-hidden="true" className="h-4 w-4" />
        Show all {images.length} photos
      </button>
      <Lightbox images={images} index={index} title={title} onClose={() => setIndex(null)} onChange={setIndex} />
    </div>);

}
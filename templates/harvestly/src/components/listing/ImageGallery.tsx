import React, { useState } from "react";

export function ImageGallery({ images, title }: {images: string[];title: string;}) {
  const [active, setActive] = useState(0);
  return (
    <div>
      <div className="overflow-hidden rounded-2xl border border-line bg-line">
        <img src={images[active]} alt={`${title} — photo ${active + 1} of ${images.length}`} className="aspect-[4/3] w-full object-cover" />
      </div>
      {images.length > 1 &&
      <div className="mt-3 flex gap-3" role="tablist" aria-label="Product photos">
          {images.map((src, i) =>
        <button
          key={src + i}
          type="button"
          role="tab"
          aria-selected={active === i}
          aria-label={`Show photo ${i + 1}`}
          onClick={() => setActive(i)}
          className={`h-16 w-20 overflow-hidden rounded-xl border-2 transition sm:h-20 sm:w-24 ${
          active === i ? "border-primary" : "border-transparent opacity-70 hover:opacity-100"}`
          }>
          
              <img src={src} alt="" className="h-full w-full object-cover" />
            </button>
        )}
        </div>
      }
    </div>);

}
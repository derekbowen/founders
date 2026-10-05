import React, { ReactNode } from "react";

interface ListingSectionProps {
  id: string;
  title: string;
  children: ReactNode;
  aside?: ReactNode;
}

export function ListingSection({ id, title, children, aside }: ListingSectionProps) {
  return (
    <section aria-labelledby={id} className="border-t border-line py-10">
      <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
        <h2 id={id} className="font-display text-3xl font-semibold text-ink">
          {title}
        </h2>
        {aside}
      </div>
      {children}
    </section>);

}
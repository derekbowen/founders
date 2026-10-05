import React from 'react';

interface ListingSectionProps {
  title: string;
  id?: string;
  children: React.ReactNode;
}

export function ListingSection({ title, id, children }: ListingSectionProps) {
  return (
    <section id={id} className="border-t border-navy-100 py-8" aria-labelledby={id ? `${id}-title` : undefined}>
      <h2 id={id ? `${id}-title` : undefined} className="text-xl font-semibold text-navy-900">
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </section>);

}
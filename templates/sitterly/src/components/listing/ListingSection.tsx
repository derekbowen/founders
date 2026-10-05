import React from 'react';

interface ListingSectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}

export function ListingSection({ id, title, children, action }: ListingSectionProps) {
  return (
    <section aria-labelledby={id} className="border-t border-ink-200 py-8">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 id={id} className="font-heading text-2xl font-bold text-ink-900">
          {title}
        </h2>
        {action}
      </div>
      {children}
    </section>);

}
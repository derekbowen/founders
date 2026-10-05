import React from 'react';

interface ListingSectionProps {
  id: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function ListingSection({ id, title, description, children }: ListingSectionProps) {
  return (
    <section aria-labelledby={id} className="scroll-mt-24 border-t border-ink-200 py-8">
      <h2 id={id} className="text-xl font-semibold text-ink-900">
        {title}
      </h2>
      {description && <p className="mt-1 text-sm text-ink-600">{description}</p>}
      <div className="mt-5">{children}</div>
    </section>);

}
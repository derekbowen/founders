import React from 'react';

interface FilterGroupProps {
  title: string;
  children: React.ReactNode;
}

export function FilterGroup({ title, children }: FilterGroupProps) {
  return (
    <fieldset className="border-b border-slate-200 py-5 last:border-b-0">
      <legend className="sr-only">{title}</legend>
      <p className="mb-3 font-display text-sm font-semibold text-slate-900" aria-hidden>
        {title}
      </p>
      {children}
    </fieldset>);

}
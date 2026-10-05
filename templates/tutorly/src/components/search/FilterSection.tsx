import React from 'react';

export function FilterSection({ title, children }: {title: string;children: React.ReactNode;}) {
  return (
    <fieldset className="border-b border-ink-200 py-5 first:pt-0 last:border-b-0">
      <legend className="mb-3 text-sm font-semibold text-ink-900">{title}</legend>
      {children}
    </fieldset>);

}

interface ChipProps {
  pressed: boolean;
  onClick: () => void;
  children: React.ReactNode;
  label?: string;
}

export function FilterChip({ pressed, onClick, children, label }: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      aria-label={label}
      onClick={onClick}
      className={`rounded-lg border px-2.5 py-1.5 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 ${
      pressed ?
      'border-primary-600 bg-primary-600 text-white' :
      'border-ink-200 bg-white text-ink-700 hover:border-primary-300 hover:text-primary-700'}`
      }>
      
      {children}
    </button>);

}
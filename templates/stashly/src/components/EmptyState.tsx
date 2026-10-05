import React from 'react';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  text: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon, title, text, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-stone-300 bg-stone-50 px-6 py-14 text-center">
      <span className="grid h-12 w-12 place-items-center rounded-full bg-white text-brand-700 shadow-soft" aria-hidden="true">
        {icon}
      </span>
      <h3 className="mt-4 text-base font-semibold text-stone-900">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-stone-600">{text}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>);

}
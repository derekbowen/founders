import React from 'react';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  text: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ icon, title, text, action, className = '' }: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center ${className}`}>
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 text-primary-600" aria-hidden="true">
        {icon}
      </div>
      <h3 className="text-base font-semibold text-slate-900">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-slate-600">{text}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>);

}
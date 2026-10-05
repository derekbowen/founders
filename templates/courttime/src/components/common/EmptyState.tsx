import React from 'react';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ icon, title, description, action, className = '' }: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center ${className}`}>
      <div className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-soft text-brand">{icon}</div>
      <h3 className="mt-4 font-display text-2xl font-bold uppercase">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-slate-600">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>);

}
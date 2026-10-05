import React from 'react';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  text?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ icon, title, text, action, className = '' }: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-2xl border border-dashed border-navy-200 bg-white px-6 py-14 text-center ${className}`}>
      
      <div className="grid h-14 w-14 place-items-center rounded-2xl bg-primary-50 text-primary-700">{icon}</div>
      <h3 className="mt-4 text-lg font-semibold text-navy-900">{title}</h3>
      {text && <p className="mt-1.5 max-w-sm text-sm text-navy-500">{text}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>);

}
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
    <div className={`flex flex-col items-center justify-center px-6 py-14 text-center ${className}`}>
      <div className="grid h-14 w-14 place-items-center rounded-2xl bg-accent/20 text-ink">{icon}</div>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      {text && <p className="mt-1 max-w-sm text-sm text-muted">{text}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>);

}
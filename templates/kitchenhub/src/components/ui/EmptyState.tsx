import React from 'react';
import { cn } from '../../utils/styles';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  body?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ icon, title, body, action, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center rounded-2xl border border-dashed border-steel-300 bg-steel-50 px-6 py-14 text-center', className)}>
      <span className="mb-4 grid h-12 w-12 place-items-center rounded-full bg-white text-steel-500 shadow-card">{icon}</span>
      <h3 className="text-base font-semibold text-steel-900">{title}</h3>
      {body && <p className="mt-1 max-w-sm text-sm text-steel-500">{body}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>);

}
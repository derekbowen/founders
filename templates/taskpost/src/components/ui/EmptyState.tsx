import React from 'react';
import { cn } from '../../utils/styles';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-2xl border border-dashed border-ink-300 bg-white px-6 py-12 text-center',
        className
      )}>
      
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
        {icon}
      </div>
      <h3 className="mt-4 text-base font-extrabold text-ink-900">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-ink-600">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>);

}
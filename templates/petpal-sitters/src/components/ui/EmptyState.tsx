import React from 'react';
import { PawPrintIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

interface EmptyStateProps {
  title: string;
  text?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ title, text, icon, action, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center rounded-3xl border-2 border-dashed border-stone-200 bg-white px-6 py-14 text-center', className)}>
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-primary-600">
        {icon ?? <PawPrintIcon className="h-7 w-7" aria-hidden="true" />}
      </div>
      <h3 className="mt-4 text-lg font-extrabold text-stone-900">{title}</h3>
      {text && <p className="mt-1.5 max-w-sm text-[15px] text-stone-500">{text}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>);

}
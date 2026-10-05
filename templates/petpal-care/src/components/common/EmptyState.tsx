import React from 'react';
import { PawPrintIcon } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
}

export function EmptyState({ title, description, action, icon }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-ink-200 bg-white/60 px-6 py-14 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-100 text-primary-700">
        {icon ?? <PawPrintIcon className="h-7 w-7" aria-hidden="true" />}
      </div>
      <h3 className="text-lg font-extrabold text-ink-900">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-ink-600">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>);

}
import React from 'react';
import { CheckCircle2Icon } from 'lucide-react';

interface SettingsCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  saved?: boolean;
  onSubmit?: (e: React.FormEvent) => void;
}

export function SettingsCard({ title, description, children, footer, saved, onSubmit }: SettingsCardProps) {
  return (
    <form onSubmit={onSubmit} noValidate className="overflow-hidden rounded-2xl border border-line bg-white">
      <div className="p-6">
        <h2 className="font-sans text-lg font-semibold">{title}</h2>
        <p className="mt-1 text-sm text-ink-muted">{description}</p>
        <div className="mt-6 space-y-5">{children}</div>
      </div>
      {footer &&
      <div className="flex items-center justify-between gap-4 border-t border-line bg-mist/60 px-6 py-4">
          <p role="status" className="flex items-center gap-1.5 text-sm text-brand-700">
            {saved &&
          <>
                <CheckCircle2Icon size={16} aria-hidden="true" /> Changes saved
              </>
          }
          </p>
          {footer}
        </div>
      }
    </form>);

}
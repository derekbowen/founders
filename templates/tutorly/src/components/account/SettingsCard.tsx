import React from 'react';

interface SettingsCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function SettingsCard({ title, description, children, footer }: SettingsCardProps) {
  return (
    <section className="rounded-3xl border border-ink-200 bg-white" aria-label={title}>
      <div className="p-5 sm:p-6">
        <h2 className="text-lg font-semibold text-ink-900">{title}</h2>
        {description && <p className="mt-1 text-sm text-ink-600">{description}</p>}
        <div className="mt-5">{children}</div>
      </div>
      {footer && <div className="flex justify-end gap-2 border-t border-ink-200 px-5 py-4 sm:px-6">{footer}</div>}
    </section>);

}
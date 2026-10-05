import React from "react";

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  text: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon, title, text, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-line bg-paper px-6 py-14 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary-soft text-primary">
        {icon}
      </div>
      <h3 className="font-display text-xl font-semibold text-ink">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-muted">{text}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>);

}
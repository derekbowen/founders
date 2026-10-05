import React from "react";
import { BoxIcon } from "lucide-react";
interface EmptyStateProps {
  icon: BoxIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
}
export function EmptyState({
  icon: Icon,
  title,
  description,
  action
}: EmptyStateProps) {
  return <div className="flex flex-col items-center rounded-2xl border border-dashed border-line bg-mist/60 px-6 py-14 text-center">
      <span className="grid h-12 w-12 place-items-center rounded-full bg-white text-brand-700 shadow-card">
        <Icon size={22} aria-hidden="true" />
      </span>
      <h3 className="mt-4 font-sans text-base font-semibold">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-ink-muted">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>;
}
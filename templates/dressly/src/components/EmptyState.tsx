import React from "react";
import { BoxIcon } from "lucide-react";
interface EmptyStateProps {
  icon: BoxIcon;
  title: string;
  text: string;
  action?: React.ReactNode;
}
export function EmptyState({
  icon: Icon,
  title,
  text,
  action
}: EmptyStateProps) {
  return <div className="flex flex-col items-center justify-center border border-dashed border-line bg-cream/50 px-6 py-16 text-center">
      <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft text-accent-dark">
        <Icon size={20} aria-hidden="true" />
      </span>
      <h3 className="font-display text-2xl text-ink">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-muted">{text}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>;
}
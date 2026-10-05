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
  return <div className="flex flex-col items-center rounded-2xl border border-dashed border-line bg-sand-light/60 px-6 py-14 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-navy shadow-card">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <h3 className="mt-4 font-heading text-xl text-navy">{title}</h3>
      <p className="mt-1.5 max-w-sm text-sm text-muted">{text}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>;
}
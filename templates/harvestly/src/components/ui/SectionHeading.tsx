import React from "react";

interface SectionHeadingProps {
  id?: string;
  eyebrow?: string;
  title: string;
  text?: string;
  action?: React.ReactNode;
}

export function SectionHeading({ id, eyebrow, title, text, action }: SectionHeadingProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        {eyebrow &&
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-accent">{eyebrow}</p>
        }
        <h2 id={id} className="font-display text-3xl font-semibold text-ink sm:text-4xl">
          {title}
        </h2>
        {text && <p className="mt-3 text-base text-muted">{text}</p>}
      </div>
      {action}
    </div>);

}
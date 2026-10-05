import React, { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  align?: "left" | "center";
  id?: string;
}

export function SectionHeading({ eyebrow, title, description, action, align = "left", id }: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div
      className={`mb-10 flex flex-col gap-4 ${
      centered ? "items-center text-center" : "sm:flex-row sm:items-end sm:justify-between"}`
      }>
      
      <div className={centered ? "max-w-2xl" : "max-w-2xl"}>
        {eyebrow &&
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">{eyebrow}</p>
        }
        <h2 id={id} className="font-display text-4xl font-semibold leading-[1.05] text-ink sm:text-5xl">
          {title}
        </h2>
        {description && <p className="mt-4 text-base leading-relaxed text-muted">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>);

}
import React, { ReactNode } from "react";

interface FilterGroupProps {
  title: string;
  children: ReactNode;
  id: string;
}

export function FilterGroup({ title, children, id }: FilterGroupProps) {
  return (
    <fieldset className="border-b border-line py-5 first:pt-0 last:border-b-0" aria-labelledby={id}>
      <legend id={id} className="mb-3 text-sm font-semibold text-ink">
        {title}
      </legend>
      {children}
    </fieldset>);

}
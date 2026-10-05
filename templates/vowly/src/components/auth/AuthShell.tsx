import React, { ReactNode } from "react";
import { images } from "../../data/images";

interface AuthShellProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  image?: string;
  quote?: string;
}

export function AuthShell({ title, subtitle, children, image = images.ceremonyArch, quote }: AuthShellProps) {
  return (
    <div className="mx-auto grid max-w-content gap-10 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8 lg:py-16">
      <div className="mx-auto w-full max-w-md">
        <h1 className="font-display text-5xl font-semibold leading-tight text-ink">{title}</h1>
        <p className="mt-2 text-base text-muted">{subtitle}</p>
        <div className="mt-8">{children}</div>
      </div>
      <div className="relative hidden aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-3xl lg:block">
        <img src={image} alt="" className="h-full w-full object-cover" />
        {quote &&
        <figure className="absolute inset-x-6 bottom-6 rounded-2xl bg-surface/95 p-5 shadow-lift">
            <blockquote className="font-display text-xl italic leading-snug text-ink">“{quote}”</blockquote>
          </figure>
        }
      </div>
    </div>);

}
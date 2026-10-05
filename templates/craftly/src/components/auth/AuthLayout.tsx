import React from 'react';

const IMAGE = "/2e923532-419b-42b6-a0f5-4593f3a41b4e.jpg";

interface AuthLayoutProps {
  title: string;
  subtitle: React.ReactNode;
  children: React.ReactNode;
}

export function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
  return (
    <div className="container-page grid gap-10 py-10 lg:grid-cols-2 lg:gap-16 lg:py-16">
      <div className="mx-auto w-full max-w-md lg:py-8">
        <h1 className="text-4xl font-medium tracking-tight">{title}</h1>
        <p className="mt-2 text-sm text-muted">{subtitle}</p>
        <div className="mt-8">{children}</div>
      </div>
      <figure className="relative hidden overflow-hidden rounded-[2rem] lg:block">
        <img src={IMAGE} alt="Priya of Ember & Wick pouring candles in her studio" className="h-full max-h-[640px] w-full object-cover" />
        <figcaption className="absolute inset-x-6 bottom-6 rounded-2xl bg-surface/95 p-5 backdrop-blur">
          <p className="font-heading text-xl italic leading-snug text-ink">
            “Within a month I had regulars in six states — and neighbors stopping by the workshop for pickup.”
          </p>
          <p className="mt-2 text-xs text-muted">Priya Nair, Ember &amp; Wick · Austin, TX</p>
        </figcaption>
      </figure>
    </div>);

}
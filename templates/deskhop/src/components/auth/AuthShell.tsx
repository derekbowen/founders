import React from 'react';
import { photos } from '../../data/images';
import { brand } from '../../data/brand';

interface AuthShellProps {
  title: string;
  subtitle: React.ReactNode;
  children: React.ReactNode;
}

export function AuthShell({ title, subtitle, children }: AuthShellProps) {
  return (
    <div className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-2">
      <div className="flex items-center justify-center px-4 py-12 sm:px-6">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-semibold">{title}</h1>
          <p className="mt-2 text-sm text-ink-muted">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </div>
      </div>
      <div className="relative hidden bg-mist lg:block">
        <img src={photos.lounge1} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-x-10 bottom-10 rounded-2xl bg-white/95 p-6 shadow-pop backdrop-blur">
          <p className="font-display text-xl font-semibold leading-snug">
            “I haven’t paid for a monthly desk in a year. {brand.name} gives me a great office wherever my clients are.”
          </p>
          <p className="mt-3 text-sm text-ink-muted">Priya Nair · UX researcher, London</p>
        </div>
      </div>
    </div>);

}
import React from 'react';
import { CheckIcon } from 'lucide-react';
import { brand } from '../../data/brand';

const HERO_IMAGE = "/c4c1faf1-6177-4298-b081-32a8774642ee.jpg";

interface AuthShellProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export function AuthShell({ title, subtitle, children }: AuthShellProps) {
  return (
    <div className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-2">
      <div className="flex items-center justify-center px-4 py-12 sm:px-8">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h1>
          <p className="mt-2 text-muted">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </div>
      </div>
      <div className="hidden border-l border-ink bg-brand p-12 lg:flex lg:flex-col lg:justify-center">
        <div className="mx-auto max-w-md">
          <div className="overflow-hidden rounded-3xl border-2 border-ink bg-white shadow-pop">
            <img src={HERO_IMAGE} alt="" className="aspect-[4/3] w-full object-cover" />
          </div>
          <h2 className="mt-8 text-3xl font-bold leading-tight">{brand.tagline}</h2>
          <ul className="mt-5 space-y-2.5">
            {['Every purchase saved in your library', 'Re-download anytime, on any device', 'Sell your own files in minutes'].map((t) =>
            <li key={t} className="flex items-center gap-2.5 font-medium">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-ink text-white">
                  <CheckIcon className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                </span>
                {t}
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>);

}
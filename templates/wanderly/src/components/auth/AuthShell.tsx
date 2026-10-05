import React from 'react';
import { images } from '../../data/images';
import { brand } from '../../data/brand';

interface AuthShellProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export function AuthShell({ title, subtitle, children }: AuthShellProps) {
  return (
    <div className="grid min-h-[calc(100vh-72px)] lg:grid-cols-2">
      <div className="flex items-center justify-center px-4 py-12 sm:px-6">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">{title}</h1>
          <p className="mt-2 text-slate-600">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </div>
      </div>
      <div className="relative hidden lg:block">
        <img src={images.aboutTeam} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-x-8 bottom-8 rounded-2xl bg-slate-900/60 p-6 text-white backdrop-blur">
          <p className="font-display text-xl font-semibold">“The best meal of our trip was in a stranger’s kitchen — who wasn’t a stranger by the end.”</p>
          <p className="mt-2 text-sm text-white/80">Grace, booked on {brand.name}</p>
        </div>
      </div>
    </div>);

}
import React from 'react';
import { brand } from '../../data/brand';
import { images } from '../../data/images';

interface AuthShellProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}

export function AuthShell({ title, subtitle, children, footer }: AuthShellProps) {
  return (
    <div className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-ink lg:block">
        <img src={images.openPlay} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-ink/55" aria-hidden="true" />
        <div className="absolute bottom-0 p-12">
          <p className="heading-xl text-white">Your next game<br /><span className="text-accent">starts here</span></p>
          <p className="mt-3 max-w-md text-white/80">{brand.description}</p>
        </div>
      </div>
      <div className="flex items-center justify-center px-4 py-12 sm:px-8">
        <div className="w-full max-w-md">
          <h1 className="heading-lg">{title}</h1>
          <p className="mt-2 text-slate-600">{subtitle}</p>
          <div className="mt-8">{children}</div>
          <div className="mt-6 text-center text-sm text-slate-600">{footer}</div>
        </div>
      </div>
    </div>);

}
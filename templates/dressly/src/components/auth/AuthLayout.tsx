import React from 'react';
import { brand } from '../../data/brand';

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
  return (
    <div className="grid min-h-[calc(100vh-72px)] lg:grid-cols-2">
      <div className="relative hidden bg-cream lg:block">
        <img src={brand.images.hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-x-0 bottom-0 bg-ink/60 p-10 text-paper">
          <p className="font-display text-3xl italic leading-snug">“I’ve worn six designer gowns this year and spent less than one would cost.”</p>
          <p className="mt-3 text-sm text-paper/80">— Grace, renter since 2025</p>
        </div>
      </div>
      <div className="flex items-center justify-center px-4 py-14 md:px-8">
        <div className="w-full max-w-md">
          <h1 className="font-display text-4xl md:text-5xl">{title}</h1>
          <p className="mt-3 text-muted">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </div>);

}
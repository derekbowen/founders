import React from 'react';
import { Outlet } from 'react-router-dom';
import { TopBar } from './TopBar';
import { Footer } from './Footer';

interface LayoutProps {
  hideFooter?: boolean;
}

export function Layout({ hideFooter = false }: LayoutProps) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-surface">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-navy-900 focus:px-4 focus:py-2 focus:text-white">
        
        Skip to content
      </a>
      <TopBar />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      {!hideFooter && <Footer />}
    </div>);

}
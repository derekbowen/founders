import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { TopBar } from './TopBar';
import { Footer } from './Footer';

export function Layout({ showFooter = true }: {showFooter?: boolean;}) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-canvas text-ink">
      <a
        href="#main"
        className="sr-only z-[1200] rounded bg-accent px-3 py-2 text-ink focus:not-sr-only focus:absolute focus:left-4 focus:top-3">
        
        Skip to content
      </a>
      <TopBar />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      {showFooter && <Footer />}
    </div>);

}
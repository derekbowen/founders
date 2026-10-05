import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Footer } from './Footer';
import { TopBar } from './TopBar';

export function Layout() {
  const { pathname } = useLocation();
  const appLike = pathname.startsWith('/search') || pathname.startsWith('/inbox');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-white">
      <a href="#main" className="sr-only z-[600] rounded-lg bg-white px-4 py-2 font-semibold focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Skip to content
      </a>
      <TopBar />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      {!appLike && <Footer />}
    </div>);

}
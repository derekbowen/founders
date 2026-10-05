import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { TopBar } from './TopBar';
import { Footer } from './Footer';

interface SiteLayoutProps {
  showFooter?: boolean;
}

export function SiteLayout({ showFooter = true }: SiteLayoutProps) {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-white">
      <TopBar />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      {showFooter && <Footer />}
    </div>);

}
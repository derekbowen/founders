import React from "react";
import { Outlet } from "react-router-dom";
import { TopBar } from "./TopBar";
import { Footer } from "./Footer";

export function AppLayout() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-canvas text-ink">
      <a
        href="#main"
        className="sr-only z-50 rounded-full bg-primary px-4 py-2 text-sm text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        
        Skip to content
      </a>
      <TopBar />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>);

}
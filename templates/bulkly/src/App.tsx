import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import { SiteLayout } from './components/layout/SiteLayout';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { About } from './pages/About';
import { AccountSettings } from './pages/AccountSettings';
import { Auth } from './pages/Auth';
import { BrandProfile } from './pages/BrandProfile';
import { Checkout } from './pages/Checkout';
import { CreateListing } from './pages/CreateListing';
import { Inbox } from './pages/Inbox';
import { Landing } from './pages/Landing';
import { Listing } from './pages/Listing';
import { NotFound } from './pages/NotFound';
import { Privacy } from './pages/Privacy';
import { Search } from './pages/Search';
import { Terms } from './pages/Terms';
import { applyBrandTheme } from './utils/theme';

// Inject brand colors from data/brand.ts before first render.
applyBrandTheme();

interface AppProps {
  /** Preview the signed-in experience (account menu, inbox badge, prefilled checkout). */
  startSignedIn?: boolean;
}

export function App({ startSignedIn = false }: AppProps) {
  return (
    <BrowserRouter>
      <AuthProvider startSignedIn={startSignedIn}>
        <CartProvider>
          <Routes>
            <Route element={<SiteLayout />}>
              <Route index element={<Landing />} />
              <Route path="search" element={<Search />} />
              <Route path="products/:productId" element={<Listing />} />
              <Route path="brands/:brandId" element={<BrandProfile />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="inbox" element={<Navigate to="/inbox/purchases" replace />} />
              <Route path="inbox/:tab/:orderId?" element={<Inbox />} />
              <Route path="sell/new" element={<CreateListing />} />
              <Route path="login" element={<Auth mode="login" key="login" />} />
              <Route path="signup" element={<Auth mode="signup" key="signup" />} />
              <Route path="account" element={<Navigate to="/account/contact" replace />} />
              <Route path="account/:section" element={<AccountSettings />} />
              <Route path="about" element={<About />} />
              <Route path="terms" element={<Terms />} />
              <Route path="privacy" element={<Privacy />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
          <Toaster position="bottom-right" richColors closeButton toastOptions={{ style: { fontFamily: '"IBM Plex Sans", sans-serif' } }} />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>);

}
import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import { MarketplaceProvider } from './contexts/MarketplaceContext';
import { Layout } from './components/layout/Layout';
import { RequireAuth } from './components/RequireAuth';
import { AccountLayout } from './components/account/AccountLayout';
import { Landing } from './pages/Landing';
import { Search } from './pages/Search';
import { ListingPage } from './pages/Listing';
import { Checkout } from './pages/Checkout';
import { Inbox } from './pages/Inbox';
import { Profile } from './pages/Profile';
import { CreateListing } from './pages/CreateListing';
import { Auth } from './pages/Auth';
import { ContactDetails } from './pages/account/ContactDetails';
import { Password } from './pages/account/Password';
import { Payouts } from './pages/account/Payouts';
import { About } from './pages/About';
import { Terms } from './pages/Terms';
import { Privacy } from './pages/Privacy';
import { NotFound } from './pages/NotFound';
import { applyBrandTheme } from './utils/theme';

applyBrandTheme();

export function App() {
  return (
    <MarketplaceProvider>
      <BrowserRouter>
        <Toaster position="top-center" toastOptions={{ style: { fontFamily: 'var(--font-body)' } }} />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/l/:id" element={<ListingPage />} />
            <Route path="/l/:id/checkout" element={<RequireAuth><Checkout /></RequireAuth>} />
            <Route path="/inbox" element={<Navigate to="/inbox/trips" replace />} />
            <Route path="/inbox/:tab" element={<RequireAuth><Inbox /></RequireAuth>} />
            <Route path="/inbox/:tab/:txId" element={<RequireAuth><Inbox /></RequireAuth>} />
            <Route path="/u/:id" element={<Profile />} />
            <Route path="/listings/new" element={<RequireAuth><CreateListing /></RequireAuth>} />
            <Route path="/login" element={<Auth mode="login" />} />
            <Route path="/signup" element={<Auth mode="signup" />} />
            <Route path="/account" element={<RequireAuth><AccountLayout /></RequireAuth>}>
              <Route index element={<Navigate to="contact" replace />} />
              <Route path="contact" element={<ContactDetails />} />
              <Route path="password" element={<Password />} />
              <Route path="payouts" element={<Payouts />} />
            </Route>
            <Route path="/about" element={<About />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route element={<Layout hideFooter />}>
            <Route path="/s" element={<Search />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MarketplaceProvider>);

}
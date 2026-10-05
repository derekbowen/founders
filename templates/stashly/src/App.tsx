import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ToastProvider } from './components/ToastProvider';
import { MarketplaceProvider } from './contexts/MarketplaceContext';
import { SiteLayout } from './components/layout/SiteLayout';
import { Landing } from './pages/Landing';
import { Search } from './pages/Search';
import { ListingPage } from './pages/ListingPage';
import { Checkout } from './pages/Checkout';
import { Inbox } from './pages/Inbox';
import { Profile } from './pages/Profile';
import { CreateListing } from './pages/CreateListing';
import { Auth } from './pages/Auth';
import { AccountLayout } from './pages/account/AccountLayout';
import { ContactSettings } from './pages/account/ContactSettings';
import { PasswordSettings } from './pages/account/PasswordSettings';
import { PayoutSettings } from './pages/account/PayoutSettings';
import { About } from './pages/About';
import { Terms, Privacy } from './pages/Legal';
import { NotFound } from './pages/NotFound';
import { applyBrandTheme } from './utils/theme';

applyBrandTheme();

export function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <MarketplaceProvider>
          <Routes>
            <Route element={<SiteLayout />}>
              <Route path="/" element={<Landing />} />
              <Route path="/l/:id" element={<ListingPage />} />
              <Route path="/checkout/:id" element={<Checkout />} />
              <Route path="/u/:id" element={<Profile />} />
              <Route path="/listings/new" element={<CreateListing />} />
              <Route path="/login" element={<Auth mode="login" />} />
              <Route path="/signup" element={<Auth mode="signup" />} />
              <Route path="/account" element={<AccountLayout />}>
                <Route index element={<Navigate to="contact" replace />} />
                <Route path="contact" element={<ContactSettings />} />
                <Route path="password" element={<PasswordSettings />} />
                <Route path="payouts" element={<PayoutSettings />} />
              </Route>
              <Route path="/about" element={<About />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="*" element={<NotFound />} />
            </Route>
            <Route element={<SiteLayout hideFooter />}>
              <Route path="/s" element={<Search />} />
              <Route path="/inbox" element={<Navigate to="/inbox/storing" replace />} />
              <Route path="/inbox/tx/:txId" element={<Inbox />} />
              <Route path="/inbox/:tab" element={<Inbox />} />
            </Route>
          </Routes>
        </MarketplaceProvider>
      </ToastProvider>
    </BrowserRouter>);

}
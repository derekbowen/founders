import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastProvider } from './components/ToastProvider';
import { BrandStyles } from './components/BrandStyles';
import { AppLayout } from './components/layout/AppLayout';
import { SessionProvider } from './contexts/SessionContext';
import { Landing } from './pages/Landing';
import { Search } from './pages/Search';
import { Listing } from './pages/Listing';
import { Checkout } from './pages/Checkout';
import { Inbox } from './pages/Inbox';
import { TransactionDetail } from './pages/TransactionDetail';
import { SitterProfile } from './pages/SitterProfile';
import { CreateListing } from './pages/CreateListing';
import { Auth } from './pages/Auth';
import { AccountSettings } from './pages/AccountSettings';
import { About } from './pages/About';
import { Terms } from './pages/Terms';
import { Privacy } from './pages/Privacy';
import { NotFound } from './pages/NotFound';

export function App() {
  return (
    <SessionProvider>
      <ToastProvider>
        <BrandStyles />
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Landing />} />
              <Route path="/s" element={<Search />} />
              <Route path="/l/:id" element={<Listing />} />
              <Route path="/checkout/:id" element={<Checkout />} />
              <Route path="/inbox" element={<Inbox />} />
              <Route path="/inbox/:id" element={<TransactionDetail />} />
              <Route path="/u/:id" element={<SitterProfile />} />
              <Route path="/listings/new" element={<CreateListing />} />
              <Route path="/login" element={<Auth key="login" mode="login" />} />
              <Route path="/signup" element={<Auth key="signup" mode="signup" />} />
              <Route path="/account" element={<AccountSettings />} />
              <Route path="/account/:section" element={<AccountSettings />} />
              <Route path="/about" element={<About />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </SessionProvider>);

}
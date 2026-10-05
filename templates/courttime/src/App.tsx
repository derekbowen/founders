import React, { useLayoutEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastProvider } from './components/ToastProvider';
import { SiteLayout } from './components/layout/SiteLayout';
import { AuthProvider } from './contexts/AuthContext';
import { BookingProvider } from './contexts/BookingContext';
import { About } from './pages/About';
import { AccountSettings } from './pages/AccountSettings';
import { Checkout } from './pages/Checkout';
import { CreateListing } from './pages/CreateListing';
import { Inbox } from './pages/Inbox';
import { Landing } from './pages/Landing';
import { ListingPage } from './pages/ListingPage';
import { Login } from './pages/Login';
import { NotFound } from './pages/NotFound';
import { Privacy } from './pages/Privacy';
import { Profile } from './pages/Profile';
import { Search } from './pages/Search';
import { Signup } from './pages/Signup';
import { Terms } from './pages/Terms';
import { applyBrandTheme } from './utils/brand';

interface AppProps {
  startLoggedIn?: boolean;
}

export function App({ startLoggedIn = false }: AppProps) {
  useLayoutEffect(() => {
    applyBrandTheme();
  }, []);

  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider initialLoggedIn={startLoggedIn}>
          <BookingProvider>
            <Routes>
              <Route element={<SiteLayout />}>
                <Route path="/" element={<Landing />} />
                <Route path="/search" element={<Search />} />
                <Route path="/listing/:listingId" element={<ListingPage />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/inbox" element={<Inbox />} />
                <Route path="/profile/:userId" element={<Profile />} />
                <Route path="/create-listing" element={<CreateListing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/account" element={<AccountSettings />} />
                <Route path="/account/:section" element={<AccountSettings />} />
                <Route path="/about" element={<About />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BookingProvider>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>);

}
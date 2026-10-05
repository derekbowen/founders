import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ToastProvider } from './components/ToastProvider';
import { AuthProvider } from './contexts/AuthContext';
import { Layout } from './components/layout/Layout';
import { RequireAuth } from './components/common/RequireAuth';
import { Landing } from './pages/Landing';
import { Search } from './pages/Search';
import { Listing } from './pages/Listing';
import { Checkout } from './pages/Checkout';
import { Inbox } from './pages/Inbox';
import { Profile } from './pages/Profile';
import { CreateListing } from './pages/CreateListing';
import { Auth } from './pages/Auth';
import { AccountSettings } from './pages/AccountSettings';
import { About } from './pages/About';
import { Terms } from './pages/Terms';
import { Privacy } from './pages/Privacy';
import { NotFound } from './pages/NotFound';
import { applyBrand } from './utils/brand';

// Inject brand colors from data/brand.ts before the first render.
applyBrand();

interface AppProps {
  /** Preview the template as a signed-in member (inbox, profile and account pages unlocked). */
  startSignedIn?: boolean;
}

export function App({ startSignedIn = false }: AppProps) {
  return (
    <AuthProvider initialSignedIn={startSignedIn}>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Landing />} />
              <Route path="/search" element={<Search />} />
              <Route path="/l/:listingId" element={<Listing />} />
              <Route path="/profile/:userId" element={<Profile />} />
              <Route path="/checkout/:listingId" element={<RequireAuth><Checkout /></RequireAuth>} />
              <Route path="/inbox" element={<Navigate to="/inbox/orders" replace />} />
              <Route path="/inbox/:tab/:txId?" element={<RequireAuth><Inbox /></RequireAuth>} />
              <Route path="/create-listing" element={<RequireAuth><CreateListing /></RequireAuth>} />
              <Route path="/account" element={<Navigate to="/account/contact" replace />} />
              <Route path="/account/:section" element={<RequireAuth><AccountSettings /></RequireAuth>} />
              <Route path="/login" element={<Auth mode="login" />} />
              <Route path="/signup" element={<Auth mode="signup" />} />
              <Route path="/about" element={<About />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>);

}
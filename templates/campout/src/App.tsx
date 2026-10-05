import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { SiteLayout } from './components/layout/SiteLayout';
import { AuthProvider } from './contexts/AuthContext';
import { InboxProvider } from './contexts/InboxContext';
import { Landing } from './pages/Landing';
import { Search } from './pages/Search';
import { Listing } from './pages/Listing';
import { Checkout } from './pages/Checkout';
import { Inbox } from './pages/Inbox';
import { Profile } from './pages/Profile';
import { CreateListing } from './pages/CreateListing';
import { Auth } from './pages/Auth';
import { AccountLayout } from './pages/account/AccountLayout';
import { ContactDetails } from './pages/account/ContactDetails';
import { Password } from './pages/account/Password';
import { Payouts } from './pages/account/Payouts';
import { About } from './pages/About';
import { Terms } from './pages/Terms';
import { Privacy } from './pages/Privacy';
import { NotFound } from './pages/NotFound';

interface AppProps {
  /** Preview the marketplace as a logged-in member */
  startSignedIn?: boolean;
}

export function App({ startSignedIn = false }: AppProps) {
  return (
    <BrowserRouter>
      <AuthProvider initialSignedIn={startSignedIn}>
        <InboxProvider>
          <Routes>
            <Route element={<SiteLayout />}>
              <Route index element={<Landing />} />
              <Route path="s" element={<Search />} />
              <Route path="l/new" element={<CreateListing />} />
              <Route path="l/:id" element={<Listing />} />
              <Route path="l/:id/checkout" element={<Checkout />} />
              <Route path="inbox" element={<Inbox />} />
              <Route path="inbox/:txId" element={<Inbox />} />
              <Route path="profile" element={<Profile />} />
              <Route path="u/:id" element={<Profile />} />
              <Route path="login" element={<Auth mode="login" />} />
              <Route path="signup" element={<Auth mode="signup" />} />
              <Route path="account" element={<AccountLayout />}>
                <Route index element={<Navigate to="contact" replace />} />
                <Route path="contact" element={<ContactDetails />} />
                <Route path="password" element={<Password />} />
                <Route path="payouts" element={<Payouts />} />
              </Route>
              <Route path="about" element={<About />} />
              <Route path="terms" element={<Terms />} />
              <Route path="privacy" element={<Privacy />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </InboxProvider>
      </AuthProvider>
    </BrowserRouter>);

}
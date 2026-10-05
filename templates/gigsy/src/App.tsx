import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ToastProvider } from './components/ToastProvider';
import { Layout } from './components/layout/Layout';
import { AuthGate } from './components/layout/AuthGate';
import { AuthProvider } from './contexts/AuthContext';
import { TransactionsProvider } from './contexts/TransactionsContext';
import { Landing } from './pages/Landing';
import { Search } from './pages/Search';
import { ListingPage } from './pages/ListingPage';
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
import { applyBrandTheme } from './utils/brandTheme';

applyBrandTheme();

interface AppProps {
  startSignedIn?: boolean;
}

export function App({ startSignedIn = false }: AppProps) {
  return (
    <BrowserRouter>
      <AuthProvider initialSignedIn={startSignedIn}>
        <TransactionsProvider>
          <ToastProvider>
            <Routes>
              <Route element={<Layout />}>
                <Route index element={<Landing />} />
                <Route path="s" element={<Search />} />
                <Route path="l/:listingId" element={<ListingPage />} />
                <Route path="u/:userId" element={<Profile />} />
                <Route path="checkout/:txId" element={<AuthGate title="Log in to check out"><Checkout /></AuthGate>} />
                <Route path="inbox" element={<AuthGate title="Log in to view your inbox"><Inbox /></AuthGate>} />
                <Route path="inbox/:txId" element={<AuthGate title="Log in to view your inbox"><Inbox /></AuthGate>} />
                <Route path="create-listing" element={<AuthGate title="Log in to offer your services"><CreateListing /></AuthGate>} />
                <Route path="account" element={<Navigate to="/account/contact" replace />} />
                <Route path="account/:tab" element={<AuthGate title="Log in to manage your account"><AccountSettings /></AuthGate>} />
                <Route path="login" element={<Auth mode="login" />} />
                <Route path="signup" element={<Auth mode="signup" />} />
                <Route path="about" element={<About />} />
                <Route path="terms" element={<Terms />} />
                <Route path="privacy" element={<Privacy />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </ToastProvider>
        </TransactionsProvider>
      </AuthProvider>
    </BrowserRouter>);

}
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { BrandStyles } from './components/layout/BrandStyles';
import { Layout } from './components/layout/Layout';
import { AuthProvider } from './contexts/AuthContext';
import { TransactionsProvider } from './contexts/TransactionsContext';
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

interface AppProps {
  /** Start the prototype already logged in as the demo user */
  signedIn?: boolean;
}

export function App({ signedIn = false }: AppProps) {
  return (
    <BrowserRouter>
      <BrandStyles />
      <AuthProvider initialSignedIn={signedIn}>
        <TransactionsProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Landing />} />
              <Route path="/l/:id" element={<Listing />} />
              <Route path="/checkout/:id" element={<Checkout />} />
              <Route path="/inbox" element={<Inbox />} />
              <Route path="/inbox/:txId" element={<Inbox />} />
              <Route path="/u/:userId" element={<Profile />} />
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
            <Route element={<Layout showFooter={false} />}>
              <Route path="/s" element={<Search />} />
            </Route>
          </Routes>
        </TransactionsProvider>
      </AuthProvider>
    </BrowserRouter>);

}
import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { BrandStyle } from './components/BrandStyle';
import { Layout } from './components/layout/Layout';
import { RequireAuth } from './components/layout/RequireAuth';
import { AccountLayout } from './components/account/AccountLayout';
import { AuthProvider } from './contexts/AuthContext';
import { TransactionsProvider } from './contexts/TransactionsContext';
import { Landing } from './pages/Landing';
import { Search } from './pages/Search';
import { Listing } from './pages/Listing';
import { Checkout } from './pages/Checkout';
import { Inbox } from './pages/Inbox';
import { Profile } from './pages/Profile';
import { CreateListing } from './pages/CreateListing';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { AccountContact } from './pages/account/AccountContact';
import { AccountPassword } from './pages/account/AccountPassword';
import { AccountPayouts } from './pages/account/AccountPayouts';
import { About } from './pages/About';
import { Terms } from './pages/Terms';
import { Privacy } from './pages/Privacy';
import { NotFound } from './pages/NotFound';

interface AppProps {
  /** Start the preview already logged in as the demo host/guest account. */
  startSignedIn?: boolean;
}

export function App({ startSignedIn = false }: AppProps) {
  return (
    <BrowserRouter>
      <BrandStyle />
      <AuthProvider initialSignedIn={startSignedIn}>
        <TransactionsProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Landing />} />
              <Route path="s" element={<Search />} />
              <Route path="l/:id" element={<Listing />} />
              <Route path="u/:id" element={<Profile />} />
              <Route path="checkout/:id" element={<RequireAuth><Checkout /></RequireAuth>} />
              <Route path="inbox" element={<RequireAuth><Inbox /></RequireAuth>} />
              <Route path="inbox/:txId" element={<RequireAuth><Inbox /></RequireAuth>} />
              <Route path="listings/new" element={<RequireAuth><CreateListing /></RequireAuth>} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="account" element={<RequireAuth><AccountLayout /></RequireAuth>}>
                <Route index element={<Navigate to="contact" replace />} />
                <Route path="contact" element={<AccountContact />} />
                <Route path="password" element={<AccountPassword />} />
                <Route path="payouts" element={<AccountPayouts />} />
              </Route>
              <Route path="about" element={<About />} />
              <Route path="terms" element={<Terms />} />
              <Route path="privacy" element={<Privacy />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </TransactionsProvider>
      </AuthProvider>
    </BrowserRouter>);

}
import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from './contexts/AuthContext';
import { TransactionsProvider } from './contexts/TransactionsContext';
import { useBrandTheme } from './hooks/useBrandTheme';
import { SiteLayout } from './components/layout/SiteLayout';
import { RequireAuth } from './components/layout/RequireAuth';
import { AccountLayout } from './components/account/AccountLayout';
import { Landing } from './pages/Landing';
import { Search } from './pages/Search';
import { Listing } from './pages/Listing';
import { Checkout } from './pages/Checkout';
import { Inbox } from './pages/Inbox';
import { HostProfile } from './pages/HostProfile';
import { CreateListing } from './pages/CreateListing';
import { Login } from './pages/auth/Login';
import { Signup } from './pages/auth/Signup';
import { ContactDetails } from './pages/account/ContactDetails';
import { Password } from './pages/account/Password';
import { Payouts } from './pages/account/Payouts';
import { About } from './pages/About';
import { Terms } from './pages/Terms';
import { Privacy } from './pages/Privacy';
import { NotFound } from './pages/NotFound';

interface AppProps {
  /** Start the prototype logged in as the demo user (shows inbox, account menu). */
  startSignedIn?: boolean;
}

export function App({ startSignedIn = false }: AppProps) {
  useBrandTheme();

  return (
    <AuthProvider startSignedIn={startSignedIn}>
      <TransactionsProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<SiteLayout />}>
              <Route path="/" element={<Landing />} />
              <Route path="/l/:id" element={<Listing />} />
              <Route path="/checkout/:id" element={<Checkout />} />
              <Route path="/u/:id" element={<HostProfile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/about" element={<About />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route element={<RequireAuth />}>
                <Route path="/host/new" element={<Navigate to="/host/new/details" replace />} />
                <Route path="/host/new/:step" element={<CreateListing />} />
                <Route path="/account" element={<AccountLayout />}>
                  <Route index element={<Navigate to="/account/contact" replace />} />
                  <Route path="contact" element={<ContactDetails />} />
                  <Route path="password" element={<Password />} />
                  <Route path="payouts" element={<Payouts />} />
                </Route>
              </Route>
              <Route path="*" element={<NotFound />} />
            </Route>
            <Route element={<SiteLayout showFooter={false} />}>
              <Route path="/s" element={<Search />} />
              <Route element={<RequireAuth />}>
                <Route path="/inbox" element={<Navigate to="/inbox/trips" replace />} />
                <Route path="/inbox/:tab" element={<Inbox />} />
                <Route path="/inbox/:tab/:txId" element={<Inbox />} />
              </Route>
            </Route>
          </Routes>
          <Toaster position="bottom-center" richColors />
        </BrowserRouter>
      </TransactionsProvider>
    </AuthProvider>);

}
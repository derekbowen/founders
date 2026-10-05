import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from './contexts/AuthContext';
import { BookingsProvider } from './contexts/BookingsContext';
import { AppLayout } from './components/layout/AppLayout';
import { RequireAuth } from './components/layout/RequireAuth';
import { Landing } from './pages/Landing';
import { Search } from './pages/Search';
import { ListingDetail } from './pages/ListingDetail';
import { Checkout } from './pages/Checkout';
import { Inbox } from './pages/Inbox';
import { TransactionDetail } from './pages/TransactionDetail';
import { Profile } from './pages/Profile';
import { CreateListing } from './pages/CreateListing';
import { Auth } from './pages/Auth';
import { AccountSettings } from './pages/AccountSettings';
import { About } from './pages/About';
import { LegalPage } from './pages/LegalPage';
import { NotFound } from './pages/NotFound';

export function App() {
  return (
    <AuthProvider>
      <BookingsProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout hideFooter />}>
              <Route path="/s" element={<Search />} />
              <Route path="/order/:id" element={<RequireAuth><TransactionDetail /></RequireAuth>} />
            </Route>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Landing />} />
              <Route path="/l/:id" element={<ListingDetail />} />
              <Route path="/checkout/:id" element={<RequireAuth><Checkout /></RequireAuth>} />
              <Route path="/inbox" element={<RequireAuth><Inbox /></RequireAuth>} />
              <Route path="/u/:id" element={<Profile />} />
              <Route path="/profile" element={<RequireAuth><Navigate to="/u/me" replace /></RequireAuth>} />
              <Route path="/listings/new" element={<RequireAuth><CreateListing /></RequireAuth>} />
              <Route path="/login" element={<Auth mode="login" />} />
              <Route path="/signup" element={<Auth mode="signup" />} />
              <Route path="/account" element={<Navigate to="/account/contact" replace />} />
              <Route path="/account/:section" element={<RequireAuth><AccountSettings /></RequireAuth>} />
              <Route path="/about" element={<About />} />
              <Route path="/terms" element={<LegalPage kind="terms" />} />
              <Route path="/privacy" element={<LegalPage kind="privacy" />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
          <Toaster position="top-center" richColors closeButton />
        </BrowserRouter>
      </BookingsProvider>
    </AuthProvider>);

}
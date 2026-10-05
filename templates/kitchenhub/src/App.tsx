import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { BrandStyles } from './components/layout/BrandStyles';
import { Layout } from './components/layout/Layout';
import { AuthProvider } from './contexts/AuthContext';
import { AboutPage } from './pages/About';
import { AccountSettingsPage } from './pages/AccountSettings';
import { AuthPage } from './pages/Auth';
import { CheckoutPage } from './pages/Checkout';
import { CreateListingPage } from './pages/CreateListing';
import { InboxPage } from './pages/Inbox';
import { LandingPage } from './pages/Landing';
import { ListingPage } from './pages/Listing';
import { NotFoundPage } from './pages/NotFound';
import { PrivacyPage } from './pages/Privacy';
import { ProfilePage } from './pages/Profile';
import { SearchPage } from './pages/Search';
import { TermsPage } from './pages/Terms';

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <BrandStyles />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/kitchens/:id" element={<ListingPage />} />
            <Route path="/checkout/:id" element={<CheckoutPage />} />
            <Route path="/inbox" element={<InboxPage />} />
            <Route path="/inbox/:txId" element={<InboxPage />} />
            <Route path="/profile/:hostId" element={<ProfilePage />} />
            <Route path="/listings/new" element={<CreateListingPage />} />
            <Route path="/login" element={<AuthPage mode="login" />} />
            <Route path="/signup" element={<AuthPage mode="signup" />} />
            <Route path="/account" element={<Navigate to="/account/contact" replace />} />
            <Route path="/account/:tab" element={<AccountSettingsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>);

}
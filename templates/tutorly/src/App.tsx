import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ToastProvider } from './components/ToastProvider';
import { AuthProvider } from './contexts/AuthContext';
import { LessonsProvider } from './contexts/LessonsContext';
import { AppLayout } from './components/layout/AppLayout';
import { RequireAuth } from './components/layout/RequireAuth';
import { LandingPage } from './pages/Landing';
import { SearchPage } from './pages/Search';
import { ListingPage } from './pages/Listing';
import { CheckoutPage } from './pages/Checkout';
import { InboxPage } from './pages/Inbox';
import { ProfilePage } from './pages/Profile';
import { CreateListingPage } from './pages/CreateListing';
import { LoginPage } from './pages/Login';
import { SignupPage } from './pages/Signup';
import { AccountLayout } from './pages/account/AccountLayout';
import { ContactDetailsPage } from './pages/account/ContactDetails';
import { PasswordPage } from './pages/account/Password';
import { PayoutsPage } from './pages/account/Payouts';
import { AboutPage } from './pages/About';
import { TermsPage } from './pages/Terms';
import { PrivacyPage } from './pages/Privacy';
import { NotFoundPage } from './pages/NotFound';
import { applyBrandTheme } from './utils/theme';

applyBrandTheme();

interface AppProps {
  /** Preview the marketplace as a signed-in user. */
  startSignedIn?: boolean;
}

export function App({ startSignedIn = false }: AppProps) {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider initialSignedIn={startSignedIn}>
          <LessonsProvider>
            <Routes>
              <Route element={<AppLayout />}>
                <Route path="/" element={<LandingPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/tutors/:tutorId" element={<ListingPage />} />
                <Route path="/u/:tutorId" element={<ProfilePage />} />
                <Route path="/checkout" element={<RequireAuth><CheckoutPage /></RequireAuth>} />
                <Route path="/inbox" element={<RequireAuth><InboxPage /></RequireAuth>} />
                <Route path="/listings/new" element={<RequireAuth><CreateListingPage /></RequireAuth>} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/account" element={<RequireAuth><AccountLayout /></RequireAuth>}>
                  <Route index element={<Navigate to="contact" replace />} />
                  <Route path="contact" element={<ContactDetailsPage />} />
                  <Route path="password" element={<PasswordPage />} />
                  <Route path="payouts" element={<PayoutsPage />} />
                </Route>
                <Route path="/about" element={<AboutPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </LessonsProvider>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>);

}
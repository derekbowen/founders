import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ToastProvider } from './components/ToastProvider';
import { AppProvider } from './contexts/AppContext';
import { Layout } from './components/layout/Layout';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { Landing } from './pages/Landing';
import { Search } from './pages/Search';
import { ListingPage } from './pages/Listing';
import { InquirySent } from './pages/InquirySent';
import { Inbox } from './pages/Inbox';
import { InquiryDetail } from './pages/InquiryDetail';
import { Profile, MyProfileRedirect } from './pages/Profile';
import { CreateListing } from './pages/CreateListing';
import { Auth } from './pages/Auth';
import { AccountSettings } from './pages/AccountSettings';
import { About } from './pages/About';
import { Terms } from './pages/Terms';
import { Privacy } from './pages/Privacy';
import { NotFound } from './pages/NotFound';
import { applyBrandTheme } from './utils/theme';

applyBrandTheme();

export function App() {
  return (
    <ToastProvider>
      <AppProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Landing />} />
              <Route path="/l/:id" element={<ListingPage />} />
              <Route path="/inquiry-sent/:id" element={<InquirySent />} />
              <Route path="/inbox" element={<Inbox />} />
              <Route path="/inbox/:id" element={<InquiryDetail />} />
              <Route path="/u/:id" element={<Profile />} />
              <Route path="/profile" element={<MyProfileRedirect />} />
              <Route path="/listings/new" element={<CreateListing />} />
              <Route path="/login" element={<Auth mode="login" />} />
              <Route path="/signup" element={<Auth mode="signup" />} />
              <Route path="/account" element={<Navigate to="/account/contact" replace />} />
              <Route path="/account/:section" element={<AccountSettings />} />
              <Route path="/about" element={<About />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="*" element={<NotFound />} />
            </Route>
            <Route element={<Layout hideFooter />}>
              <Route path="/s" element={<Search />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </ToastProvider>);

}
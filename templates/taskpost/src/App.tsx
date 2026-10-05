import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AppProvider } from './contexts/AppContext';
import { Layout } from './components/layout/Layout';
import { Landing } from './pages/Landing';
import { Search } from './pages/Search';
import { Listing } from './pages/Listing';
import { Checkout } from './pages/Checkout';
import { Inbox } from './pages/Inbox';
import { Profile } from './pages/Profile';
import { PostJob } from './pages/PostJob';
import { Auth } from './pages/Auth';
import { AccountSettings } from './pages/AccountSettings';
import { About } from './pages/About';
import { Terms } from './pages/Terms';
import { Privacy } from './pages/Privacy';
import { NotFound } from './pages/NotFound';

export function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/search" element={<Search />} />
            <Route path="/jobs/:id" element={<Listing />} />
            <Route path="/checkout/:txId" element={<Checkout />} />
            <Route path="/inbox" element={<Inbox />} />
            <Route path="/inbox/:txId" element={<Inbox />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/post-job" element={<PostJob />} />
            <Route path="/login" element={<Auth mode="login" />} />
            <Route path="/signup" element={<Auth mode="signup" />} />
            <Route path="/account" element={<Navigate to="/account/contact" replace />} />
            <Route path="/account/:section" element={<AccountSettings />} />
            <Route path="/about" element={<About />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" richColors closeButton />
    </AppProvider>);

}
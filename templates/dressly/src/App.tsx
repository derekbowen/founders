import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { BrandStyles } from './components/layout/BrandStyles';
import { Layout } from './components/layout/Layout';
import { Landing } from './pages/Landing';
import { Search } from './pages/Search';
import { ListingPage } from './pages/ListingPage';
import { Checkout } from './pages/Checkout';
import { Inbox } from './pages/Inbox';
import { Profile } from './pages/Profile';
import { CreateListing } from './pages/CreateListing';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Account } from './pages/Account';
import { About } from './pages/About';
import { Terms } from './pages/Terms';
import { Privacy } from './pages/Privacy';
import { NotFound } from './pages/NotFound';

interface AppProps {
  /** Preview the marketplace as a signed-in member (inbox, closet, account menu). */
  startSignedIn?: boolean;
}

export function App({ startSignedIn = false }: AppProps) {
  return (
    <AuthProvider startSignedIn={startSignedIn}>
      <BrandStyles />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/s" element={<Search />} />
            <Route path="/l/new" element={<CreateListing />} />
            <Route path="/l/:id" element={<ListingPage />} />
            <Route path="/checkout/:id" element={<Checkout />} />
            <Route path="/inbox" element={<Inbox />} />
            <Route path="/closet/:id" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/account" element={<Account />} />
            <Route path="/account/:section" element={<Account />} />
            <Route path="/about" element={<About />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>);

}
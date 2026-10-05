import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastProvider } from './components/ToastProvider';
import { BrandTheme } from './components/layout/BrandTheme';
import { Layout } from './components/layout/Layout';
import { StoreProvider } from './contexts/StoreContext';
import { Landing } from './pages/Landing';
import { Search } from './pages/Search';
import { Listing } from './pages/Listing';
import { Checkout } from './pages/Checkout';
import { Library } from './pages/Library';
import { OrderDetail } from './pages/OrderDetail';
import { CreatorProfile } from './pages/CreatorProfile';
import { CreateListing } from './pages/CreateListing';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { AccountSettings } from './pages/AccountSettings';
import { About } from './pages/About';
import { Terms } from './pages/Terms';
import { Privacy } from './pages/Privacy';
import { NotFound } from './pages/NotFound';

export function App() {
  return (
    <BrowserRouter>
      <BrandTheme />
      <ToastProvider>
        <StoreProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Landing />} />
              <Route path="/s" element={<Search />} />
              <Route path="/l/:slug" element={<Listing />} />
              <Route path="/checkout/:slug" element={<Checkout />} />
              <Route path="/inbox" element={<Library />} />
              <Route path="/inbox/:orderId" element={<OrderDetail />} />
              <Route path="/u/:creatorId" element={<CreatorProfile />} />
              <Route path="/listings/new" element={<CreateListing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/account" element={<AccountSettings />} />
              <Route path="/account/:section" element={<AccountSettings />} />
              <Route path="/about" element={<About />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </StoreProvider>
      </ToastProvider>
    </BrowserRouter>);

}
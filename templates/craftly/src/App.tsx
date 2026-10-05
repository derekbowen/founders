import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { ListingsProvider } from './contexts/ListingsContext';
import { OrdersProvider } from './contexts/OrdersContext';
import { AppLayout } from './components/layout/AppLayout';
import { RequireAuth } from './components/layout/RequireAuth';
import { AccountLayout } from './components/account/AccountLayout';
import { Landing } from './pages/Landing';
import { Search } from './pages/Search';
import { ListingPage } from './pages/ListingPage';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Inbox } from './pages/Inbox';
import { OrderDetail } from './pages/OrderDetail';
import { MakerShop } from './pages/MakerShop';
import { CreateListing } from './pages/CreateListing';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { ContactDetails } from './pages/account/ContactDetails';
import { PasswordSettings } from './pages/account/PasswordSettings';
import { Payouts } from './pages/account/Payouts';
import { ShippingAddress } from './pages/account/ShippingAddress';
import { About } from './pages/About';
import { Terms } from './pages/Terms';
import { Privacy } from './pages/Privacy';
import { NotFound } from './pages/NotFound';
import { applyBrandTheme } from './utils/brandTheme';

applyBrandTheme();

interface AppProps {
  /** Start the prototype signed in as the demo maker (Sam Rivera, Juniper Kiln). */
  signedIn?: boolean;
}

export function App({ signedIn = false }: AppProps) {
  return (
    <AuthProvider initialSignedIn={signedIn}>
      <ListingsProvider>
        <OrdersProvider>
          <CartProvider>
            <FavoritesProvider>
              <BrowserRouter>
                <Routes>
                  <Route element={<AppLayout />}>
                    <Route index element={<Landing />} />
                    <Route path="s" element={<Search />} />
                    <Route path="l/:id" element={<ListingPage />} />
                    <Route path="shop/:makerId" element={<MakerShop />} />
                    <Route path="cart" element={<Cart />} />
                    <Route path="checkout" element={<RequireAuth><Checkout /></RequireAuth>} />
                    <Route path="inbox" element={<Navigate to="/inbox/purchases" replace />} />
                    <Route path="inbox/:tab" element={<RequireAuth><Inbox /></RequireAuth>} />
                    <Route path="orders/:id" element={<RequireAuth><OrderDetail /></RequireAuth>} />
                    <Route path="listings/new" element={<RequireAuth><CreateListing /></RequireAuth>} />
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<Signup />} />
                    <Route path="account" element={<RequireAuth><AccountLayout /></RequireAuth>}>
                      <Route index element={<Navigate to="contact" replace />} />
                      <Route path="contact" element={<ContactDetails />} />
                      <Route path="password" element={<PasswordSettings />} />
                      <Route path="payouts" element={<Payouts />} />
                      <Route path="shipping" element={<ShippingAddress />} />
                    </Route>
                    <Route path="about" element={<About />} />
                    <Route path="terms" element={<Terms />} />
                    <Route path="privacy" element={<Privacy />} />
                    <Route path="*" element={<NotFound />} />
                  </Route>
                </Routes>
              </BrowserRouter>
              <Toaster
                position="bottom-right"
                toastOptions={{
                  className: '!rounded-xl !border !border-line !bg-surface !text-ink !font-sans !shadow-lift'
                }} />
              
            </FavoritesProvider>
          </CartProvider>
        </OrdersProvider>
      </ListingsProvider>
    </AuthProvider>);

}
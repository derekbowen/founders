import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import { RequireAuth } from "./components/layout/RequireAuth";
import { SiteLayout } from "./components/layout/SiteLayout";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { CatalogProvider } from "./contexts/CatalogContext";
import { OrdersProvider } from "./contexts/OrdersContext";
import { About } from "./pages/About";
import { AccountSettings } from "./pages/AccountSettings";
import { Auth } from "./pages/Auth";
import { Cart } from "./pages/Cart";
import { Checkout } from "./pages/Checkout";
import { CreateListing } from "./pages/CreateListing";
import { FarmProfile } from "./pages/FarmProfile";
import { Inbox } from "./pages/Inbox";
import { Landing } from "./pages/Landing";
import { Legal } from "./pages/Legal";
import { Listing } from "./pages/Listing";
import { NotFound } from "./pages/NotFound";
import { Search } from "./pages/Search";
import { brandCssVars } from "./utils/brandTheme";

export function App() {
  return (
    <div style={brandCssVars() as React.CSSProperties} className="min-h-screen w-full bg-kraft font-sans text-ink">
      <BrowserRouter>
        <AuthProvider>
          <CatalogProvider>
            <OrdersProvider>
              <CartProvider>
                <Routes>
                  <Route element={<SiteLayout />}>
                    <Route path="/" element={<Landing />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/listings/new" element={<RequireAuth><CreateListing /></RequireAuth>} />
                    <Route path="/listings/:id" element={<Listing />} />
                    <Route path="/farms/:id" element={<FarmProfile />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<RequireAuth><Checkout /></RequireAuth>} />
                    <Route path="/inbox" element={<RequireAuth><Inbox /></RequireAuth>} />
                    <Route path="/inbox/:tab" element={<RequireAuth><Inbox /></RequireAuth>} />
                    <Route path="/inbox/:tab/:orderId" element={<RequireAuth><Inbox /></RequireAuth>} />
                    <Route path="/account" element={<RequireAuth><AccountSettings /></RequireAuth>} />
                    <Route path="/account/:tab" element={<RequireAuth><AccountSettings /></RequireAuth>} />
                    <Route path="/login" element={<Auth mode="login" />} />
                    <Route path="/signup" element={<Auth mode="signup" />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/terms" element={<Legal kind="terms" />} />
                    <Route path="/privacy" element={<Legal kind="privacy" />} />
                    <Route path="*" element={<NotFound />} />
                  </Route>
                </Routes>
                <Toaster
                  position="bottom-right"
                  toastOptions={{ style: { fontFamily: "Inter, sans-serif", borderRadius: "14px" } }} />
                
              </CartProvider>
            </OrdersProvider>
          </CatalogProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>);

}
import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { InboxProvider } from "./contexts/InboxContext";
import { AppLayout } from "./components/layout/AppLayout";
import { ScrollToTop } from "./components/layout/ScrollToTop";
import { RequireAuth } from "./components/auth/RequireAuth";
import { Landing } from "./pages/Landing";
import { Search } from "./pages/Search";
import { Listing } from "./pages/Listing";
import { InquirySent } from "./pages/InquirySent";
import { Inbox } from "./pages/Inbox";
import { VendorProfile } from "./pages/VendorProfile";
import { CreateListing } from "./pages/CreateListing";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { AccountSettings } from "./pages/AccountSettings";
import { About } from "./pages/About";
import { Terms } from "./pages/Terms";
import { Privacy } from "./pages/Privacy";
import { NotFound } from "./pages/NotFound";
import { applyBrandTheme } from "./utils/theme";

applyBrandTheme();

interface AppProps {
  /** Start the prototype signed in as the demo account (couple + vendor) */
  startSignedIn?: boolean;
}

export function App({ startSignedIn = false }: AppProps) {
  return (
    <BrowserRouter>
      <AuthProvider initialSignedIn={startSignedIn}>
        <InboxProvider>
          <ScrollToTop />
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<Landing />} />
              <Route path="search" element={<Search />} />
              <Route path="l/:slug" element={<Listing />} />
              <Route path="inquiry-sent/:conversationId" element={<InquirySent />} />
              <Route path="inbox" element={<Navigate to="/inbox/inquiries" replace />} />
              <Route path="inbox/:tab" element={<RequireAuth><Inbox /></RequireAuth>} />
              <Route path="inbox/:tab/:conversationId" element={<RequireAuth><Inbox /></RequireAuth>} />
              <Route path="profile/:ownerId" element={<VendorProfile />} />
              <Route path="listings/new" element={<RequireAuth><CreateListing /></RequireAuth>} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="account" element={<Navigate to="/account/contact" replace />} />
              <Route path="account/:section" element={<RequireAuth><AccountSettings /></RequireAuth>} />
              <Route path="about" element={<About />} />
              <Route path="terms" element={<Terms />} />
              <Route path="privacy" element={<Privacy />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </InboxProvider>
      </AuthProvider>
    </BrowserRouter>);

}
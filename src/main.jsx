import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { UserProvider } from "./hooks/UserContext.jsx";

import Home from "./pages/tabHome/Home";
import Login from "./pages/auth/Login";
import Reset from "./pages/auth/ResetPassword";
import Register from "./pages/auth/Register";
import NewPassword from "./pages/auth/NewPassword";
import Finder from "./pages/tabFinder/Finder";
import CreateDonation from "./pages/tabDonation/CreateDonation";
import Profile from "./pages/tabProfile/Profile";
import Fallback from "./pages/Fallback";
import Donation from "./pages/tabDonation/Donation";
import ProtectedRoute from "./components/ProtectedRoute";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/auth" element={<Login />} />
          <Route path="/auth/reset-password" element={<Reset />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/new-password" element={<NewPassword />} />
          <Route path="/finder" element={<ProtectedRoute><Finder /></ProtectedRoute>} />
          <Route path="/donation" element={<ProtectedRoute><Donation /></ProtectedRoute>} />
          <Route path="/donation/form" element={<ProtectedRoute><CreateDonation /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/error" element={<Fallback />} />
        </Routes>
      </Router>
    </UserProvider>
  </StrictMode>
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Home from "./pages/tabHome/Home";
import Login from "./pages/auth/Login";
import Reset from "./pages/auth/ResetPassword";
import Register from "./pages/auth/Register";
import NewPassword from "./pages/auth/NewPassword";
import Finder from "./pages/tabFinder/Finder";
import OrgDonation from "./pages/tabDonation/OrgDonation";
import UserDonation from "./pages/tabDonation/UserDonation";
import CreateDonation from "./pages/tabDonation/CreateDonation";
import Profile from "./pages/tabProfile/Profile";
import Fallback from "./pages/Fallback";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/auth" element={<Login />} />
        <Route path="/auth/reset-password" element={<Reset />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/new-password" element={<NewPassword />} />
        <Route path="/finder" element={<Finder />} />
        <Route path="/donation/org" element={<OrgDonation />} />
        <Route path="/donation/user" element={<UserDonation />} />
        <Route path="/donation/form" element={<CreateDonation />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/error" element={<Fallback />} />
      </Routes>
    </Router>
  </StrictMode>
);

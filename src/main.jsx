import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OrgDonations from "./pages/Donations/Org";
import UserDonation from "./pages/Donations/User";
import DonationForm from "./pages/Donation Form";
import Profile from "./pages/Profile";
import Errors from "./pages/Errors";
import List from "./pages/List";
import Reset from "./pages/Reset";
import NewPassowrd from "./pages/New Password";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Login />} />
        <Route path="/auth/reset-password" element={<Reset />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/new-password" element={<NewPassowrd />} />
        <Route path="/list" element={<List />} />
        <Route path="/donation/org" element={<OrgDonations />} />
        <Route path="/donation/user" element={<UserDonation />} />
        <Route path="/donation/form" element={<DonationForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/error" element={<Errors />} />
      </Routes>
    </Router>
  </StrictMode>
);

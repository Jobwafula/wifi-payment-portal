import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";
import ContactPage from "./pages/ContactPage";
import SignUpPage from "./pages/SignupPage";
import CaptivePortal from "./pages/Captiveportal";
import PricingDetail from "./pages/PricingDetail";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLayout from "./components/layout/AdminLayout";
import TenantDashboard from "./pages/TenantDashboard";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path='/home' element={<Home />} />
        <Route path='/contact' element={<ContactPage />} />
        <Route path="/sign-up" element={<SignUpPage />}  />
        <Route path="/tenant-dashboard" element={<TenantDashboard />} />

        <Route path="/captive-portal" element={<CaptivePortal />}
        />
        <Route path="/pricing/:plan" element={<PricingDetail />}
         />
         <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="tenants" element={<AdminDashboard />} />
          <Route path="transactions" element={<AdminDashboard />} />
          <Route path="settings" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
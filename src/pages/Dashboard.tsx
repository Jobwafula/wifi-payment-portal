import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Users from "../components/users/Users";
import Payments from "../components/payments/Payments";
import Analytics from "../components/analytics/Analytics";
import Devices from "../components/devices/Devices";
import Settings from "../components/settings/Settings";
import Logs from "../components/logs/Logs";
import Support from "../components/support/Support";
import Home from "../components/home/Home"; // Import the Home component

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />
      <div className="flex-1 p-8">
        <Routes>
          <Route path="/" element={<Home />} /> {/* Default route for Home */}
          <Route path="/users" element={<Users />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/devices" element={<Devices />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/logs" element={<Logs />} />
          <Route path="/support" element={<Support />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
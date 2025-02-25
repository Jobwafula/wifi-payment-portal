import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Users from "../components/users/Users";
import Payments from "../components/payments/Payments";
import Analytics from "../components/analytics/Analytics";

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />
      <div className="flex-1 p-8">
        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
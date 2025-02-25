import React from "react";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <div className="bg-white w-64 min-h-screen shadow-lg">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-blue-600">Admin Dashboard</h1>
        <nav className="mt-8">
          <ul className="space-y-2">
            <li>
              <Link
                to="/dashboard/users"
                className="block px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-md"
              >
                Users
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/payments"
                className="block px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-md"
              >
                Payments
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/analytics"
                className="block px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-md"
              >
                Analytics
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
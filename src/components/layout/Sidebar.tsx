import React from "react";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <div className="bg-gray-900 w-64 min-h-screen shadow-lg text-white">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-green-500">Wifi Hotspot Manager</h1>
        <nav className="mt-8">
          <ul className="space-y-2">
            <li>
             
            </li>
            <li>
              <Link
                to="/dashboard/users"
                className="flex items-center px-4 py-2 text-gray-300 hover:bg-green-700 rounded-md transition duration-300"
              >
                <span className="mr-2">👥</span>
                Users
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/payments"
                className="flex items-center px-4 py-2 text-gray-300 hover:bg-green-700 rounded-md transition duration-300"
              >
                <span className="mr-2">💳</span>
                Payments
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/devices"
                className="flex items-center px-4 py-2 text-gray-300 hover:bg-green-700 rounded-md transition duration-300"
              >
                <span className="mr-2">📱</span>
                Devices
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/analytics"
                className="flex items-center px-4 py-2 text-gray-300 hover:bg-green-700 rounded-md transition duration-300"
              >
                <span className="mr-2">📈</span>
                Analytics
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/settings"
                className="flex items-center px-4 py-2 text-gray-300 hover:bg-green-700 rounded-md transition duration-300"
              >
                <span className="mr-2">⚙️</span>
                Settings
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/logs"
                className="flex items-center px-4 py-2 text-gray-300 hover:bg-green-700 rounded-md transition duration-300"
              >
                <span className="mr-2">📜</span>
                Logs
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/support"
                className="flex items-center px-4 py-2 text-gray-300 hover:bg-green-700 rounded-md transition duration-300"
              >
                <span className="mr-2">🛟</span>
                Support
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
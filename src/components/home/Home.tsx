import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  // Dummy data for metrics
  const metrics = [
    { id: 1, title: "Total Users", value: "1,250", change: "+5%", icon: "👥" },
    { id: 2, title: "Active Devices", value: "320", change: "+2%", icon: "📱" },
    { id: 3, title: "Total Revenue", value: "Ksh 250,000", change: "+10%", icon: "💳" },
    { id: 4, title: "Pending Payments", value: "Ksh 50,000", change: "-3%", icon: "⏳" },
  ];

  // Dummy data for recent activity
  const recentActivity = [
    { id: 1, action: "New user registered", timestamp: "2023-10-05 14:30:00" },
    { id: 2, action: "Payment received", timestamp: "2023-10-05 12:15:00" },
    { id: 3, action: "Device disconnected", timestamp: "2023-10-05 10:45:00" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>

      {/* Key Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric) => (
          <div
            key={metric.id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{metric.title}</p>
                <p className="text-2xl font-bold text-gray-800">{metric.value}</p>
                <p className="text-sm text-green-500">{metric.change}</p>
              </div>
              <span className="text-3xl">{metric.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Links Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/dashboard/users"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center"
          >
            <span className="text-2xl">👥</span>
            <p className="text-gray-800 font-semibold mt-2">Manage Users</p>
          </Link>
          <Link
            to="/dashboard/payments"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center"
          >
            <span className="text-2xl">💳</span>
            <p className="text-gray-800 font-semibold mt-2">View Payments</p>
          </Link>
          <Link
            to="/dashboard/devices"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center"
          >
            <span className="text-2xl">📱</span>
            <p className="text-gray-800 font-semibold mt-2">Manage Devices</p>
          </Link>
          <Link
            to="/dashboard/analytics"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center"
          >
            <span className="text-2xl">📈</span>
            <p className="text-gray-800 font-semibold mt-2">View Analytics</p>
          </Link>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {recentActivity.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <p className="text-sm text-gray-700">{activity.action}</p>
              <p className="text-xs text-gray-500">{activity.timestamp}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
import React from "react";

const Analytics: React.FC = () => {
  // Dummy data for analytics
  const analyticsData = {
    totalUsers: 150,
    activeUsers: 120,
    revenue: "$5000",
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-800">Total Users</h3>
          <p className="text-2xl font-bold text-blue-600">{analyticsData.totalUsers}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-green-800">Active Users</h3>
          <p className="text-2xl font-bold text-green-600">{analyticsData.activeUsers}</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-purple-800">Revenue</h3>
          <p className="text-2xl font-bold text-purple-600">{analyticsData.revenue}</p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
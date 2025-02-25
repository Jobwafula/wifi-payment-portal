import React from "react";
import Card from "../common/Card";

const Analytics: React.FC = () => {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-6">Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <h3 className="text-lg font-semibold text-gray-700">Total Revenue</h3>
          <p className="text-2xl font-bold text-blue-600">Ksh 10,000</p>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold text-gray-700">Active Users</h3>
          <p className="text-2xl font-bold text-green-600">25</p>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold text-gray-700">Transactions</h3>
          <p className="text-2xl font-bold text-purple-600">120</p>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
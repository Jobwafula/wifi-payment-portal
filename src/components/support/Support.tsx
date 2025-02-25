import React from "react";

const Support: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Support</h2>
      <p className="text-gray-600">
        If you need assistance, please contact us at{" "}
        <a href="mailto:support@mikrotikmanager.com" className="text-blue-500">
          support@mikrotikmanager.com
        </a>
        .
      </p>
    </div>
  );
};

export default Support;
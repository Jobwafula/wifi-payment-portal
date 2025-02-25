import React from "react";

const Settings: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Settings</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <p className="text-gray-700">Enable Notifications</p>
          <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
        </div>
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <p className="text-gray-700">Dark Mode</p>
          <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
        </div>
      </div>
    </div>
  );
};

export default Settings;
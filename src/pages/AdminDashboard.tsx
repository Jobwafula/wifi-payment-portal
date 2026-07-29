// AdminDashboard.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Tenant {
  id: string;
  businessName: string;
  email: string;
  plan: string;
  subscribers: number;
  revenue: number;
  status: "active" | "inactive" | "suspended";
  joinedDate: string;
}

interface Transaction {
  id: string;
  tenant: string;
  amount: number;
  type: "subscription" | "commission";
  status: "completed" | "pending" | "failed";
  date: string;
}

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Mock data - replace with actual API calls
  const tenants: Tenant[] = [
    {
      id: "1",
      businessName: "Nairobi Wi-Fi Solutions",
      email: "john@nairobiwifi.com",
      plan: "Pro",
      subscribers: 342,
      revenue: 1539000,
      status: "active",
      joinedDate: "2024-01-15",
    },
    {
      id: "2",
      businessName: "Mombasa Hotspot Network",
      email: "sarah@mombasahotspot.com",
      plan: "Starter",
      subscribers: 89,
      revenue: 133500,
      status: "active",
      joinedDate: "2024-02-20",
    },
    {
      id: "3",
      businessName: "Kisumu Fiber Connect",
      email: "peter@kisumufiber.com",
      plan: "Enterprise",
      subscribers: 785,
      revenue: 4317500,
      status: "active",
      joinedDate: "2023-11-01",
    },
    {
      id: "4",
      businessName: "Eldoret Wireless",
      email: "mary@eldoretwireless.com",
      plan: "Pro",
      subscribers: 156,
      revenue: 702000,
      status: "suspended",
      joinedDate: "2024-03-10",
    },
  ];

  const transactions: Transaction[] = [
    {
      id: "1",
      tenant: "Nairobi Wi-Fi Solutions",
      amount: 4500,
      type: "subscription",
      status: "completed",
      date: "2024-03-15",
    },
    {
      id: "2",
      tenant: "Mombasa Hotspot Network",
      amount: 1500,
      type: "subscription",
      status: "completed",
      date: "2024-03-14",
    },
    {
      id: "3",
      tenant: "Kisumu Fiber Connect",
      amount: 2750,
      type: "commission",
      status: "pending",
      date: "2024-03-13",
    },
    {
      id: "4",
      tenant: "Eldoret Wireless",
      amount: 4500,
      type: "subscription",
      status: "failed",
      date: "2024-03-12",
    },
  ];

  const stats = {
    totalTenants: tenants.length,
    activeTenants: tenants.filter(t => t.status === "active").length,
    totalRevenue: tenants.reduce((sum, t) => sum + t.revenue, 0),
    totalSubscribers: tenants.reduce((sum, t) => sum + t.subscribers, 0),
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-yellow-100 text-yellow-800";
      case "suspended":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTransactionStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-green-800 text-white transition-all duration-300 ease-in-out flex flex-col`}
      >
        <div className="flex items-center justify-between p-4 border-b border-green-700">
          <div className={`${sidebarOpen ? "block" : "hidden"} font-bold text-xl`}>
            NetworkSaaS
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {sidebarOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              )}
            </svg>
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActiveTab("overview")}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === "overview"
                ? "bg-green-700 text-white"
                : "hover:bg-green-700 text-gray-300 hover:text-white"
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            <span className={sidebarOpen ? "block" : "hidden"}>Overview</span>
          </button>

          <button
            onClick={() => setActiveTab("tenants")}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === "tenants"
                ? "bg-green-700 text-white"
                : "hover:bg-green-700 text-gray-300 hover:text-white"
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span className={sidebarOpen ? "block" : "hidden"}>Tenants</span>
          </button>

          <button
            onClick={() => setActiveTab("transactions")}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === "transactions"
                ? "bg-green-700 text-white"
                : "hover:bg-green-700 text-gray-300 hover:text-white"
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v1m0-1V7m0 1v1m6 6v-1m-6 1v-1m6 1v-1m-6 1v-1m6-6v-1m-6 1v-1m6 1v-1m-6 1v-1" />
            </svg>
            <span className={sidebarOpen ? "block" : "hidden"}>Transactions</span>
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === "settings"
                ? "bg-green-700 text-white"
                : "hover:bg-green-700 text-gray-300 hover:text-white"
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className={sidebarOpen ? "block" : "hidden"}>Settings</span>
          </button>
        </nav>

        <div className="p-4 border-t border-green-700">
          <button
            onClick={() => navigate("/")}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-green-700 text-gray-300 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className={sidebarOpen ? "block" : "hidden"}>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Bar */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-10">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </h1>
            <p className="text-sm text-gray-500">Admin Dashboard</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
              A
            </div>
          </div>
        </header>

        <div className="p-6">
          {activeTab === "overview" && (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Total Tenants</p>
                      <p className="text-2xl font-bold text-gray-800">{stats.totalTenants}</p>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className="text-green-600 text-sm font-medium">↑ 12%</span>
                    <span className="text-gray-500 text-sm ml-2">from last month</span>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Active Tenants</p>
                      <p className="text-2xl font-bold text-gray-800">{stats.activeTenants}</p>
                    </div>
                    <div className="bg-green-100 p-3 rounded-lg">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className="text-green-600 text-sm font-medium">↑ 8%</span>
                    <span className="text-gray-500 text-sm ml-2">from last month</span>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Total Revenue</p>
                      <p className="text-2xl font-bold text-gray-800">{formatCurrency(stats.totalRevenue)}</p>
                    </div>
                    <div className="bg-purple-100 p-3 rounded-lg">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v1m0-1V7m0 1v1m6 6v-1m-6 1v-1m6 1v-1m-6 1v-1m6-6v-1m-6 1v-1m6 1v-1m-6 1v-1" />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className="text-green-600 text-sm font-medium">↑ 23%</span>
                    <span className="text-gray-500 text-sm ml-2">from last month</span>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Total Subscribers</p>
                      <p className="text-2xl font-bold text-gray-800">{stats.totalSubscribers}</p>
                    </div>
                    <div className="bg-orange-100 p-3 rounded-lg">
                      <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className="text-green-600 text-sm font-medium">↑ 15%</span>
                    <span className="text-gray-500 text-sm ml-2">from last month</span>
                  </div>
                </div>
              </div>

              {/* Recent Tenants Table */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Tenants</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Business</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Email</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Plan</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Subscribers</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Revenue</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tenants.slice(0, 4).map((tenant) => (
                        <tr key={tenant.id} className="border-b hover:bg-gray-50 transition-colors">
                          <td className="py-3 px-4 text-sm text-gray-800">{tenant.businessName}</td>
                          <td className="py-3 px-4 text-sm text-gray-600">{tenant.email}</td>
                          <td className="py-3 px-4 text-sm">
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                              {tenant.plan}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600">{tenant.subscribers}</td>
                          <td className="py-3 px-4 text-sm text-gray-600">{formatCurrency(tenant.revenue)}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(tenant.status)}`}>
                              {tenant.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {activeTab === "tenants" && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-800">All Tenants</h2>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  Add Tenant
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Business</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Email</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Plan</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Subscribers</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Revenue</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Joined</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tenants.map((tenant) => (
                      <tr key={tenant.id} className="border-b hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-4 text-sm text-gray-800">{tenant.businessName}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">{tenant.email}</td>
                        <td className="py-3 px-4 text-sm">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            {tenant.plan}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">{tenant.subscribers}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">{formatCurrency(tenant.revenue)}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">{tenant.joinedDate}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(tenant.status)}`}>
                            {tenant.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-800">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            </button>
                            <button className="text-green-600 hover:text-green-800">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button className="text-red-600 hover:text-red-800">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "transactions" && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-6">All Transactions</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Transaction ID</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Tenant</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Amount</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Type</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Date</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction) => (
                      <tr key={transaction.id} className="border-b hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-4 text-sm text-gray-800 font-mono">#{transaction.id}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">{transaction.tenant}</td>
                        <td className="py-3 px-4 text-sm font-semibold text-gray-800">
                          {formatCurrency(transaction.amount)}
                        </td>
                        <td className="py-3 px-4 text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            transaction.type === "subscription" 
                              ? "bg-purple-100 text-purple-800" 
                              : "bg-orange-100 text-orange-800"
                          }`}>
                            {transaction.type}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">{transaction.date}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${getTransactionStatusColor(transaction.status)}`}>
                            {transaction.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-6">Platform Settings</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-md font-semibold text-gray-700 mb-4">General Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Platform Name</label>
                      <input type="text" className="w-full max-w-md px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="NetworkSaaS" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Commission Rate (%)</label>
                      <input type="number" className="w-full max-w-md px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="10" />
                    </div>
                  </div>
                </div>
                <div className="border-t pt-6">
                  <h3 className="text-md font-semibold text-gray-700 mb-4">Payment Settings</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">M-Pesa API Key</label>
                    <input type="password" className="w-full max-w-md px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="••••••••" />
                  </div>
                </div>
                <div className="border-t pt-6">
                  <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
                    Save Settings
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
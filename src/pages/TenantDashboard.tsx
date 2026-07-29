// TenantDashboard.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Subscriber {
  id: string;
  name: string;
  email: string;
  phone: string;
  plan: string;
  status: "active" | "inactive" | "expired";
  dataUsed: string;
  joinedDate: string;
  expiryDate: string;
}

interface Transaction {
  id: string;
  customer: string;
  amount: number;
  type: "payment" | "refund";
  status: "completed" | "pending" | "failed";
  date: string;
}

interface DashboardStats {
  totalSubscribers: number;
  activeSubscribers: number;
  monthlyRevenue: number;
  totalRevenue: number;
  pendingPayments: number;
}

const TenantDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [showAddSubscriber, setShowAddSubscriber] = useState(false);
  
  // Mock data - replace with actual API calls
  const [stats, setStats] = useState<DashboardStats>({
    totalSubscribers: 342,
    activeSubscribers: 289,
    monthlyRevenue: 153900,
    totalRevenue: 2450000,
    pendingPayments: 12,
  });

  const [subscribers, setSubscribers] = useState<Subscriber[]>([
    {
      id: "1",
      name: "John Mwangi",
      email: "john.mwangi@email.com",
      phone: "+254 712 345 678",
      plan: "Monthly",
      status: "active",
      dataUsed: "12.5 GB",
      joinedDate: "2024-01-15",
      expiryDate: "2024-04-15",
    },
    {
      id: "2",
      name: "Sarah Wanjiru",
      email: "sarah.wanjiru@email.com",
      phone: "+254 723 456 789",
      plan: "Weekly",
      status: "active",
      dataUsed: "8.2 GB",
      joinedDate: "2024-03-01",
      expiryDate: "2024-03-08",
    },
    {
      id: "3",
      name: "Peter Ochieng",
      email: "peter.ochieng@email.com",
      phone: "+254 734 567 890",
      plan: "Monthly",
      status: "inactive",
      dataUsed: "3.1 GB",
      joinedDate: "2023-12-01",
      expiryDate: "2024-01-01",
    },
    {
      id: "4",
      name: "Mary Akinyi",
      email: "mary.akinyi@email.com",
      phone: "+254 745 678 901",
      plan: "Daily",
      status: "expired",
      dataUsed: "2.8 GB",
      joinedDate: "2024-03-05",
      expiryDate: "2024-03-06",
    },
  ]);

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "1",
      customer: "John Mwangi",
      amount: 1500,
      type: "payment",
      status: "completed",
      date: "2024-03-15",
    },
    {
      id: "2",
      customer: "Sarah Wanjiru",
      amount: 500,
      type: "payment",
      status: "completed",
      date: "2024-03-14",
    },
    {
      id: "3",
      customer: "Peter Ochieng",
      amount: 1500,
      type: "payment",
      status: "pending",
      date: "2024-03-13",
    },
    {
      id: "4",
      customer: "Mary Akinyi",
      amount: 200,
      type: "payment",
      status: "failed",
      date: "2024-03-12",
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-yellow-100 text-yellow-800";
      case "expired":
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
        } bg-gradient-to-b from-green-800 to-green-900 text-white transition-all duration-300 ease-in-out flex flex-col`}
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

        {/* Business Info */}
        <div className={`p-4 border-b border-green-700 ${sidebarOpen ? "block" : "hidden"}`}>
          <p className="text-sm text-green-300">Your Business</p>
          <p className="font-semibold">Nairobi Wi-Fi Solutions</p>
          <p className="text-xs text-green-300">Pro Plan</p>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
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
            onClick={() => setActiveTab("subscribers")}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === "subscribers"
                ? "bg-green-700 text-white"
                : "hover:bg-green-700 text-gray-300 hover:text-white"
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className={sidebarOpen ? "block" : "hidden"}>Subscribers</span>
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
            onClick={() => setActiveTab("router")}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === "router"
                ? "bg-green-700 text-white"
                : "hover:bg-green-700 text-gray-300 hover:text-white"
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <span className={sidebarOpen ? "block" : "hidden"}>Router</span>
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
            <p className="text-sm text-gray-500">Welcome back, John!</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
              JD
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
                      <p className="text-sm text-gray-500">Total Subscribers</p>
                      <p className="text-2xl font-bold text-gray-800">{stats.totalSubscribers}</p>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
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
                      <p className="text-sm text-gray-500">Active Subscribers</p>
                      <p className="text-2xl font-bold text-gray-800">{stats.activeSubscribers}</p>
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
                      <p className="text-sm text-gray-500">Monthly Revenue</p>
                      <p className="text-2xl font-bold text-gray-800">{formatCurrency(stats.monthlyRevenue)}</p>
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
                      <p className="text-sm text-gray-500">Pending Payments</p>
                      <p className="text-2xl font-bold text-gray-800">{stats.pendingPayments}</p>
                    </div>
                    <div className="bg-orange-100 p-3 rounded-lg">
                      <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className="text-red-600 text-sm font-medium">↓ 3%</span>
                    <span className="text-gray-500 text-sm ml-2">from last month</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 rounded-xl text-white">
                  <h3 className="text-lg font-semibold mb-2">Quick Add Subscriber</h3>
                  <p className="text-green-100 mb-4">Add a new customer to your Wi-Fi network</p>
                  <button 
                    onClick={() => setActiveTab("subscribers")}
                    className="bg-white text-green-700 px-4 py-2 rounded-lg hover:bg-green-50 transition-colors"
                  >
                    Add Subscriber
                  </button>
                </div>
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 rounded-xl text-white">
                  <h3 className="text-lg font-semibold mb-2">Connect Your Router</h3>
                  <p className="text-blue-100 mb-4">Configure your router to start selling Wi-Fi</p>
                  <button 
                    onClick={() => setActiveTab("router")}
                    className="bg-white text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    Setup Router
                  </button>
                </div>
              </div>

              {/* Recent Subscribers */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">Recent Subscribers</h2>
                  <button 
                    onClick={() => setActiveTab("subscribers")}
                    className="text-green-600 hover:text-green-700 text-sm font-medium"
                  >
                    View All →
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Name</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Phone</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Plan</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Data Used</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subscribers.slice(0, 4).map((subscriber) => (
                        <tr key={subscriber.id} className="border-b hover:bg-gray-50 transition-colors">
                          <td className="py-3 px-4 text-sm text-gray-800">{subscriber.name}</td>
                          <td className="py-3 px-4 text-sm text-gray-600">{subscriber.phone}</td>
                          <td className="py-3 px-4 text-sm">
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                              {subscriber.plan}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600">{subscriber.dataUsed}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(subscriber.status)}`}>
                              {subscriber.status}
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

          {activeTab === "subscribers" && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h2 className="text-lg font-semibold text-gray-800">All Subscribers</h2>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <input
                    type="text"
                    placeholder="Search subscribers..."
                    className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent flex-1 sm:flex-none"
                  />
                  <button 
                    onClick={() => setShowAddSubscriber(true)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Add Subscriber
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Name</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Email</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Phone</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Plan</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Data Used</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Expiry</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscribers.map((subscriber) => (
                      <tr key={subscriber.id} className="border-b hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-4 text-sm text-gray-800">{subscriber.name}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">{subscriber.email}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">{subscriber.phone}</td>
                        <td className="py-3 px-4 text-sm">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            {subscriber.plan}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">{subscriber.dataUsed}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">{subscriber.expiryDate}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(subscriber.status)}`}>
                            {subscriber.status}
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
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h2 className="text-lg font-semibold text-gray-800">All Transactions</h2>
                <div className="flex gap-2">
                  <select className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                    <option>All Types</option>
                    <option>Payments</option>
                    <option>Refunds</option>
                  </select>
                  <select className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                    <option>All Status</option>
                    <option>Completed</option>
                    <option>Pending</option>
                    <option>Failed</option>
                  </select>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">ID</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Customer</th>
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
                        <td className="py-3 px-4 text-sm text-gray-600">{transaction.customer}</td>
                        <td className="py-3 px-4 text-sm font-semibold text-gray-800">
                          {formatCurrency(transaction.amount)}
                        </td>
                        <td className="py-3 px-4 text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            transaction.type === "payment" 
                              ? "bg-green-100 text-green-800" 
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

          {activeTab === "router" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-6">Router Configuration</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Router Type</label>
                    <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                      <option>MikroTik</option>
                      <option>Ubiquiti</option>
                      <option>Cisco</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">IP Address</label>
                    <input type="text" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="192.168.1.1" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                    <input type="text" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="admin" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                    <input type="password" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="••••••••" />
                  </div>
                  <button className="w-full bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold">
                    Connect Router
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-6">Router Status</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Status</span>
                    <span className="text-green-600 font-semibold">● Online</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Connected Users</span>
                    <span className="text-gray-800 font-semibold">42</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Uptime</span>
                    <span className="text-gray-800 font-semibold">15 days 8 hours</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Data Used Today</span>
                    <span className="text-gray-800 font-semibold">45.6 GB</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Bandwidth</span>
                    <span className="text-gray-800 font-semibold">100 Mbps</span>
                  </div>
                  <button className="w-full bg-red-600 text-white px-4 py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold">
                    Disconnect Router
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-6">Business Settings</h2>
              <div className="space-y-6 max-w-2xl">
                <div>
                  <h3 className="text-md font-semibold text-gray-700 mb-4">Business Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
                      <input type="text" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" value="Nairobi Wi-Fi Solutions" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Business Email</label>
                      <input type="email" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" value="john@nairobiwifi.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <input type="tel" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" value="+254 700 000 000" />
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-md font-semibold text-gray-700 mb-4">Pricing Plans</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold">Daily</h4>
                        <p className="text-2xl font-bold text-green-600">Ksh 200</p>
                        <button className="mt-2 text-sm text-green-600 hover:text-green-700">Edit</button>
                      </div>
                      <div className="p-4 border rounded-lg bg-green-50 border-green-200">
                        <h4 className="font-semibold">Weekly</h4>
                        <p className="text-2xl font-bold text-green-600">Ksh 500</p>
                        <button className="mt-2 text-sm text-green-600 hover:text-green-700">Edit</button>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold">Monthly</h4>
                        <p className="text-2xl font-bold text-green-600">Ksh 1,500</p>
                        <button className="mt-2 text-sm text-green-600 hover:text-green-700">Edit</button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-md font-semibold text-gray-700 mb-4">M-Pesa Settings</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">M-Pesa Paybill Number</label>
                    <input type="text" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="Enter your Paybill number" />
                  </div>
                </div>

                <div className="border-t pt-6">
                  <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold">
                    Save Settings
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Subscriber Modal */}
      {showAddSubscriber && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Add Subscriber</h3>
              <button 
                onClick={() => setShowAddSubscriber(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input type="text" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="Enter full name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input type="email" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="Enter email" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input type="tel" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="+254 700 000 000" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Plan</label>
                <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                  <option>Daily - Ksh 200</option>
                  <option>Weekly - Ksh 500</option>
                  <option>Monthly - Ksh 1,500</option>
                </select>
              </div>
              <div className="flex gap-3">
                <button 
                  type="button"
                  onClick={() => setShowAddSubscriber(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Add Subscriber
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TenantDashboard;
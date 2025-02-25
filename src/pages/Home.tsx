import React, { useState } from "react";
import axios from "axios";

const Home: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [credentials, setCredentials] = useState<{ username: string; password: string }>({
    username: "",
    password: "",
  });

  const handlePayment = async () => {
    if (!phoneNumber) {
      setMessage("Please enter your phone number.");
      return;
    }

    setLoading(true);
    setMessage("Initiating payment...");

    try {
      const response = await axios.post("http://localhost:3000/api/pay", {
        phoneNumber,
      });

      if (response.data.success) {
        setMessage("Payment initiated! Please complete the payment on your phone.");
        pollForPaymentStatus(response.data.transactionId);
      } else {
        setMessage("Failed to initiate payment. Please try again.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const pollForPaymentStatus = async (transactionId: string) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/payment-status/${transactionId}`
      );
      if (response.data.success) {
        setMessage("Payment successful! Here are your Wi-Fi credentials:");
        setCredentials({
          username: response.data.username || "",
          password: response.data.password || "",
        });
      } else {
        setMessage("Payment not yet completed. Please wait...");
        setTimeout(() => pollForPaymentStatus(transactionId), 5000); // Retry after 5 seconds
      }
    } catch (error) {
      setMessage("An error occurred while checking payment status.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Wi-Fi Payment Portal</h1>
        <div className="space-y-4">
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
              Enter your phone number:
            </label>
            <input
              type="text"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="e.g., 254712345678"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            onClick={handlePayment}
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300"
          >
            {loading ? "Processing..." : "Pay for Wi-Fi"}
          </button>
          {message && (
            <p className="text-center text-sm text-gray-600 mt-4">{message}</p>
          )}
          {credentials.username && (
            <div className="mt-6 p-4 bg-gray-50 rounded-md">
              <h2 className="text-lg font-semibold text-gray-800">Your Wi-Fi Credentials:</h2>
              <p className="text-sm text-gray-600 mt-2">
                Username: <span className="font-mono text-gray-800">{credentials.username}</span>
              </p>
              <p className="text-sm text-gray-600">
                Password: <span className="font-mono text-gray-800">{credentials.password}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
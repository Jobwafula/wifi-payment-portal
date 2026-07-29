import React, { useState } from "react";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import { Link, useNavigate } from "react-router-dom";

interface SignUpData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  plan?: string;
  businessName?: string;
  phoneNumber?: string;
}

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<SignUpData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    businessName: "",
    phoneNumber: "",
    plan: "starter",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    // Validate password strength
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      setIsLoading(false);
      return;
    }

    // Prepare data for API
    const submitData = {
      full_name: formData.fullName,
      email: formData.email,
      password: formData.password,
      business_name: formData.businessName || `${formData.fullName}'s Wi-Fi Business`,
      phone_number: formData.phoneNumber || "",
      plan: formData.plan || "starter",
    };

    try {
      const response = await fetch("https://mneti.co.ke/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || "Failed to create account");
      }

      // Success - store any tokens or user data
      if (data.token) {
        localStorage.setItem("authToken", data.token);
      }
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      setSuccess(true);
      
      // Redirect to dashboard after successful signup
      setTimeout(() => {
        navigate("/dashboard", { state: { welcome: true } });
      }, 2000);

    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="font-sans antialiased">
      <Navbar />
      <div className="pt-16 bg-gray-50 min-h-screen flex items-center justify-center">
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8 animate-fade-in-up">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-800 mb-4">
                Start Your Free Trial
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-gray-600">
                Create your Wi-Fi distribution business account. No credit card required.
              </p>
            </div>

            {/* Success Message */}
            {success && (
              <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                <p className="font-semibold">Account created successfully!</p>
                <p className="text-sm">Redirecting to dashboard...</p>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                <p className="font-semibold">Error</p>
                <p className="text-sm">{error}</p>
              </div>
            )}

            {/* Sign-Up Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="fullName" className="block text-sm md:text-base font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-300"
                  placeholder="John Doe"
                  required
                  disabled={isLoading}
                />
              </div>

              <div>
                <label htmlFor="businessName" className="block text-sm md:text-base font-medium text-gray-700 mb-2">
                  Business Name
                </label>
                <input
                  type="text"
                  id="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-300"
                  placeholder="My Wi-Fi Business"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm md:text-base font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-300"
                  placeholder="you@example.com"
                  required
                  disabled={isLoading}
                />
              </div>

              <div>
                <label htmlFor="phoneNumber" className="block text-sm md:text-base font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-300"
                  placeholder="+254 700 000 000"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm md:text-base font-medium text-gray-700 mb-2">
                  Password * (min 8 characters)
                </label>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-300"
                  placeholder="••••••••"
                  required
                  minLength={8}
                  disabled={isLoading}
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm md:text-base font-medium text-gray-700 mb-2">
                  Confirm Password *
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-300"
                  placeholder="••••••••"
                  required
                  disabled={isLoading}
                />
              </div>

              <div>
                <label htmlFor="plan" className="block text-sm md:text-base font-medium text-gray-700 mb-2">
                  Plan
                </label>
                <select
                  id="plan"
                  value={formData.plan}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-300"
                  disabled={isLoading}
                >
                  <option value="starter">Starter - Ksh 1,500/mo</option>
                  <option value="pro">Pro - Ksh 4,500/mo</option>
                  <option value="enterprise">Enterprise - Ksh 5,500/mo</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full px-6 py-3 rounded-full font-semibold text-base md:text-lg transition-all duration-300 transform hover:-translate-y-1 shadow-lg ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700 text-white"
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </span>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            {/* Additional Links */}
            <div className="mt-6 text-center text-sm md:text-base text-gray-600">
              Already have an account?{" "}
              <Link to="/signin" className="text-green-600 hover:text-green-800 font-semibold transition duration-300">
                Sign In
              </Link>
            </div>
            <div className="mt-4 text-center text-xs md:text-sm text-gray-500">
              By signing up, you agree to our{" "}
              <Link to="/terms" className="underline hover:text-green-600 transition duration-300">
                Terms
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="underline hover:text-green-600 transition duration-300">
                Privacy Policy
              </Link>.
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default SignUpPage;
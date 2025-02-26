import React from "react";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import { Link } from "react-router-dom"; // Assuming React Router for navigation

const SignUpPage: React.FC = () => {
  return (
    <div className="font-sans antialiased">
      <Navbar />
      <div className="pt-16 bg-gray-50 min-h-screen flex items-center justify-center">
        {/* Sign-Up Section */}
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8 animate-fade-in-up">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-800 mb-4">
                Start Your Free Trial
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-gray-600">
                Create an account to manage your network with ease. No credit card required.
              </p>
            </div>

            {/* Sign-Up Form */}
            <form className="space-y-6">
              <div>
                <label htmlFor="fullName" className="block text-sm md:text-base font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm md:text-base font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm md:text-base font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300"
                  placeholder="••••••••"
                  required
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm md:text-base font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300"
                  placeholder="••••••••"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white px-6 py-3 rounded-full font-semibold text-base md:text-lg hover:bg-indigo-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
              >
                Create Account
              </button>
            </form>

            {/* Additional Links */}
            <div className="mt-6 text-center text-sm md:text-base text-gray-600">
              Already have an account?{" "}
              <Link to="/signin" className="text-indigo-600 hover:text-indigo-800 font-semibold transition duration-300">
                Sign In
              </Link>
            </div>
            <div className="mt-4 text-center text-xs md:text-sm text-gray-500">
              By signing up, you agree to our{" "}
              <Link to="/terms" className="underline hover:text-indigo-600 transition duration-300">
                Terms
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="underline hover:text-indigo-600 transition duration-300">
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
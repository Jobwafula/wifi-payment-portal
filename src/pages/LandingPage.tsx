import React from "react";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import { useNavigate} from "react-router-dom";

const LandingPage: React.FC = () => {
    const navigate = useNavigate()
  return (
    <div className="font-sans antialiased">
      <Navbar />
      <div className="pt-16">
        {/* Enhanced Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-green-700 via-green-600 to-green-800 text-white py-16 md:py-24 lg:py-32">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight animate-fade-in-up">
                Revolutionize Your Network Management
              </h1>
              <p className="text-base sm:text-lg md:text-xl mb-8 text-gray-100 opacity-90 animate-fade-in-up animation-delay-200">
                Empower your Wi-Fi ecosystem with cutting-edge user management, seamless payments, and actionable analytics.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up animation-delay-400">
                <button onClick={()=>navigate('/sign-up')} className="bg-white text-green-700 px-6 py-3 rounded-full font-semibold text-base md:text-lg shadow-lg hover:bg-indigo-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 w-full sm:w-auto">
                  Start Free Trial
                </button>
                <button className="border-2 border-white text-white px-6 py-3 rounded-full font-semibold text-base md:text-lg hover:bg-white hover:text-green-700 transition-all duration-300 transform hover:-translate-y-1 w-full sm:w-auto">
                  Watch Demo
                </button>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-16 md:h-24 bg-white clip-path-wave"></div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto py-16 md:py-20" id="features">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 text-gray-800">Core Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 px-4">
            <div className="group text-center p-6 hover:bg-gray-50 rounded-xl transition-all duration-300">
              <div className="bg-blue-100 text-blue-600 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold mb-3 text-gray-800">User Management</h3>
              <p className="text-gray-600 text-sm md:text-base">Streamline Wi-Fi user administration with intuitive controls.</p>
            </div>
            <div className="group text-center p-6 hover:bg-gray-50 rounded-xl transition-all duration-300">
              <div className="bg-purple-100 text-purple-600 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v1m0-1V7m0 1v1m6 6v-1m-6 1v-1m6 1v-1m-6 1v-1m6-6v-1m-6 1v-1m6 1v-1m-6 1v-1"></path>
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold mb-3 text-gray-800">Payment Integration</h3>
              <p className="text-gray-600 text-sm md:text-base">Effortless transactions with Daraja API integration.</p>
            </div>
            <div className="group text-center p-6 hover:bg-gray-50 rounded-xl transition-all duration-300">
              <div className="bg-green-100 text-green-600 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold mb-3 text-gray-800">Advanced Analytics</h3>
              <p className="text-gray-600 text-sm md:text-base">Gain insights with comprehensive usage reports.</p>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="bg-gray-50 py-16 md:py-20" id="pricing">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 text-gray-800">Flexible Pricing</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              <div className="bg-white p-6 md:p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <h3 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800">Starter</h3>
                <p className="text-gray-600 mb-6 text-sm md:text-base">Ideal for small networks</p>
                <p className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">K sh 1,500 <span className="text-lg md:text-xl text-gray-500">/mo</span></p>
                <button className="bg-green-600 text-white px-6 md:px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition-all duration-300 w-full">
                  Get Started
                </button>
              </div>
              <div className="bg-white p-6 md:p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 relative">
                <span className="absolute top-0 right-0 bg-green-600 text-white text-xs md:text-sm px-2 md:px-3 py-1 rounded-bl-lg rounded-tr-lg">Popular</span>
                <h3 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800">Pro</h3>
                <p className="text-gray-600 mb-6 text-sm md:text-base">Perfect for growing networks</p>
                <p className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">K sh 4,500<span className="text-lg md:text-xl text-gray-500">/mo</span></p>
                <button className="bg-green-600 text-white px-6 md:px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition-all duration-300 w-full">
                  Get Started
                </button>
              </div>
              <div className="bg-white p-6 md:p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <h3 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800">Enterprise</h3>
                <p className="text-gray-600 mb-6 text-sm md:text-base">Built for large-scale networks</p>
                <p className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">K sh 5,500<span className="text-lg md:text-xl text-gray-500">/mo</span></p>
                <button className="bg-green-600 text-white px-6 md:px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-all duration-300 w-full">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
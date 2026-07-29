import React from "react";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import { useNavigate } from "react-router-dom";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handlePricingClick = (plan: string) => {
    // Navigate to sign-up with plan parameter for tenant onboarding
    navigate(`/sign-up?plan=${plan.toLowerCase()}`);
  };

  return (
    <div className="font-sans antialiased">
      <Navbar />
      <div className="pt-16">
        {/* Enhanced Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-green-700 via-green-600 to-green-800 text-white py-16 md:py-24 lg:py-32">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
                Launch Your Wi-Fi Business in Minutes
              </h1>
              <p className="text-base sm:text-lg md:text-xl mb-8 text-gray-100 opacity-90">
                Everything you need to manage Wi-Fi hotspots, process payments, and grow your subscriber base - all in one platform.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button 
                  onClick={() => navigate('/sign-up')} 
                  className="bg-white text-green-700 px-6 py-3 rounded-full font-semibold text-base md:text-lg shadow-lg hover:bg-indigo-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 w-full sm:w-auto"
                >
                  Start Your Free Trial
                </button>
                <button className="border-2 border-white text-white px-6 py-3 rounded-full font-semibold text-base md:text-lg hover:bg-white hover:text-green-700 transition-all duration-300 transform hover:-translate-y-1 w-full sm:w-auto">
                  Watch Demo
                </button>
              </div>
              <p className="mt-6 text-sm text-gray-200">No credit card required • Free 14-day trial</p>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-16 md:h-24 bg-white clip-path-wave"></div>
        </section>

        {/* Features Section - Tailored for Wi-Fi Distributors */}
        <section className="container mx-auto py-16 md:py-20" id="features">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800">Built for Wi-Fi Distributors</h2>
          <p className="text-center text-gray-600 mb-12 md:mb-16">Everything you need to run your hotspot business</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 px-4">
            <div className="group text-center p-6 hover:bg-gray-50 rounded-xl transition-all duration-300">
              <div className="bg-blue-100 text-blue-600 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold mb-3 text-gray-800">Multi-Tenant Dashboard</h3>
              <p className="text-gray-600 text-sm md:text-base">Each distributor gets their own branded dashboard to manage their Wi-Fi business.</p>
            </div>
            <div className="group text-center p-6 hover:bg-gray-50 rounded-xl transition-all duration-300">
              <div className="bg-purple-100 text-purple-600 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v1m0-1V7m0 1v1m6 6v-1m-6 1v-1m6 1v-1m-6 1v-1m6-6v-1m-6 1v-1m6 1v-1m-6 1v-1"></path>
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold mb-3 text-gray-800">M-Pesa Integration</h3>
              <p className="text-gray-600 text-sm md:text-base">Built-in Daraja API for seamless M-Pesa payments from your subscribers.</p>
            </div>
            <div className="group text-center p-6 hover:bg-gray-50 rounded-xl transition-all duration-300">
              <div className="bg-green-100 text-green-600 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold mb-3 text-gray-800">Customer Analytics</h3>
              <p className="text-gray-600 text-sm md:text-base">Track user usage, revenue, and growth with real-time analytics dashboards.</p>
            </div>
            <div className="group text-center p-6 hover:bg-gray-50 rounded-xl transition-all duration-300">
              <div className="bg-orange-100 text-orange-600 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold mb-3 text-gray-800">Router Integration</h3>
              <p className="text-gray-600 text-sm md:text-base">Connect your MikroTik, Ubiquiti, or other routers with one click.</p>
            </div>
            <div className="group text-center p-6 hover:bg-gray-50 rounded-xl transition-all duration-300">
              <div className="bg-red-100 text-red-600 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold mb-3 text-gray-800">Subscriber Management</h3>
              <p className="text-gray-600 text-sm md:text-base">Create, manage, and track all your Wi-Fi subscribers in one place.</p>
            </div>
            <div className="group text-center p-6 hover:bg-gray-50 rounded-xl transition-all duration-300">
              <div className="bg-indigo-100 text-indigo-600 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold mb-3 text-gray-800">Secure & Reliable</h3>
              <p className="text-gray-600 text-sm md:text-base">Enterprise-grade security with SSL encryption and automated backups.</p>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="bg-gray-50 py-16 md:py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800">How It Works</h2>
            <p className="text-center text-gray-600 mb-12">Get your Wi-Fi business up and running in 3 simple steps</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-green-100 text-green-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">1</div>
                <h3 className="text-xl font-semibold mb-2">Create Your Account</h3>
                <p className="text-gray-600">Sign up as a distributor and set up your business profile.</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 text-green-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">2</div>
                <h3 className="text-xl font-semibold mb-2">Connect Your Router</h3>
                <p className="text-gray-600">Link your existing Wi-Fi router to our platform in minutes.</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 text-green-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">3</div>
                <h3 className="text-xl font-semibold mb-2">Start Selling Wi-Fi</h3>
                <p className="text-gray-600">Set your prices and start accepting payments from customers.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section - SaaS Plans */}
        <section className="bg-white py-16 md:py-20" id="pricing">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800">Simple, Transparent Pricing</h2>
            <p className="text-center text-gray-600 mb-12">Choose the plan that fits your Wi-Fi distribution business</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {/* Starter Plan */}
              <div className="bg-gray-50 p-6 md:p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-green-200">
                <h3 className="text-xl md:text-2xl font-semibold mb-2 text-gray-800">Starter</h3>
                <p className="text-gray-600 mb-4 text-sm">Perfect for small hotspots</p>
                <p className="text-4xl md:text-5xl font-bold mb-2 text-gray-800">Ksh 1,500 <span className="text-lg md:text-xl text-gray-500">/mo</span></p>
                <p className="text-sm text-gray-500 mb-6">Billed monthly</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2 text-sm">
                    <span className="text-green-500">✓</span> Up to 100 subscribers
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <span className="text-green-500">✓</span> Basic analytics
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <span className="text-green-500">✓</span> M-Pesa integration
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <span className="text-green-500">✓</span> Email support
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-400">
                    <span className="text-gray-300">✗</span> Advanced reporting
                  </li>
                </ul>
                <button 
                  onClick={() => navigate('/sign-up?plan=starter')}
                  className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition-all duration-300 w-full"
                >
                  Start Free Trial
                </button>
              </div>

              {/* Pro Plan - Featured */}
              <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-green-500 relative">
                <span className="absolute -top-3 right-4 bg-green-500 text-white text-xs md:text-sm px-3 py-1 rounded-full">Most Popular</span>
                <h3 className="text-xl md:text-2xl font-semibold mb-2 text-gray-800">Pro</h3>
                <p className="text-gray-600 mb-4 text-sm">Best for growing businesses</p>
                <p className="text-4xl md:text-5xl font-bold mb-2 text-gray-800">Ksh 4,500 <span className="text-lg md:text-xl text-gray-500">/mo</span></p>
                <p className="text-sm text-gray-500 mb-6">Billed monthly</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2 text-sm">
                    <span className="text-green-500">✓</span> Up to 500 subscribers
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <span className="text-green-500">✓</span> Advanced analytics
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <span className="text-green-500">✓</span> M-Pesa integration
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <span className="text-green-500">✓</span> Priority support
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <span className="text-green-500">✓</span> Custom branding
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <span className="text-green-500">✓</span> API access
                  </li>
                </ul>
                <button 
                  onClick={() => navigate('/sign-up?plan=pro')}
                  className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition-all duration-300 w-full"
                >
                  Start Free Trial
                </button>
              </div>

              {/* Enterprise Plan */}
              <div className="bg-gray-50 p-6 md:p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-green-200">
                <h3 className="text-xl md:text-2xl font-semibold mb-2 text-gray-800">Enterprise</h3>
                <p className="text-gray-600 mb-4 text-sm">For large-scale operations</p>
                <p className="text-4xl md:text-5xl font-bold mb-2 text-gray-800">Ksh 5,500 <span className="text-lg md:text-xl text-gray-500">/mo</span></p>
                <p className="text-sm text-gray-500 mb-6">Billed monthly</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2 text-sm">
                    <span className="text-green-500">✓</span> Unlimited subscribers
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <span className="text-green-500">✓</span> Custom analytics
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <span className="text-green-500">✓</span> M-Pesa integration
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <span className="text-green-500">✓</span> 24/7 dedicated support
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <span className="text-green-500">✓</span> White-label solution
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <span className="text-green-500">✓</span> Multiple router support
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <span className="text-green-500">✓</span> SLA guaranteed
                  </li>
                </ul>
                <button 
                  onClick={() => navigate('/sign-up?plan=enterprise')}
                  className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition-all duration-300 w-full"
                >
                  Contact Sales
                </button>
              </div>
            </div>
            <p className="text-center text-gray-500 text-sm mt-8">All plans include a 14-day free trial. No credit card required.</p>
          </div>
        </section>

        {/* Trust Section */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-8">Trusted by Wi-Fi Distributors Across Kenya</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">500+</div>
                <div className="text-gray-600 text-sm">Active Distributors</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">10,000+</div>
                <div className="text-gray-600 text-sm">Subscribers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">98%</div>
                <div className="text-gray-600 text-sm">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">4.8★</div>
                <div className="text-gray-600 text-sm">User Rating</div>
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
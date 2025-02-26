import React, { useState } from "react";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg fixed w-full z-10 top-0">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-green-600">
          NetworkSaaS
        </div>

        {/* Hamburger Menu (Mobile) */}
        <button
          className="md:hidden text-gray-600 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>

        {/* Navigation Links */}
        <div className={`${isOpen ? "block" : "hidden"} md:flex md:items-center absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none p-4 md:p-0`}>
          <div className="flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0">
            <a href="#features" className="text-gray-600 hover:text-blue-600 transition duration-300" onClick={() => setIsOpen(false)}>
              Features
            </a>
            <a href="#pricing" className="text-gray-600 hover:text-blue-600 transition duration-300" onClick={() => setIsOpen(false)}>
              Pricing
            </a>
            <a href="/contact" className="text-gray-600 hover:text-blue-600 transition duration-300" onClick={() => setIsOpen(false)}>
              Contact
            </a>
            <button className="bg-green-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition duration-300 md:ml-4">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
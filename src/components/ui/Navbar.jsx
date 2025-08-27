import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Code, Menu, X, Rocket } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b bg-cyber-dark/90 backdrop-blur-sm border-cyber-light">
      <div className="px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center flex-shrink-0">
              <div className="p-2 rounded-lg bg-cyber-gradient">
                <Code className="w-6 h-6 text-white" />
              </div>
              <span className="ml-3 text-xl text-white font-heading">Dev Quest</span>
            </Link>
          </div>

          {/* Desktop Navigation - Simple for landing page */}
          <div className="items-center hidden space-x-4 md:flex">
            <Link to="#features" className="transition-colors text-cyber-purple-300 hover:text-neon-blue-300">
              Features
            </Link>
            <Link to="#how-it-works" className="transition-colors text-cyber-purple-300 hover:text-neon-blue-300">
              How It Works
            </Link>
            <Link to="#testimonials" className="transition-colors text-cyber-purple-300 hover:text-neon-blue-300">
              Testimonials
            </Link>
            
            {/* Auth Buttons */}
            <div className="flex items-center ml-4 space-x-2">
              <Link
                to="/auth/login"
                className="px-4 py-2 text-sm font-medium transition-colors border rounded-md text-neon-blue-300 hover:text-white border-neon-blue-500 hover:bg-neon-blue-500"
              >
                Login
              </Link>
              <Link
                to="/auth/signup"
                className="px-4 py-2 text-sm font-medium text-white transition-all rounded-md bg-cyber-gradient hover:shadow-lg hover:shadow-neon-blue-500/30"
              >
                Get Started <Rocket className="inline w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-cyber-purple-300 hover:text-white hover:bg-cyber-gray focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block w-6 h-6" />
              ) : (
                <Menu className="block w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 border-t sm:px-3 bg-cyber-gray border-cyber-light">
            <a
              href="#features"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 text-base transition-colors rounded-md text-cyber-purple-300 hover:text-neon-blue-300 hover:bg-cyber-light"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 text-base transition-colors rounded-md text-cyber-purple-300 hover:text-neon-blue-300 hover:bg-cyber-light"
            >
              How It Works
            </a>
            <a
              href="#testimonials"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 text-base transition-colors rounded-md text-cyber-purple-300 hover:text-neon-blue-300 hover:bg-cyber-light"
            >
              Testimonials
            </a>
            
            <div className="pt-2 border-t border-cyber-light">
              <Link
                to="/auth/login"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-base transition-colors rounded-md text-cyber-purple-300 hover:text-neon-blue-300 hover:bg-cyber-light"
              >
                Login
              </Link>
              <Link
                to="/auth/signup"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 mt-2 text-base text-white transition-all rounded-md bg-cyber-gradient hover:shadow-inner"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
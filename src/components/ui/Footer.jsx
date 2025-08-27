import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Code, 
  Github, 
  Twitter, 
  Linkedin, 
  Mail,
  Heart,
  ArrowUp
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t bg-cyber-dark border-cyber-light">
      {/* Main Footer Content */}
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-flex items-center mb-4">
              <div className="p-2 rounded-lg bg-cyber-gradient">
                <Code className="w-6 h-6 text-white" />
              </div>
              <span className="ml-3 text-xl text-white font-heading">Dev Quest</span>
            </Link>
            <p className="max-w-xs mb-6 text-sm text-cyber-purple-300">
              Transform your coding journey into an epic adventure. Level up your skills, unlock achievements, and join a community of passionate developers.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-200 text-cyber-purple-400 hover:text-neon-blue-300"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-200 text-cyber-purple-400 hover:text-neon-blue-300"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-200 text-cyber-purple-400 hover:text-neon-blue-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:hello@devquest.com"
                className="transition-colors duration-200 text-cyber-purple-400 hover:text-neon-blue-300"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wider text-white uppercase font-heading">
              Product
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/features" className="text-sm transition-colors duration-200 text-cyber-purple-300 hover:text-neon-blue-300">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-sm transition-colors duration-200 text-cyber-purple-300 hover:text-neon-blue-300">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/testimonials" className="text-sm transition-colors duration-200 text-cyber-purple-300 hover:text-neon-blue-300">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link to="/changelog" className="text-sm transition-colors duration-200 text-cyber-purple-300 hover:text-neon-blue-300">
                  Changelog
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wider text-white uppercase font-heading">
              Resources
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/blog" className="text-sm transition-colors duration-200 text-cyber-purple-300 hover:text-neon-blue-300">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/tutorials" className="text-sm transition-colors duration-200 text-cyber-purple-300 hover:text-neon-blue-300">
                  Tutorials
                </Link>
              </li>
              <li>
                <Link to="/documentation" className="text-sm transition-colors duration-200 text-cyber-purple-300 hover:text-neon-blue-300">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-sm transition-colors duration-200 text-cyber-purple-300 hover:text-neon-blue-300">
                  Community
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wider text-white uppercase font-heading">
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-sm transition-colors duration-200 text-cyber-purple-300 hover:text-neon-blue-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-sm transition-colors duration-200 text-cyber-purple-300 hover:text-neon-blue-300">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm transition-colors duration-200 text-cyber-purple-300 hover:text-neon-blue-300">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm transition-colors duration-200 text-cyber-purple-300 hover:text-neon-blue-300">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between pt-8 mt-12 border-t border-cyber-light md:flex-row">
          <div className="flex items-center mb-4 text-sm text-cyber-purple-300 md:mb-0">
            <span>© {currentYear} Dev Quest. Made with</span>
            <Heart className="w-4 h-4 mx-1 text-error-red" />
            <span>for developers worldwide.</span>
          </div>
          
          {/* Back to Top Button */}
          <button
            onClick={scrollToTop}
            className="inline-flex items-center text-sm transition-colors duration-200 text-cyber-purple-300 hover:text-neon-blue-300 group"
            aria-label="Back to top"
          >
            Back to top
            <ArrowUp className="h-4 w-4 ml-1 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/Authcontext';
import { 
  Code, 
  Eye, 
  EyeOff, 
  LogIn,
  Github,
  Twitter,
  Mail,
  ArrowLeft,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import socket from '../../utils/socket';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const { login,isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/user';

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateForm()) return;

  const result = await login(formData.email, formData.password);
  if (result.success) {
    // Role-based redirect
    if (result.user.role === 'admin') {
      navigate('/admin/');
    } else {
      navigate(from, { replace: true });
    }
  } else {
    setErrors({ submit: result.error });
  }
};

  return (
    <div className="flex flex-col justify-center min-h-screen py-12 bg-cyber-dark sm:px-6 lg:px-8">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(26, 139, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(26, 139, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}></div>
      </div>

      <div className="relative z-10 sm:mx-auto sm:w-full sm:max-w-md">
        {/* Back button */}
        <Link
          to="/"
          className="inline-flex items-center mb-6 transition-colors duration-200 text-cyber-purple-300 hover:text-neon-blue-300"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to home
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <div className="flex justify-center">
            <div className="p-3 bg-cyber-gradient rounded-xl">
              <Code className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="mt-4 text-3xl font-bold text-white font-heading">
            Welcome back, Developer!
          </h2>
          <p className="mt-2 text-cyber-purple-300">
            Continue your coding quest
          </p>
        </motion.div>

        {/* Error message */}
        {errors.submit && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 mb-6 border rounded-lg bg-error-red/10 border-error-red/30"
          >
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 mr-2 text-error-red" />
              <span className="text-sm text-error-red">{errors.submit}</span>
            </div>
          </motion.div>
        )}

        {/* Login form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="px-6 py-8 border bg-cyber-gray/70 backdrop-blur-sm border-cyber-light rounded-2xl sm:px-10"
        >
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email field */}
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-cyber-purple-300">
                Email address
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={`block w-full px-4 py-3 text-white border rounded-lg bg-cyber-dark placeholder-cyber-purple-400 focus:outline-none focus:ring-2 focus:ring-neon-blue-500 focus:border-transparent ${
                    errors.email ? 'border-error-red' : 'border-cyber-light'
                  }`}
                  placeholder="developer@example.com"
                />
                <Mail className="absolute w-5 h-5 right-3 top-3 text-cyber-purple-400" />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-error-red">{errors.email}</p>
              )}
            </div>

            {/* Password field */}
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-cyber-purple-300">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className={`block w-full px-4 py-3 pr-12 text-white border rounded-lg bg-cyber-dark placeholder-cyber-purple-400 focus:outline-none focus:ring-2 focus:ring-neon-blue-500 focus:border-transparent ${
                    errors.password ? 'border-error-red' : 'border-cyber-light'
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-cyber-purple-400 hover:text-neon-blue-300"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-error-red">{errors.password}</p>
              )}
            </div>

            {/* Remember me & Forgot password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="w-4 h-4 rounded text-neon-blue-500 focus:ring-neon-blue-500 border-cyber-light"
                />
                <label htmlFor="remember-me" className="block ml-2 text-sm text-cyber-purple-300">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link to="/auth/forgot-password" className="transition-colors duration-200 text-neon-blue-300 hover:text-neon-blue-200">
                  Forgot password?
                </Link>
              </div>
            </div>

            {/* Submit button */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="relative flex items-center justify-center w-full px-4 py-3 text-sm font-semibold text-white transition-all duration-300 border border-transparent rounded-lg group font-heading bg-cyber-gradient hover:shadow-lg hover:shadow-neon-blue-500/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neon-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 mr-2 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                    Signing in...
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5 mr-2" />
                    Sign in to your quest
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Social login divider */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-cyber-light"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-cyber-gray/70 text-cyber-purple-300">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Social login buttons */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              <button
                type="button"
                onClick={() => handleSocialLogin('GitHub')}
                disabled={isLoading}
                className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium transition-colors duration-200 border rounded-lg border-cyber-light text-cyber-purple-300 bg-cyber-dark hover:bg-cyber-light disabled:opacity-50"
              >
                <Github className="w-5 h-5 mr-2" />
                GitHub
              </button>
              <button
                type="button"
                onClick={() => handleSocialLogin('Twitter')}
                disabled={isLoading}
                className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium transition-colors duration-200 border rounded-lg border-cyber-light text-cyber-purple-300 bg-cyber-dark hover:bg-cyber-light disabled:opacity-50"
              >
                <Twitter className="w-5 h-5 mr-2" />
                Twitter
              </button>
            </div>
          </div>

          {/* Sign up link */}
          <div className="mt-6 text-center">
            <p className="text-cyber-purple-300">
              Don't have an account?{' '}
              <Link to="/auth/signup" className="font-semibold transition-colors duration-200 text-neon-blue-300 hover:text-neon-blue-200">
                Start your quest
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
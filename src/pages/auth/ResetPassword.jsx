import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Lock, 
  ArrowLeft, 
  AlertCircle, 
  CheckCircle,
  Eye,
  EyeOff,
  Mail,
  Key
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    code: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  // Get email from location state or prompt user
  const [email, setEmail] = useState(location.state?.email || '');

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

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.code) {
      newErrors.code = 'Reset code is required';
    } else if (formData.code.length !== 6 || isNaN(formData.code)) {
      newErrors.code = 'Code must be 6 digits';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      const response = await fetch('http://localhost:3000/api/auth/resetpassword', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          code: formData.code,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Password reset failed');
      }

      toast.success('Password reset successfully! 🎉');
      navigate('/auth/login');
      
    } catch (error) {
      console.error('Reset password error:', error);
      toast.error(error.message || 'Password reset failed');
      setErrors({ submit: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center min-h-screen py-12 bg-cyber-dark sm:px-6 lg:px-8">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(142, 46, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(142, 46, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}></div>
      </div>

      <div className="relative z-10 sm:mx-auto sm:w-full sm:max-w-md">
        {/* Back button */}
        <Link
          to="/auth/forgot-password"
          className="inline-flex items-center mb-6 transition-colors duration-200 text-cyber-purple-300 hover:text-neon-blue-300"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back
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
              <Key className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="mt-4 text-3xl font-bold text-white font-heading">
            Reset Password
          </h2>
          <p className="mt-2 text-cyber-purple-300">
            Enter the code from your email and new password
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

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="px-6 py-8 border bg-cyber-gray/70 backdrop-blur-sm border-cyber-light rounded-2xl sm:px-10"
        >
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email field (editable if not passed from state) */}
            {!location.state?.email && (
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`block w-full px-4 py-3 text-white border rounded-lg bg-cyber-dark placeholder-cyber-purple-400 focus:outline-none focus:ring-2 focus:ring-neon-blue-500 focus:border-transparent ${
                      errors.email ? 'border-error-red' : 'border-cyber-light'
                    }`}
                    placeholder="your@email.com"
                  />
                  <Mail className="absolute w-5 h-5 right-3 top-3 text-cyber-purple-400" />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-error-red">{errors.email}</p>
                )}
              </div>
            )}

            {/* Code field */}
            <div>
              <label htmlFor="code" className="block mb-2 text-sm font-medium text-cyber-purple-300">
                6-Digit Reset Code
              </label>
              <div className="relative">
                <input
                  id="code"
                  name="code"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength="6"
                  required
                  value={formData.code}
                  onChange={handleChange}
                  className={`block w-full px-4 py-3 text-white border rounded-lg bg-cyber-dark placeholder-cyber-purple-400 focus:outline-none focus:ring-2 focus:ring-neon-blue-500 focus:border-transparent ${
                    errors.code ? 'border-error-red' : 'border-cyber-light'
                  }`}
                  placeholder="123456"
                />
                <Key className="absolute w-5 h-5 right-3 top-3 text-cyber-purple-400" />
              </div>
              {errors.code && (
                <p className="mt-1 text-sm text-error-red">{errors.code}</p>
              )}
            </div>

            {/* Password field */}
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-cyber-purple-300">
                New Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className={`block w-full px-4 py-3 pr-12 text-white border rounded-lg bg-cyber-dark placeholder-cyber-purple-400 focus:outline-none focus:ring-2 focus:ring-neon-blue-500 focus:border-transparent ${
                    errors.password ? 'border-error-red' : 'border-cyber-light'
                  }`}
                  placeholder="Enter new password"
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

            {/* Confirm Password field */}
            <div>
              <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-cyber-purple-300">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`block w-full px-4 py-3 pr-12 text-white border rounded-lg bg-cyber-dark placeholder-cyber-purple-400 focus:outline-none focus:ring-2 focus:ring-neon-blue-500 focus:border-transparent ${
                    errors.confirmPassword ? 'border-error-red' : 'border-cyber-light'
                  }`}
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-cyber-purple-400 hover:text-neon-blue-300"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-error-red">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Submit button */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="relative flex items-center justify-center w-full px-4 py-3 text-sm font-semibold text-white transition-all duration-300 border border-transparent rounded-lg font-heading bg-cyber-gradient hover:shadow-lg hover:shadow-neon-blue-500/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neon-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 mr-2 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                    Resetting...
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5 mr-2" />
                    Reset Password
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Help text */}
          <div className="mt-6 text-center">
            <p className="text-sm text-cyber-purple-300">
              Didn't receive the code?{' '}
              <Link
                to="/auth/forgot-password"
                className="font-semibold transition-colors duration-200 text-neon-blue-300 hover:text-neon-blue-200"
              >
                Resend code
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ResetPassword;
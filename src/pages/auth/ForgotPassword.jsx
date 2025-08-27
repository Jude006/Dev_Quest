import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Mail, 
  ArrowLeft, 
  AlertCircle, 
  CheckCircle,
  Lock,
  Send
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate email
    if (!email) {
      setErrors({ email: 'Email is required' });
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrors({ email: 'Email is invalid' });
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const response = await fetch('http://localhost:3000/api/auth/forgotpassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send reset code');
      }

      setIsSent(true);
      toast.success('Reset code sent to your email! 📧');
      
    } catch (error) {
      console.error('Forgot password error:', error);
      toast.error(error.message || 'Failed to send reset code');
      setErrors({ submit: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSent) {
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
            to="/auth/login"
            className="inline-flex items-center mb-6 transition-colors duration-200 text-cyber-purple-300 hover:text-neon-blue-300"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to login
          </Link>

          {/* Success message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="px-6 py-8 text-center border bg-cyber-gray/70 backdrop-blur-sm border-cyber-light rounded-2xl sm:px-10"
          >
            <div className="flex justify-center mb-6">
              <div className="p-3 rounded-full bg-matrix-green/20">
                <CheckCircle className="w-12 h-12 text-matrix-green" />
              </div>
            </div>
            
            <h2 className="mb-4 text-2xl font-bold text-white font-heading">
              Check Your Email!
            </h2>
            
            <p className="mb-6 text-cyber-purple-300">
              We've sent a 6-digit reset code to <span className="font-medium text-white">{email}</span>. 
              The code will expire in 10 minutes.
            </p>

            <div className="p-4 mb-6 border rounded-lg bg-cyber-dark border-cyber-light">
              <p className="text-sm text-cyber-purple-300">
                📧 Didn't receive the email? Check your spam folder or 
                <button 
                  onClick={() => setIsSent(false)}
                  className="ml-1 underline text-neon-blue-300 hover:text-neon-blue-200"
                >
                  try again
                </button>
              </p>
            </div>

            <Link
              to="/auth/reset-password"
              state={{ email }}
              className="inline-flex items-center justify-center w-full px-4 py-3 text-sm font-semibold text-white transition-all duration-300 border border-transparent rounded-lg font-heading bg-cyber-gradient hover:shadow-lg hover:shadow-neon-blue-500/30"
            >
              Enter Reset Code
              <Lock className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

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
          to="/auth/login"
          className="inline-flex items-center mb-6 transition-colors duration-200 text-cyber-purple-300 hover:text-neon-blue-300"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to login
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
              <Lock className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="mt-4 text-3xl font-bold text-white font-heading">
            Reset Your Password
          </h2>
          <p className="mt-2 text-cyber-purple-300">
            Enter your email to receive a reset code
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
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors({});
                  }}
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
                    Sending code...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send Reset Code
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Help text */}
          <div className="mt-6 text-center">
            <p className="text-sm text-cyber-purple-300">
              Remember your password?{' '}
              <Link
                to="/auth/login"
                className="font-semibold transition-colors duration-200 text-neon-blue-300 hover:text-neon-blue-200"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ForgotPassword;
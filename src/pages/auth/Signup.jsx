import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../context/Authcontext";
import {
  Code,
  Eye,
  EyeOff,
  UserPlus,
  Github,
  Twitter,
  Mail,
  User,
  ArrowLeft,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { toast } from "react-hot-toast";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = "Name is required";
    } else if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const result = await register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });

    if (result.success) {
      navigate("/user");
    } else {
      setErrors({ submit: result.error });
    }
  };

  const handleSocialSignup = (provider) => {
    toast(`Sign up with ${provider} coming soon!`, {
      icon: "🔜",
    });
  };

  return (
    <div className="flex flex-col justify-center min-h-screen py-12 bg-cyber-dark sm:px-6 lg:px-8">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(142, 46, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(142, 46, 255, 0.1) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        ></div>
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
            Start Your Coding Quest
          </h2>
          <p className="mt-2 text-cyber-purple-300">
            Join thousands of developers leveling up their skills
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

        {/* Signup form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="px-6 py-8 border bg-cyber-gray/70 backdrop-blur-sm border-cyber-light rounded-2xl sm:px-10"
        >
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Name field */}
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-cyber-purple-300"
              >
                Full Name
              </label>
              <div className="relative">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className={`block w-full px-4 py-3 text-white border rounded-lg bg-cyber-dark placeholder-cyber-purple-400 pl-11 focus:outline-none focus:ring-2 focus:ring-neon-blue-500 focus:border-transparent ${
                    errors.name ? "border-error-red" : "border-cyber-light"
                  }`}
                  placeholder="Your full name"
                />
                <User className="absolute w-5 h-5 left-3 top-3 text-cyber-purple-400" />
              </div>
              {errors.name && (
                <p className="mt-1 text-sm text-error-red">{errors.name}</p>
              )}
            </div>

            {/* Email field */}
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-cyber-purple-300"
              >
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
                  className={`block w-full px-4 py-3 text-white border rounded-lg bg-cyber-dark placeholder-cyber-purple-400 pl-11 focus:outline-none focus:ring-2 focus:ring-neon-blue-500 focus:border-transparent ${
                    errors.email ? "border-error-red" : "border-cyber-light"
                  }`}
                  placeholder="developer@example.com"
                />
                <Mail className="absolute w-5 h-5 left-3 top-3 text-cyber-purple-400" />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-error-red">{errors.email}</p>
              )}
            </div>

            {/* Password field */}
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-cyber-purple-300"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className={`block w-full px-4 py-3 pr-12 text-white border rounded-lg bg-cyber-dark placeholder-cyber-purple-400 pl-11 focus:outline-none focus:ring-2 focus:ring-neon-blue-500 focus:border-transparent ${
                    errors.password ? "border-error-red" : "border-cyber-light"
                  }`}
                  placeholder="Create a strong password"
                />
                <Eye className="absolute w-5 h-5 left-3 top-3 text-cyber-purple-400" />
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
              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-sm font-medium text-cyber-purple-300"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`block w-full px-4 py-3 pr-12 text-white border rounded-lg bg-cyber-dark placeholder-cyber-purple-400 pl-11 focus:outline-none focus:ring-2 focus:ring-neon-blue-500 focus:border-transparent ${
                    errors.confirmPassword
                      ? "border-error-red"
                      : "border-cyber-light"
                  }`}
                  placeholder="Confirm your password"
                />
                <Eye className="absolute w-5 h-5 left-3 top-3 text-cyber-purple-400" />
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
                <p className="mt-1 text-sm text-error-red">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Terms agreement */}
            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="w-4 h-4 rounded text-neon-blue-500 focus:ring-neon-blue-500 border-cyber-light"
              />
              <label
                htmlFor="terms"
                className="block ml-2 text-sm text-cyber-purple-300"
              >
                I agree to the{" "}
                <Link
                  to="/terms"
                  className="transition-colors duration-200 text-neon-blue-300 hover:text-neon-blue-200"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  to="/privacy"
                  className="transition-colors duration-200 text-neon-blue-300 hover:text-neon-blue-200"
                >
                  Privacy Policy
                </Link>
              </label>
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
                    Creating account...
                  </>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5 mr-2" />
                    Begin Your Quest
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
                  Or sign up with
                </span>
              </div>
            </div>

            {/* Social signup buttons */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              <button
                type="button"
                onClick={() => handleSocialSignup("GitHub")}
                disabled={isLoading}
                className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium transition-colors duration-200 border rounded-lg border-cyber-light text-cyber-purple-300 bg-cyber-dark hover:bg-cyber-light disabled:opacity-50"
              >
                <Github className="w-5 h-5 mr-2" />
                GitHub
              </button>
              <button
                type="button"
                onClick={() => handleSocialSignup("Twitter")}
                disabled={isLoading}
                className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium transition-colors duration-200 border rounded-lg border-cyber-light text-cyber-purple-300 bg-cyber-dark hover:bg-cyber-light disabled:opacity-50"
              >
                <Twitter className="w-5 h-5 mr-2" />
                Twitter
              </button>
            </div>
          </div>

          {/* Login link */}
          <div className="mt-6 text-center">
            <p className="text-cyber-purple-300">
              Already have an account?{" "}
              <Link
                to="/auth/login"
                className="font-semibold transition-colors duration-200 text-neon-blue-300 hover:text-neon-blue-200"
              >
                Continue your quest
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;

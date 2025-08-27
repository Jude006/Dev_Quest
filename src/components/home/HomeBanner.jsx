import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Code, Rocket, Star, Zap, ChevronRight, Sparkles } from "lucide-react";

const HomeBanner = () => {
  return (
    <div className="relative overflow-hidden bg-cyber-dark lg:h-screen">
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(rgba(26, 139, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(26, 139, 255, 0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />

        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-neon-blue-500 opacity-30"
            style={{
              width: Math.random() * 20 + 5,
              height: Math.random() * 20 + 5,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.random() * 10 - 5, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 5 + 3, 
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}

        <div className="absolute rounded-full -top-40 -left-40 w-80 h-80 bg-cyber-purple-500 filter blur-3xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute delay-1000 rounded-full -bottom-40 -right-40 w-80 h-80 bg-neon-blue-500 filter blur-3xl opacity-20 animate-pulse-slow"></div>
      </div>

      <div className="relative z-10 px-4 py-20 mx-auto max-w-7xl sm:px-6 lg:px-8 md:py-28 lg:py-24">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center px-4 py-2 mb-8 border rounded-full bg-cyber-light/50 backdrop-blur-sm border-cyber-purple-500"
          >
            <Sparkles className="w-4 h-4 mr-2 text-cyber-yellow" />
            <span className="font-mono text-sm text-cyber-purple-300">
              Transform Your Coding Journey
            </span>
            <Sparkles className="w-4 h-4 ml-2 text-cyber-yellow" />
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl font-heading"
          >
            <span className="text-transparent bg-cyber-gradient bg-clip-text">
              Level Up
            </span>
            <span className="block mt-2 text-white">Your Coding Skills</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-3xl mx-auto mb-8 text-xl md:text-2xl text-cyber-purple-300 font-body"
          >
            Turn your programming tasks into an epic RPG adventure. Earn XP,
            unlock achievements, and climb the leaderboard!
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-6 mb-10 md:gap-10"
          >
            <div className="text-center">
              <div className="flex items-center justify-center">
                <Zap className="w-5 h-5 mr-2 text-cyber-yellow" />
                <span className="text-3xl font-bold text-white">10K+</span>
              </div>
              <p className="mt-1 text-cyber-purple-300">Tasks Completed</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center">
                <Star className="w-5 h-5 mr-2 text-matrix-green" />
                <span className="text-3xl font-bold text-white">5K+</span>
              </div>
              <p className="mt-1 text-cyber-purple-300">
                Developers Leveling Up
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center">
                <Code className="w-5 h-5 mr-2 text-neon-blue-300" />
                <span className="text-3xl font-bold text-white">1M+</span>
              </div>
              <p className="mt-1 text-cyber-purple-300">
                Lines of Code Written
              </p>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col justify-center gap-4 sm:flex-row"
          >
            <Link
              to="/auth/signup"
              className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white transition-all duration-300 transform rounded-lg group bg-cyber-gradient font-heading hover:shadow-2xl hover:shadow-neon-blue-500/30 hover:-translate-y-1"
            >
              Start Your Quest
              <Rocket className="w-5 h-5 ml-2 group-hover:animate-bounce" />
              <div className="absolute inset-0 transition-opacity duration-300 rounded-lg opacity-50 bg-cyber-gradient filter blur-md group-hover:opacity-75 -z-10"></div>
            </Link>

            <Link
              to="/auth/login"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold transition-all duration-300 border rounded-lg border-cyber-light bg-cyber-gray text-cyber-purple-300 font-heading hover:border-neon-blue-400 hover:text-neon-blue-300"
            >
              Already have an account?
              <ChevronRight className="w-5 h-5 ml-1" />
            </Link>
          </motion.div>

        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute transform -translate-x-1/2 cursor-pointer bottom-8 left-1/2"
      >
        <div className="animate-bounce">
          <div className="flex justify-center w-6 h-10 border-2 rounded-full border-cyber-purple-400">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-3 mt-2 rounded-full bg-cyber-purple-400"
            ></motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HomeBanner;

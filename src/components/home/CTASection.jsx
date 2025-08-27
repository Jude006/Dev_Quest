import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Rocket, 
  Zap, 
  Star, 
  ChevronRight,
  Code2,
  Trophy,
  Users
} from 'lucide-react';

const CTASection = () => {
  const benefits = [
    {
      icon: Zap,
      title: "Start Earning XP Today",
      description: "Complete your first task and immediately begin leveling up your developer skills.",
      color: "text-cyber-yellow"
    },
    {
      icon: Trophy,
      title: "Unlock Achievements",
      description: "Earn badges from day one and showcase your progress to the community.",
      color: "text-matrix-green"
    },
    {
      icon: Users,
      title: "Join Fellow Developers",
      description: "Connect with a community of motivated coders who are on the same journey.",
      color: "text-neon-blue-300"
    }
  ];

  return (
    <section className="relative py-20 overflow-hidden lg:py-28 bg-cyber-dark">
      {/* Background pattern - softer version */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-circle(circle, rgba(74, 144, 226, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}></div>
      </div>
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyber-dark/90 via-cyber-dark to-cyber-purple-900/20"></div>
      
      {/* Floating elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4"
        >
          <Code2 className="w-12 h-12 text-neon-blue-400 opacity-20" />
        </motion.div>
        <motion.div
          animate={{ 
            y: [0, 15, 0],
            rotate: [0, -3, 0]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-1/3 right-1/3"
        >
          <Star className="w-10 h-10 text-cyber-yellow opacity-20" />
        </motion.div>
      </div>

      <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto mb-12"
          >
            <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl lg:text-5xl font-heading">
              Ready to <span className="text-matrix-green">Transform</span> Your<br />
              <span className="text-transparent bg-cyber-gradient bg-clip-text">Coding Journey?</span>
            </h2>
            
            <p className="max-w-2xl mx-auto text-xl text-cyber-purple-200 font-body">
              Join thousands of developers who have turned their learning into an exciting adventure. 
              The first quest awaits you!
            </p>
          </motion.div>

          {/* Benefits cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid grid-cols-1 gap-6 mb-12 md:grid-cols-3 lg:mb-16"
          >
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div 
                  key={index}
                  className="p-6 text-center transition-all duration-300 border bg-cyber-gray/70 backdrop-blur-sm border-cyber-light rounded-xl hover:border-neon-blue-400"
                >
                  <div className="inline-flex items-center justify-center mb-4 w-14 h-14 bg-cyber-light rounded-xl">
                    <Icon className={`h-7 w-7 ${benefit.color}`} />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-white font-heading">
                    {benefit.title}
                  </h3>
                  <p className="text-cyber-purple-200">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col items-center justify-center gap-4 mb-10 sm:flex-row"
          >
            <Link
              to="/auth/signup"
              className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold transition-all duration-300 transform rounded-lg group bg-cyber-gradient font-heading hover:-translate-y-1 hover:shadow-2xl hover:shadow-neon-blue-500/30"
            >
              Start Your Free Quest
              <Rocket className="w-5 h-5 ml-2 group-hover:animate-bounce" />
            </Link>
            
            <Link
              to="/about"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold transition-all duration-300 border rounded-lg text-cyber-purple-200 border-cyber-light bg-cyber-gray/50 font-heading hover:border-neon-blue-400 hover:text-neon-blue-300"
            >
              See How It Works
              <ChevronRight className="w-5 h-5 ml-1" />
            </Link>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="inline-flex flex-wrap items-center justify-center gap-4 px-6 py-3 border rounded-full bg-cyber-gray/50 backdrop-blur-sm border-cyber-light"
          >
            <div className="flex items-center">
              <div className="flex mr-3 -space-x-2">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="w-8 h-8 border-2 rounded-full bg-neon-blue-400 border-cyber-dark"></div>
                ))}
              </div>
              <span className="text-sm text-cyber-purple-200">
                <span className="font-bold text-white">5,247+</span> developers questing now
              </span>
            </div>
            
            <div className="hidden w-px h-6 sm:block bg-cyber-light"></div>
            
            <div className="flex items-center">
              <Star className="w-4 h-4 mr-1 text-cyber-yellow" />
              <span className="text-sm text-cyber-purple-200">
                <span className="font-bold text-white">4.9/5</span> from 1.2k+ reviews
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-cyber-dark to-transparent"></div>
    </section>
  );
};

export default CTASection;
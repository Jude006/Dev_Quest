import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Award, 
  Users, 
  BarChart3, 
  Clock,
  BookOpen,
  Zap,
  Sparkles
} from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: TrendingUp,
      title: "XP System & Leveling",
      description: "Earn experience points for completing coding tasks. Level up your developer rank as you progress through your learning journey.",
      color: "text-matrix-green"
    },
    {
      icon: Award,
      title: "Achievements & Badges",
      description: "Unlock prestigious badges for milestones like streaks, completed projects, and mastering specific technologies.",
      color: "text-cyber-yellow"
    },
    {
      icon: Users,
      title: "Leaderboard Competition",
      description: "Compete with fellow developers on global and friends leaderboards. Climb the ranks as you complete more tasks.",
      color: "text-neon-pink"
    },
    {
      icon: BarChart3,
      title: "Progress Analytics",
      description: "Track your coding progress with beautiful charts and insights. See your improvement over time with detailed statistics.",
      color: "text-neon-blue-300"
    },
    {
      icon: Clock,
      title: "Streak Tracking",
      description: "Maintain your daily coding habit with streak counters. Don't break the chain of continuous learning and improvement.",
      color: "text-cyber-purple-400"
    },
    {
      icon: BookOpen,
      title: "Learning Resources",
      description: "Access curated tutorials, documentation links, and coding tips tailored to your current tasks and skill level.",
      color: "text-matrix-green"
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="relative py-20 overflow-hidden lg:py-28 bg-cyber-black">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full opacity-50 h-1/2 bg-cyber-dark"></div>
      
      <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto mb-16 text-center lg:mb-20"
        >
          <div className="inline-flex items-center px-4 py-2 mb-5 border rounded-full bg-cyber-light/50 backdrop-blur-sm border-neon-blue-500">
            <Sparkles className="w-4 h-4 mr-2 text-cyber-yellow" />
            <span className="font-mono text-sm text-neon-blue-300">
              Why Choose Dev Quest?
            </span>
          </div>
          
          <h2 className="mb-5 text-3xl font-bold text-white md:text-4xl lg:text-5xl font-heading">
            Turn <span className="text-transparent bg-cyber-gradient bg-clip-text">Coding Tasks</span> Into <span className="text-transparent bg-cyber-gradient bg-clip-text">Epic Quests</span>
          </h2>
          
          <p className="text-xl text-cyber-purple-300 font-body">
            Gamify your development journey with features designed to keep you motivated, engaged, and constantly improving.
          </p>
        </motion.div>

        {/* Features grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative p-6 transition-all duration-300 border group bg-cyber-dark border-cyber-light rounded-2xl lg:p-8 hover:-translate-y-2"
              >
                {/* Icon container */}
                <div className="relative mb-5">
                  <div className="relative flex items-center justify-center p-3 transition-colors duration-300 bg-cyber-gray group-hover:bg-cyber-light rounded-xl w-14 h-14">
                    <Icon className={`h-7 w-7 ${feature.color}`} />
                  </div>
                </div>

                {/* Content */}
                <h3 className="mb-3 text-xl font-semibold text-white font-heading">
                  {feature.title}
                </h3>
                
                <p className="leading-relaxed text-cyber-purple-300 font-body">
                  {feature.description}
                </p>

                {/* Hover effect border */}
                <div className="absolute inset-0 transition-opacity duration-300 border-2 opacity-0 pointer-events-none rounded-2xl border-neon-blue-500 group-hover:opacity-100"></div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Stats callout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="p-8 mt-16 text-center lg:mt-20 bg-cyber-gradient rounded-2xl lg:p-10"
        >
          <div className="max-w-2xl mx-auto">
            <Zap className="w-12 h-12 mx-auto mb-5 text-cyber-yellow" />
            <h3 className="mb-4 text-2xl font-bold text-white lg:text-3xl font-heading">
              Developers using Dev Quest are <span className="text-cyber-yellow">3× more consistent</span> with their coding practice
            </h3>
            <p className="text-lg text-cyber-purple-100">
              Join thousands of developers who have transformed their learning journey through gamification
            </p>
          </div>
        </motion.div>
      </div>

      {/* Background decoration */}
      <div className="absolute bottom-0 right-0 w-64 h-64 -translate-x-1/2 translate-y-1/2 rounded-full bg-cyber-purple-500 filter blur-3xl opacity-10"></div>
      <div className="absolute left-0 w-48 h-48 -translate-y-1/2 rounded-full top-1/4 bg-neon-blue-500 filter blur-3xl opacity-10"></div>
    </section>
  );
};

export default FeaturesSection;
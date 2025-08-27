import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Star, Trophy, Clock, BookOpen, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Confetti from 'react-confetti';
import API from '../../utils/api';
import { toast } from 'react-hot-toast';
import socket from '../../utils/socket';

const Dashboard = () => {
  const [stats, setStats] = useState({
    xp: 0,
    streak: 0,
    coins: 0,
    tasksCompleted: 0,
    totalHoursCoded: 0,
  });
  const [showConfetti, setShowConfetti] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      console.log(`Joining Socket.io room for user ${userId}`);
      socket.emit('join', { userId });
    } else {
      console.warn('No userId found in localStorage');
    }

    fetchStats();

    socket.on('taskCompleted', ({ user, milestoneMessage }) => {
      console.log('Received taskCompleted event:', { user, milestoneMessage });
      setStats({
        xp: user.xp,
        streak: user.streak,
        coins: user.coins,
        tasksCompleted: user.tasksCompleted,
        totalHoursCoded: user.totalHoursCoded,
      });
      if (milestoneMessage) {
        setShowConfetti(true);
        toast.success(milestoneMessage, {
          style: {
            background: '#1a1a2e',
            color: '#fff',
            border: '1px solid #00f5d4',
          },
        });
        setTimeout(() => setShowConfetti(false), 3000);
      }
    });

    socket.on('challengeCompleted', ({ user, milestoneMessage }) => {
      console.log('Received challengeCompleted event:', { user, milestoneMessage });
      setStats({
        xp: user.xp,
        streak: user.streak,
        coins: user.coins,
        tasksCompleted: user.tasksCompleted,
        totalHoursCoded: user.totalHoursCoded,
      });
      if (milestoneMessage) {
        setShowConfetti(true);
        toast.success(milestoneMessage, {
          style: {
            background: '#1a1a2e',
            color: '#fff',
            border: '1px solid #00f5d4',
          },
        });
        setTimeout(() => setShowConfetti(false), 3000);
      }
    });

    socket.on('statsUpdated', ({ xp, streak, coins, tasksCompleted, totalHoursCoded }) => {
      console.log('Received statsUpdated event:', { xp, streak, coins, tasksCompleted, totalHoursCoded });
      setStats({ xp, streak, coins, tasksCompleted, totalHoursCoded });
    });

    return () => {
      socket.off('taskCompleted');
      socket.off('challengeCompleted');
      socket.off('statsUpdated');
    };
  }, []);

  const fetchStats = async () => {
    try {
      const res = await API.get('/achievements/stats');
      console.log('Fetched stats:', res.data.data.stats);
      setStats(res.data.data.stats);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching stats:', err);
      toast.error('Failed to load dashboard stats', {
        style: {
          background: '#1a1a2e',
          color: '#fff',
          border: '1px solid #ff4d4f',
        },
      });
      setLoading(false);
    }
  };

  const getStreakMessage = () => {
    if (stats.streak === 0) return 'Start your streak today!';
    if (stats.streak < 3) return `🔥 ${stats.streak}/3 days to Sprinter badge!`;
    if (stats.streak < 7) return `🔥 ${stats.streak}/7 days to Starter badge!`;
    if (stats.streak < 14) return `🔥 ${stats.streak}/14 days to Master badge!`;
    return `🔥 ${stats.streak}-day streak! Legend status!`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen p-6 bg-cyber-gray">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-4 rounded-full border-neon-blue border-t-transparent"
        ></motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-cyber-gray">
      <AnimatePresence>
        {showConfetti && (
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={false}
            numberOfPieces={200}
            colors={['#00f5d4', '#ff4d4f', '#3f3cbb']}
          />
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-white font-heading">Welcome to Your Dev Quest</h1>
        <p className="mt-2 text-lg text-cyber-purple-300">
          Powered by xAI's AI-driven learning platform
        </p>
      </motion.div>

      {/* Streak Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="p-6 mb-8 transition-shadow border rounded-xl bg-cyber-dark border-neon-blue-500/30 hover:shadow-lg hover:shadow-neon-blue/30"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Flame className="w-8 h-8 mr-3 text-neon-pink animate-pulse" />
            <h2 className="text-2xl font-bold text-white">{getStreakMessage()}</h2>
          </div>
          <div className="text-sm text-cyber-purple-300">
            Keep coding daily to unlock badges!
          </div>
        </div>
        <div className="w-full h-3 rounded-full bg-cyber-light">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min((stats.streak / 14) * 100, 100)}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="h-3 rounded-full bg-neon-pink"
          ></motion.div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: Star, label: 'XP', value: stats.xp, color: 'text-neon-blue' },
          { icon: Trophy, label: 'Tasks Completed', value: stats.tasksCompleted, color: 'text-cyber-yellow' },
          { icon: Star, label: 'Coins', value: stats.coins, color: 'text-matrix-green' },
          { icon: Clock, label: 'Hours Coded', value: stats.totalHoursCoded.toFixed(1), color: 'text-neon-pink' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            className="p-5 transition-colors border rounded-xl bg-cyber-dark border-cyber-light hover:border-neon-blue-500"
          >
            <div className="flex items-center">
              <stat.icon className={`w-6 h-6 mr-3 ${stat.color}`} />
              <div>
                <div className="text-sm text-cyber-purple-300">{stat.label}</div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */} 
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="p-6 border rounded-xl bg-cyber-dark border-neon-blue-500/30"
      >
        <h2 className="flex items-center mb-4 text-xl font-bold text-white">
          <CheckCircle className="w-6 h-6 mr-2 text-matrix-green" />
          Quick Actions
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            to="/user/learn"
            className="flex items-center p-4 transition-colors rounded-lg bg-cyber-light hover:bg-neon-blue-500/20"
          >
            <BookOpen className="w-5 h-5 mr-2 text-neon-blue" />
            <span className="text-white">Explore Learning Resources</span>
          </Link>
          <Link
            to="/user/tasks"
            className="flex items-center p-4 transition-colors rounded-lg bg-cyber-light hover:bg-neon-blue-500/20"
          >
            <CheckCircle className="w-5 h-5 mr-2 text-matrix-green" />
            <span className="text-white">View Your Tasks</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
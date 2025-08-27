import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Flame, 
  Star, 
  Trophy, 
  Clock, 
  BookOpen, 
  CheckCircle,
  TrendingUp,
  Users,
  Target,
  Zap,
  Brain,
  Calendar,
  Award
} from 'lucide-react';
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
    level: 1
  });
  const [recentTasks, setRecentTasks] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      socket.emit('join', { userId });
    }

    fetchDashboardData();

    socket.on('taskCompleted', handleTaskCompleted);
    socket.on('statsUpdated', handleStatsUpdated);

    return () => {
      socket.off('taskCompleted');
      socket.off('statsUpdated');
    };
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, tasksRes] = await Promise.all([
        API.get('/achievements/stats'),
        API.get('/tasks?limit=3')
      ]);

      setStats(statsRes.data.data.stats);
      setRecentTasks(tasksRes.data.data);
    } catch (err) {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleTaskCompleted = ({ user, milestoneMessage }) => {
    setStats(prev => ({ ...prev, ...user }));
    if (milestoneMessage) {
      triggerConfetti(milestoneMessage);
    }
  };

  const handleStatsUpdated = (updatedStats) => {
    setStats(prev => ({ ...prev, ...updatedStats }));
  };

  const triggerConfetti = (message) => {
    setShowConfetti(true);
    toast.success(message, {
      style: {
        background: '#1a1a2e',
        color: '#fff',
        border: '1px solid #00f5d4',
      },
    });
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const calculateLevel = (xp) => Math.floor(xp / 100) + 1;
  const getLevelProgress = (xp) => (xp % 100);
  const getNextLevelXP = (xp) => (calculateLevel(xp) * 100);

  const getStreakMessage = () => {
    if (stats.streak === 0) return 'Start your streak today!';
    if (stats.streak < 3) return `🔥 ${stats.streak}/3 days to Sprinter badge!`;
    if (stats.streak < 7) return `🔥 ${stats.streak}/7 days to Starter badge!`;
    if (stats.streak < 14) return `🔥 ${stats.streak}/14 days to Master badge!`;
    return `🔥 ${stats.streak}-day streak! Legend status!`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-cyber-gray">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-4 rounded-full border-neon-blue-500 border-t-transparent"
        />
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
            colors={['#00f5d4', '#ff4d4f', '#3f3cbb', '#fbbf24']}
          />
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-start justify-between mb-8 lg:flex-row lg:items-center"
      >
        <div>
          <h1 className="text-3xl font-bold text-white font-heading md:text-4xl">
            Welcome to Your Dev Quest
          </h1>
          <p className="mt-2 text-cyber-purple-300">
            Level {calculateLevel(stats.xp)} Developer • {stats.xp} XP
          </p>
        </div>
        <div className="flex items-center mt-4 space-x-2 text-neon-blue-300 lg:mt-0">
          <Zap className="w-5 h-5" />
          <span className="font-mono">Powered by xAI</span>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-8 md:grid-cols-4">
        {[
          { 
            icon: Star, 
            label: 'Total XP', 
            value: stats.xp, 
            color: 'text-neon-blue-300',
            bg: 'bg-neon-blue-500/20'
          },
          { 
            icon: Trophy, 
            label: 'Tasks Completed', 
            value: stats.tasksCompleted, 
            color: 'text-cyber-yellow',
            bg: 'bg-cyber-yellow/20'
          },
          { 
            icon: Award, 
            label: 'Coins', 
            value: stats.coins, 
            color: 'text-matrix-green',
            bg: 'bg-matrix-green/20'
          },
          { 
            icon: Clock, 
            label: 'Hours Coded', 
            value: stats.totalHoursCoded.toFixed(1), 
            color: 'text-neon-pink',
            bg: 'bg-neon-pink/20'
          },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="p-4 transition-colors border rounded-xl bg-cyber-dark border-cyber-light hover:border-neon-blue-500/50 group"
          >
            <div className="flex items-center">
              <div className={`p-2 rounded-lg ${stat.bg} group-hover:scale-110 transition-transform`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div className="ml-3">
                <div className="text-sm text-cyber-purple-300">{stat.label}</div>
                <div className="text-xl font-bold text-white">{stat.value}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Streak Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="p-6 border rounded-xl bg-cyber-dark border-neon-blue-500/30"
          >
            <div className="flex items-center mb-4">
              <Flame className="w-6 h-6 mr-3 text-neon-pink animate-pulse" />
              <h2 className="text-xl font-bold text-white">Current Streak</h2>
            </div>
            <div className="text-center">
              <div className="mb-2 text-3xl font-bold text-neon-pink">
                {stats.streak} days
              </div>
              <p className="mb-4 text-cyber-purple-300">{getStreakMessage()}</p>
              <div className="w-full h-2 rounded-full bg-cyber-light">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((stats.streak / 14) * 100, 100)}%` }}
                  className="h-2 rounded-full bg-neon-pink"
                />
              </div>
            </div>
          </motion.div>

          {/* Level Progress */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="p-6 border rounded-xl bg-cyber-dark border-cyber-light"
          >
            <h2 className="flex items-center mb-4 text-xl font-bold text-white">
              <TrendingUp className="w-6 h-6 mr-3 text-matrix-green" />
              Level Progress
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between text-sm text-cyber-purple-300">
                <span>Level {calculateLevel(stats.xp)}</span>
                <span>Level {calculateLevel(stats.xp) + 1} in {getNextLevelXP(stats.xp) - stats.xp} XP</span>
              </div>
              <div className="w-full h-2 rounded-full bg-cyber-light">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${getLevelProgress(stats.xp)}%` }}
                  className="h-2 rounded-full bg-cyber-gradient"
                />
              </div>
              <div className="flex justify-between text-xs text-cyber-purple-300">
                <span>{stats.xp % 100}/100 XP</span>
                <span>{getNextLevelXP(stats.xp)} XP</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="p-6 border rounded-xl bg-cyber-dark border-cyber-light"
          >
            <h2 className="flex items-center mb-4 text-xl font-bold text-white">
              <Zap className="w-6 h-6 mr-3 text-cyber-yellow" />
              Quick Actions
            </h2>
            <div className="grid gap-3">
              <Link
                to="/user/tasks/create"
                className="flex items-center p-4 transition-colors rounded-lg bg-cyber-light hover:bg-neon-blue-500/20 group"
              >
                <CheckCircle className="w-5 h-5 mr-3 transition-transform text-matrix-green group-hover:scale-110" />
                <span className="text-white">Create New Task</span>
              </Link>
              <Link
                to="/user/learn"
                className="flex items-center p-4 transition-colors rounded-lg bg-cyber-light hover:bg-neon-blue-500/20 group"
              >
                <BookOpen className="w-5 h-5 mr-3 transition-transform text-neon-blue-300 group-hover:scale-110" />
                <span className="text-white">Explore Learning</span>
              </Link>
              <Link
                to="/user/leaderboard"
                className="flex items-center p-4 transition-colors rounded-lg bg-cyber-light hover:bg-neon-blue-500/20 group"
              >
                <Users className="w-5 h-5 mr-3 transition-transform text-neon-pink group-hover:scale-110" />
                <span className="text-white">View Leaderboard</span>
              </Link>
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="p-6 border rounded-xl bg-cyber-dark border-cyber-light"
          >
            <h2 className="flex items-center mb-4 text-xl font-bold text-white">
              <Calendar className="w-6 h-6 mr-3 text-cyber-purple-300" />
              Recent Tasks
            </h2>
            <div className="space-y-3">
              {recentTasks.length > 0 ? (
                recentTasks.map((task) => (
                  <div
                    key={task._id}
                    className="flex items-center justify-between p-3 rounded-lg bg-cyber-light/50"
                  >
                    <div className="flex items-center">
                      <div className={`p-1 rounded ${
                        task.status === 'completed' 
                          ? 'bg-matrix-green/20 text-matrix-green' 
                          : 'bg-cyber-yellow/20 text-cyber-yellow'
                      }`}>
                        {task.status === 'completed' ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <Clock className="w-4 h-4" />
                        )}
                      </div>
                      <span className="ml-3 text-sm text-white truncate max-w-[120px]">
                        {task.name}
                      </span>
                    </div>
                    <span className="text-xs text-cyber-purple-300">
                      {task.estimatedTime}m
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-cyber-purple-300">No tasks yet. Create your first task!</p>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Motivation Quote */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="p-6 mt-8 text-center border rounded-xl bg-cyber-dark border-neon-blue-500/30"
      >
        <Brain className="w-8 h-8 mx-auto mb-3 text-neon-blue-300" />
        <blockquote className="italic text-cyber-purple-300">
          "The beautiful thing about learning is that no one can take it away from you."
        </blockquote>
        <p className="mt-2 text-sm text-neon-blue-300">- B.B. King</p>
      </motion.div>
    </div>
  );
};

export default Dashboard;
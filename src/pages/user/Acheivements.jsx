import React, { useState, useEffect } from 'react';
import { Trophy, Unlock, Star, Flame, Zap, Target, Clock, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import API from '../../utils/api';
import { toast } from 'react-hot-toast';
import socket from '../../utils/socket';

const Achievements = () => {
  const [stats, setStats] = useState({ 
    xp: 0, 
    streak: 0, 
    coins: 0, 
    totalHoursCoded: 0, 
    tasksCompleted: 0,
    level: 1
  });
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiKey, setConfettiKey] = useState(0);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      socket.emit('join', { userId });
    }

    fetchAchievementsAndStats();

    // Socket event listeners
    socket.on('achievementUnlocked', handleAchievementUnlocked);
    socket.on('statsUpdated', handleStatsUpdated);

    return () => {
      socket.off('achievementUnlocked');
      socket.off('statsUpdated');
    };
  }, []);

  const fetchAchievementsAndStats = async () => {
    try {
      const res = await API.get('/achievements/stats');
      console.log('Achievements and stats fetched:', res.data.data);
      setStats(res.data.data.stats);
      setAchievements(res.data.data.achievements || []);
    } catch (err) {
      console.error('Error fetching achievements and stats:', err);
      toast.error('Failed to load achievements');
    } finally {
      setLoading(false);
    }
  };

  const handleAchievementUnlocked = (newAchievement) => {
    setAchievements(prev => {
      const filtered = prev.filter(a => a.criteria !== newAchievement.criteria);
      return [{ ...newAchievement, unlocked: true, progress: 'Completed' }, ...filtered];
    });
    triggerConfetti();
    toast.success(`Achievement unlocked: ${newAchievement.name}! 🎉`);
  };

  const handleStatsUpdated = (updatedStats) => {
    setStats(prev => ({ ...prev, ...updatedStats }));
    fetchAchievementsAndStats(); // Refresh to ensure consistency
  };

  const triggerConfetti = () => {
    setShowConfetti(true);
    setConfettiKey(prev => prev + 1);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const calculateLevel = (xp) => {
    return Math.floor(xp / 100) + 1;
  };

  const getProgressBarWidth = (progress) => {
    if (!progress || !progress.includes('/')) return 0;
    const [current, total] = progress.split('/').map(Number);
    return Math.min((current / total) * 100, 100);
  };

  const getStreakMessage = () => {
    if (stats.streak === 0) return 'Start your streak today!';
    if (stats.streak < 3) return `🔥 ${stats.streak}/3 days to Sprinter badge!`;
    if (stats.streak < 7) return `🔥 ${stats.streak}/7 days to Starter badge!`;
    if (stats.streak < 14) return `🔥 ${stats.streak}/14 days to Master badge!`;
    return `🔥 ${stats.streak}-day streak! Legend status!`;
  };

  const getNextLevelXP = () => {
    const currentLevel = calculateLevel(stats.xp);
    return currentLevel * 100;
  };

  const getLevelProgress = () => {
    const currentLevel = calculateLevel(stats.xp);
    const xpForNextLevel = currentLevel * 100;
    const xpInCurrentLevel = stats.xp % 100;
    return (xpInCurrentLevel / 100) * 100;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-cyber-gray">
        <div className="text-xl text-neon-blue-300">Loading achievements...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-cyber-gray">
      {showConfetti && <Confetti key={confettiKey} recycle={false} numberOfPieces={200} />}
      
      {/* Header */}
      <div className="flex flex-col items-start justify-between mb-8 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-white font-heading">Your Coding Journey</h2>
          <p className="text-cyber-purple-300">Track your progress and unlock achievements</p>
        </div>
        <div className="flex items-center space-x-2 text-neon-blue-300">
          <Zap className="w-5 h-5" />
          <span className="font-mono">Lvl {calculateLevel(stats.xp)} • {stats.xp} XP</span>
        </div>
      </div>

      {/* Level Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 mb-6 border rounded-lg bg-cyber-dark border-neon-blue-500/30"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white">Level Progress</h3>
          <span className="text-neon-blue-300">Level {calculateLevel(stats.xp)}</span>
        </div>
        <div className="w-full h-3 mb-2 rounded-full bg-cyber-light">
          <div
            className="h-3 transition-all duration-500 rounded-full bg-cyber-gradient"
            style={{ width: `${getLevelProgress()}%` }}
          />
        </div>
        <div className="flex justify-between text-sm text-cyber-purple-300">
          <span>{stats.xp % 100}/100 XP</span>
          <span>Next: {getNextLevelXP()} XP</span>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-8 md:grid-cols-4">
        <div className="p-4 border rounded-lg bg-cyber-dark border-cyber-light">
          <div className="flex items-center">
            <Flame className="w-5 h-5 mr-2 text-neon-pink" />
            <div>
              <p className="text-sm text-cyber-purple-300">Streak</p>
              <p className="text-xl font-bold text-white">{stats.streak} days</p>
            </div>
          </div>
        </div>
        <div className="p-4 border rounded-lg bg-cyber-dark border-cyber-light">
          <div className="flex items-center">
            <Trophy className="w-5 h-5 mr-2 text-cyber-yellow" />
            <div>
              <p className="text-sm text-cyber-purple-300">Coins</p>
              <p className="text-xl font-bold text-white">{stats.coins}</p>
            </div>
          </div>
        </div>
        <div className="p-4 border rounded-lg bg-cyber-dark border-cyber-light">
          <div className="flex items-center">
            <Target className="w-5 h-5 mr-2 text-matrix-green" />
            <div>
              <p className="text-sm text-cyber-purple-300">Completed</p>
              <p className="text-xl font-bold text-white">{stats.tasksCompleted}</p>
            </div>
          </div>
        </div>
        <div className="p-4 border rounded-lg bg-cyber-dark border-cyber-light">
          <div className="flex items-center">
            <Clock className="w-5 h-5 mr-2 text-neon-blue-300" />
            <div>
              <p className="text-sm text-cyber-purple-300">Hours Coded</p>
              <p className="text-xl font-bold text-white">{stats.totalHoursCoded.toFixed(1)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Streak Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="p-6 mb-8 border rounded-lg bg-cyber-dark border-neon-blue-500/30"
      >
        <div className="flex items-center mb-4">
          <Flame className="w-6 h-6 mr-3 text-neon-pink animate-pulse" />
          <h3 className="text-xl font-bold text-white">{getStreakMessage()}</h3>
        </div>
        <p className="mb-3 text-cyber-purple-300">Complete at least one task daily to maintain your streak!</p>
        <div className="w-full bg-cyber-light rounded-full h-2.5">
          <div
            className="bg-neon-pink h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${Math.min((stats.streak / 14) * 100, 100)}%` }}
          />
        </div>
      </motion.div>

      {/* Achievements Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-white font-heading">Your Achievements</h3>
          <span className="text-cyber-purple-300">
            {achievements.filter(a => a.unlocked).length}/{achievements.length} Unlocked
          </span>
        </div>

        {achievements.length === 0 ? (
          <div className="p-8 text-center border-2 border-dashed border-cyber-light rounded-2xl">
            <Trophy className="w-16 h-16 mx-auto mb-4 text-cyber-purple-500" />
            <h4 className="mb-2 text-xl font-semibold text-white">No achievements yet</h4>
            <p className="text-cyber-purple-300">Complete quests to unlock your first achievement!</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence>
              {achievements.map((ach) => (
                <motion.div
                  key={ach.criteria}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className={`p-5 border rounded-2xl transition-all ${
                    ach.unlocked
                      ? 'bg-cyber-dark border-neon-blue-500 hover:border-neon-blue-300 hover:shadow-lg hover:shadow-neon-blue-500/20'
                      : 'bg-cyber-dark/50 border-cyber-light opacity-70'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className={`p-2 rounded-lg ${
                      ach.unlocked ? 'bg-neon-blue-500/20' : 'bg-cyber-light'
                    }`}>
                      <Trophy className={`w-6 h-6 ${
                        ach.unlocked ? 'text-neon-blue-300' : 'text-cyber-purple-300'
                      }`} />
                    </div>
                    {ach.unlocked && (
                      <div className="px-2 py-1 text-xs rounded-full bg-matrix-green/20 text-matrix-green">
                        Unlocked
                      </div>
                    )}
                  </div>

                  <h4 className={`mb-2 text-lg font-semibold ${
                    ach.unlocked ? 'text-white' : 'text-cyber-purple-300'
                  }`}>
                    {ach.name}
                  </h4>

                  <p className="mb-4 text-sm text-cyber-purple-300">
                    {ach.description}
                  </p>

                  {ach.unlocked ? (
                    <div className="space-y-2">
                      <div className="flex items-center text-xs text-neon-blue-300">
                        <Unlock className="w-3 h-3 mr-1" />
                        <span>Unlocked {new Date(ach.unlockedAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-center mt-3">
                        <div className="p-2 rounded-lg bg-cyber-light">
                          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-neon-blue-500">
                            <Trophy className="w-6 h-6 text-white" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-center text-xs text-cyber-purple-300">
                        <span>Progress: {ach.progress}</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-cyber-light">
                        <div
                          className="h-2 transition-all duration-500 rounded-full bg-cyber-gradient"
                          style={{ width: `${getProgressBarWidth(ach.progress)}%` }}
                        />
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Achievements;
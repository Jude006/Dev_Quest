import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Crown, 
  Trophy, 
  Star, 
  TrendingUp, 
  Zap, 
  Users, 
  Award,
  Target,
  Calendar,
  Clock,
  Flame
} from 'lucide-react';
import API from '../../utils/api';
import { toast } from 'react-hot-toast';

const LeaderBoard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [userRank, setUserRank] = useState(null);
  const [timeframe, setTimeframe] = useState('all-time');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('global');

  useEffect(() => {
    fetchLeaderboard();
  }, [timeframe, activeTab]);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      const endpoint = activeTab === 'global' ? '/leaderboard' : '/leaderboard/friends';
      const res = await API.get(`${endpoint}?timeframe=${timeframe}`);
      
      setLeaderboard(res.data.data.leaderboard || []);
      setUserRank(res.data.data.userRank || null);
    } catch (err) {
      console.error('Error fetching leaderboard:', err);
      toast.error('Failed to load leaderboard');
    } finally {
      setLoading(false);
    }
  };

  const getRankBadge = (rank) => {
    if (rank === 1) return { icon: Crown, color: 'text-cyber-yellow', bg: 'bg-cyber-yellow/20' };
    if (rank === 2) return { icon: Trophy, color: 'text-cyber-purple-300', bg: 'bg-cyber-purple-300/20' };
    if (rank === 3) return { icon: Award, color: 'text-neon-blue-300', bg: 'bg-neon-blue-300/20' };
    return { icon: TrendingUp, color: 'text-cyber-purple-300', bg: 'bg-cyber-dark' };
  };

  const getTimeframeText = () => {
    switch (timeframe) {
      case 'weekly': return 'This Week';
      case 'monthly': return 'This Month';
      default: return 'All Time';
    }
  };

  const calculateLevel = (xp) => {
    return Math.floor(xp / 100) + 1;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen p-6 bg-cyber-gray">
        <div className="text-xl text-neon-blue-300">Loading leaderboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-cyber-gray">
      {/* Header */}
      <div className="flex flex-col items-start justify-between mb-8 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-white font-heading">Coding Leaderboard</h2>
          <p className="text-cyber-purple-300">See how you stack up against other developers</p>
        </div>
        <div className="flex items-center space-x-2 text-neon-blue-300">
          <Trophy className="w-5 h-5" />
          <span className="font-mono">{getTimeframeText()}</span>
        </div>
      </div>

      {/* Timeframe Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {['weekly', 'monthly', 'all-time'].map((time) => (
          <button
            key={time}
            onClick={() => setTimeframe(time)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              timeframe === time
                ? 'bg-cyber-gradient text-white'
                : 'bg-cyber-dark text-cyber-purple-300 hover:bg-cyber-light'
            }`}
          >
            {time === 'weekly' ? 'This Week' : time === 'monthly' ? 'This Month' : 'All Time'}
          </button>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex mb-6 border-b border-cyber-light">
        {['global', 'friends'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 font-medium border-b-2 transition-colors ${
              activeTab === tab
                ? 'border-neon-blue-500 text-white'
                : 'border-transparent text-cyber-purple-300 hover:text-white'
            }`}
          >
            {tab === 'global' ? (
              <span className="flex items-center">
                <Users className="w-4 h-4 mr-2" />
                Global
              </span>
            ) : (
              <span className="flex items-center">
                <Target className="w-4 h-4 mr-2" />
                Friends
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Educational Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 mb-6 border rounded-lg bg-cyber-dark border-neon-blue-500/30"
      >
        <h3 className="flex items-center mb-3 text-lg font-semibold text-white">
          <Zap className="w-5 h-5 mr-2 text-cyber-yellow" />
          How to Climb the Leaderboard
        </h3>
        <div className="grid gap-3 text-sm text-cyber-purple-300 md:grid-cols-2">
          <div className="flex items-start">
            <div className="flex items-center justify-center flex-shrink-0 w-6 h-6 mt-1 mr-2 rounded-full bg-matrix-green/20">
              <span className="text-matrix-green">1</span>
            </div>
            <p>Complete coding tasks daily to earn XP and maintain streaks</p>
          </div>
          <div className="flex items-start">
            <div className="flex items-center justify-center flex-shrink-0 w-6 h-6 mt-1 mr-2 rounded-full bg-neon-blue-500/20">
              <span className="text-neon-blue-300">2</span>
            </div>
            <p>Harder tasks give more XP - challenge yourself with complex projects</p>
          </div>
          <div className="flex items-start">
            <div className="flex items-center justify-center flex-shrink-0 w-6 h-6 mt-1 mr-2 rounded-full bg-neon-pink/20">
              <span className="text-neon-pink">3</span>
            </div>
            <p>Consistency matters! Daily coding builds streaks that multiply rewards</p>
          </div>
          <div className="flex items-start">
            <div className="flex items-center justify-center flex-shrink-0 w-6 h-6 mt-1 mr-2 rounded-full bg-cyber-yellow/20">
              <span className="text-cyber-yellow">4</span>
            </div>
            <p>Share your progress and compete with friends for extra motivation</p>
          </div>
        </div>
      </motion.div>

      {/* User Rank Card */}
      {userRank && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-6 mb-6 border rounded-lg bg-cyber-gradient border-neon-blue-500"
        >
          <h3 className="flex items-center mb-4 text-lg font-semibold text-white">
            <Star className="w-5 h-5 mr-2 text-cyber-yellow" />
            Your Position
          </h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-12 h-12 mr-4 text-2xl font-bold text-white rounded-full bg-cyber-dark/50">
                #{userRank.rank}
              </div>
              <div>
                <h4 className="font-semibold text-white">You</h4>
                <p className="text-sm text-cyber-purple-200">
                  Level {calculateLevel(userRank.xp)} • {userRank.xp} XP
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-cyber-yellow">{userRank.streak} day streak</p>
              <p className="text-sm text-cyber-purple-200">{userRank.tasksCompleted} tasks completed</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Leaderboard List */}
      <div className="space-y-3">
        <AnimatePresence>
          {leaderboard.map((user, index) => {
            const RankIcon = getRankBadge(index + 1).icon;
            const rankColor = getRankBadge(index + 1).color;
            const rankBg = getRankBadge(index + 1).bg;

            return (
              <motion.div
                key={user._id || user.userId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-lg border transition-all ${
                  index < 3
                    ? 'bg-cyber-dark border-neon-blue-500/30 shadow-lg'
                    : 'bg-cyber-dark/50 border-cyber-light'
                } ${user.isCurrentUser ? 'ring-2 ring-neon-blue-500' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center flex-1 min-w-0">
                    <div className={`flex items-center justify-center w-10 h-10 mr-4 rounded-full ${rankBg}`}>
                      {index < 3 ? (
                        <RankIcon className={`w-6 h-6 ${rankColor}`} />
                      ) : (
                        <span className="text-sm font-semibold text-cyber-purple-300">#{index + 1}</span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <h4 className={`text-sm font-semibold truncate ${
                          user.isCurrentUser ? 'text-neon-blue-300' : 'text-white'
                        }`}>
                          {user.name}
                          {user.isCurrentUser && ' (You)'}
                        </h4>
                        {index < 3 && (
                          <span className={`px-2 py-1 text-xs rounded-full ${rankBg} ${rankColor}`}>
                            #{index + 1}
                          </span>
                        )}
                      </div>
                      <p className="text-xs truncate text-cyber-purple-300">
                        Level {calculateLevel(user.xp)} • {user.xp} XP
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center ml-4 space-x-4">
                    <div className="text-right">
                      <div className="flex items-center justify-end space-x-2 text-xs text-cyber-purple-300">
                        <Flame className="w-3 h-3 text-neon-pink" />
                        <span>{user.streak || 0} days</span>
                      </div>
                      <div className="flex items-center justify-end space-x-2 text-xs text-cyber-purple-300">
                        <Target className="w-3 h-3 text-matrix-green" />
                        <span>{user.tasksCompleted || 0} tasks</span>
                      </div>
                    </div>

                    {user.avatar && (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 border-2 rounded-full border-cyber-light"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    )}
                  </div>
                </div>

                {/* Progress bar for top 3 */}
                {index < 3 && leaderboard.length > 0 && (
                  <div className="mt-3">
                    <div className="flex justify-between mb-1 text-xs text-cyber-purple-300">
                      <span>Progress to next level</span>
                      <span>{user.xp % 100}/100 XP</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-cyber-light">
                      <div
                        className="h-2 transition-all duration-500 rounded-full bg-cyber-gradient"
                        style={{ width: `${(user.xp % 100)}%` }}
                      />
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {leaderboard.length === 0 && !loading && (
        <div className="p-8 text-center border-2 border-dashed border-cyber-light rounded-2xl">
          <Trophy className="w-16 h-16 mx-auto mb-4 text-cyber-purple-500" />
          <h3 className="mb-2 text-xl font-semibold text-white">No {activeTab} leaderboard data</h3>
          <p className="text-cyber-purple-300">
            {activeTab === 'friends' 
              ? 'Add friends or complete more tasks to appear on the leaderboard!'
              : 'Complete some tasks to join the leaderboard!'
            }
          </p>
        </div>
      )}

      {/* Motivational Quote */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="p-6 mt-8 text-center border rounded-lg bg-cyber-dark border-cyber-light"
      >
        <blockquote className="italic text-cyber-purple-300">
          "The expert in anything was once a beginner. What matters is consistent practice, not perfection."
        </blockquote>
        <p className="mt-2 text-sm text-neon-blue-300">- Anonymous Developer</p>
      </motion.div>
    </div>
  );
};

export default LeaderBoard;
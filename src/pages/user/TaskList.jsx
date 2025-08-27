import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { 
  CheckCircle, 
  Clock, 
  Plus, 
  Edit3, 
  Trash2, 
  X,
  Zap,
  Target,
  Eye,
  Flame,
  Star,
  Trophy,
  TrendingUp,
  Calendar
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import API from '../../utils/api';
import { toast } from 'react-hot-toast';
import socket from '../../utils/socket';

// Task difficulty configuration
const DIFFICULTY_CONFIG = {
  easy: { 
    label: 'Easy', 
    color: 'text-matrix-green', 
    bgColor: 'bg-matrix-green/10', 
    borderColor: 'border-matrix-green/30',
    xp: 25,
    coins: 5
  },
  medium: { 
    label: 'Medium', 
    color: 'text-cyber-yellow', 
    bgColor: 'bg-cyber-yellow/10', 
    borderColor: 'border-cyber-yellow/30',
    xp: 50,
    coins: 10
  },
  hard: { 
    label: 'Hard', 
    color: 'text-neon-pink', 
    bgColor: 'bg-neon-pink/10', 
    borderColor: 'border-neon-pink/30',
    xp: 100,
    coins: 20
  }
};

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({ 
    xp: 0, 
    streak: 0, 
    coins: 0, 
    tasksCompleted: 0, 
    totalHoursCoded: 0,
    level: 1
  });
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiKey, setConfettiKey] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      socket.emit('join', { userId });
    }

    fetchTasks();
    fetchStats();

    // Socket event listeners
    socket.on('taskCompleted', handleTaskCompleted);
    socket.on('taskDeleted', handleTaskDeleted);
    socket.on('achievementUnlocked', handleAchievementUnlocked);

    return () => {
      socket.off('taskCompleted');
      socket.off('taskDeleted');
      socket.off('achievementUnlocked');
    };
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await API.get('/tasks');
      setTasks(res.data.data);
    } catch (err) {
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await API.get('/achievements/stats');
      setStats(res.data.data.stats);
    } catch (err) {
      toast.error('Failed to load stats');
    }
  };

  const handleTaskCompleted = ({ task, user, milestoneMessage }) => {
    setTasks(prev => prev.map(t => t._id === task._id ? { ...t, ...task } : t));
    setStats(prev => ({ ...prev, ...user }));
    
    if (milestoneMessage) {
      triggerConfetti();
      toast.success(milestoneMessage);
    } else {
      toast.success(`Quest completed! +${DIFFICULTY_CONFIG[task.difficulty].xp} XP earned`);
    }
  };

  const handleTaskDeleted = ({ taskId }) => {
    setTasks(prev => prev.filter(t => t._id !== taskId));
    toast.success('Quest deleted successfully!');
  };

  const handleAchievementUnlocked = (achievement) => {
    triggerConfetti();
    toast.success(`Achievement unlocked: ${achievement.name}!`);
  };

  const triggerConfetti = () => {
    setShowConfetti(true);
    setConfettiKey(prev => prev + 1);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const handleComplete = async (taskId, estimatedTime, difficulty) => {
    try {
      const actualTime = prompt(`You estimated ${estimatedTime} minutes. How long did it actually take?`, estimatedTime);
      if (!actualTime || isNaN(actualTime) || actualTime <= 0) {
        toast.error('Please enter a valid time');
        return;
      }
      await API.put(`/tasks/${taskId}/complete`, { actualTime: Number(actualTime) });
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to complete task');
    }
  };

  const handleDelete = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this quest?')) {
      try {
        await API.delete(`/tasks/${taskId}`);
      } catch (err) {
        toast.error(err.response?.data?.error || 'Failed to delete task');
      }
    }
  };

  const handleViewDetails = (taskId) => {
    navigate(`/user/tasks/${taskId}`);
  };

  const handleTaskCreated = () => {
    setShowCreateModal(false);
    fetchTasks();
  };

  const calculateLevel = (xp) => {
    return Math.floor(xp / 100) + 1;
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
      <div className="flex items-center justify-center min-h-screen bg-cyber-gray">
        <div className="text-xl text-neon-blue-300">Loading your quests...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-cyber-gray">
      {showConfetti && <Confetti key={confettiKey} recycle={false} numberOfPieces={200} />}
      
      {/* Header Section */}
      <div className="flex flex-col items-start justify-between gap-4 mb-8 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-white font-heading">Your Quests</h2>
          <p className="text-cyber-purple-300">Complete tasks to earn XP and level up</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-neon-blue-300">
            <Zap className="w-5 h-5" />
            <span className="font-mono">Lvl {calculateLevel(stats.xp)} • {stats.xp} XP</span>
          </div>
          <button
            onClick={() => navigate('/user/tasks/create')}
            className="flex items-center px-4 py-2 font-medium text-white transition-opacity rounded-lg bg-cyber-gradient hover:opacity-90"
          >
            <Plus className="w-5 h-5 mr-2" />
            New Quest
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 gap-4 mb-6 md:grid-cols-4">
        <div className="p-4 border rounded-lg bg-cyber-dark border-cyber-light">
          <div className="flex items-center">
            <Star className="w-5 h-5 mr-2 text-neon-blue-300" />
            <div>
              <p className="text-sm text-cyber-purple-300">Level</p>
              <p className="text-xl font-bold text-white">{calculateLevel(stats.xp)}</p>
            </div>
          </div>
        </div>
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
            <TrendingUp className="w-5 h-5 mr-2 text-matrix-green" />
            <div>
              <p className="text-sm text-cyber-purple-300">Completed</p>
              <p className="text-xl font-bold text-white">{stats.tasksCompleted}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Streak Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 mb-6 border rounded-lg bg-cyber-dark border-neon-blue-500/30"
      >
        <div className="flex items-center mb-4">
          <Flame className="w-6 h-6 mr-3 text-neon-pink animate-pulse" />
          <h3 className="text-xl font-bold text-white">{getStreakMessage()}</h3>
        </div>
        <p className="mb-3 text-cyber-purple-300">Complete a task daily to maintain your streak!</p>
        <div className="w-full bg-cyber-light rounded-full h-2.5">
          <div
            className="bg-neon-pink h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${Math.min((stats.streak / 14) * 100, 100)}%` }}
          />
        </div>
      </motion.div>

      {/* Tasks Grid */}
      {tasks.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-8 text-center border-2 border-dashed border-cyber-light rounded-2xl"
        >
          <Target className="w-16 h-16 mx-auto mb-4 text-cyber-purple-500" />
          <h3 className="mb-2 text-xl font-semibold text-white">No quests yet</h3>
          <p className="mb-4 text-cyber-purple-300">Start your coding journey by creating your first quest!</p>
          <button
            onClick={() => navigate('/user/tasks/create')}
            className="px-6 py-2 font-medium text-white transition-opacity rounded-lg bg-cyber-gradient hover:opacity-90"
          >
            Create Your First Quest
          </button>
        </motion.div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {tasks.map((task) => (
              <motion.div
                key={task._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className={`p-5 border rounded-2xl bg-cyber-dark border-cyber-light hover:border-neon-blue-500 transition-all ${
                  task.status === 'completed' ? 'opacity-70 grayscale-[20%]' : 'hover:scale-105'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${DIFFICULTY_CONFIG[task.difficulty].bgColor} ${DIFFICULTY_CONFIG[task.difficulty].color}`}>
                    {DIFFICULTY_CONFIG[task.difficulty].label}
                  </div>
                  {task.status === 'completed' && (
                    <CheckCircle className="w-5 h-5 text-matrix-green animate-pulse" />
                  )}
                </div>

                <h3 className="mb-2 text-lg font-semibold text-white">{task.name}</h3>
                {task.description && (
                  <p className="mb-4 text-sm text-cyber-purple-300">{task.description}</p>
                )}

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-xs text-cyber-purple-300">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{task.estimatedTime} min</span>
                  </div>
                  <div className="font-mono text-xs text-neon-blue-300">
                    +{DIFFICULTY_CONFIG[task.difficulty].xp} XP
                  </div>
                </div>

                <div className="flex space-x-2">
                  {task.status === 'pending' ? (
                    <button
                      onClick={() => handleComplete(task._id, task.estimatedTime, task.difficulty)}
                      className="flex-1 py-2 font-medium transition-colors rounded-lg bg-matrix-green text-cyber-black hover:bg-matrix-green/90"
                    >
                      Complete Quest
                    </button>
                  ) : (
                    <div className="flex-1 py-2 text-center rounded-lg bg-cyber-gray text-matrix-green">
                      Completed in {task.actualTime} min
                    </div>
                  )}
                  
                  <button
                    onClick={() => handleViewDetails(task._id)}
                    className="p-2 text-white transition-colors border rounded-lg bg-cyber-gray border-cyber-light hover:bg-cyber-light"
                    title="View Details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="p-2 text-white transition-colors border rounded-lg bg-cyber-gray border-error-red hover:bg-error-red/20"
                    title="Delete Quest"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default TaskList;
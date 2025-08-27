import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Code, 
  Video, 
  FileText, 
  ExternalLink,
  Brain,
  Clock,
  Star,
  ChevronRight,
  Zap,
  Lightbulb,
  GraduationCap
} from 'lucide-react';
import { Link } from 'react-router-dom';
import API from '../../utils/api';
import { toast } from 'react-hot-toast';
import socket from '../../utils/socket';

const Learn = () => {
  const [tasks, setTasks] = useState([]);
  const [learningResources, setLearningResources] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      socket.emit('join', { userId });
      console.log(`Joined Socket.io room for user ${userId}`);
    }

    fetchTasks();

    socket.on('taskCreated', (newTask) => {
      console.log('Received taskCreated event:', newTask);
      setTasks((prev) => [newTask, ...prev]);
      generateLearningResources(newTask);
    });

    socket.on('taskUpdated', (updatedTask) => {
      console.log('Received taskUpdated event:', updatedTask);
      setTasks((prev) =>
        prev.map((t) => (t._id === updatedTask._id ? updatedTask : t))
      );
    });

    socket.on('taskDeleted', ({ taskId }) => {
      console.log('Received taskDeleted event:', { taskId });
      setTasks((prev) => prev.filter((t) => t._id !== taskId));
      setLearningResources((prev) => {
        const newResources = { ...prev };
        delete newResources[taskId];
        localStorage.removeItem(`learn-${taskId}`);
        return newResources;
      });
      toast.success('Task deleted successfully!');
    });

    socket.on('taskCompleted', ({ task }) => {
      console.log('Received taskCompleted event:', task);
      setTasks((prev) =>
        prev.map((t) => (t._id === task._id ? task : t))
      );
    });

    return () => {
      socket.off('taskCreated');
      socket.off('taskUpdated');
      socket.off('taskDeleted');
      socket.off('taskCompleted');
    };
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await API.get('/tasks');
      setTasks(res.data.data);
      // Pre-fetch learning resources for each task
      res.data.data.forEach(task => {
        if (!learningResources[task._id]) {
          generateLearningResources(task);
        }
      });
    } catch (err) {
      toast.error('Failed to load tasks');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const generateLearningResources = async (task) => {
    try {
      // Check local storage first
      const cachedResources = localStorage.getItem(`learn-${task._id}`);
      if (cachedResources) {
        setLearningResources(prev => ({
          ...prev,
          [task._id]: JSON.parse(cachedResources)
        }));
        return;
      }

      // Fetch from backend
      const response = await API.get(`/learn/resources/${task._id}`);
      const resources = response.data.data;

      // Cache the resources
      localStorage.setItem(`learn-${task._id}`, JSON.stringify(resources));
      
      setLearningResources(prev => ({
        ...prev,
        [task._id]: resources
      }));
    } catch (error) {
      console.error('Error generating resources:', error);
      provideFallbackResources(task);
    }
  };

  const provideFallbackResources = (task) => {
    const tech = detectTechnology(task.name + ' ' + (task.description || ''));
    const fallbackResources = {
      concept: `Learn about ${tech} development`,
      tutorials: [
        `MDN Web Docs - ${tech} Guide`,
        `FreeCodeCamp - ${tech} Tutorial`,
        `W3Schools - ${tech} Basics`
      ],
      videos: [
        `YouTube: ${tech} Crash Course`,
        `YouTube: ${tech} for Beginners`,
        `YouTube: ${tech} Best Practices`
      ],
      documentation: [
        `Official ${tech} Documentation`,
        `${tech} API Reference`,
        `Community ${tech} Examples`
      ],
      exercises: [
        `Build a simple ${tech} project`,
        `Practice ${tech} concepts on CodePen`,
        `Solve ${tech} challenges on LeetCode`
      ],
      tips: [
        `Start with small ${tech} projects to build confidence`,
        `Read ${tech} documentation for deeper understanding`,
        `Join ${tech} communities on Discord or Reddit`
      ]
    };

    localStorage.setItem(`learn-${task._id}`, JSON.stringify(fallbackResources));
    setLearningResources(prev => ({
      ...prev,
      [task._id]: fallbackResources
    }));
  };

  const detectTechnology = (text) => {
    const techKeywords = {
      react: ['react', 'jsx', 'component', 'hooks'],
      javascript: ['javascript', 'js', 'es6', 'node'],
      python: ['python', 'django', 'flask'],
      database: ['mysql', 'mongodb', 'postgres', 'sql'],
      html: ['html', 'css', 'frontend'],
      api: ['api', 'rest', 'graphql']
    };

    for (const [tech, keywords] of Object.entries(techKeywords)) {
      if (keywords.some(keyword => text.toLowerCase().includes(keyword))) {
        return tech.charAt(0).toUpperCase() + tech.slice(1);
      }
    }
    return 'Programming';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen p-6 bg-cyber-gray">
        <div className="text-xl text-neon-blue-300">Loading learning resources...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-cyber-gray">
      {/* Header */}
      <div className="flex flex-col items-start justify-between mb-8 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-white font-heading">Learning Hub</h2>
          <p className="text-cyber-purple-300">AI-powered learning resources for your tasks</p>
        </div>
        <div className="flex items-center space-x-2 text-neon-blue-300">
          <Zap className="w-5 h-5" />
          <span className="font-mono">Powered by xAI</span>
        </div>
      </div>

      {/* AI Learning Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 mb-8 border rounded-lg bg-cyber-dark border-neon-blue-500/30"
      >
        <div className="flex items-center mb-4">
          <Brain className="w-6 h-6 mr-3 text-neon-pink" />
          <h3 className="text-xl font-bold text-white">Smart Learning Assistant</h3>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="p-4 rounded-lg bg-cyber-light">
            <Lightbulb className="w-8 h-8 mb-2 text-cyber-yellow" />
            <h4 className="font-semibold text-white">Personalized</h4>
            <p className="text-sm text-cyber-purple-300">Resources tailored to your tasks</p>
          </div>
          <div className="p-4 rounded-lg bg-cyber-light">
            <GraduationCap className="w-8 h-8 mb-2 text-matrix-green" />
            <h4 className="font-semibold text-white">Beginner-Friendly</h4>
            <p className="text-sm text-cyber-purple-300">Step-by-step guides and tutorials</p>
          </div>
          <div className="p-4 rounded-lg bg-cyber-light">
            <Code className="w-8 h-8 mb-2 text-neon-blue-300" />
            <h4 className="font-semibold text-white">Practical</h4>
            <p className="text-sm text-cyber-purple-300">Hands-on exercises and projects</p>
          </div>
        </div>
      </motion.div>

      {/* Tasks Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tasks.map((task) => {
          const resources = learningResources[task._id];
          
          return (
            <motion.div
              key={task._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 transition-all border rounded-2xl bg-cyber-dark border-cyber-light hover:border-neon-blue-500 group"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold text-white transition-colors group-hover:text-neon-blue-300">
                  {task.name}
                </h3>
                <div className="flex items-center text-xs text-cyber-purple-300">
                  <Clock className="w-3 h-3 mr-1" />
                  {task.estimatedTime}min
                </div>
              </div>

              {task.description && (
                <p className="mb-4 text-sm text-cyber-purple-300">{task.description}</p>
              )}

              {resources ? (
                <div className="space-y-3">
                  <div>
                    <h4 className="flex items-center mb-2 text-sm font-semibold text-white">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Concept to Learn
                    </h4>
                    <p className="text-sm text-cyber-purple-300">{resources.concept}</p>
                  </div>

                  <div>
                    <h4 className="flex items-center mb-2 text-sm font-semibold text-white">
                      <FileText className="w-4 h-4 mr-2" />
                      Recommended Tutorials
                    </h4>
                    <ul className="space-y-1 text-sm text-cyber-purple-300">
                      {resources.tutorials.slice(0, 2).map((tutorial, index) => (
                        <li key={index}>• {tutorial}</li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    to={`/user/learn/${task._id}`}
                    className="flex items-center w-full px-4 py-2 mt-4 text-sm text-white transition-opacity rounded-lg bg-cyber-gradient hover:opacity-90"
                  >
                    Explore Full Resources
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              ) : (
                <div className="flex items-center justify-center py-8">
                  <div className="text-center">
                    <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 rounded-full bg-cyber-light">
                      <Brain className="w-6 h-6 text-neon-blue-300" />
                    </div>
                    <p className="text-sm text-cyber-purple-300">Generating learning resources...</p>
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Empty State */}
      {tasks.length === 0 && (
        <div className="p-8 text-center border-2 border-dashed border-cyber-light rounded-2xl">
          <BookOpen className="w-16 h-16 mx-auto mb-4 text-cyber-purple-500" />
          <h3 className="mb-2 text-xl font-semibold text-white">No tasks yet</h3>
          <p className="text-cyber-purple-300">Create some tasks to generate learning resources!</p>
        </div>
      )}
    </div>
  );
};

export default Learn;


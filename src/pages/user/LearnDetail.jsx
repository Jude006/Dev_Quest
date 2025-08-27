import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  BookOpen,
  Video,
  FileText,
  Code,
  ExternalLink,
  CheckCircle,
  Clock,
  Star,
  Lightbulb,
  Brain,
  Copy
} from 'lucide-react';
import API from '../../utils/api';
import { toast } from 'react-hot-toast';

const LearnDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [resources, setResources] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completing, setCompleting] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (id) {
      fetchTaskAndResources();
    }
  }, [id]);

  const fetchTaskAndResources = async () => {
    try {
      // Fetch task
      const taskRes = await API.get(`/tasks/${id}`);
      setTask(taskRes.data.data);

      // Fetch AI-generated resources
      const resourceRes = await API.get(`/learn/resources/${id}`);
      setResources(resourceRes.data.data);

    } catch (err) {
      console.error('Error loading resources:', err);
      toast.error('Failed to load learning resources');
      
      // Load fallback resources
      if (task) {
        const fallbackResources = generateFallbackResources(task);
        setResources(fallbackResources);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteLearning = async () => {
    setCompleting(true);
    try {
      const actualTime = prompt(`You estimated ${task.estimatedTime} minutes. How long did it actually take?`, task.estimatedTime);
      if (!actualTime || isNaN(actualTime) || actualTime <= 0) {
        toast.error('Please enter a valid time');
        return;
      }
      
      await API.put(`/tasks/${id}/complete`, { 
        actualTime: Number(actualTime),
        learned: true 
      });
      
      toast.success('🎉 Task completed! Learning marked as done.');
      navigate('/user/tasks');
      
    } catch (err) {
      toast.error('Failed to complete task');
    } finally {
      setCompleting(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success('Code copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen p-6 bg-cyber-gray">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 rounded-full border-neon-blue-300 border-t-transparent animate-spin"></div>
          <div className="text-xl text-neon-blue-300">AI is generating your learning resources...</div>
        </div>
      </div>
    );
  }

  if (!task || !resources) {
    return (
      <div className="flex items-center justify-center min-h-screen p-6 bg-cyber-gray">
        <div className="text-center">
          <div className="mb-4 text-xl text-neon-blue-300">Resources not found</div>
          <button
            onClick={() => navigate('/user/learn')}
            className="px-6 py-3 text-white rounded-lg bg-cyber-gradient"
          >
            Back to Learning Hub
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-cyber-gray">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => navigate('/user/learn')}
          className="flex items-center px-4 py-2 transition-colors rounded-lg text-cyber-purple-300 hover:text-white bg-cyber-dark hover:bg-cyber-light"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Learning
        </button>
        <div className="flex items-center space-x-2 text-neon-blue-300">
          <Brain className="w-5 h-5" />
          <span className="font-mono">AI-Powered Learning</span>
        </div>
      </div>

      {/* Task Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 mb-8 border rounded-lg bg-cyber-dark border-neon-blue-500/30"
      >
        <h1 className="mb-2 text-3xl font-bold text-white font-heading">{task.name}</h1>
        {task.description && (
          <p className="mb-4 text-lg text-cyber-purple-300">{task.description}</p>
        )}
        <div className="flex items-center space-x-4 text-sm text-cyber-purple-300">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {task.estimatedTime} minutes estimated
          </div>
          <div className="flex items-center">
            <BookOpen className="w-4 h-4 mr-1" />
            {detectTechnology(task.name)} concepts
          </div>
        </div>
      </motion.div>

      {/* AI Explanation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="p-6 mb-8 border rounded-lg bg-cyber-dark border-neon-blue-500/30"
      >
        <h2 className="flex items-center mb-4 text-2xl font-bold text-white">
          <Lightbulb className="w-6 h-6 mr-3 text-cyber-yellow" />
          AI Explanation
        </h2>
        <div className="prose prose-invert max-w-none">
          <p className="text-lg leading-relaxed text-cyber-purple-300">
            {resources.explanation || 'The AI is analyzing your task and will provide a detailed explanation here.'}
          </p>
        </div>
      </motion.div>

      {/* Step-by-Step Approach */}
      {resources.approach && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 mb-8 border rounded-lg bg-cyber-dark border-neon-blue-500/30"
        >
          <h2 className="flex items-center mb-4 text-2xl font-bold text-white">
            <BookOpen className="w-6 h-6 mr-3 text-matrix-green" />
            Step-by-Step Approach
          </h2>
          <ol className="space-y-3">
            {resources.approach.map((step, index) => (
              <li key={index} className="flex items-start text-cyber-purple-300">
                <span className="flex items-center justify-center w-6 h-6 mr-3 text-sm text-white rounded-full bg-neon-blue-500">
                  {index + 1}
                </span>
                <span className="flex-1">{step}</span>
              </li>
            ))}
          </ol>
        </motion.div>
      )}

      {/* Complete Working Code */}
      {resources.code && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 mb-8 border rounded-lg bg-cyber-dark border-neon-blue-500/30"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="flex items-center text-2xl font-bold text-white">
              <Code className="w-6 h-6 mr-3 text-neon-pink" />
              Complete Working Code
            </h2>
            <button
              onClick={() => copyToClipboard(resources.code)}
              className="flex items-center px-3 py-1 text-sm transition-colors rounded-lg bg-cyber-light text-cyber-purple-300 hover:text-white"
            >
              <Copy className="w-4 h-4 mr-1" />
              {copied ? 'Copied!' : 'Copy Code'}
            </button>
          </div>
          <pre className="p-4 overflow-x-auto rounded-lg bg-cyber-light">
            <code className="text-sm text-neon-blue-300">{resources.code}</code>
          </pre>
        </motion.div>
      )}

      {/* Learning Resources Grid */}
      <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Tutorials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-6 border rounded-lg bg-cyber-dark border-cyber-light"
        >
          <h3 className="flex items-center mb-4 text-xl font-bold text-white">
            <FileText className="w-5 h-5 mr-2 text-neon-blue-300" />
            Tutorials
          </h3>
          <ul className="space-y-2">
            {resources.tutorials.map((tutorial, index) => (
              <li key={index} className="transition-colors text-cyber-purple-300 hover:text-white">
                • {tutorial}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Videos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-6 border rounded-lg bg-cyber-dark border-cyber-light"
        >
          <h3 className="flex items-center mb-4 text-xl font-bold text-white">
            <Video className="w-5 h-5 mr-2 text-neon-pink" />
            Videos
          </h3>
          <ul className="space-y-2">
            {resources.videos.map((video, index) => (
              <li key={index} className="transition-colors text-cyber-purple-300 hover:text-white">
                • {video}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Documentation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="p-6 border rounded-lg bg-cyber-dark border-cyber-light"
        >
          <h3 className="flex items-center mb-4 text-xl font-bold text-white">
            <ExternalLink className="w-5 h-5 mr-2 text-matrix-green" />
            Documentation
          </h3>
          <ul className="space-y-2">
            {resources.documentation.map((doc, index) => (
              <li key={index} className="transition-colors text-cyber-purple-300 hover:text-white">
                • {doc}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Completion Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="p-6 border rounded-lg bg-cyber-dark border-neon-blue-500/30"
      >
        <h2 className="flex items-center mb-4 text-2xl font-bold text-white">
          <CheckCircle className="w-6 h-6 mr-3 text-matrix-green" />
          Ready to Complete?
        </h2>
        <p className="mb-6 text-cyber-purple-300">
          Have you gone through the learning resources and practiced the concepts? 
          Mark this task as completed to track your progress and earn rewards.
        </p>
        <button
          onClick={handleCompleteLearning}
          disabled={completing}
          className="flex items-center px-8 py-4 text-lg font-semibold transition-colors rounded-lg bg-matrix-green text-cyber-black hover:bg-matrix-green/90 disabled:opacity-50"
        >
          {completing ? (
            <>
              <div className="w-5 h-5 mr-2 border-2 rounded-full border-cyber-black border-t-transparent animate-spin"></div>
              Completing...
            </>
          ) : (
            <>
              <CheckCircle className="w-6 h-6 mr-2" />
              Complete Task & Learning
            </>
          )}
        </button>
      </motion.div>
    </div>
  );
};

// Helper functions
function detectTechnology(text) {
  text = (text || '').toLowerCase();
  if (text.includes('react')) return 'React';
  if (text.includes('javascript') || text.includes('js')) return 'JavaScript';
  if (text.includes('python')) return 'Python';
  if (text.includes('node')) return 'Node.js';
  if (text.includes('database') || text.includes('sql')) return 'Database';
  if (text.includes('html') || text.includes('css')) return 'Web Development';
  return 'Programming';
}

function generateFallbackResources(task) {
  const tech = detectTechnology(task.name + ' ' + task.description);
  
  return {
    explanation: `This task focuses on ${tech} development. You'll learn core programming concepts and practical implementation techniques that are essential for modern web development.`,
    approach: [
      'Analyze the problem requirements and break them down into smaller, manageable parts',
      'Research similar solutions and best practices in the industry',
      'Plan your implementation strategy with pseudocode or diagrams',
      'Write clean, maintainable code with proper error handling',
      'Test your solution thoroughly and refactor for optimization'
    ],
    code: `// ${task.name}\nfunction ${task.name.replace(/\s+/g, '_')}() {\n  // Implement your solution here\n  console.log("${task.name} completed successfully");\n  return { success: true };\n}`,
    tutorials: [
      'MDN Web Docs - Comprehensive JavaScript Guide',
      'FreeCodeCamp - Interactive Coding Challenges',
      'The Odin Project - Full Stack Curriculum'
    ],
    videos: [
      'YouTube: JavaScript Masterclass for Beginners',
      'YouTube: Modern Web Development Practices',
      'YouTube: Debugging Techniques and Tools'
    ],
    documentation: [
      'MDN JavaScript Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript',
      'React Documentation: https://reactjs.org/docs',
      'Node.js Guides: https://nodejs.org/en/docs/guides'
    ],
    exercises: [
      'Build a complete project using these concepts',
      'Solve coding challenges on platforms like LeetCode',
      'Create multiple implementations with different approaches'
    ],
    tips: [
      'Use console.log() strategically for debugging',
      'Break complex problems into smaller functions',
      'Write tests before implementing complex logic',
      'Learn to read and understand error messages',
      'Join developer communities for support and feedback'
    ]
  };
}

export default LearnDetail;
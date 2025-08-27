import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../utils/api';
import { toast } from 'react-hot-toast';
import { Plus, X } from 'lucide-react';

const TaskCreate = ({ onTaskCreated, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    difficulty: 'medium',
    estimatedTime: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post('/tasks', formData);
      toast.success('Quest created successfully!');
      setFormData({ name: '', description: '', difficulty: 'medium', estimatedTime: '' });
      
      if (onTaskCreated) onTaskCreated();
      
      // Navigate back to task list after successful creation
      navigate('/user/tasks');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to create quest');
    } finally {
      setLoading(false);
      if (onClose) onClose();
    }
  };

  return (
    <div className="p-6 bg-cyber-gray rounded-2xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white font-heading">Create New Quest</h2>
        {onClose && (
          <button 
            onClick={onClose}
            className="p-2 transition-colors rounded-full text-cyber-purple-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-2 text-cyber-purple-300">Quest Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., Build React Todo App"
            className="w-full px-4 py-3 text-white border rounded-lg bg-cyber-dark border-neon-blue-500 focus:ring-2 focus:ring-neon-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-cyber-purple-300">Description (Optional)</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            placeholder="Describe what you need to accomplish..."
            className="w-full px-4 py-3 text-white border rounded-lg bg-cyber-dark border-neon-blue-500 focus:ring-2 focus:ring-neon-blue-500 focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-cyber-purple-300">Difficulty</label>
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              className="w-full px-4 py-3 text-white border rounded-lg bg-cyber-dark border-neon-blue-500 focus:ring-2 focus:ring-neon-blue-500 focus:border-transparent"
            >
              <option value="easy">Easy (+25 XP)</option>
              <option value="medium">Medium (+50 XP)</option>
              <option value="hard">Hard (+100 XP)</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-cyber-purple-300">Est. Time (minutes)</label>
            <input
              name="estimatedTime"
              type="number"
              value={formData.estimatedTime}
              onChange={handleChange}
              placeholder="e.g., 60"
              min="1"
              className="w-full px-4 py-3 text-white border rounded-lg bg-cyber-dark border-neon-blue-500 focus:ring-2 focus:ring-neon-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center w-full px-6 py-3 font-medium text-white transition-opacity rounded-lg bg-cyber-gradient hover:opacity-90 disabled:opacity-50"
          >
            {loading ? (
              <div className="flex items-center">
                <div className="w-4 h-4 mr-2 border-2 border-white rounded-full border-t-transparent animate-spin" />
                Creating Quest...
              </div>
            ) : (
              <>
                <Plus className="w-5 h-5 mr-2" />
                Create Quest
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskCreate;
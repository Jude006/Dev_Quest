import { X, CheckCircle, Clock, Edit3, Trash2, Trophy } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../../utils/api';
import { toast } from 'react-hot-toast';

const DIFFICULTY_CONFIG = {
  easy: {
    label: 'Easy',
    color: 'text-matrix-green',
    bgColor: 'bg-matrix-green/10',
    borderColor: 'border-matrix-green/30',
    xp: 25,
  },
  medium: {
    label: 'Medium',
    color: 'text-cyber-yellow',
    bgColor: 'bg-cyber-yellow/10',
    borderColor: 'border-cyber-yellow/30',
    xp: 50,
  },
  hard: {
    label: 'Hard',
    color: 'text-neon-pink',
    bgColor: 'bg-neon-pink/10',
    borderColor: 'border-neon-pink/30',
    xp: 100,
  },
};

const TaskDetail = ({ taskId: propTaskId, onClose, onUpdate }) => {
  const { id: routeTaskId } = useParams();
  const taskId = propTaskId || routeTaskId; // Support both modal and route
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [updating, setUpdating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (taskId) fetchTask();
  }, [taskId]);

  const fetchTask = async () => {
    try {
      const res = await API.get(`/tasks/${taskId}`);
      setTask(res.data.data);
      setFormData(res.data.data);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to load quest details');
      console.error('Error fetching task:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      await API.put(`/tasks/${taskId}`, formData);
      toast.success('Quest updated!');
      setEditMode(false);
      fetchTask();
      if (onUpdate) onUpdate();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to update quest');
      console.error('Error updating task:', err);
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this quest?')) {
      try {
        await API.delete(`/tasks/${taskId}`);
        toast.success('Quest deleted!');
        if (onClose) onClose();
        navigate('/user/tasks'); // Redirect to task list
      } catch (err) {
        toast.error(err.response?.data?.error || 'Failed to delete quest');
        console.error('Error deleting task:', err);
      }
    }
  };

  const handleComplete = async () => {
    try {
      const actualTime = prompt(`You estimated ${task.estimatedTime} minutes. How long did it actually take?`, task.estimatedTime);
      if (!actualTime || isNaN(actualTime) || actualTime <= 0) {
        toast.error('Please enter a valid time');
        return;
      }
      await API.put(`/tasks/${taskId}/complete`, { actualTime: Number(actualTime) });
      toast.success(`Quest completed! +${DIFFICULTY_CONFIG[task.difficulty].xp} XP earned`);
      fetchTask();
      if (onUpdate) onUpdate();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to complete quest');
      console.error('Error completing task:', err);
    }
  };

  if (loading) {
    return (
      <div className="p-6 bg-cyber-gray min-h-[400px]">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white font-heading">Quest Details</h2>
          {onClose && (
            <button onClick={onClose} className="p-2 rounded-full text-cyber-purple hover:text-white">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
        <div className="py-10 text-center">
          <div className="text-neon-blue">Loading quest details...</div>
        </div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="p-6 bg-cyber-gray min-h-[400px]">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white font-heading">Quest Details</h2>
          {onClose && (
            <button onClick={onClose} className="p-2 rounded-full text-cyber-purple hover:text-white">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
        <div className="py-10 text-center">
          <div className="mb-4 text-cyber-purple">Quest not found</div>
          {onClose && (
            <button onClick={onClose} className="px-4 py-2 text-white rounded-lg bg-cyber-gradient">
              Return to Quests
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-cyber-gray min-h-[400px]">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white font-heading">Quest Details</h2>
        {onClose && (
          <button onClick={onClose} className="p-2 rounded-full text-cyber-purple hover:text-white">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {editMode ? (
        <form onSubmit={handleUpdate} className="space-y-5">
          <div>
            <label className="block mb-2 text-cyber-purple">Quest Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 text-white border rounded-lg bg-cyber-light border-neon-blue focus:ring-2 focus:ring-neon-blue focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-cyber-purple">Description</label>
            <textarea
              name="description"
              value={formData.description || ''}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-3 text-white border rounded-lg bg-cyber-light border-neon-blue focus:ring-2 focus:ring-neon-blue focus:border-transparent"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-cyber-purple">Difficulty</label>
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                className="w-full px-4 py-3 text-white border rounded-lg bg-cyber-light border-neon-blue focus:ring-2 focus:ring-neon-blue focus:border-transparent"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 text-cyber-purple">Est. Time (min)</label>
              <input
                name="estimatedTime"
                type="number"
                value={formData.estimatedTime}
                onChange={handleChange}
                className="w-full px-4 py-3 text-white border rounded-lg bg-cyber-light border-neon-blue focus:ring-2 focus:ring-neon-blue focus:border-transparent"
                required
              />
            </div>
          </div>
          <div className="flex pt-4 space-x-3">
            <button
              type="submit"
              disabled={updating}
              className="flex-1 px-6 py-3 font-medium text-white rounded-lg bg-cyber-gradient hover:opacity-90 disabled:opacity-50"
            >
              {updating ? 'Updating...' : 'Update Quest'}
            </button>
            <button
              type="button"
              onClick={() => setEditMode(false)}
              className="px-4 py-3 font-medium text-white border rounded-lg bg-cyber-light border-cyber-purple hover:bg-cyber-purple"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          <div className="flex items-start justify-between">
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${DIFFICULTY_CONFIG[task.difficulty].bgColor} ${DIFFICULTY_CONFIG[task.difficulty].color}`}>
              {DIFFICULTY_CONFIG[task.difficulty].label}
            </div>
            {task.status === 'completed' ? (
              <div className="flex items-center text-matrix-green animate-pulse">
                <CheckCircle className="w-5 h-5 mr-1" />
                <span className="text-sm">Completed</span>
              </div>
            ) : (
              <div className="text-sm text-cyber-yellow">In Progress</div>
            )}
          </div>
          <h3 className="text-2xl font-bold text-white">{task.name}</h3>
          {task.description && (
            <div>
              <h4 className="mb-2 text-cyber-purple">Description</h4>
              <p className="text-white">{task.description}</p>
            </div>
          )}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-cyber-light">
              <div className="text-sm text-cyber-purple">Estimated Time</div>
              <div className="flex items-center mt-1 text-white">
                <Clock className="w-4 h-4 mr-2" />
                <span>{task.estimatedTime} minutes</span>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-cyber-light">
              <div className="text-sm text-cyber-purple">XP Reward</div>
              <div className="flex items-center mt-1 text-neon-blue">
                <Trophy className="w-4 h-4 mr-2" />
                <span>+{DIFFICULTY_CONFIG[task.difficulty].xp} XP</span>
              </div>
            </div>
          </div>
          {task.status === 'completed' && task.actualTime && (
            <div className="p-4 rounded-lg bg-cyber-light">
              <div className="text-sm text-cyber-purple">Actual Completion Time</div>
              <div className="mt-1 text-matrix-green">{task.actualTime} minutes</div>
            </div>
          )}
          <div className="flex pt-4 space-x-3">
            {task.status === 'pending' ? (
              <button
                onClick={handleComplete}
                className="flex-1 py-3 font-medium transition-colors rounded-lg text-cyber-black bg-matrix-green hover:bg-matrix-green/90"
              >
                Complete Quest
              </button>
            ) : (
              <div className="flex-1 py-3 text-center rounded-lg text-matrix-green bg-cyber-light">
                Quest Completed
              </div>
            )}
            <button
              onClick={() => setEditMode(true)}
              className="p-3 text-white transition-colors border rounded-lg bg-cyber-light border-cyber-purple hover:bg-cyber-purple"
            >
              <Edit3 className="w-5 h-5" />
            </button>
            <button
              onClick={handleDelete}
              className="p-3 text-white transition-colors border rounded-lg bg-cyber-light border-error-red hover:bg-error-red/20"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskDetail;
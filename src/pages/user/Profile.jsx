import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Edit3, 
  Save, 
  X, 
  Camera, 
  Award, 
  BarChart3
} from 'lucide-react';
import axios from 'axios';
import API from '../../utils/api';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    username: '',
    email: '',
    bio: '',
    avatar: '',
    techStack: [],
    learningGoals: []
  });
  const [stats, setStats] = useState({
    level: 0,
    xp: 0,
    streak: 0,
    rank: '#0',
    tasksCompleted: 0,
    hoursCoded: 0,
    achievements: 0
  });
  const [tempData, setTempData] = useState({ ...userData });
  const [avatarFile, setAvatarFile] = useState(null);

  useEffect(() => {
    fetchUserData();
    fetchUserStats();
  }, []);

 const fetchUserData = async () => {
    try {
      const response = await API.get('/profile'); // Use API instance
      setUserData(response.data);
      setTempData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setIsLoading(false);
    }
  };


 const fetchUserStats = async () => {
    try {
      const response = await API.get('/profile/stats'); // Use API instance
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching user stats:', error);
    }
  };

  const handleEdit = () => {
    setTempData({ ...userData });
    setIsEditing(true);
  };

 const handleSave = async () => {
  setIsSaving(true);
  try {
    const response = await API.put('/profile', tempData);
    setUserData(response.data.data);
    setIsEditing(false);
    
    if (avatarFile) {
      await uploadAvatar(avatarFile);
      setAvatarFile(null);
    }
  } catch (error) {
    console.error('Error updating profile:', error);
    
    // Get detailed error message
    let errorMessage = 'Error updating profile';
    if (error.response) {
      // Server responded with error status
      errorMessage = error.response.data.error || error.response.data.message || errorMessage;
      console.error('Server response:', error.response.data);
    } else if (error.request) {
      // Request was made but no response received
      errorMessage = 'No response from server. Check if server is running.';
      console.error('No response received:', error.request);
    } else {
      // Something else happened
      errorMessage = error.message;
    }
    
    alert(errorMessage);
  }
  setIsSaving(false);
};

 const uploadAvatar = async (file) => {
    try {
      const formData = new FormData();
      formData.append('avatar', file);
      
      const response = await API.put('/profile/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setUserData(prev => ({ ...prev, avatar: response.data.avatar }));
      setTempData(prev => ({ ...prev, avatar: response.data.avatar }));
    } catch (error) {
      console.error('Error uploading avatar:', error);
      alert('Error uploading avatar: ' + (error.response?.data?.error || error.message));
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setAvatarFile(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempData(prev => ({ ...prev, [name]: value }));
  };

  const handleTechStackChange = (e) => {
    const values = e.target.value.split(',').map(item => item.trim()).filter(item => item);
    setTempData(prev => ({ ...prev, techStack: values }));
  };

  const handleLearningGoalsChange = (e) => {
    const values = e.target.value.split(',').map(item => item.trim()).filter(item => item);
    setTempData(prev => ({ ...prev, learningGoals: values }));
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setTempData(prev => ({ ...prev, avatar: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Add default avatar if none exists
  const getAvatarUrl = () => {
    if (isEditing) return tempData.avatar || '/default-avatar.png';
    return userData.avatar || '/default-avatar.png';
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-cyber-black">
        <div className="text-xl text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8 bg-cyber-black sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <h1 className="text-3xl font-bold text-white md:text-4xl font-heading">
            Developer <span className="text-transparent bg-cyber-gradient bg-clip-text">Profile</span>
          </h1>
          <p className="mt-2 text-cyber-purple-300">Manage your account settings and track your progress</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 gap-6 lg:grid-cols-3"
        >
          {/* Left Column - Avatar & Stats */}
          <div className="lg:col-span-1">
            <div className="p-6 border bg-cyber-dark border-cyber-light rounded-2xl">
              <div className="relative mb-6">
                <div className="w-32 h-32 mx-auto overflow-hidden border-2 rounded-full border-neon-blue-500">
                  <img 
                    src={getAvatarUrl()} 
                    alt="Profile" 
                    className="object-cover w-full h-full"
                    onError={(e) => {
                      e.target.src = '/default-avatar.png';
                    }}
                  />
                </div>
                {isEditing && (
                  <label className="absolute p-2 transform translate-x-1/2 rounded-full cursor-pointer bottom-2 right-1/2 bg-cyber-gradient">
                    <Camera className="w-5 h-5 text-white" />
                    <input 
                      type="file" 
                      className="hidden" 
                      onChange={handleAvatarUpload}
                      accept="image/*"
                    />
                  </label>
                )}
              </div>

              <div className="mb-6 text-center">
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={tempData.name || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-2 mb-2 text-xl font-bold text-center text-white border rounded-lg bg-cyber-gray border-neon-blue-500 font-heading"
                  />
                ) : (
                  <h2 className="text-xl font-bold text-white font-heading">{userData.name || 'User'}</h2>
                )}
                {isEditing ? (
                  <input
                    type="text"
                    name="username"
                    value={tempData.username || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-2 font-mono text-sm text-center border rounded-lg bg-cyber-gray border-neon-blue-500 text-neon-blue-300"
                    placeholder="username"
                  />
                ) : (
                  <p className="font-mono text-neon-blue-300">@{userData.username || 'username'}</p>
                )}
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-cyber-gray rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-cyber-purple-300">Level</span>
                    <span className="font-bold text-matrix-green">{stats.level}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-cyber-light">
                    <div 
                      className="h-2 rounded-full bg-cyber-gradient" 
                      style={{ width: `${(stats.xp % 1000) / 10}%` }}
                    ></div>
                  </div>
                  <p className="mt-1 text-xs text-cyber-purple-300">{stats.xp % 1000}/1000 XP to next level</p>
                </div>

                <div className="p-4 bg-cyber-gray rounded-xl">
                  <div className="flex items-center justify-between">
                    <span className="text-cyber-purple-300">Streak</span>
                    <span className="flex items-center font-bold text-cyber-yellow">
                      <div className="w-2 h-2 mr-1 rounded-full bg-cyber-yellow animate-pulse"></div>
                      {stats.streak} days
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-cyber-gray rounded-xl">
                  <div className="flex items-center justify-between">
                    <span className="text-cyber-purple-300">Global Rank</span>
                    <span className="font-bold text-neon-pink">{stats.rank}</span>
                  </div>
                </div>

                <div className="p-4 bg-cyber-gray rounded-xl">
                  <div className="flex items-center justify-between">
                    <span className="text-cyber-purple-300">Tasks Completed</span>
                    <span className="text-neon-blue-300">{stats.tasksCompleted}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Profile Details */}
          <div className="lg:col-span-2">
            <div className="p-6 mb-6 border bg-cyber-dark border-cyber-light rounded-2xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white font-heading">Profile Information</h3>
                {isEditing ? (
                  <div className="flex space-x-2">
                    <button 
                      onClick={handleSave}
                      disabled={isSaving}
                      className="flex items-center px-4 py-2 font-medium rounded-lg bg-matrix-green text-cyber-black disabled:opacity-50"
                    >
                      {isSaving ? 'Saving...' : (
                        <>
                          <Save className="w-4 h-4 mr-1" />
                          Save
                        </>
                      )}
                    </button>
                    <button 
                      onClick={handleCancel}
                      className="flex items-center px-4 py-2 font-medium text-white border rounded-lg bg-cyber-light border-cyber-light"
                    >
                      <X className="w-4 h-4 mr-1" />
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={handleEdit}
                    className="flex items-center px-4 py-2 font-medium text-white rounded-lg bg-cyber-gradient"
                  >
                    <Edit3 className="w-4 h-4 mr-1" />
                    Edit Profile
                  </button>
                )}
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block mb-2 text-cyber-purple-300">Email Address</label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={tempData.email || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-3 text-white border rounded-lg bg-cyber-gray border-neon-blue-500"
                    />
                  ) : (
                    <p className="px-4 py-3 text-white rounded-lg bg-cyber-gray">{userData.email || 'No email set'}</p>
                  )}
                </div>

                <div>
                  <label className="block mb-2 text-cyber-purple-300">Bio</label>
                  {isEditing ? (
                    <textarea
                      name="bio"
                      value={tempData.bio || ''}
                      onChange={handleChange}
                      rows="3"
                      className="w-full px-4 py-3 text-white border rounded-lg bg-cyber-gray border-neon-blue-500"
                      placeholder="Tell us about yourself..."
                    />
                  ) : (
                    <p className="px-4 py-3 text-white rounded-lg bg-cyber-gray">
                      {userData.bio || 'No bio yet.'}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="block mb-2 text-cyber-purple-300">Tech Stack (comma-separated)</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={tempData.techStack?.join(', ') || ''}
                        onChange={handleTechStackChange}
                        className="w-full px-4 py-3 text-white border rounded-lg bg-cyber-gray border-neon-blue-500"
                        placeholder="React, Node.js, MongoDB"
                      />
                    ) : (
                      <div className="bg-cyber-gray rounded-lg px-4 py-3 min-h-[52px]">
                        {userData.techStack?.length > 0 ? (
                          userData.techStack.map((tech, index) => (
                            <span key={index} className="inline-block px-3 py-1 mb-2 mr-2 font-mono text-sm rounded-full bg-neon-blue-900 text-neon-blue-300">
                              {tech}
                            </span>
                          ))
                        ) : (
                          <p className="text-cyber-purple-300">No tech stack added yet.</p>
                        )}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block mb-2 text-cyber-purple-300">Learning Goals (comma-separated)</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={tempData.learningGoals?.join(', ') || ''}
                        onChange={handleLearningGoalsChange}
                        className="w-full px-4 py-3 text-white border rounded-lg bg-cyber-gray border-neon-blue-500"
                        placeholder="Machine Learning, AWS Certification"
                      />
                    ) : (
                      <div className="bg-cyber-gray rounded-lg px-4 py-3 min-h-[52px]">
                        {userData.learningGoals?.length > 0 ? (
                          userData.learningGoals.map((goal, index) => (
                            <span key={index} className="inline-block px-3 py-1 mb-2 mr-2 font-mono text-sm rounded-full bg-cyber-purple-900 text-cyber-purple-300">
                              {goal}
                            </span>
                          ))
                        ) : (
                          <p className="text-cyber-purple-300">No learning goals set yet.</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="p-6 border bg-cyber-dark border-cyber-light rounded-2xl">
                <div className="flex items-center mb-4">
                  <Award className="w-5 h-5 mr-2 text-cyber-yellow" />
                  <h3 className="text-lg font-semibold text-white font-heading">Achievements</h3>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 text-center rounded-lg bg-cyber-gray">
                    <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 rounded-full bg-cyber-light">
                      <span className="font-bold text-cyber-yellow">7d</span>
                    </div>
                    <p className="text-xs text-cyber-purple-300">Week Streak</p>
                  </div>
                  <div className="p-3 text-center rounded-lg bg-cyber-gray">
                    <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 rounded-full bg-cyber-light">
                      <span className="font-bold text-matrix-green">50</span>
                    </div>
                    <p className="text-xs text-cyber-purple-300">Tasks Done</p>
                  </div>
                  <div className="p-3 text-center rounded-lg bg-cyber-gray">
                    <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 rounded-full bg-cyber-light">
                      <span className="font-bold text-neon-pink">5</span>
                    </div>
                    <p className="text-xs text-cyber-purple-300">Projects</p>
                  </div>
                </div>
              </div>

              <div className="p-6 border bg-cyber-dark border-cyber-light rounded-2xl">
                <div className="flex items-center mb-4">
                  <BarChart3 className="w-5 h-5 mr-2 text-neon-blue-300" />
                  <h3 className="text-lg font-semibold text-white font-heading">This Week</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1 text-sm text-cyber-purple-300">
                      <span>Hours Coded</span>
                      <span>12.5/20h</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-cyber-light">
                      <div className="h-2 rounded-full bg-neon-blue-500" style={{ width: '62.5%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm text-cyber-purple-300">
                      <span>Tasks Completed</span>
                      <span>8/10</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-cyber-light">
                      <div className="h-2 rounded-full bg-matrix-green" style={{ width: '80%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm text-cyber-purple-300">
                      <span>XP Earned</span>
                      <span>650/1000</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-cyber-light">
                      <div className="h-2 rounded-full bg-cyber-yellow" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
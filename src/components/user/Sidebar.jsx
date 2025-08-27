import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/Authcontext';
import { 
  Home, 
  Code, 
  Trophy, 
  BarChart3, 
  BookOpen, 
  User,
  Settings,
  LogOut,
  X,
  Zap
} from 'lucide-react';

const Sidebar = ({ setSidebarOpen, sidebarOpen }) => {
  const location = useLocation();
  const { logout, user } = useAuth();
  
  const navigation = [
    { name: 'Dashboard', path: '/user', icon: Home, exact: true },
    { name: 'Tasks', path: '/user/tasks', icon: Code, exact: false },
    { name: 'Achievements', path: '/user/achievements', icon: Trophy, exact: false },
    { name: 'Leaderboard', path: '/user/leaderboard', icon: BarChart3, exact: false },
    { name: 'Learn', path: '/user/learn', icon: BookOpen, exact: false },
    { name: 'Profile', path: '/user/profile', icon: User, exact: false },
  ];

  const isActive = (path, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path) && 
           (path === '/user' ? location.pathname === '/user' : true);
  };

  return (
    <aside className="flex flex-col h-full border-r w-72 bg-cyber-dark border-cyber-light">
      <div className="flex items-center justify-between p-6 border-b border-cyber-light">
        <div className="flex items-center">
          <div className="p-2 rounded-lg bg-cyber-gradient">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <span className="ml-3 text-xl text-white font-heading">Dev Quest</span>
        </div>
        <button 
          onClick={() => setSidebarOpen(false)} 
          className="transition-colors lg:hidden text-cyber-purple-300 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path, item.exact);
          
          return (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => window.innerWidth < 1024 && setSidebarOpen(false)}
              className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group ${
                active
                  ? 'bg-cyber-gradient text-white shadow-lg shadow-neon-blue-500/30'
                  : 'text-cyber-purple-300 hover:text-white hover:bg-cyber-light/50'
              }`}
            >
              <Icon className={`w-5 h-5 mr-3 transition-transform group-hover:scale-110 ${
                active ? 'text-white' : 'text-cyber-purple-400'
              }`} />
              {item.name}
              {active && (
                <div className="w-2 h-2 ml-auto rounded-full bg-matrix-green animate-pulse"></div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Info & Actions */}
      <div className="p-4 border-t border-cyber-light">
        {/* User Quick Stats */}
        <div className="p-4 mb-4 rounded-lg bg-cyber-light/20">
          <div className="flex items-center mb-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-cyber-gradient">
              <span className="text-sm font-bold text-white">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white truncate">
                {user?.name || 'User'}
              </p>
              <p className="text-xs text-cyber-purple-300">
                Level {Math.floor((user?.xp || 0) / 100) + 1}
              </p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-cyber-purple-300">
              <span>XP Progress</span>
              <span>{user?.xp || 0}/{(Math.floor((user?.xp || 0) / 100) + 1) * 100} XP</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-cyber-light">
              <div 
                className="h-1.5 rounded-full bg-cyber-gradient transition-all duration-500"
                style={{ 
                  width: `${((user?.xp || 0) % 100)}%` 
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <Link
          to="/user/settings"
          className="flex items-center px-4 py-2.5 mb-2 text-sm font-medium transition-all duration-200 rounded-lg text-cyber-purple-300 hover:text-white hover:bg-cyber-light/30 group"
        >
          <Settings className="w-4 h-4 mr-3 transition-transform group-hover:rotate-90" />
          Settings
        </Link>
        
        <button 
          onClick={logout}
          className="flex items-center w-full px-4 py-2.5 text-sm font-medium transition-all duration-200 rounded-lg text-cyber-purple-300 hover:text-error-red hover:bg-cyber-light/30 group"
        >
          <LogOut className="w-4 h-4 mr-3 transition-transform group-hover:-translate-x-1" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
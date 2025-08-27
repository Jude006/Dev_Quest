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
  X
} from 'lucide-react';

const Sidebar = ({setSidebarOpen, sidebarOpen}) => {
  const location = useLocation();
  const {logout} = useAuth()
  
  const navigation = [
    { name: 'Dashboard', path: '/user/', icon: Home },
    { name: 'Tasks', path: '/user/tasks', icon: Code },
    { name: 'Achievements', path: '/user/achievements', icon: Trophy },
    { name: 'Leaderboard', path: '/user/leaderboard', icon: BarChart3 },
    { name: 'Learn', path: '/user/learn', icon: BookOpen },
    { name: 'Profile', path: '/user/profile', icon: User },
  ];

  const isActive = (path) => {
    return location.pathname === path || 
           (path !== '/user' && location.pathname.startsWith(path));
  };

  

  return (
    <aside className="flex flex-col h-full border-r w-72 bg-cyber-gray border-cyber-light">
      <div className="flex items-center justify-between p-6 border-b border-cyber-light">
        <div className="flex items-center">
          <div className="p-2 rounded-lg bg-cyber-gradient">
            <Code className="w-6 h-6 text-white" />
          </div>
          <span className="ml-3 text-xl text-white font-heading">Dev Quest</span>
        </div>
        <button onClick={()=>setSidebarOpen(false)} className="lg:hidden text-cyber-purple-300 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive(item.path)
                  ? 'bg-cyber-gradient text-white shadow-lg shadow-neon-blue-500/20'
                  : 'text-cyber-purple-300 hover:text-white hover:bg-cyber-light'
              }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer section */}
      <div className="p-4 border-t border-cyber-light">
        <Link
          to="/user/settings"
          className="flex items-center px-4 py-3 text-sm font-medium transition-colors duration-200 rounded-lg text-cyber-purple-300 hover:text-white hover:bg-cyber-light"
        >
          <Settings className="w-5 h-5 mr-3" />
          Settings
        </Link>
        
        <button onClick={logout} className="flex items-center w-full px-4 py-3 text-sm font-medium transition-colors duration-200 rounded-lg text-cyber-purple-300 hover:text-error-red hover:bg-cyber-light">
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </button>

        {/* User XP Progress */}
        <div className="p-4 mt-4 rounded-lg bg-cyber-dark">
          <div className="flex justify-between mb-2 text-xs text-cyber-purple-300">
            <span>Level 7</span>
            <span>1,250/2,000 XP</span>
          </div>
          <div className="w-full h-2 rounded-full bg-cyber-light">
            <div 
              className="h-2 transition-all duration-300 rounded-full bg-cyber-gradient" 
              style={{ width: '62.5%' }}
            ></div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Users, 
  FileText, 
  Settings,
  BarChart3,
  Shield,
  LogOut,
  X
} from 'lucide-react';

const Sidebar = ({ setSidebarOpen }) => {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', path: '/admin', icon: Home },
    { name: 'User Management', path: '/admin/users', icon: Users },
    { name: 'Content Management', path: '/admin/content', icon: FileText },
    { name: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
    { name: 'System Settings', path: '/admin/settings', icon: Settings },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="flex flex-col h-full border-r w-72 bg-cyber-gray border-cyber-light">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-cyber-light">
        <div className="flex items-center">
          <div className="p-2 rounded-lg bg-cyber-gradient">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <span className="ml-3 text-xl text-white font-heading">Admin Panel</span>
        </div>
        <button 
          onClick={() => setSidebarOpen(false)} 
          className="p-1 transition-colors rounded-md lg:hidden text-cyber-purple-300 hover:text-white hover:bg-cyber-light"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation */}
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
        <div className="p-4 mb-4 rounded-lg bg-cyber-dark">
          <div className="flex items-center">
            <div className="w-3 h-3 mr-2 rounded-full bg-matrix-green animate-pulse"></div>
            <span className="text-sm text-cyber-purple-300">System Online</span>
          </div>
          <div className="mt-2 text-xs text-cyber-purple-400">
            Last updated: Just now
          </div>
        </div>
        
        <button className="flex items-center w-full px-4 py-3 text-sm font-medium transition-colors duration-200 rounded-lg text-cyber-purple-300 hover:text-error-red hover:bg-cyber-light">
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Menu, 
  Bell, 
  Search,
  User,
  ChevronDown,
  Server,
  Cpu
} from 'lucide-react';

const AdminNav = ({ onMenuClick }) => {
  const [notifications] = useState(5); // Example notification count

  return (
    <nav className="px-4 py-4 border-b bg-cyber-gray border-cyber-light lg:px-6">
      <div className="flex items-center justify-between">
        {/* Left side - Menu button and search */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="p-2 transition-colors duration-200 rounded-lg text-cyber-purple-300 hover:text-white hover:bg-cyber-light lg:hidden"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="relative hidden md:block">
            <Search className="absolute w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 text-cyber-purple-400" />
            <input
              type="text"
              placeholder="Search users, content..."
              className="w-64 py-2 pl-10 pr-4 text-white border rounded-lg bg-cyber-dark border-cyber-light placeholder-cyber-purple-400 focus:outline-none focus:ring-2 focus:ring-neon-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Right side - Admin info and notifications */}
        <div className="flex items-center space-x-4">
          {/* System status */}
          <div className="items-center hidden space-x-6 md:flex">
            <div className="flex items-center text-cyber-purple-300">
              <Server className="w-4 h-4 mr-1 text-matrix-green" />
              <span className="text-sm font-medium">99.9% Uptime</span>
            </div>
            
            <div className="flex items-center text-cyber-purple-300">
              <Cpu className="w-4 h-4 mr-1 text-neon-blue-300" />
              <span className="text-sm font-medium">42% CPU</span>
            </div>
          </div>

          {/* Notifications */}
          <button className="relative p-2 transition-colors duration-200 rounded-lg text-cyber-purple-300 hover:text-white hover:bg-cyber-light">
            <Bell className="w-5 h-5" />
            {notifications > 0 && (
              <span className="absolute flex items-center justify-center w-5 h-5 text-xs text-white rounded-full -top-1 -right-1 bg-error-red">
                {notifications}
              </span>
            )}
          </button>

          {/* Admin profile */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-cyber-gradient">
              <User className="w-5 h-5 text-white" />
            </div>
            
            <div className="hidden md:block">
              <div className="text-sm font-medium text-white">Admin User</div>
              <div className="text-xs text-cyber-purple-300">Super Administrator</div>
            </div>
            
            <button className="text-cyber-purple-300 hover:text-white">
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile search bar */}
      <div className="mt-4 md:hidden">
        <div className="relative">
          <Search className="absolute w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 text-cyber-purple-400" />
          <input
            type="text"
            placeholder="Search users, content..."
            className="w-full py-2 pl-10 pr-4 text-white border rounded-lg bg-cyber-dark border-cyber-light placeholder-cyber-purple-400 focus:outline-none focus:ring-2 focus:ring-neon-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </nav>
  );
};

export default AdminNav;
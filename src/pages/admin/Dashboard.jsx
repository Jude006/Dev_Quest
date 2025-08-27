import React from 'react';
import { 
  Users, 
  FileText, 
  BarChart3, 
  Server, 
  Cpu,
  Database,
  Clock,
  Settings,
  TrendingUp
} from 'lucide-react';

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Users',
      value: '2,458',
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'text-neon-blue-300'
    },
    {
      title: 'Total Content',
      value: '1,234',
      change: '+8%',
      trend: 'up',
      icon: FileText,
      color: 'text-matrix-green'
    },
    {
      title: 'Monthly Visits',
      value: '84,759',
      change: '+23%',
      trend: 'up',
      icon: BarChart3,
      color: 'text-cyber-yellow'
    },
    {
      title: 'Server Uptime',
      value: '99.9%',
      change: '0%',
      trend: 'neutral',
      icon: Server,
      color: 'text-cyber-purple-400'
    }
  ];

  const recentActivities = [
    { user: 'John Doe', action: 'created new task', time: '2 minutes ago' },
    { user: 'Sarah Chen', action: 'completed achievement', time: '5 minutes ago' },
    { user: 'Admin User', action: 'updated system settings', time: '10 minutes ago' },
    { user: 'Mike Johnson', action: 'joined the platform', time: '15 minutes ago' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white font-heading">Admin Dashboard</h1>
        <p className="mt-2 text-cyber-purple-300">Welcome back, Administrator. Here's what's happening with your platform.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="p-6 border bg-cyber-gray border-cyber-light rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-cyber-purple-300">{stat.title}</p>
                  <p className="mt-1 text-2xl font-bold text-white">{stat.value}</p>
                  <p className={`text-xs mt-1 ${
                    stat.trend === 'up' ? 'text-matrix-green' : 
                    stat.trend === 'down' ? 'text-error-red' : 'text-cyber-purple-300'
                  }`}>
                    {stat.change} from last week
                  </p>
                </div>
                <div className={`p-3 rounded-lg bg-cyber-dark ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* System Status */}
        <div className="p-6 border lg:col-span-2 bg-cyber-gray border-cyber-light rounded-xl">
          <h2 className="mb-4 text-xl font-semibold text-white font-heading">System Status</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="p-4 rounded-lg bg-cyber-dark">
              <div className="flex items-center justify-between mb-3">
                <span className="text-cyber-purple-300">CPU Usage</span>
                <Cpu className="w-4 h-4 text-neon-blue-300" />
              </div>
              <div className="w-full h-2 rounded-full bg-cyber-light">
                <div className="h-2 rounded-full bg-cyber-gradient" style={{ width: '42%' }}></div>
              </div>
              <span className="mt-2 text-sm text-cyber-purple-300">42%</span>
            </div>
            
            <div className="p-4 rounded-lg bg-cyber-dark">
              <div className="flex items-center justify-between mb-3">
                <span className="text-cyber-purple-300">Memory Usage</span>
                <Database className="w-4 h-4 text-matrix-green" />
              </div>
              <div className="w-full h-2 rounded-full bg-cyber-light">
                <div className="h-2 rounded-full bg-cyber-gradient" style={{ width: '68%' }}></div>
              </div>
              <span className="mt-2 text-sm text-cyber-purple-300">68%</span>
            </div>
            
            <div className="p-4 rounded-lg bg-cyber-dark">
              <div className="flex items-center justify-between mb-3">
                <span className="text-cyber-purple-300">Disk Space</span>
                <Server className="w-4 h-4 text-cyber-yellow" />
              </div>
              <div className="w-full h-2 rounded-full bg-cyber-light">
                <div className="h-2 rounded-full bg-cyber-gradient" style={{ width: '85%' }}></div>
              </div>
              <span className="mt-2 text-sm text-cyber-purple-300">85%</span>
            </div>
            
            <div className="p-4 rounded-lg bg-cyber-dark">
              <div className="flex items-center justify-between mb-3">
                <span className="text-cyber-purple-300">Network Traffic</span>
                <TrendingUp className="w-4 h-4 text-cyber-purple-400" />
              </div>
              <div className="w-full h-2 rounded-full bg-cyber-light">
                <div className="h-2 rounded-full bg-cyber-gradient" style={{ width: '23%' }}></div>
              </div>
              <span className="mt-2 text-sm text-cyber-purple-300">23%</span>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="p-6 border bg-cyber-gray border-cyber-light rounded-xl">
          <h2 className="mb-4 text-xl font-semibold text-white font-heading">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 mt-2 rounded-full bg-neon-blue-300"></div>
                <div className="flex-1">
                  <p className="text-sm text-white">
                    <span className="font-semibold">{activity.user}</span> {activity.action}
                  </p>
                  <p className="flex items-center text-xs text-cyber-purple-300">
                    <Clock className="w-3 h-3 mr-1" />
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-6 border bg-cyber-gray border-cyber-light rounded-xl">
        <h2 className="mb-4 text-xl font-semibold text-white font-heading">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <button className="p-4 text-center transition-colors duration-200 border rounded-lg bg-cyber-dark hover:bg-cyber-light border-cyber-light">
            <Users className="w-6 h-6 mx-auto mb-2 text-neon-blue-300" />
            <span className="text-sm text-white">Manage Users</span>
          </button>
          
          <button className="p-4 text-center transition-colors duration-200 border rounded-lg bg-cyber-dark hover:bg-cyber-light border-cyber-light">
            <FileText className="w-6 h-6 mx-auto mb-2 text-matrix-green" />
            <span className="text-sm text-white">View Content</span>
          </button>
          
          <button className="p-4 text-center transition-colors duration-200 border rounded-lg bg-cyber-dark hover:bg-cyber-light border-cyber-light">
            <BarChart3 className="w-6 h-6 mx-auto mb-2 text-cyber-yellow" />
            <span className="text-sm text-white">Analytics</span>
          </button>
          
          <button className="p-4 text-center transition-colors duration-200 border rounded-lg bg-cyber-dark hover:bg-cyber-light border-cyber-light">
            <Settings className="w-6 h-6 mx-auto mb-2 text-cyber-purple-400" />
            <span className="text-sm text-white">Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import AdminNav from './AdminNav';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <section className="flex h-screen overflow-hidden bg-cyber-dark">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-72 transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 transition-transform duration-300 lg:relative lg:z-0`}>
        <Sidebar setSidebarOpen={setSidebarOpen} />
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content area */}
      <main className="flex flex-col flex-1 min-w-0">
        <AdminNav onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        
        {/* Content area */}
        <div className="flex-1 overflow-auto">
          <div className="p-4 md:p-6 lg:p-8">
            <Outlet />
          </div>
        </div>
      </main>
    </section>
  );
};

export default DashboardLayout;
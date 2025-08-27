// pages/Unauthorized.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, ArrowLeft } from 'lucide-react';

const Unauthorized = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-cyber-dark">
      <div className="text-center">
        <Shield className="w-16 h-16 mx-auto mb-4 text-error-red" />
        <h1 className="mb-4 text-4xl font-bold text-white">Access Denied</h1>
        <p className="mb-8 text-cyber-purple-300">
          You don't have permission to access this page.
        </p>
        <Link
          to="/"
          className="inline-flex items-center text-neon-blue-300 hover:text-neon-blue-200"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
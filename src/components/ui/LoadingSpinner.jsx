import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-12 h-12 border-4 rounded-full border-neon-blue-500 border-t-transparent animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
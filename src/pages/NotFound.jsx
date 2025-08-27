import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bug, Home, Rocket, Search } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-cyber-black text-white flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* Animated floating elements */}
        <motion.div
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 opacity-20"
        >
          <Bug size={40} className="text-neon-pink" />
        </motion.div>
        
        <motion.div
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -8, 8, 0]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-1/3 right-1/4 opacity-20"
        >
          <Search size={36} className="text-matrix-green" />
        </motion.div>
        
        <motion.div
          animate={{ 
            y: [0, -25, 0],
          }}
          transition={{ 
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
          className="absolute top-1/3 right-1/3 opacity-20"
        >
          <Rocket size={44} className="text-cyber-yellow" />
        </motion.div>

        {/* Main content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="glassmorphism p-8 rounded-2xl border border-cyber-light shadow-xl"
        >
          {/* Error code with animation */}
          <motion.h1 
            className="font-heading text-9xl mb-4 bg-cyber-gradient bg-clip-text text-transparent"
            animate={{ 
              scale: [1, 1.05, 1],
              textShadow: [
                "0 0 10px rgba(26, 139, 255, 0.5)",
                "0 0 20px rgba(26, 139, 255, 0.8)",
                "0 0 10px rgba(26, 139, 255, 0.5)"
              ]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity 
            }}
          >
            404
          </motion.h1>
          
          <h2 className="font-heading text-3xl mb-2">Quest Not Found!</h2>
          
          <p className="font-body text-cyber-yellow mb-6 text-lg">
            The code page you're looking for has vanished into the digital void.
          </p>
          
          <div className="mb-8">
            <p className="font-body text-neon-blue-300 mb-4">
              Possible reasons why this quest failed:
            </p>
            <ul className="font-mono text-sm text-cyber-purple-300 space-y-2">
              <li>• The URL might be misspelled</li>
              <li>• The page has been moved or deleted</li>
              <li>• You've encountered a rare bug in the matrix</li>
            </ul>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-cyber-gradient text-white font-heading px-6 py-3 rounded-lg flex items-center justify-center gap-2"
            >
              <Home size={20} />
              <Link to="/dashboard">Return to Base</Link>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border border-neon-blue-500 text-neon-blue-300 font-heading px-6 py-3 rounded-lg hover:bg-cyber-purple-900 transition-colors"
              onClick={() => window.history.back()}
            >
              Go Back to Previous Quest
            </motion.button>
          </div>

          {/* Easter egg for developers */}
          <div className="mt-8 pt-4 border-t border-cyber-light">
            <p className="font-mono text-xs text-cyber-purple-400">
              {`// Pro tip: Check your console for hidden clues...`}
            </p>
          </div>
        </motion.div>

        {/* Background grid pattern */}
        <div className="fixed inset-0 -z-10 opacity-20"
          style={{
            backgroundImage: `linear-gradient(rgba(26, 139, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(26, 139, 255, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>
    </div>
  );
};

// Console easter egg
if (typeof console !== "undefined") {
  console.log(`%c
   _____  ______  _____    ___  ________   ________ 
  |\\\\   \\|\\\\   \\\\|\\\\   \\  /   /|\\\\   ___  \\|\\\\   ____\\\\
  \\\\ \\\\   \\\\\\\\   \\\\\\\\ \\\\  \\\\/   // \\\\  \\\\\\\\ \\\\  \\\\\\\\  \\\\\\\\ \\\\
   \\\\ \\\\   \\\\\\\\   \\\\\\\\ \\\\  \\__  //   \\\\  \\\\\\\\ \\\\  \\\\\\\\  \\\\\\\\ \\\\
    \\\\ \\\\   \\\\\\\\   \\\\\\\\ \\\\|__| //     \\\\  \\\\\\\\ \\\\  \\\\\\\\  \\\\\\\\ \\\\
     \\\\ \\\\   \\\\\\\\   \\\\\\\\    / /        \\\\  \\\\\\\\ \\\\  \\\\\\\\  \\\\\\\\ \\\\
      \\\\ \\\\   \\\\\\\\   \\\\\\\\  / /          \\\\  \\\\\\\\ \\\\  \\\\\\\\  \\\\\\\\ \\\\
       \\\\ \\\\   \\\\\\\\   \\\\\\\\/ /            \\\\  \\\\\\\\ \\\\  \\\\\\\\  \\\\\\\\ \\\\
        \\\\ \\\\   \\\\\\\\   \\\\  /              \\\\  \\\\\\\\ \\\\  \\\\\\\\  \\\\\\\\ \\\\
         \\\\ \\\\   \\\\\\\\   \\\\/                \\\\__\\\\ \\\\__\\\\  \\\\\\\\_\\\\
          \\\\ \\\\___\\\\ \\\\__\\                  |__| \\|__|  \\|__|
           \\\\|___| \\|__|                                       

%cHey developer! Looks like you found a 404 page. 
Want to contribute to Dev Quest? 
Check out our GitHub repository!`, 
  'color: #1A8BFF; font-size: 12px;', 
  'color: #8E2EFF; font-size: 14px;');
}

export default NotFound;
// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import Confetti from 'react-confetti';
// import API from '../../utils/api';
// import { toast } from 'react-hot-toast';
// import socket from '../../utils/socket';
// import { Code, CheckCircle, Star } from 'lucide-react';

// const Challenge = () => {
//   const [challenge, setChallenge] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showConfetti, setShowConfetti] = useState(false);

//   useEffect(() => {
//     const userId = localStorage.getItem('userId');
//     if (userId) {
//       console.log(`Joining Socket.io room for user ${userId}`);
//       socket.emit('join', { userId });
//     } else {
//       console.warn('No userId found in localStorage');
//     }

//     fetchDailyChallenge();

//     socket.on('challengeCompleted', ({ challenge, user }) => {
//       console.log('Received challengeCompleted event:', challenge);
//       setChallenge({ ...challenge, completed: true });
//       setShowConfetti(true);
//       toast.success(`Challenge completed! +${challenge.xpBonus} XP, +10 coins`);
//       setTimeout(() => setShowConfetti(false), 3000);
//     });

//     return () => socket.off('challengeCompleted');
//   }, []);

//   const fetchDailyChallenge = async () => {
//     try {
//       const res = await API.get('/challenges/daily');
//       console.log('Daily challenge fetched:', res.data.data);
//       setChallenge(res.data.data);
//     } catch (err) {
//       console.error('Error fetching daily challenge:', err.response?.data || err);
//       toast.error(err.response?.data?.error || 'Failed to load daily challenge');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCompleteChallenge = async () => {
//     try {
//       const res = await API.put(`/challenges/${challenge._id}/complete`);
//       console.log('Challenge completed:', res.data.data);
//     } catch (err) {
//       console.error('Error completing challenge:', err.response?.data || err);
//       toast.error(err.response?.data?.error || 'Failed to complete challenge');
//     }
//   };

//   if (loading) {
//     return <div className="p-6 text-center text-neon-blue">Loading daily challenge...</div>;
//   }

//   return (
//     <div className="min-h-screen p-6 bg-cyber-gray">
//       {showConfetti && <Confetti />}
//       <h2 className="mb-6 text-3xl font-bold text-white font-heading">Daily Challenge</h2>
//       {challenge ? (
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="p-6 border rounded-lg bg-cyber-light border-cyber-purple hover:shadow-lg hover:shadow-neon-blue/50"
//         >
//           <div className="flex items-center mb-4">
//             <Code className="w-6 h-6 mr-2 text-neon-blue" />
//             <h3 className="text-xl font-bold text-white">{challenge.title}</h3>
//           </div>
//           <p className="mb-4 text-sm text-cyber-purple">{challenge.description}</p>
//           <div className="flex items-center mb-4 text-sm text-neon-blue">
//             <Star className="w-5 h-5 mr-2" />
//             <span>Reward: {challenge.xpBonus} XP, 10 Coins</span>
//           </div>
//           {challenge.completed ? (
//             <div className="flex items-center text-sm text-neon-blue">
//               <CheckCircle className="w-5 h-5 mr-2" />
//               <span>Completed on {new Date(challenge.completedAt).toLocaleDateString()}</span>
//             </div>
//           ) : (
//             <button
//               onClick={handleCompleteChallenge}
//               className="w-full py-3 text-white transition-all rounded-lg bg-cyber-gradient hover:shadow-lg hover:shadow-neon-blue/50"
//             >
//               Complete Challenge
//             </button>
//           )}
//           <div className="mt-4 text-sm text-center text-neon-blue">
//             Tip: {getRandomTip()}
//           </div>
//         </motion.div>
//       ) : (
//         <p className="text-center text-cyber-purple">No challenge available today. Try again tomorrow!</p>
//       )}
//     </div>
//   );
// };

// const getRandomTip = () => {
//   const tips = [
//     'Use Pomodoro: 25 min focus + 5 min break boosts productivity by 25%!',
//     'Check MDN docs for JS help: mdn.io',
//     'Debug with console.log—simple but powerful!',
//     'Join a coding community to stay motivated!',
//     'Explore freeCodeCamp for interactive coding lessons!',
//   ];
//   return tips[Math.floor(Math.random() * tips.length)];
// };

// export default Challenge;

// File: frontend/src/pages/user/Challenge.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import API from '../../utils/api';
import { toast } from 'react-hot-toast';
import socket from '../../utils/socket';
import { Code, CheckCircle, Star } from 'lucide-react';

const Challenge = () => {
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      console.log(`Joining Socket.io room for user ${userId}`);
      socket.emit('join', { userId });
    } else {
      console.warn('No userId found in localStorage');
    }

    fetchDailyChallenge();

    socket.on('challengeCompleted', ({ challenge, user, milestoneMessage }) => {
      console.log('Received challengeCompleted event:', challenge);
      setChallenge({ ...challenge, completed: true });
      setShowConfetti(true);
      toast.success(milestoneMessage || `Challenge completed! +${challenge.xpBonus} XP, +10 coins`);
      setTimeout(() => setShowConfetti(false), 3000);
    });

    return () => socket.off('challengeCompleted');
  }, []);

  const fetchDailyChallenge = async () => {
    try {
      const res = await API.get('/challenges/daily');
      console.log('Daily challenge fetched:', res.data.data);
      setChallenge(res.data.data);
    } catch (err) {
      console.error('Error fetching daily challenge:', err.response?.data || err);
      toast.error(err.response?.data?.error || 'Failed to load daily challenge');
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteChallenge = async () => {
    try {
      const res = await API.put(`/challenges/${challenge._id}/complete`);
      console.log('Challenge completed:', res.data.data);
    } catch (err) {
      console.error('Error completing challenge:', err.response?.data || err);
      toast.error(err.response?.data?.error || 'Failed to complete challenge');
    }
  };

  if (loading) {
    return <div className="p-6 text-center text-neon-blue">Loading daily challenge...</div>;
  }

  return (
    <div className="min-h-screen p-6 bg-cyber-gray">
      {showConfetti && <Confetti />}
      <h2 className="mb-6 text-3xl font-bold text-white font-heading">Daily Challenge</h2>
      {challenge ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-6 border rounded-lg bg-cyber-light border-cyber-purple hover:shadow-lg hover:shadow-neon-blue/50"
        >
          <div className="flex items-center mb-4">
            <Code className="w-6 h-6 mr-2 text-neon-blue" />
            <h3 className="text-xl font-bold text-white">{challenge.title}</h3>
          </div>
          <p className="mb-4 text-sm text-cyber-purple">{challenge.description}</p>
          <div className="flex items-center mb-4 text-sm text-neon-blue">
            <Star className="w-5 h-5 mr-2" />
            <span>Reward: {challenge.xpBonus} XP, 10 Coins</span>
          </div>
          {challenge.completed ? (
            <div className="flex items-center text-sm text-neon-blue">
              <CheckCircle className="w-5 h-5 mr-2" />
              <span>Completed on {new Date(challenge.completedAt).toLocaleDateString()}</span>
            </div>
          ) : (
            <button
              onClick={handleCompleteChallenge}
              className="w-full py-3 text-white transition-all rounded-lg bg-cyber-gradient hover:shadow-lg hover:shadow-neon-blue/50"
            >
              Complete Challenge
            </button>
          )}
          <div className="mt-4 text-sm text-center text-neon-blue">
            Tip: {getRandomTip()}
          </div>
        </motion.div>
      ) : (
        <p className="text-center text-cyber-purple">No challenge available today. Try again tomorrow!</p>
      )}
    </div>
  );
};

const getRandomTip = () => {
  const tips = [
    'Use Pomodoro: 25 min focus + 5 min break boosts productivity by 25%!',
    'Check MDN docs for JS help: mdn.io',
    'Debug with console.log—simple but powerful!',
    'Join a coding community to stay motivated!',
    'Explore freeCodeCamp for interactive coding lessons!',
  ];
  return tips[Math.floor(Math.random() * tips.length)];
};

export default Challenge;
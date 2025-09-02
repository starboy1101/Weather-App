import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { preloadVideos } from '../utils/preloadVideos';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let completed = false;

    preloadVideos().then(() => {
      completed = true;
    });

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onLoadingComplete, 500);
          return 100;
        }
        return completed ? Math.min(prev + 5, 100) : prev + 2;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-white dark:bg-gray-900 flex items-center justify-center"
    >
      <div className="text-center">
        <motion.img
          src="/Weather-Icon/Cloud.svg" 
          alt="Loading"
          className="w-16 h-16 mx-auto mb-8"
          animate={{
            scale: [1, 1.2, 1],
            filter: ["drop-shadow(0 0 5px #3b82f6)", "drop-shadow(0 0 15px #3b82f6)", "drop-shadow(0 0 5px #3b82f6)"], // glowing effect
        }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-4"
        >
          {"Loading ...".split("").map((letter, index) => (
            <motion.span
              key={index}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              className="inline-block"
            >
              {letter}
            </motion.span>
          ))}
        </motion.h1>

        <div className="w-64 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        <p className="text-gray-600 dark:text-gray-400 mt-4">
          {progress}%
        </p>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;

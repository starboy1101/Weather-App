import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WeatherCondition } from '../types/weather';
import { getWeatherBackground } from '../utils/weatherBackgrounds';

interface BackgroundImageProps {
  condition: WeatherCondition;
}

export const BackgroundImage: React.FC<BackgroundImageProps> = ({ condition }) => {
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const hour = new Date().getHours();
    const isNight = hour >= 18 || hour < 6;

    setIsLoaded(false);
    const url = getWeatherBackground(condition, isNight);
    setVideoUrl(url);
  }, [condition]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <AnimatePresence mode="wait">
        {videoUrl && (
          <motion.div
            key={videoUrl}
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <video
              src={videoUrl}
              autoPlay
              loop
              muted
              onLoadedData={() => setIsLoaded(true)}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

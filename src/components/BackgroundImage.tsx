import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WeatherCondition } from '../types/weather';
import { getWeatherBackground } from '../utils/weatherBackgrounds';

interface BackgroundImageProps {
  condition: WeatherCondition;
}

export const BackgroundImage: React.FC<BackgroundImageProps> = ({ condition }) => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const newImageUrl = getWeatherBackground(condition);
    if (newImageUrl !== imageUrl) {
      setIsLoaded(false);
      setImageUrl(newImageUrl);
    }
  }, [condition, imageUrl]);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div className="fixed inset-0 z-0">
      <AnimatePresence mode="wait">
        {imageUrl && (
          <motion.div
            key={imageUrl}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: isLoaded ? 1 : 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img
              src={imageUrl}
              alt="Weather background"
              onLoad={handleImageLoad}
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
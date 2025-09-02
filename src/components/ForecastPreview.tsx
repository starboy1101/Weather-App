import React from 'react';
import { motion } from 'framer-motion';
import { ForecastDay } from '../types/weather';
import { getWeatherIcon } from '../utils/weatherIcons';

interface ForecastPreviewProps {
  forecast: ForecastDay[];
}

export const ForecastPreview: React.FC<ForecastPreviewProps> = ({ forecast }) => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    }
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="mt-8"
    >
      <h3 className="text-white/90 text-base font-semibold mb-3">3-Day Forecast</h3>
      <div className="grid grid-cols-3 gap-3">
        {forecast.map((day, index) => (
          <motion.div
            key={day.date}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
            whileHover={{ scale: 1.05, y: -4 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20 text-center"
          >
            <p className="text-white/80 text-xs font-medium mb-2">
              {formatDate(day.date)}
            </p>
            <div className="flex justify-center mb-2">
              {getWeatherIcon(day.condition as any, 24)}
            </div>
            <div className="space-y-1">
              <p className="text-white text-sm font-bold">
                {Math.round(day.maxTemp)}°
              </p>
              <p className="text-white/70 text-xs">
                {Math.round(day.minTemp)}°
              </p>
            </div>
            <p className="text-white/60 text-xs mt-1 capitalize">
              {day.description}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
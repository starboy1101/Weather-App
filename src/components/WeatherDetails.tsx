import React from 'react';
import { motion } from 'framer-motion';
import { 
  Droplets, 
  Wind, 
  Thermometer, 
  Eye, 
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { WeatherData } from '../types/weather';

interface WeatherDetailsProps {
  weather: WeatherData;
}

export const WeatherDetails: React.FC<WeatherDetailsProps> = ({ weather }) => {
  const details = [
    {
      label: 'Feels like',
      value: `${Math.round(weather.feelsLike)}°C`,
      icon: <Thermometer size={20} />,
    },
    {
      label: 'Humidity',
      value: `${weather.humidity}%`,
      icon: <Droplets size={20} />,
    },
    {
      label: 'Wind Speed',
      value: `${weather.windSpeed} km/h`,
      icon: <Wind size={20} />,
    },
    {
      label: 'Visibility',
      value: `${weather.visibility} km`,
      icon: <Eye size={20} />,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="grid grid-cols-2 gap-3 mt-6"
    >
      {details.map((detail, index) => (
        <motion.div
          key={detail.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
          whileHover={{ scale: 1.05, y: -2 }}
          className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20"
        >
          <div className="flex items-center space-x-2">
            <div className="text-white/80">
              {React.cloneElement(detail.icon, { size: 16 })}
            </div>
            <div>
              <p className="text-white/70 text-xs">{detail.label}</p>
              <p className="text-white font-semibold text-sm">{detail.value}</p>
            </div>
          </div>
        </motion.div>
      ))}
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.9 }}
        whileHover={{ scale: 1.05, y: -2 }}
        className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20 col-span-2"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ArrowUp size={16} className="text-red-400" />
            <div>
              <p className="text-white/70 text-xs">High</p>
              <p className="text-white font-semibold text-sm">{Math.round(weather.maxTemp)}°</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <ArrowDown size={16} className="text-blue-400" />
            <div>
              <p className="text-white/70 text-xs">Low</p>
              <p className="text-white font-semibold text-sm">{Math.round(weather.minTemp)}°</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
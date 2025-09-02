import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { WeatherData, ForecastDay } from '../types/weather';
import { SearchBar } from './SearchBar';
import { WeatherDetails } from './WeatherDetails';
import { ForecastPreview } from './ForecastPreview';
import { getWeatherIcon } from '../utils/weatherIcons';

interface WeatherCardProps {
  weather: WeatherData | null;
  forecast: ForecastDay[];
  loading: boolean;
  error: string | null;
  onSearch: (city: string) => void;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({
  weather,
  forecast,
  loading,
  error,
  onSearch,
}) => {

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="w-full max-w-md mx-auto bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl p-6 md:p-8"
    >
      <div className="space-y-6">
        <SearchBar onSearch={onSearch} loading={loading} />

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="bg-red-500/20 backdrop-blur-sm border border-red-400/30 rounded-xl p-4"
            >
              <p className="text-red-200 text-center">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Weather Info */}
        <AnimatePresence mode="wait">
          {weather && !error && (
            <motion.div
              key={weather.location}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.5 }}
              className="text-center space-y-6"
            >
              {/* Temperature & Icon */}
              <motion.div
                layout
                className="flex flex-col items-center space-y-3"
              >
                <motion.div
                  layout
                  className="flex items-center justify-center space-x-4"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 120, damping: 14 }}
                >
                  <div className="relative flex items-center justify-center">
                    {getWeatherIcon(weather.condition as any, 96)}
                  </div>

                  <div className="text-left">
                    <motion.div
                      key={weather.temperature}
                      layout
                      className="text-4xl md:text-5xl font-thin text-white"
                      style={{
                        textShadow: '0 4px 10px rgba(0,0,0,0.6)',
                      }}
                      transition={{ type: 'spring', stiffness: 120, damping: 14 }}
                    >
                      {Math.round(weather.temperature)}°
                    </motion.div>

                    <motion.p
                      key={weather.description}
                      layout
                      className="text-white/80 text-lg capitalize"
                      style={{
                        textShadow: '0 2px 6px rgba(0,0,0,0.5)',
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      {weather.description}
                    </motion.p>
                  </div>
                </motion.div>

                {/* Location moved below temperature & icon */}
                <motion.div
                  className="flex items-center justify-center space-x-2 text-white/80"
                  style={{ textShadow: '0 2px 6px rgba(0,0,0,0.5)' }}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <MapPin className="w-6 h-6 text-yellow-300 drop-shadow-md" />
                  <span className="text-base font-semibold">
                    {weather.location}, {weather.country}
                  </span>
                </motion.div>
              </motion.div>

              {/* Weather Details */}
              <WeatherDetails weather={weather} />

              {/* Forecast Preview */}
              {forecast.length > 0 && (
                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                >
                  <ForecastPreview forecast={forecast} />
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

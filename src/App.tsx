import React from 'react';
import { motion } from 'framer-motion';
import { WeatherCard } from './components/WeatherCard';
import { BackgroundImage } from './components/BackgroundImage';
import { useWeather } from './hooks/useWeather';
import { WeatherCondition } from './types/weather';

function App() {
  const { weather, forecast, loading, error, getWeather } = useWeather();

  return (
    <div className="min-h-screen relative overflow-hidden">
      <BackgroundImage 
        condition={(weather?.condition as WeatherCondition) || 'clear'} 
      />
      
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="w-full"
        >
          <WeatherCard
            weather={weather}
            forecast={forecast}
            loading={loading}
            error={error}
            onSearch={getWeather}
          />
        </motion.div>
      </div>

      {/* Animated particles effect */}
      <div className="fixed inset-0 z-5 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              opacity: 0.1,
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
            }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            className="absolute w-1 h-1 bg-white rounded-full"
          />
        ))}
      </div>
    </div>
  );
}

export default App;
import { WeatherCondition } from '../types/weather';

export const getWeatherBackground = (condition: WeatherCondition): string => {
  const backgrounds: Record<WeatherCondition, string> = {
    clear: 'https://images.pexels.com/photos/96622/pexels-photo-96622.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&fit=crop',
    clouds: 'https://images.pexels.com/photos/531756/pexels-photo-531756.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&fit=crop',
    rain: 'https://images.pexels.com/photos/1529360/pexels-photo-1529360.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&fit=crop',
    snow: 'https://images.pexels.com/photos/235621/pexels-photo-235621.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&fit=crop',
    thunderstorm: 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&fit=crop',
    drizzle: 'https://images.pexels.com/photos/1529360/pexels-photo-1529360.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&fit=crop',
    mist: 'https://images.pexels.com/photos/1367192/pexels-photo-1367192.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&fit=crop',
    fog: 'https://images.pexels.com/photos/1367192/pexels-photo-1367192.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&fit=crop',
    haze: 'https://images.pexels.com/photos/1367192/pexels-photo-1367192.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&fit=crop',
  };

  return backgrounds[condition] || backgrounds.clear;
};
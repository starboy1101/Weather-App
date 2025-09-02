import { WeatherCondition } from '../types/weather';

export const getWeatherBackground = (
  condition: WeatherCondition,
  isNight: boolean 
): string => {
  if (isNight) {
    return '/Weather-background/Night.mp4';
  }
  
  const backgrounds: Record<WeatherCondition, string> = {
    clear: '/Weather-background/Cloud.mp4',
    clouds: '/Weather-background/Cloud.mp4',
    rain: '/Weather-background/Rain.mp4',
    snow: 'https://images.pexels.com/photos/235621/pexels-photo-235621.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&fit=crop',
    thunderstorm: 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&fit=crop',
    drizzle: 'https://images.pexels.com/photos/1529360/pexels-photo-1529360.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&fit=crop',
    mist: 'https://images.pexels.com/photos/1367192/pexels-photo-1367192.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&fit=crop',
    fog: 'https://images.pexels.com/photos/1367192/pexels-photo-1367192.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&fit=crop',
    haze: 'https://images.pexels.com/photos/1367192/pexels-photo-1367192.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&fit=crop',
  };

  return backgrounds[condition] || backgrounds.clear;
};
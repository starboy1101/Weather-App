import { useState, useEffect } from 'react';
import { WeatherData, ForecastDay } from '../types/weather';
import { fetchWeatherData, fetchWeatherByCoords, fetchForecastData } from '../utils/weatherApi';

export const useWeather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadWeather = async (city: string) => {
    if (!city.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const [weatherData, forecastData] = await Promise.all([
        fetchWeatherData(city),
        fetchForecastData(city),
      ]);

      setWeather(weatherData);
      setForecast(forecastData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const loadWeatherByCoords = async (lat: number, lon: number) => {
    setLoading(true);
    setError(null);

    try {
      const weatherData = await fetchWeatherByCoords(lat, lon);
      const forecastData = await fetchForecastData(weatherData.location);

      setWeather(weatherData);
      setForecast(forecastData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  // Load current location on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          loadWeatherByCoords(latitude, longitude);
        },
        (error) => {
          console.warn('Geolocation denied, loading default city:', error.message);
          loadWeather('Pune'); // fallback
        }
      );
    } else {
      loadWeather('Pune'); // fallback for unsupported browsers
    }
  }, []);

  return {
    weather,
    forecast,
    loading,
    error,
    getWeather: loadWeather,
    getWeatherByCoords: loadWeatherByCoords,
  };
};

import { WeatherData, ForecastDay, CityOption } from '../types/weather';

const API_KEY = 'b8c5d061e781d3124f13fbbdaa039fda';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0';

const mapWeatherCondition = (main: string, description: string): string => {
  const mainCondition = main.toLowerCase();
  switch (mainCondition) {
    case 'clear':
      return 'clear';
    case 'clouds':
      return 'clouds';
    case 'rain':
      return 'rain';
    case 'snow':
      return 'snow';
    case 'thunderstorm':
      return 'thunderstorm';
    case 'drizzle':
      return 'drizzle';
    case 'mist':
    case 'fog':
    case 'haze':
      return 'mist';
    default:
      return 'clear';
  }
};

// --- Fetch weather by city ---
export const fetchWeatherData = async (city: string): Promise<WeatherData> => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) throw new Error('City not found');

    const data = await response.json();

    return {
      location: data.name,
      country: data.sys.country,
      temperature: Math.round(data.main.temp),
      condition: mapWeatherCondition(data.weather[0].main, data.weather[0].description),
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed * 3.6),
      feelsLike: Math.round(data.main.feels_like),
      minTemp: Math.round(data.main.temp_min),
      maxTemp: Math.round(data.main.temp_max),
      pressure: data.main.pressure,
      visibility: Math.round((data.visibility || 10000) / 1000),
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw new Error('Failed to fetch weather data. Please check the city name.');
  }
};

// --- Fetch weather by coordinates (current location) ---
export const fetchWeatherByCoords = async (lat: number, lon: number): Promise<WeatherData> => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) throw new Error('Weather data not available');

    const data = await response.json();

    return {
      location: data.name,
      country: data.sys.country,
      temperature: Math.round(data.main.temp),
      condition: mapWeatherCondition(data.weather[0].main, data.weather[0].description),
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed * 3.6),
      feelsLike: Math.round(data.main.feels_like),
      minTemp: Math.round(data.main.temp_min),
      maxTemp: Math.round(data.main.temp_max),
      pressure: data.main.pressure,
      visibility: Math.round((data.visibility || 10000) / 1000),
    };
  } catch (error) {
    console.error('Error fetching weather data by coordinates:', error);
    throw new Error('Failed to fetch weather data by coordinates.');
  }
};

// --- Forecast by city ---
export const fetchForecastData = async (city: string): Promise<ForecastDay[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) throw new Error('Forecast data not available');

    const data = await response.json();
    const dailyForecasts: ForecastDay[] = [];
    const processedDates = new Set<string>();

    for (const item of data.list) {
      const date = new Date(item.dt * 1000).toISOString().split('T')[0];
      const today = new Date().toISOString().split('T')[0];
      if (date === today || processedDates.has(date) || dailyForecasts.length >= 3) continue;

      processedDates.add(date);
      dailyForecasts.push({
        date,
        minTemp: Math.round(item.main.temp_min),
        maxTemp: Math.round(item.main.temp_max),
        condition: mapWeatherCondition(item.weather[0].main, item.weather[0].description),
        icon: item.weather[0].icon,
        description: item.weather[0].description,
      });
    }

    return dailyForecasts;
  } catch (error) {
    console.error('Error fetching forecast data:', error);
    throw new Error('Failed to fetch forecast data');
  }
};

// --- Search cities ---
export const searchCities = async (query: string): Promise<CityOption[]> => {
  if (query.length < 2) return [];

  try {
    const response = await fetch(
      `${GEO_URL}/direct?q=${encodeURIComponent(query)}&limit=10&appid=${API_KEY}`
    );
    if (!response.ok) throw new Error('Failed to search cities');

    const data = await response.json();
    const lowerQuery = query.toLowerCase();

    const filtered: CityOption[] = data
      .filter(
        (city: any) =>
          city.name &&
          city.name.length > 2 &&
          city.name.toLowerCase().startsWith(lowerQuery)
      )
      .map((city: any) => ({
        name: city.name,
        country: city.country,
      }));

    const unique = Array.from(
      new Map(filtered.map(item => [`${item.name}-${item.country}`, item])).values()
    );

    return unique.slice(0, 5); 
  } catch (error) {
    console.error('Error searching cities:', error);
    return [];
  }
};
export interface WeatherData {
  location: string;
  country: string;
  temperature: number;
  condition: string;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  feelsLike: number;
  minTemp: number;
  maxTemp: number;
  pressure: number;
  visibility: number;
}

export interface ForecastDay {
  date: string;
  minTemp: number;
  maxTemp: number;
  condition: string;
  icon: string;
  description: string;
}

export interface CityOption {
  name: string;
  country: string;
  lat: number;
  lon: number;
}

export type WeatherCondition = 
  | 'clear'
  | 'clouds'
  | 'rain'
  | 'snow'
  | 'thunderstorm'
  | 'drizzle'
  | 'mist'
  | 'fog'
  | 'haze';
import { WeatherCondition } from '../types/weather';

// Helper function to get the right icon from /public/Weather-Icon
export const getWeatherIcon = (condition: WeatherCondition, size: number = 64) => {
  const baseClass =
    "drop-shadow-xl transform transition-transform duration-300 hover:scale-105"; // floating & premium feel

  let iconPath = "/Weather-Icon/sun.svg";
  let finalSize = size; // default fallback

  switch (condition) {
    case "clear":
      iconPath = "/Weather-Icon/Sun.svg";
      break;
    case "clouds":
      iconPath = "/Weather-Icon/Cloud.svg";
      break;
    case "rain":
      iconPath = "/Weather-Icon/Rain.svg";
      finalSize = size * 1.6; 
      break;
    case "snow":
      iconPath = "/Weather-Icon/Snow.svg";
      break;
    case "thunderstorm":
      iconPath = "/Weather-Icon/Thunderstorm.svg";
      break;
    case "drizzle":
      iconPath = "/Weather-Icon/drizzle.svg";
      break;
    case "mist":
    case "fog":
    case "haze":
      iconPath = "/Weather-Icon/Mist.svg";
      break;
    default:
      iconPath = "/Weather-Icon/sun.svg";
  }

  return (
    <img
      src={iconPath}
      alt={condition}
      width={size}
      height={size}
      className={`${baseClass}`}
      draggable={false}
    />
  );
};

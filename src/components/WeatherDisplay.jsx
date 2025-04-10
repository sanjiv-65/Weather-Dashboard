import { useContext } from 'react';
import { ThemeContext } from './App';

function WeatherDisplay({ weatherData, onRefresh }) {
  const { darkMode } = useContext(ThemeContext);
  
  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className={`weather-card p-6 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} transition-all`}>
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold mb-1">
            {weatherData.name}, {weatherData.sys.country}
          </h2>
          <p className="text-sm text-gray-550 dark:text-gray-350">
            Last updated: {new Date().toLocaleString()}
          </p>
        </div>
        <button 
          onClick={onRefresh}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Refresh weather data"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="weather-main flex items-center">
          <img 
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} 
            alt={weatherData.weather[0].description}
            className="w-24 h-24"
          />
          <div>
            <h3 className="text-4xl font-bold">{Math.round(weatherData.main.temp)}°C</h3>
            <p className="text-xl capitalize">{weatherData.weather[0].description}</p>
          </div>
        </div>
        
        <div className="weather-details grid grid-cols-2 gap-4">
          <div className="detail-item">
            <p className="text-sm text-gray-500 dark:text-gray-400">Feels Like</p>
            <p className="text-lg font-semibold">{Math.round(weatherData.main.feels_like)}°C</p>
          </div>
          <div className="detail-item">
            <p className="text-sm text-gray-500 dark:text-gray-400">Humidity</p>
            <p className="text-lg font-semibold">{weatherData.main.humidity}%</p>
          </div>
          <div className="detail-item">
            <p className="text-sm text-gray-500 dark:text-gray-400">Wind Speed</p>
            <p className="text-lg font-semibold">{(weatherData.wind.speed * 3.6).toFixed(1)} km/h</p>
          </div>
          <div className="detail-item">
            <p className="text-sm text-gray-500 dark:text-gray-400">Pressure</p>
            <p className="text-lg font-semibold">{weatherData.main.pressure} hPa</p>
          </div>
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="sun-info text-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">Sunrise</p>
          <p className="font-semibold">{formatTime(weatherData.sys.sunrise)}</p>
        </div>
        <div className="sun-info text-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">Sunset</p>
          <p className="font-semibold">{formatTime(weatherData.sys.sunset)}</p>
        </div>
        <div className="sun-info text-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">Min Temp</p>
          <p className="font-semibold">{Math.round(weatherData.main.temp_min)}°C</p>
        </div>
        <div className="sun-info text-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">Max Temp</p>
          <p className="font-semibold">{Math.round(weatherData.main.temp_max)}°C</p>
        </div>
      </div>
    </div>
  );
}

export default WeatherDisplay;

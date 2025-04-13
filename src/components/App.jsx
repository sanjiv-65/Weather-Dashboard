import { useState, useEffect, createContext } from 'react';
import SearchBar from './SearchBar';
import WeatherDisplay from './WeatherDisplay';
import ErrorMessage from './ErrorMessage';
import Loader from './Loader';
import RecentSearches from './RecentSearches';
import ThemeToggle from './ThemeToggle';
//import './app.css';

export const ThemeContext = createContext();

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const API_KEY = "4c3563fe325286048c3943947d85747e";
  
  const fetchWeatherData = async (cityName) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      
      if (!response.ok) {
        throw new Error(response.status === 404 
          ? 'City not found. Please check the spelling and try again.' 
          : 'Failed to fetch weather data. Please try again later.');
      }
      
      const data = await response.json();
      setWeatherData(data);
      
      // Update recent searches
      if (!recentSearches.includes(cityName)) {
        const updatedSearches = [cityName, ...recentSearches.slice(0, 4)];
        setRecentSearches(updatedSearches);
        // Save to local storage
        localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
      }
      
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  // Load recent searches from localStorage on component mount
  useEffect(() => {
    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
    
    // Get user's preferred theme
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme) {
      setDarkMode(JSON.parse(savedTheme));
    }
  }, []);

  // Update body class when theme changes
  useEffect(() => {
    document.body.className = darkMode ? 'dark' : 'light';
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const handleSearch = (searchCity) => {
    setCity(searchCity);
    fetchWeatherData(searchCity);
  };

  const handleRecentSearch = (searchCity) => {
    setCity(searchCity);
    fetchWeatherData(searchCity);
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      <div className={`app ${darkMode ? 'dark' : 'light'}`}>
        <div className="container mx-auto px-4 py-8 max-w-3xl flex items-center justify-center min-h-screen">
          {/* Added border and box shadow to the dashboard container */}
          <div className={`w-full rounded-xl ${darkMode ? 'bg-gray-700 border-gray-700' : 'bg-white border-gray-200'} border-2 shadow-2xl overflow-hidden`}>
            <div className="p-6">
              <header className="text-center mb-8 relative">
                <div className="flex justify-center items-center">
                  {/* Added weather icon to header */}
                
                  <h1 className="text-3xl font-bold">Weather Dashboard</h1>
                </div>
                <p className="text-sm text-gray-400 dark:text-gray-400 mt-2">Check weather conditions around the world</p>
                
                <ThemeToggle />
              </header>
              
              <SearchBar onSearch={handleSearch} />
              
              {recentSearches.length > 0 && (
                <RecentSearches searches={recentSearches} onSelect={handleRecentSearch} />
              )}
              
              {loading && <Loader />}
              
              {error && <ErrorMessage message={error} />}
              
              {weatherData && !loading && !error && (
                <WeatherDisplay weatherData={weatherData} onRefresh={() => fetchWeatherData(city)} />
              )}
            </div>
          </div>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;








import { useState, useEffect, createContext } from 'react';
import WeatherDisplay from './WeatherDisplay';
import ErrorMessage from './ErrorMessage';
import Loader from './Loader';
import RecentSearches from './RecentSearches';
import ThemeToggle from './ThemeToggle';
import SearchBar from './SearchBar';

export const ThemeContext = createContext();

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
<SearchBar/>

  // API Key
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

      if (!recentSearches.includes(cityName)) {
        const updatedSearches = [cityName, ...recentSearches.slice(0, 4)];
        setRecentSearches(updatedSearches);
 
        localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
      }
      
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }

    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme) {
      setDarkMode(JSON.parse(savedTheme));
    }
  }, []);
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
        <div className="container mx-auto px-4 py-8 max-w-3xl">
          <header className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Weather Dashboard</h1>
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
    </ThemeContext.Provider>
  );
}

export default App;
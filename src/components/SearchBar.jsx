import { useState } from 'react';

function SearchBar({ onSearch }) {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex">
        <input
          type="text"
          className="flex-grow px-4 py-2 rounded-l-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-r-lg transition-colors"
        >
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
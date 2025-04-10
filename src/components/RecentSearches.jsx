import { useContext } from 'react';
import { ThemeContext } from './App';

function RecentSearches({ searches, onSelect }) {
  const { darkMode } = useContext(ThemeContext);
  
  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">Recent Searches:</h3>
      <div className="flex flex-wrap gap-2">
        {searches.map((search, index) => (
          <button
            key={index}
            onClick={() => onSelect(search)}
            className={`px-3 py-1 text-sm rounded-full ${
              darkMode 
                ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
            } transition-colors`}
          >
            {search}
          </button>
        ))}
      </div>
    </div>
  );
}

export default RecentSearches;
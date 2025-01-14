import React from 'react';
import { useDarkMode } from '../context/DarkModeContext';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  const { darkMode } = useDarkMode();

  return (
    <div className="mb-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search movies..."
        className={`w-full p-2 rounded-md border ${
          darkMode
            ? 'bg-gray-800 text-white border-gray-700'
            : 'bg-white text-gray-800 border-gray-300'
        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
      />
    </div>
  );
};

export default SearchBar;

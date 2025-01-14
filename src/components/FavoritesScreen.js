import { useFavorites } from '../context/FavoritesContext';
import { useDarkMode } from '../context/DarkModeContext';
import { useState } from 'react';

const FavoritesScreen = () => {
  const { favorites, removeFavorite } = useFavorites();
  const { darkMode } = useDarkMode();
  const [viewMode, setViewMode] = useState('grid'); // 'grid' is the default view

  // Toggle view mode (grid or list)
  const toggleViewMode = () => {
    setViewMode((prevMode) => (prevMode === 'grid' ? 'list' : 'grid'));
  };

  if (favorites.length === 0) {
    return (
      <div
        className={`container mx-auto text-center py-20 ${
          darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
        }`}
      >
        <h2 className="text-2xl font-bold">No Favorites Added</h2>
        <p>Go to the home page and add some movies to your favorites!</p>
      </div>
    );
  }

  return (
    <div
      className={`container mx-auto py-10 px-4 ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      }`}
    >
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">My Favorite Movies</h2>
        {/* Toggle Button for View Mode */}
        <button
          onClick={toggleViewMode}
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {viewMode === 'grid' ? 'Switch to List' : 'Switch to Grid'}
        </button>
      </div>

      {/* Movie Cards - Grid or List depending on viewMode */}
      <div
        className={`${
          viewMode === 'grid'
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'
            : 'space-y-4'  // For list view
        }`}
      >
        {favorites.map((movie) => (
          <div
            key={movie.trackId}
            className={`p-4 rounded shadow ${
              darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
            }`}
          >
            <img
              src={movie.artworkUrl100}
              alt={movie.trackName}
              className="w-full h-40 object-cover rounded"
            />
            <h2 className="text-lg font-bold mt-2">{movie.trackName}</h2>
            <p className="text-gray-600 dark:text-gray-300">
              {movie.primaryGenreName}
            </p>
            <p className="text-gray-800 dark:text-gray-200 font-bold">
              ${movie.trackPrice || 'Free'}
            </p>
            <button
              onClick={() => removeFavorite(movie)}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500 mt-2"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesScreen;

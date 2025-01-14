import React from 'react';
import { Link } from 'react-router-dom';
import { useDarkMode } from '../context/DarkModeContext';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';

const Navbar = ({ toggleViewMode }) => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const { cart } = useCart();
  const { favorites } = useFavorites();

  return (
    <nav
      className={`p-4 shadow-md ${darkMode ? 'bg-gray-800 text-white' : 'bg-sky-400 text-gray-800'}`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-lg font-bold">
            Movies App
          </Link>

          {/* Favorites Link with item count */}
          <Link to="/favorites" className="flex items-center space-x-2 hover:underline">
            <span>Favorites</span>
            <span className="bg-red-500 text-white rounded-full px-2 py-1 text-xs">
              {favorites.length}
            </span>
          </Link>

          {/* Cart Link with item count */}
          <Link to="/cart" className="flex items-center space-x-2 hover:underline">
            <span>Cart</span>
            <span className="bg-red-500 text-white rounded-full px-2 py-1 text-xs">
              {cart.length}
            </span>
          </Link>
        </div>

        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-md border focus:outline-none hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

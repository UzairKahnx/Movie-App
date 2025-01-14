import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useDarkMode } from '../context/DarkModeContext'; // Importing DarkModeContext
import MovieCard from './MovieCard';

const Cart = () => {
  const { cart, removeFromCart } = useCart();
  const { darkMode } = useDarkMode(); // Access darkMode state from context
  const [isGridView, setIsGridView] = useState(true); // State to toggle between grid and list view

  const toggleView = () => {
    setIsGridView(!isGridView);
  };

  return (
    <div
      className={`container mx-auto p-4 ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl">Your Cart</h2>
      </div>

      {/* View Mode Toggle */}
      <div className="flex justify-end mb-4">
        <button
          onClick={toggleView}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
        >
          {isGridView ? 'Switch to List View' : 'Switch to Grid View'}
        </button>
      </div>

      {/* Cart Content */}
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div
          className={`${
            isGridView
              ? 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'
              : 'grid-cols-1'
          } gap-4`}
        >
          {cart.map((movie) => (
            <div key={movie.trackId} className="relative">
              <MovieCard movie={movie} />
              <button
                onClick={() => removeFromCart(movie.trackId)}
                className="absolute top-0 right-0 px-2 py-1 bg-red-500 text-white rounded text-sm sm:text-base hover:bg-red-600 transition"
                >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;

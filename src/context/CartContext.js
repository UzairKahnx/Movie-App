import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Add movie to cart
  const addToCart = (movie) => {
    setCart((prevCart) => [...prevCart, movie]);
  };

  // Remove movie from cart
  const removeFromCart = (trackId) => {
    setCart((prevCart) => prevCart.filter((movie) => movie.trackId !== trackId));
  };

  // Check if movie is in cart
  const isInCart = (trackId) => {
    return cart.some((movie) => movie.trackId === trackId);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, isInCart }}>
      {children}
    </CartContext.Provider>
  );
};

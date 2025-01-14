import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDarkMode } from '../context/DarkModeContext';
import MovieCard from './MovieCard';
import SearchBar from './SearchBar';

const HomeScreen = () => {
  const [movies, setMovies] = useState([]); // List of movies
  const [searchTerm, setSearchTerm] = useState(''); // Current search term
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const [loading, setLoading] = useState(false); // Loading state for API calls
  const moviesPerPage = 12; // Number of movies to show per page
  const { darkMode } = useDarkMode();

  // Function to fetch movies based on search term and page
  const fetchMovies = async (term = 'star', page = 1) => {
    setLoading(true); // Set loading state to true when API is called
    try {
      const response = await axios.get(
        `https://itunes.apple.com/search?term=${term}&country=au&media=movie&limit=${moviesPerPage}&offset=${(page - 1) * moviesPerPage}`
      );

      if (response.data.results) {
        // If it's the first page, reset the movies, else append new results
        if (page === 1) {
          setMovies(response.data.results);
        } else {
          setMovies((prevMovies) => [...prevMovies, ...response.data.results]);
        }
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false); // Set loading state to false after the API call
    }
  };

  // Fetch movies on initial render or when search term/page changes
  useEffect(() => {
    fetchMovies(searchTerm || 'star', currentPage); // Default search term is 'star'
  }, [currentPage, searchTerm]); // Added searchTerm to trigger fetch on term change

  // Fetch movies when search term changes
  useEffect(() => {
    setCurrentPage(1); // Reset to page 1 when search term changes
    setMovies([]); // Reset movies list when search term changes
    fetchMovies(searchTerm || 'star', 1); // Fetch the first page of movies
  }, [searchTerm]);

  // Next page button handler
  const nextPage = () => {
    setCurrentPage(currentPage + 1); // Move to the next page
  };

  // Previous page button handler
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1); // Move to the previous page
    }
  };

  return (
    <div
      className={`container max-w-full p-4 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}
    >
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Movie Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {movies.length === 0 ? (
          <p>No movies found. Please try again.</p>
        ) : (
          movies.map((movie) => (
            <MovieCard key={movie.trackId} movie={movie} />
          ))
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between mt-4">
        <button
          onClick={prevPage}
          disabled={loading || currentPage === 1}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={nextPage}
          disabled={loading}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 disabled:opacity-50"
        >
          {loading ? 'Loading...' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default HomeScreen;

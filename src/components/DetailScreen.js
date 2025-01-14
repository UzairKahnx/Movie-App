import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { useDarkMode } from '../context/DarkModeContext';
import axios from 'axios';
import MovieCard from './MovieCard'; // Import the MovieCard component

const DetailScreen = () => {
  const { movieId } = useParams(); // movieId is used here, ensure you match with your route
  const { darkMode } = useDarkMode();
  const [movie, setMovie] = useState(null);
  const [moreMovies, setMoreMovies] = useState([]); // State to store more movies
  const [visibleMovies, setVisibleMovies] = useState(4); // Initial number of visible movies

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://itunes.apple.com/lookup?id=${movieId}&country=au&media=movie`
        );
        setMovie(response.data.results[0]); // Assuming the API returns an array of results
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    const fetchMoreMovies = async () => {
      try {
        const response = await axios.get(
          `https://itunes.apple.com/search?term=star&country=au&media=movie`
        );
        setMoreMovies(response.data.results); // Fetching all possible more movies
      } catch (error) {
        console.error('Error fetching more movies:', error);
      }
    };

    fetchMovieDetails();
    fetchMoreMovies();
  }, [movieId]);

  // If the movie is still loading, show a loading message
  if (!movie) {
    return (
      <div
        className={`container mx-auto p-4 ${
          darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
        }`}
      >
        <p>Loading movie details...</p>
      </div>
    );
  }

  // Function to show more movies
  const handleSeeMore = () => {
    setVisibleMovies((prev) => prev + 4); // Increase the number of visible movies by 4 each time
  };

  return (
    <div
      className={`container mx-auto p-4 ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      }`}
    >

      {movie.previewUrl ? (
        <ReactPlayer url={movie.previewUrl} controls width="100%" height="360px" />
      ) : (
        <p>Trailer not available.</p>
      )}
      <h1 className="text-2xl font-bold mb-4">{movie.trackName}</h1>
      <p className="mb-2">{movie.longDescription || 'No description available.'}</p>
      <h2 className='text-2xl font-bold mb-2 mt-2'>Contents:</h2>
      <p className="mb-2">Release Date: {movie.releaseDate}</p>
      <p className="mb-2">Genre: {movie.primaryGenreName}</p>
      <p className="mb-4">Price: {movie.collectionPrice || 'Free'}</p>
      

      <h2 className="text-xl font-bold mt-8 mb-4">More Movies You Might Like</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {moreMovies.slice(0, visibleMovies).map((movie) => (
          <MovieCard key={movie.trackId} movie={movie} />
        ))}
      </div>

      {/* See More Button */}
      {visibleMovies < moreMovies.length && (
        <div className="flex justify-center mt-6">
        <button
          onClick={handleSeeMore}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 justify-center place-items-center"
        >
          See More
        </button>
        </div>
      )}
    </div>
  );
};

export default DetailScreen;

import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext';  // Assuming CartContext is set up
import { useDarkMode } from '../context/DarkModeContext';

const MovieCard = ({ movie }) => {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const { addToCart, removeFromCart, isInCart } = useCart(); // Cart context
  const { darkMode } = useDarkMode();
  const navigate = useNavigate();

  if (!movie) return null;

  const {
    trackId,
    artworkUrl100,
    trackName = 'Unknown Title',
    primaryGenreName = 'Unknown Genre',
    trackPrice = 'N/A',
  } = movie;

  const alreadyFavorite = isFavorite(movie);
  const alreadyInCart = isInCart(trackId); // Check if the movie is already in the cart

  const handleCardClick = () => {
    navigate(`/details/${trackId}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent card click event from triggering
    if (alreadyInCart) {
      removeFromCart(trackId); // Remove from cart
    } else {
      addToCart(movie); // Add to cart
    }
  };

  const handleAddToFavorites = (e) => {
    e.stopPropagation(); // Prevent card click event from triggering
    alreadyFavorite ? removeFavorite(movie) : addFavorite(movie);
  };

  return (
    <div
      className={`p-4 rounded shadow flex flex-col justify-between h-full cursor-pointer ${
        darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
      }`}
      onClick={handleCardClick}
    >
      <div>
        <img
          src={artworkUrl100}
          alt={trackName}
          className="w-full h-40 object-cover rounded"
        />
        <h2 className="text-lg font-bold mt-2">{trackName}</h2>
        <p className="text-gray-600 dark:text-gray-300">{primaryGenreName}</p>
        <p className="text-gray-800 dark:text-gray-200 font-bold">
          ${trackPrice !== 'N/A' ? trackPrice : 'Free'}
        </p>
      </div>
      <div className="flex justify-between items-center mt-4">
        {/* Add/Remove to Favorites Button */}
        <button
          onClick={handleAddToFavorites}
          className={`px-4 py-2 rounded hover:bg-opacity-80 ${
            alreadyFavorite ? 'bg-red-600 text-white' : 'bg-blue-600 text-white'
          }`}
        >
          {alreadyFavorite ? 'Remove' : 'Favorites'}
        </button>

        {/* Add/Remove to Cart Button */}
        <button
          onClick={handleAddToCart}
          className={`px-4 py-2 rounded hover:bg-opacity-80 ${
            alreadyInCart ? 'bg-green-600 text-white' : 'bg-yellow-600 text-white'
          }hover:bg-opacity-80  sm:px-4 sm:py-2 text-xs sm:text-sm md:text-base bg-red-500 text-white rounded hover:bg-red-600 transition-all` }
        >
          {alreadyInCart ? 'Remove from Cart' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default MovieCard;

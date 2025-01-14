import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomeScreen from './components/HomeScreen';
import FavoritesScreen from './components/FavoritesScreen';
import DetailScreen from './components/DetailScreen';
import Cart from './components/Cart';
import { FavoritesProvider } from './context/FavoritesContext';
import { DarkModeProvider } from './context/DarkModeContext';
import { CartProvider } from './context/CartContext';

const App = () => {
  return (
    <FavoritesProvider>
      <DarkModeProvider>
        <CartProvider>
          <Router>
            <div className="min-h-screen">
              <Navbar />
              <Routes>
                <Route path="/" element={<HomeScreen />} />
                <Route path="/favorites" element={<FavoritesScreen />} />
                <Route path="/details/:movieId" element={<DetailScreen />} />
                <Route path="/cart" element={<Cart />} />
              </Routes>
            </div>
          </Router>
        </CartProvider>
      </DarkModeProvider>
    </FavoritesProvider>
  );
};

export default App;

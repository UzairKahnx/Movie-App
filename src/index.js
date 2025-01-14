import React from 'react';
import ReactDOM from 'react-dom/client'; // Use 'react-dom/client' for React 18+
import App from './App';
import './index.css';
import { FavoritesProvider } from './context/FavoritesContext';
import { DarkModeProvider } from './context/DarkModeContext';

// Create the root element and render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FavoritesProvider>
      <DarkModeProvider>
        <App />
      </DarkModeProvider>
    </FavoritesProvider>
  </React.StrictMode>
);

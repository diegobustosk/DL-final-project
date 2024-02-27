import { useState, useContext, createContext, useEffect } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  // Guardar los favoritos en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (product) => {
    setFavorites((currentFavorites) => [...currentFavorites, product]);
  };

  const removeFavorite = (productId) => {
    setFavorites((currentFavorites) => 
      currentFavorites.filter((product) => product.product_id !== productId)
    );
  };

  const isFavorite = (productId) => {
    return favorites.some((product) => product.product_id === productId);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);

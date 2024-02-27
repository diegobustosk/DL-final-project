import React, { createContext, useContext, useState, useEffect } from 'react';

// Crear el contexto del carrito
const CartContext = createContext();

// Componente proveedor del carrito
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  // Guardar el carrito en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Función para añadir productos al carrito
  const addToCart = (productToAdd) => {
    const existingIndex = cart.findIndex((item) => item.product_id === productToAdd.product_id);
    if (existingIndex >= 0) {
      // Si el producto ya existe, aumenta su cantidad.
      const newCart = [...cart];
      newCart[existingIndex].quantity += productToAdd.quantity;
      setCart(newCart);
    } else {
      // Si el producto no existe, lo añade al carrito.
      setCart([...cart, productToAdd]);
    }
  };

  // Función para remover productos del carrito
  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const updateProductQuantity = (productId, quantity) => {
    setCart((currentCart) => {
      return currentCart.map((item) => {
        if (item.product_id === productId) {
          return { ...item, quantity: Math.max(0, item.quantity + quantity) };
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  };

  // Proporciona el contexto a los componentes hijos
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateProductQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook personalizado para usar el contexto del carrito
export const useCart = () => useContext(CartContext);

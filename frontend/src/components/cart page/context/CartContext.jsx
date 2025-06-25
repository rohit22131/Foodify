import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const authToken = localStorage.getItem("authToken");

  // Fetch cart on mount
  useEffect(() => {
    if (authToken) fetchCart();
  }, [authToken]);

  const fetchCart = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/cart`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setCart(res.data.items || []);
    } catch (err) {
      console.error("Failed to load cart", err);
    }
  };

  const addToCart = async (product) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/cart`,
        {
          foodId: product._id,
          quantity: product.quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setCart(res.data.items);
    } catch (err) {
      console.error("Add to cart failed", err);
    }
  };

  const removeFromCart = async (foodId) => {
    try {
      const res = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/cart/${foodId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setCart(res.data.cart.items);
    } catch (err) {
      console.error("Remove from cart failed", err);
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/cart`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setCart([]);
    } catch (err) {
      console.error("Clear cart failed", err);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

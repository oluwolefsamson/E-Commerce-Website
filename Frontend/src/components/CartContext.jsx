import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log("Cart updated in localStorage:", cart);
  }, [cart]);

  const addToCart = (product) => {
    console.log("Adding Product:", product);
    const existingProduct = cart.find((item) => item._id === product._id); // Use _id for consistency
    if (existingProduct) {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item._id === product._id
            ? { ...existingProduct, quantity: existingProduct.quantity + 1 }
            : item
        )
      );
    } else {
      setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((product) => product._id !== id)); // Use _id for consistency
  };

  const getTotalQuantity = () => {
    const totalQuantity = cart.reduce(
      (total, item) => total + item.quantity,
      0
    );
    console.log("Total Quantity in Cart:", totalQuantity);
    return totalQuantity;
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, getTotalQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  return useContext(CartContext);
};

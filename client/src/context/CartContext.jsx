import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Restore cart from localStorage when app loads
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cartItems"));

    if (storedCart) {
      setCartItems(storedCart);
    }
  }, []);

  // Add product to cart
  const addToCart = (product) => {
    const existingItem = cartItems.find(
      (item) => item._id === product._id
    );

    let updatedCart;

    if (existingItem) {
      // If product already exists, increase quantity by 1
      updatedCart = cartItems.map((item) =>
        item._id === product._id
          ? { ...item, qty: item.qty + 1 }
          : item
      );
    } else {
      // If product is new, add it with qty = 1
      updatedCart = [...cartItems, { ...product, qty: 1 }];
    }

    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  // Update quantity of a product in the cart
  const updateCartQty = (id, qty) => {
    let updatedCart;

    if (qty <= 0) {
      // Remove item if quantity becomes 0
      updatedCart = cartItems.filter(
        (item) => item._id !== id
      );
    } else {
      // Update the item's quantity
      updatedCart = cartItems.map((item) =>
        item._id === id
          ? { ...item, qty }
          : item
      );
    }

    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  // Remove product from cart
  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter(
      (item) => item._id !== id
    );

    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateCartQty,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook
export const useCart = () => useContext(CartContext);
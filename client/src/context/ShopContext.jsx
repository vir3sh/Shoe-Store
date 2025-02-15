import { createContext, useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const ShopContext = createContext();

export const ShopContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const backendUrl = "http://localhost:5000";
  const [cartItem, setCartItem] = useState({});
  const currency = "$";

  // Add item to cart
  const addToCart = (itemId, size) => {
    if (!size) {
      toast.error("Please Pick Size");
      return;
    }

    const cartData = { ...cartItem };
    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }

    if (!cartData[itemId][size]) {
      cartData[itemId][size] = 0;
    }

    cartData[itemId][size] += 1;
    setCartItem({ ...cartData }); // Update state
    toast.success("Product Added To Cart");
  };

  // Remove one quantity from cart
  const removeFromCart = (itemId, size) => {
    const cartData = { ...cartItem };

    if (cartData[itemId] && cartData[itemId][size]) {
      if (cartData[itemId][size] > 1) {
        cartData[itemId][size] -= 1;
      } else {
        delete cartData[itemId][size]; // Remove size if quantity is 0
        if (Object.keys(cartData[itemId]).length === 0) {
          delete cartData[itemId]; // Remove item if no sizes left
        }
      }
    }

    setCartItem({ ...cartData });
  };

  // Remove entire item from cart
  const deleteFromCart = (itemId) => {
    const cartData = { ...cartItem };
    delete cartData[itemId]; // Remove the product from the cart
    setCartItem({ ...cartData });
    toast.info("Product Removed from Cart");
  };

  // Get total cart count
  const getCartCount = () => {
    let totalCount = 0;
    for (const itemId in cartItem) {
      for (const size in cartItem[itemId]) {
        totalCount += cartItem[itemId][size];
      }
    }
    return totalCount;
  };

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/product/list`);
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  const value = {
    backendUrl,
    currency,
    products,
    cartItem,
    setCartItem,
    addToCart,
    removeFromCart,
    deleteFromCart,
    getCartCount,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

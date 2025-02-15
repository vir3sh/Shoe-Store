import { createContext, useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const ShopContext = createContext();

export const ShopContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const backendUrl = "http://localhost:5000";
  const delivery_fee = 20;
  const [cartItem, setCartItem] = useState(() => {
    // Load cart from localStorage when the app starts
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : {};
  });

  const currency = "$";
  const [loggedin, setIsLoggedIn] = useState(null);

  // Save cart to localStorage whenever cartItem changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItem));
  }, [cartItem]);

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
    setCartItem(cartData); // Update state
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

  const getCartTotal = () => {
    let totalAmount = 0;
    for (const items in cartItem) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItem[items]) {
        try {
          if (cartItem[items][item] > 0) {
            totalAmount += itemInfo.price * cartItem[items][item];
          }
        } catch (error) {
          toast.error(error);
        }
      }
    }
    return totalAmount;
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token); // Set true if token exists, false otherwise
  }, []);

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
    delivery_fee,
    loggedin,
    setIsLoggedIn,
    cartItem,
    setCartItem,
    addToCart,
    getCartTotal,
    removeFromCart,
    deleteFromCart,
    getCartCount,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

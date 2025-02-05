import { createContext, useEffect, useState } from "react";
import React from "react";
import axios from "axios";
export const ShopContext = createContext();

export const ShopContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const backendUrl = "http://localhost:5000";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(backendUrl + "/api/product/list");
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, [backendUrl]);

  const value = {
    backendUrl,
    products,
  };
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

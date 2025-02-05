import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(Cookies.get("token") || null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/product/list"
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/adminlogin",
        {
          email,
          password,
        }
      );
      const { token } = response.data;
      setToken(token);
      Cookies.set("token", token, { expires: 7 }); // Set cookie to expire in 7 days
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const logout = () => {
    setToken(null);
    Cookies.remove("token");
  };

  return (
    <ShopContext.Provider value={{ products, login, logout, token }}>
      {children}
    </ShopContext.Provider>
  );
};

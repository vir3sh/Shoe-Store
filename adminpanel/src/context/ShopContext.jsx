import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    if (token) {
      fetchProducts();
    }
  }, [token]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/product/list",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const addProduct = async (product, selectedImages) => {
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append(
      "sizes",
      JSON.stringify(product.sizes.split(",").map(Number))
    );
    formData.append("category", JSON.stringify(product.category.split(",")));
    formData.append("bestseller", product.bestseller);

    selectedImages.forEach((image) => {
      formData.append("images", image);
    });

    try {
      await axios.post("http://localhost:5000/api/product/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      fetchProducts();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/product/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
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
      localStorage.setItem("token", token);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const logout = () => {
    setToken(null);

    localStorage.removeItem("token");
  };

  return (
    <ShopContext.Provider
      value={{ products, addProduct, deleteProduct, login, logout, token }}
    >
      {children}
    </ShopContext.Provider>
  );
};

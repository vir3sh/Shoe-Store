import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

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
        },
      });
      fetchProducts();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/product/delete/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <ShopContext.Provider value={{ products, addProduct, deleteProduct }}>
      {children}
    </ShopContext.Provider>
  );
};

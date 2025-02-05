import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ProductSingle = () => {
  const { id } = useParams();
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/product/view/${id}`
        );
        const data = await response.json();

        if (data.success && data.product) {
          setProductData(data.product);
          setMainImage(data.product.images[0]);
        } else {
          setError("Product not found");
        }
      } catch (error) {
        setError("Failed to fetch product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Loading product details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
      {/* Left Side - Images */}
      <div className="flex flex-col items-center">
        <img
          src={`http://localhost:5000/${mainImage}`}
          alt={productData.name}
          className="w-full h-96 object-cover rounded-lg shadow-md cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        />
        <div className="flex gap-2 mt-4">
          {productData.images.map((img, index) => (
            <img
              key={index}
              src={`http://localhost:5000/${img}`}
              alt={productData.name}
              className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${
                mainImage === img ? "border-blue-500" : "border-transparent"
              }`}
              onClick={() => setMainImage(img)}
            />
          ))}
        </div>
      </div>

      {/* Right Side - Product Details */}
      <div className="self-center">
        <h1 className="text-3xl font-bold mb-4">{productData.name}</h1>
        <p className="text-gray-700 text-lg mb-4">{productData.description}</p>
        <p className="text-gray-900 font-semibold text-xl mb-2">
          Price: ${productData.price}
        </p>
        <p className="text-gray-700 text-lg mb-4">
          Category: {productData.category.join(", ")}
        </p>
        <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition">
          Add to Cart
        </button>
      </div>

      {/* Full-Screen Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
          <img
            src={`http://localhost:5000/${mainImage}`}
            alt="Fullscreen"
            className="max-w-4xl max-h-screen object-contain"
          />
          <button
            className="absolute top-5 right-5 text-white text-3xl font-bold cursor-pointer"
            onClick={() => setIsModalOpen(false)}
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductSingle;

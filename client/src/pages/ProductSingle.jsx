import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Recommended from "../components/Recommended";
import { ShopContext } from "../context/ShopContext";

const ProductSingle = () => {
  const { id } = useParams();
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToCart } = useContext(ShopContext);
  const [size, setSize] = useState("");

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
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-pulse text-gray-600 text-lg font-medium">
          Loading product details...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-red-500 text-lg font-medium bg-red-50 px-6 py-4 rounded-lg shadow-sm">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Thumbnail Images - Left Side */}
          <div className="md:col-span-2 order-2 md:order-1">
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-x-hidden">
              {productData.images.map((img, index) => (
                <img
                  key={index}
                  src={`http://localhost:5000/${img}`}
                  alt={`${productData.name} thumbnail ${index + 1}`}
                  className={`w-[70%] h-[0%] object-cover rounded-lg cursor-pointer border-2 transition-all duration-200 hover:shadow-lg ${
                    mainImage === img
                      ? "border-blue-500 shadow-md"
                      : "border-transparent hover:border-blue-300"
                  }`}
                  onClick={() => setMainImage(img)}
                />
              ))}
            </div>
          </div>

          {/* Main Image - Center */}
          <div className="md:col-span-5 order-1 md:order-2">
            <div className="relative group">
              <img
                src={`http://localhost:5000/${mainImage}`}
                alt={productData.name}
                className="w-full h-[300px] sm:h-[400px] lg:h-[600px] object-cover rounded-lg shadow-md cursor-zoom-in transition duration-300 hover:shadow-xl"
                onClick={() => setIsModalOpen(true)}
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-lg"></div>
            </div>
          </div>

          {/* Product Details - Right Side */}
          <div className="md:col-span-5 order-3">
            <div className="space-y-6">
              <h1 className="text-3xl font-bold text-gray-900">
                {productData.name}
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed">
                {productData.description}
              </p>
              <div className="flex flex-col gap-2">
                <p className="text-2xl font-bold text-gray-900">
                  ${productData.price}
                </p>
                <p className="text-sm text-gray-500">
                  Category: {productData.category.join(", ")}
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Select Size
                </h3>
                <div className="flex flex-wrap gap-3">
                  {productData.sizes.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => setSize(item)}
                      className={`px-4 py-2 rounded-lg border-2 transition-all duration-200 
                        ${
                          item === size
                            ? "border-gray-900 bg-gray-900 text-white"
                            : "border-gray-300 hover:border-gray-400 text-gray-700 hover:bg-gray-50"
                        }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => addToCart(id, size)}
                disabled={!size}
                className={`w-full py-4 rounded-lg transition-all duration-200 text-lg font-medium
                  ${
                    size
                      ? "bg-gray-900 text-white hover:bg-gray-800 active:transform active:scale-[0.98]"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
              >
                {size ? "Add to Cart" : "Select a Size"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Full-Screen Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50 backdrop-blur-sm"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="relative max-w-5xl max-h-[90vh] w-full mx-4">
            <img
              src={`http://localhost:5000/${mainImage}`}
              alt="Fullscreen view"
              className="w-full h-full object-contain rounded-lg"
            />
            <button
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors duration-200"
              onClick={(e) => {
                e.stopPropagation();
                setIsModalOpen(false);
              }}
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      <div className="mt-16">
        <Recommended />
      </div>
    </div>
  );
};

export default ProductSingle;

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
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-12 gap-6">
      {/* Thumbnail Images - Left Side */}
      <div className="col-span-2">
        <div className="flex flex-col gap-4">
          {productData.images.map((img, index) => (
            <img
              key={index}
              src={`http://localhost:5000/${img}`}
              alt={productData.name}
              className={`w-16 h-16 object-cover rounded-lg cursor-pointer border-2 ${
                mainImage === img ? "border-blue-500" : "border-transparent"
              }`}
              onClick={() => setMainImage(img)}
            />
          ))}
        </div>
      </div>

      {/* Main Image - Center */}
      <div className="col-span-5">
        <img
          src={`http://localhost:5000/${mainImage}`}
          alt={productData.name}
          className="w-full h-[500px] object-cover rounded-lg shadow-md cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        />
      </div>

      {/* Product Details - Right Side */}
      <div className="col-span-5">
        <h1 className="text-3xl font-bold mb-4">{productData.name}</h1>
        <p className="text-gray-700 text-lg mb-4">{productData.description}</p>
        <p className="text-gray-900 font-semibold text-xl mb-2">
          Price: ${productData.price}
        </p>
        <p className="text-gray-700 text-lg mb-4">
          Category: {productData.category.join(", ")}
        </p>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Available Sizes:</h3>
          <div className="flex gap-2 flex-wrap">
            {productData.sizes.map((size, index) => (
              <button
                key={index}
                className="px-4 py-2 border rounded-lg hover:bg-gray-100"
              >
                {size}
              </button>
            ))}
          </div>
        </div>
        <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-neutral-600 transition w-full">
          Add to Cart
        </button>
      </div>

      {/* Full-Screen Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
          onClick={() => setIsModalOpen(false)}
        >
          <img
            src={`http://localhost:5000/${mainImage}`}
            alt="Fullscreen"
            className="max-w-3xl max-h-screen object-contain"
          />
          <button
            className="absolute top-5 right-5 text-white text-3xl font-bold cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(false);
            }}
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductSingle;

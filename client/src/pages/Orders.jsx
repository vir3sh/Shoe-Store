import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const products = () => {
  const { products, currency } = useContext(ShopContext);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6">Your products</h2>
      <div className="grid gap-6">
        {products.length > 0 ? (
          products.map((product, index) => (
            <div
              key={index}
              className="flex justify-between items-center bproduct p-4 rounded-lg shadow-md"
            >
              {/* Left Side - Image & Details */}
              <div className="flex items-center gap-4">
                <img
                  src={
                    product?.images?.[0]
                      ? `http://localhost:5000/${product.images[0]}`
                      : "placeholder.jpg"
                  }
                  alt={product.name}
                  className="w-24 h-24 object-cover rounded"
                />
                <div>
                  <h3 className="text-lg font-medium">{product.name}</h3>
                  <p className="text-gray-500">Size: {product.size}</p>
                  <p className="text-gray-700 font-semibold">
                    {currency} {product.price}
                  </p>
                </div>
              </div>
              {/* Right Side - Track product Button */}
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Track product
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default products;

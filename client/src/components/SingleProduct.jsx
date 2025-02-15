import React from "react";
import { Link } from "react-router-dom";

const SingleProduct = ({ product }) => {
  return (
    <Link
      to={`/product/${product._id}`}
      className="block border border-gray-200 rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl"
    >
      {/* Product Image */}
      <img
        src={`http://localhost:5000/${product.images[0]}`}
        alt={product.name}
        className="w-full h-56 object-cover rounded-t-xl"
      />

      {/* Product Details */}
      <div className="p-4 bg-white">
        <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2">
          {product.description}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Category: {product.category.join(", ")}
        </p>
        <p className="text-lg font-semibold text-red-500 mt-2">
          ${product.price}
        </p>

        {/* View Button */}
        <button className="mt-4 w-full bg-red-500 text-white py-2 rounded-md font-medium text-sm tracking-wide transition-all hover:bg-red-600 active:scale-95">
          View Details
        </button>
      </div>
    </Link>
  );
};

export default SingleProduct;

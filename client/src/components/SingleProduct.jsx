import React from "react";
import { Link } from "react-router-dom";

const SingleProduct = ({ product }) => {
  return (
    <Link
      to={`/product/${product._id}`}
      className="block border border-gray-200  shadow-md overflow-hidden rounded-xs  transition-transform hover:scale-105 hover:shadow-xl bg-white"
    >
      {/* Product Image */}
      <img
        src={`http://localhost:5000/${product.images[0]}`}
        alt={product.name}
        className="w-full h-60 object-cover rounded-xs"
      />

      {/* Product Name & Price */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 truncate">
          {product.name}
        </h3>
        <p className="text-lg font-bold text-red-500 mt-2">${product.price}</p>
      </div>
    </Link>
  );
};

export default SingleProduct;

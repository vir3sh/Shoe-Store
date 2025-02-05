import React from "react";
import { Link } from "react-router-dom";

const SingleProduct = ({ product }) => {
  return (
    <>
      <Link
        to={`/product/${product._id}`}
        className="border border-gray-300 p-4 rounded-lg shadow-lg"
      >
        <img
          src={`http://localhost:5000/${product.images[0]}`}
          alt={product.name}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <div className="p-4">
          <h3 className="text-lg font-bold mb-2">{product.name}</h3>
          <p className="text-sm text-gray-600 mb-2">{product.description}</p>
          <p className="text-sm text-gray-600 mb-2">
            Category: {product.category.join(", ")}
          </p>
          <p className="text-sm text-gray-600 mb-2">Price: ${product.price}</p>
          <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Add to Cart
          </button>
        </div>
      </Link>
    </>
  );
};

export default SingleProduct;

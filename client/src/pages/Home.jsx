import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const Home = () => {
  const { products } = useContext(ShopContext);

  return (
    <div>
      <section className="hero bg-gray-800 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to Shoe Store</h1>
          <p className="text-xl mb-8">Find the best shoes for every occasion</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Shop Now
          </button>
        </div>
      </section>
      <section className="products py-20">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product._id}
                className="border border-gray-300 p-4 rounded"
              >
                <h3 className="text-lg font-bold mb-2">{product.name}</h3>
                <p className="mb-2">{product.description}</p>
                <p className="mb-2">Sizes: {product.sizes.join(", ")}</p>
                <p className="mb-2">Category: {product.category.join(", ")}</p>
                <p className="mb-2">
                  Bestseller: {product.bestseller ? "Yes" : "No"}
                </p>
                <div className="flex space-x-2">
                  {product.images.map((image, index) => (
                    <img
                      key={index}
                      src={`http://localhost:5000/${image}`}
                      alt="Product"
                      className="w-24 h-24 object-cover border border-gray-300 rounded"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

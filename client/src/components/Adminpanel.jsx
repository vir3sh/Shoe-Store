import React, { useState, useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const AdminPanel = () => {
  const { products, addProduct, deleteProduct } = useContext(ShopContext);
  const [activeTab, setActiveTab] = useState("addProduct");
  const [product, setProduct] = useState({
    name: "",
    description: "",
    sizes: "",
    category: "",
    bestseller: false,
    images: [],
  });
  const [selectedImages, setSelectedImages] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    setSelectedImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addProduct(product, selectedImages);
    setProduct({
      name: "",
      description: "",
      sizes: "",
      category: "",
      bestseller: false,
      images: [],
    });
    setSelectedImages([]);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex">
        <div className="w-1/4">
          <button
            className={`w-full p-2 mb-2 ${
              activeTab === "addProduct"
                ? "bg-black text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("addProduct")}
          >
            Add Product
          </button>
          <button
            className={`w-full p-2 mb-2 ${
              activeTab === "viewProducts"
                ? "bg-black text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("viewProducts")}
          >
            View Products
          </button>
          <button
            className={`w-full p-2 mb-2 ${
              activeTab === "orders" ? "bg-black text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("orders")}
          >
            Orders
          </button>
        </div>
        <div className="w-3/4 p-4 border-l border-gray-300">
          {activeTab === "addProduct" && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                value={product.name}
                onChange={handleInputChange}
                placeholder="Product Name"
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                name="description"
                value={product.description}
                onChange={handleInputChange}
                placeholder="Product Description"
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                name="sizes"
                value={product.sizes}
                onChange={handleInputChange}
                placeholder="Sizes (comma separated)"
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                name="category"
                value={product.category}
                onChange={handleInputChange}
                placeholder="Category (comma separated)"
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="bestseller"
                  checked={product.bestseller}
                  onChange={(e) =>
                    setProduct({ ...product, bestseller: e.target.checked })
                  }
                  className="form-checkbox"
                />
                <span>Bestseller</span>
              </label>
              <input
                type="file"
                multiple
                onChange={handleImageChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <div className="flex space-x-2">
                {selectedImages.length > 0 ? (
                  selectedImages.map((image, index) => (
                    <img
                      key={index}
                      src={URL.createObjectURL(image)}
                      alt="Selected"
                      className="w-24 h-24 object-cover border border-gray-300 rounded"
                    />
                  ))
                ) : (
                  <div className="w-24 h-24 border border-gray-300 rounded flex items-center justify-center">
                    <span className="text-gray-500">+</span>
                  </div>
                )}
              </div>
              <button
                type="submit"
                className="bg-black text-white px-4 py-2 rounded"
              >
                Add Product
              </button>
            </form>
          )}
          {activeTab === "viewProducts" && (
            <div>
              <h2 className="text-xl font-bold mb-4">Product List</h2>
              <ul className="space-y-4">
                {products.map((product) => (
                  <li
                    key={product._id}
                    className="border border-gray-300 p-4 rounded"
                  >
                    <h3 className="text-lg font-bold">
                      Title : {product.name}
                    </h3>
                    <p>Description : {product.description}</p>
                    <p>Sizes: {product.sizes.join(", ")}</p>
                    <p>Category: {product.category.join(", ")}</p>
                    <p>Bestseller: {product.bestseller ? "Yes" : "No"}</p>
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
                    <button
                      onClick={() => deleteProduct(product._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-[red] mt-2"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {activeTab === "orders" && (
            <div>
              <h2 className="text-xl font-bold mb-4">Orders</h2>
              <p>No orders to display.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;

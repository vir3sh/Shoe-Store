import React, { useState, useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import SingleProduct from "../components/SingleProduct";

const Collection = () => {
  const { products } = useContext(ShopContext);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: " " });
  const [filteredProducts, setFilteredProducts] = useState(products); // Initialize with all products

  const categories = [
    ...new Set(products.flatMap((product) => product.category)),
  ];

  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handlePriceChange = (e) => {
    setPriceRange({
      ...priceRange,
      [e.target.name]: Number(e.target.value),
    });
  };

  useEffect(() => {
    let filtered = products;

    // Only apply category filter if categories are selected
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        product.category.some((cat) => selectedCategories.includes(cat))
      );
    }

    // Apply price filter only if min or max is greater than 0
    if (priceRange.min > 0 || priceRange.max > 0) {
      filtered = filtered.filter(
        (product) =>
          product.price >= priceRange.min && product.price <= priceRange.max
      );
    }

    setFilteredProducts(filtered);
  }, [selectedCategories, priceRange, products]);
  // Rest of your component code...

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Section */}
        <div className="md:w-1/4 space-y-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <label key={category} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                    className="rounded"
                  />
                  <span className="text-gray-700">{category}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Price Range</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600">Min Price</label>
                <input
                  type="number"
                  name="min"
                  value={priceRange.min}
                  onChange={handlePriceChange}
                  className="w-full mt-1 p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600">Max Price</label>
                <input
                  type="number"
                  name="max"
                  value={priceRange.max}
                  onChange={handlePriceChange}
                  className="w-full mt-1 p-2 border rounded"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="md:w-3/4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <SingleProduct key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;

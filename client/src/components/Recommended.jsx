import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import SingleProduct from "./SingleProduct";
import Title from "./Title";

const Recommended = () => {
  const { products } = useContext(ShopContext);

  // Get 6 random products
  const getRandomProducts = () => {
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 5);
  };

  const randomProducts = getRandomProducts();

  return (
    <div className="py-12">
      <Title text1="Recommended" text2="Products" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 px-4">
        {randomProducts.map((product) => (
          <SingleProduct key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Recommended;

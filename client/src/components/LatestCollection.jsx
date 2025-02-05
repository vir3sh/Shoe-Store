import React, { useContext } from "react";
import Title from "./Title";
import { ShopContext } from "../context/ShopContext";
import SingleProduct from "./SingleProduct";

const LatestCollection = () => {
  const { backendUrl, products } = useContext(ShopContext);
  return (
    <div>
      <Title text1={"Latest"} text2={"Collections"} />
      <div className="grid  grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 mx-3 my-3 ">
        {products.map((product) => (
          <SingleProduct
            key={product._id}
            _id={product._id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;

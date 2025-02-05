import React, { useContext, useEffect, useState } from "react";
import Title from "./Title";
import { ShopContext } from "../context/ShopContext";
import SingleProduct from "./SingleProduct";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestproduct, setBestproduct] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const filteredProducts = products.filter(
        (product) => product.bestseller === true
      );
      setBestproduct(filteredProducts);
    }
  }, [products]);
  //   console.log(products.map((p) => ({ id: p._id, bestseller: p.bestseller })));

  return (
    <div>
      <Title text1={"BestSeller"} text2={"Products"} />
      <div className="grid  grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 mx-3 my-3">
        {bestproduct.map((product) => (
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

export default BestSeller;

import React, { useContext } from "react";
import Title from "./Title";
import { ShopContext } from "../context/ShopContext";

const LatestCollection = () => {
  const backendUrl = useContext(ShopContext);
  console.log(backendUrl);
  return (
    <div>
      <Title text1={"Latest"} text2={"Collections"} />
    </div>
  );
};

export default LatestCollection;

import React from "react";
import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import BestSeller from "../components/BestSeller";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const Home = () => {
  const { loggedin } = useContext(ShopContext);
  console.log(loggedin);
  return (
    <div>
      <Hero />
      <LatestCollection />
      <BestSeller />
    </div>
  );
};

export default Home;

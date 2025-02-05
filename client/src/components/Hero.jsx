import React from "react";
import heroimg from "../assets/forceimage.jpg";

const Hero = () => {
  return (
    <div className="hero py-24 px-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left md:w-1/2 space-y-6">
          <h1 className="text-6xl font-extrabold tracking-tight leading-none">
            Adidas Shoes
          </h1>
          <p className="text-2xl font-medium tracking-wide">Shoes for men</p>
          <p className="text-4xl font-bold">$555</p>
          <p className="text-xl font-light tracking-wide">
            Stylish and comfortable
          </p>
          <button className="mt-3 text-lg font-semibold px-8 py-3 rounded-lg transform transition duration-300 hover:scale-105 hover:shadow-xl bg-black text-white">
            See More
          </button>
        </div>
        <div className="hero-image md:w-1/2 mt-8 md:mt-0">
          <img
            src={heroimg}
            alt="Adidas Shoes"
            className="w-full h-auto rounded-2xl shadow-2xl transform transition duration-500 hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;

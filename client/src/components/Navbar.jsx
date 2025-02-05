import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="bg-black">
      <div className="flex justify-between mx-3 p-2 bg-black text-teal-50 py-5">
        <div className="logo">LOGO</div>
        <div className="list">
          <ul className="flex gap-5 text-xl">
            <Link to={"/home"}>HOME</Link>
            <Link to={"/collection"}>COLLECTION</Link>
            <Link to={"/contact"}>CONTACT</Link>
          </ul>
        </div>
        <div className="rounded-full bg-white text-black px-1.5 py-1 text-xl ">
          VP
        </div>
      </div>
    </div>
  );
};

export default Navbar;

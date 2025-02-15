import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const { getCartCount } = useContext(ShopContext);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const fetchCartCount = async () => {
      const count = await getCartCount();
      setCartCount(count);
    };

    fetchCartCount();
  }, [getCartCount]); // Runs when getCartCount changes

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
        <Link
          to="/cart"
          className="relative  border border-white rounded-full p-1 "
        >
          CART{" "}
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center bg-black text-white border border-white rounded-full text-[10px]">
            {cartCount}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
